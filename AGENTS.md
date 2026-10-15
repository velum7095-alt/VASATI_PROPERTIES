# Project Guidelines & gstack Configuration

## gstack Skills

This project uses **gstack** by Garry Tan (https://github.com/garrytan/gstack) for product planning, architecture reviews, QA testing, code reviews, and release engineering.

### Web Browsing & Automation
- Use the `/browse` skill from gstack for all web browsing and browser testing.
- Never use `mcp__claude-in-chrome__*` tools.

### Available gstack Skills

#### Plan-Mode Reviews
- `/office-hours` — Start here. 6 forcing questions to reframe product ideas before writing code.
- `/plan-ceo-review` — CEO-level review: find the 10-star product in the request.
- `/plan-eng-review` — Lock architecture, data flow, edge cases, and test strategy.
- `/plan-design-review` — Rate each design dimension 0-10, explain what a 10 looks like.
- `/plan-devex-review` — Developer experience review: TTHW, friction points, persona traces.
- `/plan-tune` — Self-tune question sensitivity.
- `/autoplan` — Runs CEO → design → eng → DX review sequentially in one command.
- `/design-consultation` — Build a complete design system from scratch.
- `/spec` — Turn vague intent into a precise, executable 5-phase specification.

#### Implementation & Review
- `/review` — Pre-landing PR review. Finds bugs that pass CI but break in production.
- `/codex` — Second opinion via OpenAI Codex (review, challenge, consult modes).
- `/investigate` — Systematic root-cause debugging. No fixes without investigation.
- `/design-review` — Live-site visual audit + fix loop with atomic commits.
- `/design-shotgun` — Generate multiple AI design variants and comparison boards.
- `/design-html` — Generate production-quality HTML/CSS.
- `/devex-review` — Live developer experience audit against real workflows.
- `/qa` — Open a real browser, find bugs, fix them, and re-verify.
- `/qa-only` — Run QA checks and generate reports without modifying code.
- `/scrape` — Extract structured web data.
- `/skillify` — Codify successful browsing flows into permanent skills.
- `/deslop-shared-libs` — Clean and deduplicate shared libraries.
- `/test-audit` — Audit test coverage, flaky tests, and test quality.
- `/cso` — Chief Security Officer OWASP Top 10 + STRIDE threat modeling audit.

#### Release & Deployment
- `/ship` — Run tests, review, push, open PR with workspace-aware queue.
- `/land-and-deploy` — Merge PR, monitor CI/deploy, verify production health.
- `/canary` — Post-deploy monitoring loop using the browse daemon.
- `/landing-report` — Dashboard for workspace-aware ship queue.
- `/document-release` — Update all documentation to match shipped code.
- `/document-generate` — Generate Diataxis docs (tutorials/guides/reference) from code.
- `/setup-deploy` — One-time deploy config detection (Vercel, Render, Fly.io, etc.).
- `/gstack-upgrade` — Update gstack to the latest upstream release.

#### Operational & Memory
- `/context-save` — Save working context (git state, decisions, remaining work).
- `/context-restore` — Resume from a saved context.
- `/learn` — Manage learnings across sessions.
- `/retro` — Weekly retro with shipping streaks.
- `/health` — Code quality dashboard (linter, types, tests, dead code).
- `/careful` — Guardrail commands against accidental file modifications.
- `/guard` — Pre-commit safety checks.
- `/freeze` / `/unfreeze` — Lock and unlock dependencies.

### Boil the Ocean Principle
- **Completeness is default:** Don't do partial reviews or write partial tests. Test edge cases, review entire flows, and document thoroughly.
