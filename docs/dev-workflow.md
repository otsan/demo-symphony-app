# Development Workflow

## 1. Intake

- Issue must include `Goal`, `Acceptance Criteria`, and `Validation`.
- Missing fields: do not start implementation.

## 2. Start

- Move issue to `In Progress`.
- Create/update one workpad comment.
- Record baseline behavior before code changes.

## 3. Implement

- Keep scope tied to acceptance criteria.
- Update tests with code changes.
- Keep commits logical and reviewable.

## 4. Verify

Run all required checks:
- `make lint`
- `make test`
- `make typecheck`

If any command does not exist, replace with project equivalent and document it.

## 5. PR

- Open PR with summary + validation evidence.
- Link PR to issue.
- Address review feedback before merge.

## 6. Done

Issue can be `Done` only when:
- PR is merged (or explicitly accepted alternative)
- Required checks passed
- Acceptance criteria all checked off
