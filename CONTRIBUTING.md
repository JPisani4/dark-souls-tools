# Contributing to Gold Phantom

Thank you for your interest in contributing!

## Workflow

1. Fork the repository
2. Create a feature branch
3. Use shared components and follow code style
4. Add tests if applicable
5. Run `npm run validate:tools`
6. Submit a pull request

## Code Style

- Components: PascalCase
- Composables: camelCase with `use` prefix
- Types: camelCase
- Use shared components (e.g. `NumberField`, `SummaryCard`)
- Prefer minimal, clear, and consistent code

## Import & Structure Standards

- Vue imports first
- Composables (alphabetical)
- Types (alphabetical)
- Shared components (alphabetical)
- Tool-specific components last
- Use relative paths for shared/tool components, `~/` for composables/types

## PR Process

- Keep PRs focused and minimal
- Reference issues if applicable
- Ensure all checks pass
- Be responsive to feedback

---

For general usage and tool creation, see the README.
