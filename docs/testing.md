# Testing Policy

## Test Layers

- Unit: fast, deterministic, required for new logic.
- Integration: required when crossing module or IO boundaries.
- End-to-end: required for critical user flows.

## Minimum Validation for Any Change

- Lint/type checks pass.
- Relevant unit/integration tests pass.
- One proof command that demonstrates changed behavior.

## Evidence Format (for PR)

- Command
- Exit code
- Short output summary

Example:

- `make test`
- exit code: `0`
- summary: `120 passed, 0 failed`

## Flaky Test Rule

- One retry allowed.
- If still flaky, mark as flaky with tracking issue and owner.
