# Coding Standards

## Core Principles

- Prefer simple, explicit code over clever code.
- Keep functions small and single-purpose.
- Avoid hidden side effects.
- Write code that is easy to test.

## Required

- New behavior requires tests.
- Public interfaces require doc comments.
- Error handling must include actionable context.

## Banned Patterns

- Silent exception swallowing.
- Large unreviewable commits.
- Dead code and commented-out blocks.
- Hardcoded secrets or credentials.

## Review Checklist

- Is behavior clear?
- Are edge cases covered?
- Are tests meaningful (not only happy path)?
- Is rollback path obvious?
