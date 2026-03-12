const http = require('node:http');

function handleRequest(req, res) {
  if (req.method === 'GET' && req.url === '/health') {
    res.statusCode = 200;
    res.setHeader('content-type', 'application/json');
    res.end('{"ok": false}');
    return;
  }

  res.statusCode = 404;
  res.setHeader('content-type', 'text/plain; charset=utf-8');
  res.end('Not Found');
}

if (require.main === module) {
  const port = Number(process.env.PORT || 3000);
  const server = http.createServer(handleRequest);

  server.listen(port, () => {
    process.stdout.write(`Server listening on http://127.0.0.1:${port}\n`);
  });
}

module.exports = {
  handleRequest,
};
