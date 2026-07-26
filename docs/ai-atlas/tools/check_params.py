#!/usr/bin/env python3
"""Derive parameter counts from a HuggingFace config.json.

Usage:
    python check_params.py meta-llama/Llama-3.1-405B     # fetch from HF
    python check_params.py --self-test                   # offline verification
"""
import json
import sys
import urllib.request


def fetch(repo: str) -> dict:
    url = f"https://huggingface.co/{repo}/raw/main/config.json"
    with urllib.request.urlopen(url, timeout=30) as r:
        return json.load(r)


def attention_params(c: dict) -> int:
    """Per-layer attention params. Handles MHA/GQA/MQA and MLA (low-rank latent)."""
    d = c["hidden_size"]
    H = c["num_attention_heads"]

    kv_lora = c.get("kv_lora_rank")
    if kv_lora:  # MLA — DeepSeek V2/V3 style
        rope = c.get("qk_rope_head_dim", 64)
        nope = c.get("qk_nope_head_dim", 128)
        v_dim = c.get("v_head_dim", nope)
        q_lora = c.get("q_lora_rank")
        if q_lora:
            q = d * q_lora + q_lora * H * (nope + rope)
        else:
            q = d * H * (nope + rope)
        kv_down = d * (kv_lora + rope)
        kv_up = kv_lora * H * (nope + v_dim)
        o = H * v_dim * d
        return q + kv_down + kv_up + o

    K = c.get("num_key_value_heads", H)
    h = c.get("head_dim") or d // H
    return d * H * h + 2 * d * K * h + H * h * d


def params(c: dict) -> tuple[float, float]:
    """Return (total_B, active_B). Assumes SwiGLU (3 FFN matrices)."""
    L = c["num_hidden_layers"]
    d = c["hidden_size"]
    V = c["vocab_size"]

    attn = attention_params(c)

    n_routed = c.get("n_routed_experts") or c.get("num_experts")
    if n_routed:
        n_act = c.get("num_experts_per_tok", 8)
        n_shr = c.get("n_shared_experts") or 0
        fe = c.get("moe_intermediate_size", c["intermediate_size"])
        dense = c.get("first_k_dense_replace", 0)
        moe_L = L - dense
        ffn_dense = 3 * d * c["intermediate_size"]
        total = L * attn + dense * ffn_dense + moe_L * (n_routed + n_shr) * 3 * d * fe
        active = L * attn + dense * ffn_dense + moe_L * (n_act + n_shr) * 3 * d * fe
    else:
        ffn = 3 * d * c["intermediate_size"]
        total = active = L * (attn + ffn)

    emb = V * d * (1 if c.get("tie_word_embeddings") else 2)
    return (total + emb) / 1e9, (active + emb) / 1e9


LLAMA_405B = {
    "num_hidden_layers": 126, "hidden_size": 16384, "intermediate_size": 53248,
    "num_attention_heads": 128, "num_key_value_heads": 8, "head_dim": 128,
    "vocab_size": 128256, "tie_word_embeddings": False,
}
DEEPSEEK_V3 = {
    "num_hidden_layers": 61, "hidden_size": 7168, "intermediate_size": 18432,
    "num_attention_heads": 128, "vocab_size": 129280, "tie_word_embeddings": False,
    "q_lora_rank": 1536, "kv_lora_rank": 512,
    "qk_rope_head_dim": 64, "qk_nope_head_dim": 128, "v_head_dim": 128,
    "n_routed_experts": 256, "num_experts_per_tok": 8, "n_shared_experts": 1,
    "moe_intermediate_size": 2048, "first_k_dense_replace": 3,
}


def self_test() -> int:
    cases = [("Llama 3.1 405B", LLAMA_405B, 405.0, 405.0, 3.0),
             ("DeepSeek V3", DEEPSEEK_V3, 671.0, 37.0, 12.0)]
    failed = 0
    for name, cfg, exp_t, exp_a, tol in cases:
        t, a = params(cfg)
        ok_t, ok_a = abs(t - exp_t) <= tol, abs(a - exp_a) <= tol
        status = "PASS" if (ok_t and ok_a) else "FAIL"
        failed += not (ok_t and ok_a)
        print(f"[{status}] {name:20} derived {t:7.1f}B / {a:6.1f}B active "
              f"(published {exp_t}B / {exp_a}B)")
    return failed


if __name__ == "__main__":
    if len(sys.argv) < 2 or sys.argv[1] == "--self-test":
        sys.exit(self_test())
    repo = sys.argv[1]
    t, a = params(fetch(repo))
    print(f"{repo}\n  total  ~ {t:7.1f} B\n  active ~ {a:7.1f} B")
