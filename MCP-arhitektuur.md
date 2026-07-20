# MCP serverid, tööriistad ja mitme mudeli orkestreerimine

Praktiline juhend: kuidas anda veebi-Claude'ile (ja/või Claude Code'ile) ligipääs
oma arvutile, oma lokaalsetele mudelitele, ning ehitada mitme mudeli vaheline
"kirjakast" (mailbox), kus sama ülesanne saadetakse mitmele mudelile ja parim
vastus valitakse edasi.

---

## 0. Kõige tähtsam otsus enne kõike muud: veeb vs. Claude Code

Sul on kaks täiesti erinevat teed, ja neid aetakse pidevalt segamini:

### Tee A — claude.ai veebis (Connectors / Custom connectors)
- Veebi-Claude jookseb Anthropicu serveris, **mitte sinu arvutis**.
- Et ta pääseks sinu masinasse, peab sinu arvutis olema **avalikult kättesaadav
  MCP-server** (Streamable HTTP transport + OAuth).
- See tähendab: lokaalne MCP-server + **tunnel** (Cloudflare Tunnel / Tailscale
  Funnel / ngrok), mis avab su masina internetile.
- **Suur turvarisk**: annad interneti kaudu ligipääsu shellile/failidele. Seda
  saab teha, aga see nõuab autentimist ja piiranguid (vt ptk 6).

### Tee B — Claude Code sinu enda arvutis (soovitan)
- Claude Code (CLI / desktop / IDE) jookseb **sinu masinas**.
- MCP-serverid ühenduvad **stdio kaudu** — mingit tunnelit ega avalikku porti
  pole vaja, ligipääs on niikuinii lokaalne ja kohe olemas.
- "Täielik ligipääs, sh root, lokaalsed mudelid, orkestraatorid" — see on
  **täpselt see, mida Claude Code lokaalselt niikuinii teeb**. Sa ei pea midagi
  internetti avama.
- Kui su eesmärk on "anda mudelile ligipääs mu arvutile", siis **99% juhtudest
  on õige vastus Claude Code lokaalselt**, mitte veebi-Claude läbi tunneli.

> **Praktiline soovitus:** ehita orkestreerimis-loogika ühe MCP-serverina, mis
> töötab stdio kaudu Claude Code'iga. Kui *hiljem* tahad sama serverit ka
> veebi-Claude'ile anda, lisad sellele HTTP-transpordi + OAuth ja tunneli.
> Sama koodibaas, kaks transporti.

---

## 1. Arhitektuuri üldpilt

```
                       ┌─────────────────────────────┐
   claude.ai (veeb) ──▶│  MCP-server (sinu masinas)  │
   või Claude Code  ──▶│  - orchestrator / mailbox   │
   (stdio, lokaalne)   │  - filesystem / shell       │
                       │  - dispatch_to_model()      │
                       └──────────────┬──────────────┘
                                      │ OpenAI-ühilduv API
                                      ▼
                       ┌─────────────────────────────┐
                       │      LiteLLM proxy          │  ← üks värav kõigile mudelitele
                       └──────────────┬──────────────┘
              ┌───────────────┬───────┴───────┬────────────────┐
              ▼               ▼               ▼                ▼
          Ollama          LM Studio       vLLM            pilv (GPT/Gemini/...)
        (lokaalne)       (lokaalne)     (lokaalne)         (valikuline)
```

Kolm kihti:
1. **Mudelivärav** — LiteLLM proxy: kõik mudelid (lokaalsed + pilv) ühe
   OpenAI-ühilduva API taga.
2. **MCP-kiht** — üks custom server (FastMCP), mis annab Claude'ile tööriistad:
   saada mudelile, kirjakast, failid, shell, taskijärjekord.
3. **Klient** — Claude Code (lokaalne, stdio) ja/või claude.ai (veeb, HTTP+OAuth).

---

## 2. Mudelivärav: LiteLLM proxy

LiteLLM on siin võti. Üks OpenAI-ühilduv endpoint, mille taga on kõik su mudelid.
See teeb "saada sama ülesanne mitmele mudelile" triviaalseks, sest kõik on üks API.

`litellm_config.yaml`:
```yaml
model_list:
  - model_name: local-qwen
    litellm_params:
      model: ollama/qwen2.5-coder:32b
      api_base: http://localhost:11434
  - model_name: local-llama
    litellm_params:
      model: ollama/llama3.3:70b
      api_base: http://localhost:11434
  - model_name: lmstudio-model
    litellm_params:
      model: openai/local-model
      api_base: http://localhost:1234/v1
  - model_name: cloud-gpt        # valikuline
    litellm_params:
      model: gpt-4o
```

Käivita:
```bash
pip install 'litellm[proxy]'
litellm --config litellm_config.yaml   # → http://localhost:4000
```

Nüüd kõik mudelid on ühe aadressiga: `POST http://localhost:4000/v1/chat/completions`,
`model: "local-qwen"` vs `"local-llama"` vs `"cloud-gpt"`.

**Lokaalsed mudelid ise:**
- **Ollama** — kõige lihtsam CLI/serverivariant (`ollama serve`).
- **LM Studio** — GUI + OpenAI-ühilduv server, mugav mudelite proovimiseks.
- **vLLM** — kui on tõsine GPU ja tahad läbilaskevõimet/batchimist.

---

## 3. MCP-server: orkestraator + kirjakast

See on su süsteemi süda. Ehita FastMCP-ga (Python, kõige kiirem viis).

```bash
pip install fastmcp openai
```

`orchestrator_mcp.py`:
```python
from fastmcp import FastMCP
from openai import OpenAI
import sqlite3, json, time, uuid

mcp = FastMCP("orchestrator")
llm = OpenAI(base_url="http://localhost:4000/v1", api_key="sk-anything")
db = sqlite3.connect("mailbox.db", check_same_thread=False)
db.execute("""CREATE TABLE IF NOT EXISTS messages(
    id TEXT, thread TEXT, model TEXT, role TEXT,
    content TEXT, score REAL, ts REAL)""")

@mcp.tool()
def dispatch(prompt: str, models: list[str], thread: str = "") -> dict:
    """Saada sama ülesanne mitmele mudelile ja kogu vastused kirjakasti."""
    thread = thread or str(uuid.uuid4())[:8]
    results = {}
    for m in models:
        r = llm.chat.completions.create(
            model=m, messages=[{"role": "user", "content": prompt}])
        text = r.choices[0].message.content
        results[m] = text
        db.execute("INSERT INTO messages VALUES(?,?,?,?,?,?,?)",
                   (str(uuid.uuid4()), thread, m, "assistant", text, None, time.time()))
    db.commit()
    return {"thread": thread, "results": results}

@mcp.tool()
def list_messages(thread: str) -> list:
    """Vaata ühe lõime kõiki mudelite vastuseid (kirjakast)."""
    cur = db.execute(
        "SELECT model, content, score FROM messages WHERE thread=? ORDER BY ts", (thread,))
    return [{"model": m, "content": c, "score": s} for m, c, s in cur]

@mcp.tool()
def score(thread: str, model: str, score: float) -> str:
    """Hinda ühe mudeli vastust (kumb oli parem) — järgmiseks marsruutimiseks."""
    db.execute("UPDATE messages SET score=? WHERE thread=? AND model=?",
               (score, thread, model))
    db.commit()
    return "ok"

@mcp.tool()
def route_followup(thread: str, prompt: str) -> dict:
    """Saada järgmine ülesanne sama lõime seni parima skooriga mudelile."""
    cur = db.execute(
        "SELECT model FROM messages WHERE thread=? AND score IS NOT NULL "
        "ORDER BY score DESC LIMIT 1", (thread,))
    row = cur.fetchone()
    best = row[0] if row else "local-qwen"
    return dispatch(prompt, [best], thread)

if __name__ == "__main__":
    mcp.run()   # stdio — Claude Code'i jaoks
```

See annab sulle täpselt su kirjeldatud töövoo:
- `dispatch` — sama kiri mitmele mudelile korraga.
- `list_messages` — vaata, kes mida vastas (kirjakast).
- `score` — märgi, kelle vastus oli parem.
- `route_followup` — edasine ülesanne läheb parimale.

**Ühenda Claude Code'iga** (`~/.claude.json` või projekti `.mcp.json`):
```json
{
  "mcpServers": {
    "orchestrator": {
      "command": "python",
      "args": ["/abs/path/orchestrator_mcp.py"]
    }
  }
}
```
Või CLI-ga: `claude mcp add orchestrator -- python /abs/path/orchestrator_mcp.py`

---

## 4. Failid, shell ja "root-ligipääs"

Lisaks orkestraatorile tahad Claude'ile failisüsteemi + shelli. Valmis MCP-serverid:

- **Filesystem** — `npx -y @modelcontextprotocol/server-filesystem /lubatud/kaust`
  Annab loe/kirjuta ligipääsu **piiratud kaustadele** (mitte kogu `/`).
- **Shell / käsud** — mitu kogukonna serverit (`mcp-server-commands` jms), aga
  Claude Code'il on Bash niikuinii sisse ehitatud — lokaalselt sa **ei vaja
  eraldi shell-MCP-d**, ta juba oskab su masinas käske joosta.

Su "kausta panna kust vaja, root ligipääs" mõte: Claude Code'il lokaalselt on
see olemas — Bash + Read/Write/Edit tööriistad kogu failisüsteemile (permission
mode'i piires). Nii et raske ülesande tulemuse failid, mille "veebi teised AI-d"
genereerivad, panevad nad lihtsalt kokkulepitud kausta ja lokaalne Claude Code
loeb need sealt. Repo kaudu sünkroonis hoidmine (git push ↔ pull) on ka hea muster.

---

## 5. Raske töö delegeerimine (async / taskijärjekord)

Su punkt "lasta massiivsed asjad teistel AI-del teha ja tulemus hiljem võtta" —
selleks tee MCP-tööriistad **asünkroonseks**: dispatch tagastab `task_id` kohe,
ja eraldi tööriist küsib tulemust.

```python
@mcp.tool()
def dispatch_async(prompt, model) -> dict:   # paneb tööjärjekorda, tagastab task_id
    ...
@mcp.tool()
def get_result(task_id) -> dict:             # küsi hiljem
    ...
```

Nii ei blokeeri raske lokaalne mudel Claude'i vestlust — ta annab ülesande,
läheb muud tegema, ja tuleb tulemust võtma. Järjekorra taustaks sobib lihtne
SQLite + threadpool, või tõsisemalt Redis/Celery.

---

## 6. Turvalisus (kui ikkagi tahad veebi-Claude'i ligipääsu)

Kui lähed tee A peale (claude.ai läbi tunneli), siis **ilma nende kaitseteta ära
tee**:

1. **Autentimine** — OAuth 2.1 või vähemalt bearer-token MCP-serveri ees.
   claude.ai custom connectorid toetavad OAuth-i.
2. **Tunnel, mitte avatud port** — Cloudflare Tunnel või **Tailscale Funnel**
   (parem, sest Tailscale hoiab su võrgu privaatsena). ngrok kiireks testiks.
3. **Piira ulatust** — filesystem-server ainult lubatud kaustadele, shellile
   whitelist/allowlist, mitte pime `bash -c`.
4. **Ära anna "kogu root veebi"** — see on reaalne oht: prompt-injection ühest
   mudeli vastusest võib su masinat kahjustada. Hoia destruktiivsed käsud
   inimese-kinnituse (approval) taga.
5. **Isoleeri** — jooksuta MCP-server konteineris/VM-is, mitte peremasina rootina.

Lokaalse Claude Code'i puhul (tee B) enamik neist murest kaob — ligipääs on
niikuinii sinu masinas ja sinu kontrolli all.

---

## 7. Huvitavad lisavariandid, mida tasub arvestada

| Variant | Milleks |
|---|---|
| **Claude Agent SDK** (Python/TS) | Ehita orkestraator koodina — programmaatiline agent, kes ise dispatchib mudelitele. Kui tahad "kirjakast + marsruutimine" täisautomaatseks ilma inimese vahenduseta. |
| **Claude Code subagents** | Sisseehitatud viis jagada töö paralleelseteks alamagentideks. Vaata `Agent`-tööriista / `.claude/agents/`. |
| **opencode / aider** | Lokaalsed kodeerimisagendid, mis oskavad LiteLLM/Ollama taha rääkida. Saab MCP-tööriistana wrapida ("lase opencode'il see repo ära teha"). |
| **mcp-agent** | Raamistik mitme MCP-serveri orkestreerimiseks agendina. |
| **MCP registry** | Valmis serverite kataloog (GitHub, Slack, Postgres, brauser jne) — ära ehita seda, mida keegi juba tegi. |
| **Tailscale** | Turvaline võrgukiht kõige selle vahele — su masinad räägivad omavahel ilma avaliku pordita. |
| **n8n / Windmill** | Kui kirjakast + marsruutimine kasvab, visuaalne workflow-mootor võib olla mugavam kui käsitsi kood. |

---

## 8. Soovitatav stardiplaan (konkreetne järjekord)

1. **LiteLLM proxy** püsti + 2 lokaalset Ollama mudelit config'i. (30 min)
2. **FastMCP orkestraator** ptk 3 koodiga: `dispatch`, `list_messages`, `score`,
   `route_followup`. (1 h)
3. Ühenda **Claude Code'iga stdio kaudu** — testi lokaalselt, tunnelit pole vaja.
4. Lisa **async dispatch** raskete tööde jaoks (ptk 5).
5. **Alles siis**, kui tõesti vaja veebi-Claude'i: lisa HTTP-transport + OAuth +
   Tailscale Funnel (ptk 6).

Nii saad 90% oma visioonist kätte **ilma midagi internetti avamata** — ja
veebi-ligipääsu lisad turvaliselt siis, kui vundament juba töötab.
