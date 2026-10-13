# Skills

Agent skills for design, design systems and shipping work you can trust. Written by
[Tony Gorb](https://github.com/tonygorb), a product designer, from the way he works with coding agents.

Each skill is a folder with a `SKILL.md`, in the open [Agent Skills](https://agentskills.io/specification)
format, so it works in Claude Code, the Claude app, Codex, Cursor, GitHub Copilot, Gemini CLI and
[other tools that read it](https://agentskills.io/clients).

## The skills

| Skill | What it does |
| --- | --- |
| [`concept-lab`](skills/concept-lab/SKILL.md) | Build 3-5 real concepts side by side and let the user pick one. |
| [`design-within-what-exists`](skills/design-within-what-exists/SKILL.md) | Change a screen with the patterns it already has, not new ones. |
| [`evolve`](skills/evolve/SKILL.md) | Audit one part of the code and rank what to improve. Changes nothing. |
| [`polish-design-system`](skills/polish-design-system/SKILL.md) | Find hard-coded colours, propose tokens, apply them once approved. |
| [`review-a-screen`](skills/review-a-screen/SKILL.md) | Check a screen in the browser at real sizes, like a designer would. |
| [`token-foundations`](skills/token-foundations/SKILL.md) | Build or audit semantic design tokens in OKLCH, light and dark. |
| [`tokens-to-figma`](skills/tokens-to-figma/SKILL.md) | Push a codebase's design tokens into Figma as variables and modes. |
| [`unugly`](skills/unugly/SKILL.md) | Find what makes AI-built UI look generic, fix it once approved. |
| [`verify-work`](skills/verify-work/SKILL.md) | Prove a change works with real checks before calling it done. |
| [`wrap-up`](skills/wrap-up/SKILL.md) | Close a task: list the changes, fix stale docs, run checks, draft the commit. |

## Install

All of them, into the agents you pick (uses the open-source [`skills`](https://github.com/vercel-labs/skills) CLI):

```sh
npx skills add tonygorb/skills
```

One of them:

```sh
npx skills add tonygorb/skills --skill verify-work
```

By hand: copy a skill's folder into `.claude/skills/` (Claude Code) or `.agents/skills/` (Codex,
Cursor, Copilot, Gemini CLI). In the Claude app, zip the folder and upload it under
Customize → Skills.

## Feedback

Found a problem or have an idea? [Open an issue](https://github.com/tonygorb/skills/issues).
This is a personal, curated set, so pull requests aren't accepted.

## Credits

`unugly` is adapted from [Impeccable](https://github.com/pbakaus/impeccable) by Paul Bakaus;
`verify-work` borrows a principle and a format from [superpowers](https://github.com/obra/superpowers)
by Jesse Vincent. Each skill names what it took.

## Licence

MIT, © 2026 Tony Gorb (see [`LICENSE`](LICENSE)), except `unugly`, which is Apache-2.0 because it is
adapted from Impeccable (see [`skills/unugly/LICENSE.txt`](skills/unugly/LICENSE.txt)).

## Maintaining

1. **One folder per skill:** `skills/<name>/SKILL.md`. The folder name is the skill's `name`.
2. **Only `skills/` is published.** Work in progress lives in `drafts/`, which stays out of git.
3. **`node scripts/validate.mjs` must pass** (CI runs it too). It checks the spec, the frontmatter
   below, and that no personal paths, emails or secret-looking strings slip in.

```yaml
---
name: verify-work            # lowercase, numbers, single hyphens; = folder name
description: What it does. Use when …   # up to 200 characters (the Claude app's limit)
license: MIT
metadata:
  author: Tony Gorb
  source: https://github.com/tonygorb/skills
  category: workflow          # one of: design, design-systems, figma, workflow, quality, writing
  cover: "3 tiers"            # optional: the big word on its cover on the website
---
```
