# demo-symphony-app

## Health endpoint

Call the health check endpoint with:

```bash
curl -i http://127.0.0.1:3000/health
```

Expected response body:

```json
{"ok": true}
```

## PR Validation Chain

Every pull request to `main` must pass all required checks:

- `test`: `node --test`
- `syntax`: `node --check server.js` and `node --check test/health.test.js`
- `smoke`: `node --test test/health.smoke.test.js`

Merge gate policy:

- Pull request is required to merge to `main`.
- All required CI checks must be green.
- Direct pushes to `main` are blocked by branch protection.
