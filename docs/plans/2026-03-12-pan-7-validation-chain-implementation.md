# PAN-7 Validation Chain Implementation Plan

> **For Kimi:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add v1 PR validation gates (test/syntax/smoke), document merge gate policy, and enforce branch protection requirements for `main`.

**Architecture:** Add one GitHub Actions PR workflow with three explicit jobs (`test`, `syntax`, `smoke`). Keep smoke deterministic by starting the Node server on a random local port and asserting exact `GET /health` contract. Update docs (`docs/dev-workflow.md`, `README.md`, `AGENTS.md`) so completion policy references these required checks.

**Tech Stack:** Node.js built-in test runner, GitHub Actions, GitHub REST API via `gh` CLI.

---

### Task 1: Branch + baseline verification

**Files:**
- Modify: Linear workpad comment only (tracking evidence)

**Step 1: Confirm baseline before implementation**

Run: `node --test && node --check server.js && node --check test/health.test.js`
Expected: pass on `main`.

**Step 2: Create feature branch**

Run: `git checkout -b caanjoeng/pan-7-build-v1-validation-chain-tests-ci-merge-quality-gates`
Expected: branch created from latest `origin/main`.

### Task 2: Add failing smoke runtime contract test first

**Files:**
- Create: `test/health.smoke.test.js`
- Modify: `server.js` (only if test requires export/behavior adjustment)

**Step 1: Write failing test**

Implement a smoke test that starts a real HTTP server with `handleRequest`, fetches `/health`, and asserts:
- status `200`
- `content-type` exactly `application/json`
- body exactly `{"ok": true}`

**Step 2: Verify RED**

Run: `node --test test/health.smoke.test.js`
Expected: fail initially (if runtime contract tooling is missing).

**Step 3: Minimal implementation**

Add only the code required so smoke test passes deterministically.

**Step 4: Verify GREEN**

Run: `node --test test/health.smoke.test.js`
Expected: pass.

### Task 3: Add CI workflow with required checks

**Files:**
- Create: `.github/workflows/pr-validation.yml`

**Step 1: Add workflow jobs**

Jobs:
- `test`: `node --test`
- `syntax`: `node --check server.js` and `node --check test/health.test.js`
- `smoke`: `node --test test/health.smoke.test.js`

**Step 2: Verify workflow syntax**

Run: `gh workflow view pr-validation.yml --repo otsan/demo-symphony-app` (after push)
Expected: workflow recognized by GitHub.

### Task 4: Update policy docs and AGENTS guardrail

**Files:**
- Modify: `README.md`
- Modify: `docs/dev-workflow.md`
- Modify: `AGENTS.md`

**Step 1: Document required checks + merge gate policy**

Add explicit list of required checks and statement that merge to `main` requires PR + green checks.

**Step 2: Add AGENTS completion gate statement**

Add mandatory CI gate bullet before task completion claims.

### Task 5: Validate locally and push

**Files:**
- N/A

**Step 1: Run full validation commands**

Run:
- `node --test`
- `node --check server.js`
- `node --check test/health.test.js`
- `node --test test/health.smoke.test.js`

Expected: all pass.

**Step 2: Commit and push**

Run:
- `git add .`
- `git commit -m "feat: add PR validation chain and merge gate policy"`
- `git push -u origin caanjoeng/pan-7-build-v1-validation-chain-tests-ci-merge-quality-gates`

### Task 6: PR + branch protection + negative gate proof

**Files:**
- N/A (GitHub config)

**Step 1: Open PR and apply label**

Run:
- `gh pr create ...`
- `gh pr edit --add-label symphony`

**Step 2: Configure branch protection for `main`**

Target rules:
- require pull request before merge
- require all CI checks (`test`, `syntax`, `smoke`)
- block direct pushes to `main`

**Step 3: Positive gate proof**

Confirm PR with passing checks is merge-eligible.

**Step 4: Negative gate proof**

Create intentional break commit/PR to prove failing health contract blocks merge.

**Step 5: Restore clean state**

Close negative PR and return branch to passing state.
