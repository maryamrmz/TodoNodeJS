var rootHandler = require("./rootHandler").rootHandler,
    writeHandler = require("./writeHandler").writeHandler,
    readHandler = require("./readHandler").readHandler,
    staticFilesHandler = require("./staticFilesHandler").staticFilesHandler;

module.exports.routeHandlers = function(req, res) {
    var routes;

    if (req.method === "GET" && req.url === "/") {
        routes = rootHandler;
    } else if (req.method === "GET" && req.url === "/read") {
        routes = readHandler;
    } else if (req.method === "POST" && req.url === "/write") {
        routes = writeHandler;
    } else {
        routes = staticFilesHandler;
    }

    routes(req, res);
};
