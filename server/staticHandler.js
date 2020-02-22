var fs = require("fs");

module.exports.staticHandler = function(req, res) {
    fs.readFile("./client/" + req.url, function(err, content) {
        if (err) {
            res.writeHead(404, {
                "Content-Type": "text/html"
            });
            res.end("404 Not Found");
        }
        res.writeHead(200);
        res.end(content, "utf8");
    });
};
