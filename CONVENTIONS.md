# Keycode Project Conventions

This is the single source of truth for code conventions and rules in this project.
All AI assistant config files (.windsurfrules, .cursorrules, CLAUDE.md, GEMINI.md) reference this file.

## Project Overview

Keycode is a terminal-based presentation tool for macOS Terminal.app. It renders `.sld` slide files in the terminal using React/Ink. The shell entry point (`keycode`) resolves deck directories and delegates to a TypeScript CLI (`src/cli.tsx`).

## Tech Stack

- **Runtime**: Node.js >= 22, ES modules (`"type": "module"`)
- **Language**: TypeScript (strict mode) targeting ES2022, module system NodeNext
- **UI framework**: React 18 + Ink 5 (terminal UI)
- **Build**: `tsc` (no bundler)
- **Tests**: Node.js built-in test runner (`node --test`) with `tsx` loader
- **Shell**: Bash (the `keycode` entry-point script)

## Directory Structure

```
keycode              # Bash entry-point script
src/                 # TypeScript source
  cli.tsx            # CLI entry, file watcher, render root
  PresentationApp.tsx # Main presentation component
  parser.ts          # Slide parsing pipeline
  types.ts           # Shared type definitions
  *Tag.ts            # Tag extraction modules (one per slide tag)
  layout.ts          # Terminal layout engine
  renderSlide.ts     # Slide text rendering
  file.ts            # File I/O utilities
test/                # Test files (*.<name>.test.ts)
decks/               # Deck directories (each contains .sld files + optional .index + images/)
macos/               # macOS-specific native code (Swift)
REFERENCE.md         # Complete slide format documentation
```

## TypeScript Conventions

- **Strict mode** is on — never use `any`, always provide explicit types for function parameters and return types.
- Use `type` imports for type-only imports: `import type {Slide} from './types.js'`.
- Use `.js` extensions in all import paths (NodeNext module resolution).
- Prefer `interface` for object shapes, `type` for unions and aliases.
- Use `const` by default; use `let` only when reassignment is needed; never use `var`.
- Arrow functions for callbacks and inline functions; named `function` declarations for top-level exported functions.
- Use template literals for string interpolation, not concatenation.
- Prefer early returns to reduce nesting.
- No default exports — always use named exports.
- No classes — the codebase is purely functional with React function components.
- No enums — use union types (e.g., `type SlideSize = 'normal' | 'large' | 'xlarge'`).

## Code Style

- **Indentation**: 2 spaces.
- **Quotes**: Single quotes for strings.
- **Semicolons**: Always.
- **Trailing commas**: None in the last position.
- **Blank lines**: One blank line between top-level declarations; no multiple consecutive blank lines.
- **Line length**: Keep lines reasonable (~100 chars); no hard rule but avoid very long lines.
- Keep files focused — one tag extractor per file, one concern per module.

## Naming

- **Files**: camelCase for TypeScript (`renderSlide.ts`, `colorText.ts`), PascalCase for React components (`PresentationApp.tsx`).
- **Variables/functions**: camelCase.
- **Types/interfaces**: PascalCase.
- **Constants**: UPPER_SNAKE_CASE for true constants (regex patterns, tokens), camelCase for derived values.
- **Test files**: `<module>.test.ts` in the `test/` directory.

## Tag Extractor Pattern

Each slide tag has a dedicated `*Tag.ts` module that exports an `extract*` function:
- Takes a `body: string` parameter (the remaining slide body).
- Returns an object with `body` (the body with the tag stripped) plus extracted data fields.
- The parser chains extractors sequentially — each receives the body from the previous step.
- Use regex for tag matching; keep patterns as module-level constants.

## Testing

- Use Node.js built-in test runner: `import test from 'node:test'` and `import assert from 'node:assert/strict'`.
- Test functions are top-level `test('description', () => { ... })` calls.
- Test descriptions should clearly state what is being tested.
- Run tests: `npm test`.
- No external test frameworks (no Jest, Mocha, etc.).

## Shell Script Conventions (keycode)

- Use `set -euo pipefail` at the top.
- Use `$SCRIPT_DIR` for paths relative to the script location.
- Environment variables from `.env` are loaded via `source` with `set -a` / `set +a`.
- `DECK_SOURCE_PATH` (from `.env`) overrides the default deck directory; falls back to `$SCRIPT_DIR/decks`.

## Environment

- `.env` is gitignored; `.env.example` documents required variables.
- `DECK_SOURCE_PATH` — path to the directory containing deck folders.

## Documentation

- `REFERENCE.md` is the complete slide format reference. Update it when adding or changing slide tags.
- `README.md` covers installation, usage, and development.
- Do not add inline comments unless they explain non-obvious logic. The code should be self-documenting.

## Deck Slide Ordering (.index)

Each deck directory may contain an `.index` file to control the order of `.sld` files:
- If `.index` exists, its lines define the slide order. Each line is a filename **without** the `.sld` extension. Blank lines and leading/trailing whitespace are ignored.
- If `.index` does not exist, `.sld` files are loaded in alphabetical order.
- The `.index` file is watched for changes and triggers a live reload.

## General Rules

- Never add dependencies without discussion.
- Keep the bundle size minimal — prefer Node.js built-in modules over npm packages.
- No auto-formatting tools are configured; follow the style of surrounding code.
- Prefer pure functions; isolate side effects at the edges (CLI entry, file I/O).
- When adding a new slide tag: create a `*Tag.ts` extractor, wire it into `parser.ts`, add tests in `test/`, and update `REFERENCE.md`.
- Update documentation in `README.md` when adding new features or changes to existing features. 
- Update tests in `test/` when adding new features or changes to existing features. 
