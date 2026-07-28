#!/usr/bin/env python3
"""Classification: extension -> category/language, path -> scope, project detection.

Kept separate from the scanner so the API, the rescue tool and any future
enricher all classify identically.
"""

import re
from functools import lru_cache
from pathlib import Path

CATEGORIES = {
    ".py": "code", ".pyi": "code", ".pyx": "code", ".js": "code", ".ts": "code",
    ".tsx": "code", ".jsx": "code", ".mjs": "code", ".cjs": "code", ".vue": "code",
    ".svelte": "code", ".html": "code", ".htm": "code", ".css": "code", ".scss": "code",
    ".sass": "code", ".less": "code", ".java": "code", ".c": "code", ".cpp": "code",
    ".cc": "code", ".hpp": "code", ".h": "code", ".rs": "code", ".go": "code",
    ".php": "code", ".sql": "code", ".rb": "code", ".swift": "code", ".kt": "code",
    ".lua": "code", ".scala": "code", ".clj": "code", ".ex": "code", ".exs": "code",
    ".erl": "code", ".hs": "code", ".ml": "code", ".r": "code", ".jl": "code",
    ".dart": "code", ".zig": "code", ".nim": "code", ".v": "code", ".ipynb": "code",
    ".sh": "script", ".bash": "script", ".zsh": "script", ".ps1": "script",
    ".fish": "script", ".bat": "script", ".cmd": "script", ".awk": "script",
    ".md": "document", ".markdown": "document", ".txt": "document", ".pdf": "document",
    ".doc": "document", ".docx": "document", ".odt": "document", ".ods": "document",
    ".odp": "document", ".rtf": "document", ".csv": "document", ".tsv": "document",
    ".json": "document", ".jsonl": "document", ".ndjson": "document", ".yaml": "document",
    ".yml": "document", ".xml": "document", ".toml": "document", ".ini": "document",
    ".conf": "document", ".cfg": "document", ".properties": "document", ".env": "document",
    ".rst": "document", ".tex": "document", ".bib": "document", ".epub": "document",
    ".mobi": "document", ".azw3": "document", ".ps": "document", ".djvu": "document",
    ".xls": "document", ".xlsx": "document", ".ppt": "document", ".pptx": "document",
    ".jpg": "image", ".jpeg": "image", ".png": "image", ".gif": "image", ".webp": "image",
    ".svg": "image", ".bmp": "image", ".tiff": "image", ".tif": "image", ".heic": "image",
    ".ico": "image", ".avif": "image", ".psd": "image", ".xcf": "image", ".raw": "image",
    ".mp4": "video", ".mkv": "video", ".avi": "video", ".mov": "video", ".webm": "video",
    ".flv": "video", ".wmv": "video", ".m4v": "video", ".mpg": "video", ".mpeg": "video",
    ".mp3": "audio", ".flac": "audio", ".ogg": "audio", ".wav": "audio", ".aac": "audio",
    ".opus": "audio", ".m4a": "audio", ".wma": "audio", ".mid": "audio",
    ".zip": "archive", ".tar": "archive", ".gz": "archive", ".xz": "archive",
    ".bz2": "archive", ".zst": "archive", ".7z": "archive", ".rar": "archive",
    ".lz4": "archive", ".iso": "archive", ".img": "archive", ".qcow2": "archive",
    ".vdi": "archive", ".vmdk": "archive", ".dmg": "archive",
    ".db": "database", ".sqlite": "database", ".sqlite3": "database", ".mdb": "database",
    ".kdbx": "database", ".parquet": "database", ".arrow": "database", ".duckdb": "database",
    ".exe": "binary", ".bin": "binary", ".so": "binary", ".dll": "binary",
    ".dylib": "binary", ".a": "binary", ".o": "binary", ".wasm": "binary",
    ".pyc": "binary", ".pyo": "binary", ".class": "binary", ".elf": "binary",
    ".deb": "package", ".rpm": "package", ".apk": "package", ".flatpak": "package",
    ".snap": "package", ".appimage": "package", ".whl": "package", ".gem": "package",
    ".log": "log", ".log1": "log", ".out": "log", ".err": "log",
    ".woff": "font", ".woff2": "font", ".ttf": "font", ".otf": "font", ".eot": "font",
    ".pem": "key", ".key": "key", ".crt": "key", ".cer": "key", ".pfx": "key",
    ".pub": "key", ".gpg": "key", ".asc": "key", ".p12": "key",
    ".safetensors": "model", ".gguf": "model", ".ggml": "model", ".onnx": "model",
    ".pt": "model", ".pth": "model", ".ckpt": "model", ".h5": "model", ".pb": "model",
}

LANGUAGES = {
    ".py": "python", ".js": "javascript", ".mjs": "javascript", ".cjs": "javascript",
    ".ts": "typescript", ".tsx": "typescript", ".jsx": "javascript", ".html": "html",
    ".css": "css", ".scss": "scss", ".sh": "shell", ".bash": "shell", ".zsh": "shell",
    ".sql": "sql", ".rs": "rust", ".go": "go", ".java": "java", ".cpp": "cpp",
    ".cc": "cpp", ".c": "c", ".h": "c", ".rb": "ruby", ".php": "php", ".swift": "swift",
    ".kt": "kotlin", ".lua": "lua", ".scala": "scala", ".hs": "haskell", ".r": "r",
    ".jl": "julia", ".dart": "dart", ".ex": "elixir", ".zig": "zig", ".nim": "nim",
    ".ipynb": "python", ".md": "markdown", ".yaml": "yaml", ".yml": "yaml", ".toml": "toml",
}

# Filenames with no extension that are still meaningful.
SPECIAL_NAMES = {
    "Makefile": ("code", "make"), "Dockerfile": ("code", "docker"),
    "Vagrantfile": ("code", "ruby"), "Rakefile": ("code", "ruby"),
    "Jenkinsfile": ("code", "groovy"), "README": ("document", None),
    "LICENSE": ("document", None), "CHANGELOG": ("document", None),
    ".gitignore": ("document", None), ".bashrc": ("script", "shell"),
    ".zshrc": ("script", "shell"), ".profile": ("script", "shell"),
    ".env": ("document", None), "requirements.txt": ("document", None),
}

PROJECT_MARKERS = [
    ("pyproject.toml", "python"), ("setup.py", "python"), ("requirements.txt", "python"),
    ("Pipfile", "python"), ("package.json", "node"), ("Cargo.toml", "rust"),
    ("go.mod", "go"), ("pom.xml", "java"), ("build.gradle", "java"),
    ("Gemfile", "ruby"), ("composer.json", "php"), ("CMakeLists.txt", "cpp"),
    ("Makefile", "make"), ("docker-compose.yml", "docker"), ("flake.nix", "nix"),
]

CACHE_MARKERS = {
    ".cache", "__pycache__", "node_modules", ".venv", "venv", "site-packages",
    ".npm", ".cargo", ".rustup", ".mypy_cache", ".pytest_cache", ".tox",
    ".gradle", ".m2", ".next", ".turbo", ".parcel-cache", "vscode-server",
}
BACKUP_MARKERS = {"backup", "backups", "archive", "archives", "ajalugu", "snapshots", ".Trash-1000"}
SYSTEM_TOP = {"proc", "sys", "dev", "run", "usr", "etc", "bin", "sbin", "lib", "lib64", "boot", "var", "opt", "snap"}

GENERATED_HINTS = re.compile(
    r"(\.min\.(js|css)$|\.map$|\.pyc$|\.lock$|-lock\.json$|\.generated\.|_pb2\.py$|\.d\.ts$)"
)


def categorize(filename, extension=None):
    """Return (category, language) for a filename."""
    name = Path(filename).name
    if name in SPECIAL_NAMES:
        return SPECIAL_NAMES[name]
    ext = (extension if extension is not None else Path(name).suffix).lower()
    # Compound archive extensions: .tar.gz, .tar.zst ...
    if ext in (".gz", ".xz", ".bz2", ".zst", ".lz4") and ".tar." in name.lower():
        return "archive", None
    return CATEGORIES.get(ext, "unknown"), LANGUAGES.get(ext)


def stem(filename):
    """Basename without the extension, correct for dotfiles."""
    name = Path(filename).name
    if name.startswith(".") and name.count(".") == 1:
        return name  # .bashrc has no extension to strip
    return Path(name).stem


def is_generated(path_str):
    return 1 if GENERATED_HINTS.search(path_str) else 0


def system_scope(path_str):
    """Coarse ownership bucket: system | cache | backup | user."""
    parts = Path(path_str).parts
    if len(parts) > 1 and parts[1] in SYSTEM_TOP:
        # /var/backups and /var/log are still system-owned as far as cleanup goes
        if parts[1] == "var" and len(parts) > 2 and parts[2] in ("backups", "cache"):
            return "cache" if parts[2] == "cache" else "backup"
        return "system"
    lowered = {p.lower() for p in parts}
    if lowered & CACHE_MARKERS:
        return "cache"
    if lowered & BACKUP_MARKERS:
        return "backup"
    return "user"


@lru_cache(maxsize=100_000)
def detect_project(dir_path_str, max_depth=6):
    """Walk upward from a directory looking for a project marker.

    Memoised per *directory*, not per file. The original implementation ran up
    to twelve stat() calls for every single file; on 282k files that was ~3.4M
    syscalls spent rediscovering the same answer.
    """
    dir_path = Path(dir_path_str)
    for _ in range(max_depth):
        for marker, kind in PROJECT_MARKERS:
            if (dir_path / marker).exists():
                return kind, str(dir_path), dir_path.name
        if (dir_path / ".git").exists():
            return "git", str(dir_path), dir_path.name
        if dir_path.parent == dir_path:
            break
        dir_path = dir_path.parent
    return None, None, None


@lru_cache(maxsize=100_000)
def detect_git(dir_path_str, max_depth=6):
    """Return (is_repo, branch) for the enclosing git worktree, if any."""
    dir_path = Path(dir_path_str)
    for _ in range(max_depth):
        git = dir_path / ".git"
        if git.exists():
            head = git / "HEAD" if git.is_dir() else None
            branch = None
            try:
                if head and head.exists():
                    ref = head.read_text(errors="ignore").strip()
                    if ref.startswith("ref: refs/heads/"):
                        branch = ref.split("refs/heads/", 1)[1]
            except OSError:
                pass
            return 1, branch
        if dir_path.parent == dir_path:
            break
        dir_path = dir_path.parent
    return 0, None


# ---------------------------------------------------------------------------
# Secret detection (opt-in; costs a read of small text files)
# ---------------------------------------------------------------------------
SECRET_PATTERNS = [
    ("aws_key", re.compile(rb"\bAKIA[0-9A-Z]{16}\b")),
    ("openai_key", re.compile(rb"\bsk-[A-Za-z0-9]{20,}\b")),
    ("anthropic_key", re.compile(rb"\bsk-ant-[A-Za-z0-9_\-]{20,}\b")),
    ("github_token", re.compile(rb"\bgh[pousr]_[A-Za-z0-9]{30,}\b")),
    ("slack_token", re.compile(rb"\bxox[baprs]-[A-Za-z0-9\-]{10,}\b")),
    ("google_key", re.compile(rb"\bAIza[0-9A-Za-z_\-]{35}\b")),
    ("private_key", re.compile(rb"-----BEGIN (?:RSA |EC |OPENSSH |PGP )?PRIVATE KEY-----")),
    ("jwt", re.compile(rb"\beyJ[A-Za-z0-9_\-]{10,}\.eyJ[A-Za-z0-9_\-]{10,}\.")),
    ("generic_secret", re.compile(
        rb"(?i)\b(?:password|passwd|secret|api[_\-]?key|access[_\-]?token)\b\s*[:=]\s*"
        rb"['\"][^'\"\s]{8,}['\"]")),
    ("db_url", re.compile(rb"(?i)\b(?:postgres|postgresql|mysql|mongodb|redis)://[^\s:@/]+:[^\s@]+@")),
]

SECRET_SCAN_MAX_BYTES = 512 * 1024
SECRET_SCAN_CATEGORIES = {"code", "script", "document", "log", "key", "unknown"}


def scan_for_secrets(path, category, size):
    """Return a sorted list of secret-type names found, or []."""
    if size == 0 or size > SECRET_SCAN_MAX_BYTES:
        return []
    if category not in SECRET_SCAN_CATEGORIES:
        return []
    try:
        with open(path, "rb") as handle:
            blob = handle.read(SECRET_SCAN_MAX_BYTES)
    except OSError:
        return []
    if b"\x00" in blob[:8192]:
        return []  # binary; the patterns would be noise
    return sorted({name for name, pattern in SECRET_PATTERNS if pattern.search(blob)})
