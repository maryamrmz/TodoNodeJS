var staticFilesHandler = require("./staticFilesHandler").staticFilesHandler;

module.exports.rootHandler = function(req, res) {
    req.url = "index.html";
    staticFilesHandler(req, res);
};
