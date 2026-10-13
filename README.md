# Skills

Agent skills for design, design systems and shipping work you can trust. Written by
[Tony Gorb](https://github.com/tonygorb), a product designer, from the way he works with coding agents.

Each skill is a folder with a `SKILL.md`, in the open [Agent Skills](https://agentskills.io/specification)
format, so it works in Claude Code, the Claude app, Codex, Cursor, GitHub Copilot, Gemini CLI and
[other tools that read it](https://agentskills.io/clients).

## The skills

| Skill | What it does | Claude app |
| --- | --- | --- |
| [`concept-lab`](skills/concept-lab/SKILL.md) | Build 3-5 real concepts side by side and let the user pick one. | [ZIP](https://github.com/tonygorb/skills/releases/latest/download/concept-lab.zip) |
| [`design-within-what-exists`](skills/design-within-what-exists/SKILL.md) | Change a screen with the patterns it already has, not new ones. | [ZIP](https://github.com/tonygorb/skills/releases/latest/download/design-within-what-exists.zip) |
| [`evolve`](skills/evolve/SKILL.md) | Audit one part of the code and rank what to improve. Changes nothing. | [ZIP](https://github.com/tonygorb/skills/releases/latest/download/evolve.zip) |
| [`polish-design-system`](skills/polish-design-system/SKILL.md) | Find hard-coded colours, propose tokens, apply them once approved. | [ZIP](https://github.com/tonygorb/skills/releases/latest/download/polish-design-system.zip) |
| [`review-a-screen`](skills/review-a-screen/SKILL.md) | Check a screen in the browser at real sizes, like a designer would. | [ZIP](https://github.com/tonygorb/skills/releases/latest/download/review-a-screen.zip) |
| [`token-foundations`](skills/token-foundations/SKILL.md) | Build or audit semantic design tokens in OKLCH, light and dark. | [ZIP](https://github.com/tonygorb/skills/releases/latest/download/token-foundations.zip) |
| [`tokens-to-figma`](skills/tokens-to-figma/SKILL.md) | Push a codebase's design tokens into Figma as variables and modes. | [ZIP](https://github.com/tonygorb/skills/releases/latest/download/tokens-to-figma.zip) |
| [`unugly`](skills/unugly/SKILL.md) | Find what makes AI-built UI look generic, fix it once approved. | [ZIP](https://github.com/tonygorb/skills/releases/latest/download/unugly.zip) |
| [`verify-work`](skills/verify-work/SKILL.md) | Prove a change works with real checks before calling it done. | [ZIP](https://github.com/tonygorb/skills/releases/latest/download/verify-work.zip) |
| [`wrap-up`](skills/wrap-up/SKILL.md) | Close a task: list the changes, fix stale docs, run checks, draft the commit. | [ZIP](https://github.com/tonygorb/skills/releases/latest/download/wrap-up.zip) |

`tokens-to-figma` needs the [Figma MCP server](https://help.figma.com/hc/en-us/articles/32132100833559) with
write access. The skills that look at screens (`review-a-screen`, `concept-lab`, `verify-work`,
`unugly`) expect an agent that can open a browser and take screenshots, for example through the
Playwright or Chrome DevTools MCP server.

## Install

**Claude Code**, as a plugin:

```text
/plugin marketplace add tonygorb/skills
/plugin install tonygorb-skills@tonygorb
```

**Any agent** (Claude Code, Codex, Cursor, Copilot, Gemini CLI and more), with the open-source
[`skills`](https://github.com/vercel-labs/skills) CLI. It asks which skills and which agents:

```sh
npx skills add tonygorb/skills
```

**The Claude app** (claude.ai and desktop): download a skill's ZIP from the table above, then
upload it under Customize → Skills.

**By hand:** copy a skill's folder into `.claude/skills/` (Claude Code) or `.agents/skills/`
(most other agents).

## Use

Skills load by themselves when a request matches. Ask the way you normally would:

- "Show me three options for the pricing section." → `concept-lab`
- "Set up design tokens for this app, brand colour #3b5bdb." → `token-foundations`
- "Sync our tokens to this Figma file: <link>." → `tokens-to-figma`
- "This looks AI-generated. Make it less generic." → `unugly`
- "Wrap up." → `wrap-up`

Or name one directly: "Use verify-work before you tell me it's done."

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
2. **Only `skills/` is published.** Work in progress lives in a local `drafts/` folder, which git ignores.
   A new skill also goes in `.claude-plugin/marketplace.json` (the validator checks both lists match).
3. **`node scripts/validate.mjs` must pass** (CI runs it on every push). It checks the spec, the frontmatter
   below, and that no personal paths, emails or secret-looking strings slip in.

Releases: `git tag v1.1.0 && git push origin v1.1.0` publishes a GitHub release with one ZIP per
skill (`.github/workflows/release.yml`).

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
