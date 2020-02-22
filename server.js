var http = require("http"),
    routeHandlers = require("./handlers").routeHandlers;

var server = http.createServer(routeHandlers);

var PORT = process.env.PORT || 8000;

server.listen(PORT, () => console.log("Server running on port " + PORT));
