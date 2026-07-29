# Eesti

Monorepo. One repository, many independent projects — each in its own folder,
each self-contained.

## Projects

| Folder | What it is | Status |
|---|---|---|
| [`fint/`](fint/) | **File Intelligence** — filesystem inventory, change history, duplicate analysis and a query engine you compose yourself. Python + SQLite + a single-file dashboard. | Working, ~112 tests |

<!-- Add a row per project. Keep the table the first thing in this file: it is
     what GitHub shows on the repository's front page, so it is the index. -->

---

## How this is laid out

A GitHub repository is just a folder tree — subfolders need no configuration,
no registration, nothing. Adding a project means creating a folder and adding a
row above.

```
Eesti/
├── README.md          ← this index (shown on the repo front page)
├── .gitignore         ← applies repo-wide
└── fint/              ← one project, fully self-contained
    ├── CLAUDE.md      ← how an agent should work in *this* project
    ├── fint           ← its launcher
    ├── docs/
    ├── scripts/
    └── ...
```

**Each project owns everything it needs.** Its own docs, its own tests, its own
dependencies, its own `CLAUDE.md`. Nothing at the root belongs to a single
project, and no project reaches into another. That is what keeps a hundred
folders from turning into a hundred entanglements.

**`CLAUDE.md` lives per project, not at the root.** Claude Code reads the
`CLAUDE.md` files along the path to your working directory, so `cd fint/` picks
up `fint/CLAUDE.md` automatically and does not load instructions belonging to
unrelated projects.

## Working on one project

```bash
cd fint/
./fint doctor       # each project documents its own entry point
```

You do not need to clone anything separately, and the other folders cost you
nothing — git only checks out what is in the repository, and unrelated folders
are just files you are not looking at.
