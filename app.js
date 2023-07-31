const http = require("http");

//req - обект запроса, res- объект ответа
const server = http.createServer((req, res) => {
  res.writeHead(200, {
      'Content-Type': 'text/html; charset=utf8'
  });
  res.end('<h1>Привет, мир!</h1>', 'utf8');
});

server.listen(3000);
