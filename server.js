var http = require("http"),
    routeHandlers = require("./server/handlers").routeHandlers;

var server = http.createServer(routeHandlers);

var PORT = process.env.PORT || 8081;

server.listen(PORT, function() {
    console.log("Server running on port " + PORT);
});
