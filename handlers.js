var server = require("./server");

module.exports.routeHandlers = function(req, res) {
    var routes = {
        GET: {
            "/": server.rootHandler
        },
        POST: {
            "/write": server.writeHandler
        }
    }[req.method][req.url];

    routes(req, res);
};
