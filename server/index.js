const http = require("http");
var os = require('os') 

const port = 3002;
const server = http.createServer((req, res) => {
});

server.listen(port, () => {
  console.log("Server running at http://127.0.0.1:3002/");
});
