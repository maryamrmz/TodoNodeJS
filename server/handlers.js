var rootHandler = require("./rootHandler").rootHandler,
    writeHandler = require("./writeHandler").writeHandler,
    staticHandler = require("./staticHandler").staticHandler;

module.exports.routeHandlers = function(req, res) {
    var routes;

    if (req.method === "GET" && req.url === "/") {
        routes = rootHandler;
    } else if (req.method === "POST" && req.url === "/write") {
        routes = writeHandler;
    }

    if (!routes) {
        routes = staticHandler;
    }

    routes(req, res);
};
