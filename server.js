var http = require("http"),
    handler = require("./server/handler").handler;

var server = http.createServer(handler);

var PORT = process.env.PORT || 8000;

server.listen(PORT, () => console.log("Server running on port " + PORT));
