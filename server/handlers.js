var rootHandler = require("./rootHandler").rootHandler,
    writeHandler = require("./writeHandler").writeHandler,
    staticHandler = require("./staticHandler").staticHandler;

module.exports.routeHandlers = function(req, res) {
    var routes = {
        GET: {
            "/": rootHandler
        },
        POST: {
            "/write": writeHandler
        }
    }[req.method][req.url];

    if (!routes) {
        routes = staticHandler;
    }

    routes(req, res);
};
