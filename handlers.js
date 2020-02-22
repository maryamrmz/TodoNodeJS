var rootHandler = require("./server/rootHandler").rootHandler,
    writeHandler = require("./server/writeHandler").writeHandler;

module.exports.routeHandlers = function(req, res) {
    var routes = {
        GET: {
            "/": rootHandler
        },
        POST: {
            "/write": writeHandler
        }
    }[req.method][req.url];

    routes(req, res);
};
