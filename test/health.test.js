const test = require('node:test');
const assert = require('node:assert/strict');

const { handleRequest } = require('../server');

function runRequest(method, url) {
  const req = { method, url };
  const res = {
    statusCode: 200,
    headers: {},
    body: '',
    setHeader(name, value) {
      this.headers[name.toLowerCase()] = value;
    },
    end(chunk = '') {
      this.body += chunk;
    },
  };

  handleRequest(req, res);
  return res;
}

test('GET /health returns 200 and exact JSON body', () => {
  const res = runRequest('GET', '/health');

  assert.equal(res.statusCode, 200);
  assert.equal(res.headers['content-type'], 'application/json');
  assert.equal(res.body, '{"ok": true}');
});
