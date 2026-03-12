const test = require('node:test');
const assert = require('node:assert/strict');
const http = require('node:http');

const { handleRequest } = require('../server');

function requestHealth(port) {
  return new Promise((resolve, reject) => {
    const req = http.request(
      {
        hostname: '127.0.0.1',
        port,
        method: 'GET',
        path: '/health',
      },
      (res) => {
        let body = '';

        res.setEncoding('utf8');
        res.on('data', (chunk) => {
          body += chunk;
        });
        res.on('end', () => {
          resolve({
            body,
            headers: res.headers,
            statusCode: res.statusCode,
          });
        });
      }
    );

    req.on('error', reject);
    req.end();
  });
}

test('smoke: GET /health returns deterministic response contract', async () => {
  const server = http.createServer(handleRequest);

  await new Promise((resolve) => {
    server.listen(0, '127.0.0.1', resolve);
  });

  const address = server.address();
  assert.ok(address && typeof address === 'object' && address.port > 0);

  try {
    const res = await requestHealth(address.port);

    assert.equal(res.statusCode, 200);
    assert.equal(res.headers['content-type'], 'application/json');
    assert.equal(res.body, '{"ok": true}');
  } finally {
    await new Promise((resolve) => {
      server.close(resolve);
    });
  }
});
