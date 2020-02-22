var staticHandler = require("./staticHandler").staticHandler;

module.exports.rootHandler = function(req, res) {
    req.url = "index.html";
    staticHandler(req, res);
};
