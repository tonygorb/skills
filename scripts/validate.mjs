#!/usr/bin/env node
/*
 * Checks every skills/<name>/SKILL.md before it can reach the website:
 *   - the Agent Skills spec (https://agentskills.io/specification): name and description rules,
 *     name = folder name, compatibility length
 *   - this repo's rules: license set, metadata.category from the list below
 *   - privacy: no personal paths, no secret-looking strings, anywhere in the folder
 * No dependencies. Exit 1 on any failure.
 *
 *   node scripts/validate.mjs
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

export const CATEGORIES = ["design", "design-systems", "figma", "workflow", "quality", "writing"];
const ROOT = new URL("..", import.meta.url).pathname;
const DIR = join(ROOT, "skills");
const NAME_RE = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const PRIVATE = [
  [/\/Users\/[A-Za-z]/, "a personal path (/Users/…)"],
  [/~\/(Desktop|Projects|Documents)\//, "a personal path (~/…)"],
  [/\b(password|passwd|secret|api[_-]?key|token)\s*[:=]\s*\S{6,}/i, "something that looks like a secret"],
  [/\b(sk-[A-Za-z0-9]{20,}|ghp_[A-Za-z0-9]{20,}|AKIA[0-9A-Z]{16})\b/, "a key"],
  [/[\w.+-]+@(gmail|googlemail|yahoo|hotmail|outlook|icloud|proton(mail)?)\.(com|me)\b/i, "a personal email address"],
];

/** The frontmatter this repo uses: `key: value` lines and one nested map (metadata). */
export function frontmatter(text) {
  const m = /^---\n([\s\S]*?)\n---\n?/.exec(text);
  if (!m) return null;
  const data = {};
  let map = null;
  for (const line of m[1].split("\n")) {
    if (!line.trim() || line.trim().startsWith("#")) continue;
    const nested = /^\s+([\w-]+):\s*(.*)$/.exec(line);
    const top = /^([\w-]+):\s*(.*)$/.exec(line);
    const clean = (v) => v.replace(/\s+#.*$/, "").trim().replace(/^(["'])(.*)\1$/, "$2");
    if (nested && map) map[nested[1]] = clean(nested[2]);
    else if (top) {
      const v = clean(top[2]);
      if (v === "") data[top[1]] = map = {};
      else {
        data[top[1]] = v;
        map = null;
      }
    }
  }
  return { data, body: text.slice(m[0].length) };
}

const files = (d) =>
  readdirSync(d).flatMap((f) => (statSync(join(d, f)).isDirectory() ? files(join(d, f)) : [join(d, f)]));

export function check(folder) {
  const errors = [];
  const name = folder.split("/").pop();
  let text;
  try {
    text = readFileSync(join(folder, "SKILL.md"), "utf8");
  } catch {
    return [`${name}: no SKILL.md`];
  }
  const fm = frontmatter(text);
  if (!fm) return [`${name}: SKILL.md has no frontmatter`];
  const d = fm.data;
  if (!d.name) errors.push("name is missing");
  else {
    if (d.name.length > 64) errors.push("name is longer than 64 characters");
    if (!NAME_RE.test(d.name)) errors.push("name: lowercase letters, numbers and single hyphens only");
    if (d.name !== name) errors.push(`name "${d.name}" must match its folder "${name}"`);
  }
  if (!d.description) errors.push("description is missing");
  else if (d.description.length > 1024) errors.push("description is longer than 1024 characters");
  // The Claude app (claude.ai) refuses descriptions over 200 characters, and that's where most
  // people add skills: support.claude.com/en/articles/12512198-how-to-create-custom-skills
  else if (d.description.length > 200)
    errors.push(`description is ${d.description.length} characters; the Claude app allows 200`);
  if (d.compatibility && d.compatibility.length > 500)
    errors.push("compatibility is longer than 500 characters");
  if (!d.license) errors.push("license is missing (this repo uses MIT)");
  // Credit travels with the file: every skill names its author and where it comes from.
  if (d.metadata?.author !== "Tony Gorb") errors.push('metadata.author must be "Tony Gorb"');
  if (d.metadata?.source !== "https://github.com/tonygorb/skills")
    errors.push("metadata.source must be https://github.com/tonygorb/skills");
  const cat = d.metadata?.category;
  if (!cat) errors.push("metadata.category is missing");
  else if (!CATEGORIES.includes(cat))
    errors.push(`metadata.category "${cat}" is not one of: ${CATEGORIES.join(", ")}`);
  if (fm.body.split("\n").length > 500) errors.push("SKILL.md body is over 500 lines (spec advice)");
  for (const f of files(folder)) {
    const t = readFileSync(f, "utf8");
    for (const [re, what] of PRIVATE)
      if (re.test(t)) errors.push(`${relative(folder, f)} contains ${what}`);
  }
  return errors.map((e) => `${name}: ${e}`);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const folders = readdirSync(DIR)
    .map((f) => join(DIR, f))
    .filter((f) => statSync(f).isDirectory());
  const errors = folders.flatMap(check);
  for (const e of errors) console.error(`✗ ${e}`);
  console.log(
    errors.length
      ? `${errors.length} problem(s) in ${folders.length} skills`
      : `✓ ${folders.length} skills valid`,
  );
  process.exit(errors.length ? 1 : 0);
}
