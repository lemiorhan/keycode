# Contributing to Keycode

Thank you for your interest in contributing to Keycode! This document provides guidelines and information for contributors.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/<your-username>/keycode.git`
3. Install dependencies: `npm install`
4. Create a branch: `git checkout -b my-feature`

## Development

Run in dev mode (no build step needed):

```bash
npx tsx src/cli.tsx decks/sample-deck
```

Build:

```bash
npm run build
```

Run tests:

```bash
npm test
```

## Project Structure

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
test/                # Test files (*.test.ts)
decks/               # Deck directories (.sld files + optional .index + images/)
macos/               # macOS native Swift overlays
REFERENCE.md         # Complete slide format documentation
CONVENTIONS.md       # Code conventions and standards
```

## Code Conventions

Please read [CONVENTIONS.md](CONVENTIONS.md) before writing code. Key points:

- **TypeScript strict mode** -- no `any`, explicit types for function parameters and return types
- **ES modules** -- use `.js` extensions in imports
- **No default exports** -- always use named exports
- **No classes** -- purely functional code with React function components
- **Style** -- 2-space indentation, single quotes, semicolons, no trailing commas
- **Tests** -- Node.js built-in test runner (`node:test` and `node:assert/strict`)

## Adding a New Slide Tag

1. Create `src/<name>Tag.ts` with an `extract<Name>` function
2. Wire it into the parser chain in `src/parser.ts`
3. Add tests in `test/<name>Tag.test.ts`
4. Document the tag in `REFERENCE.md`
5. Update `CHANGELOG.md`

## Submitting Changes

1. Make sure all tests pass: `npm test`
2. Make sure TypeScript compiles: `npm run build`
3. Write clear commit messages that explain **why**, not just what
4. Open a pull request against `master`
5. Fill out the pull request template

## Reporting Bugs

Open an issue using the **Bug Report** template. Include:

- Steps to reproduce
- Expected vs actual behavior
- Terminal output or screenshots
- Your environment (OS, Node.js version, terminal app)

## Suggesting Features

Open an issue using the **Feature Request** template. If proposing a new slide tag, include an example of the `.sld` syntax you'd like to use.

## License

By contributing, you agree that your contributions will be licensed under the [MIT License](LICENSE).
