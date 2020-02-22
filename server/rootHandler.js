var path = require("path"),
    fs = require("fs");

module.exports.rootHandler = function(req, res) {
    var filePath = path.join(
            "client",
            req.url === "/" ? "index.html" : req.url
        ),
        extname = path.extname(filePath),
        contentType = "text/html";

    switch (extname) {
        case ".js":
            contentType = "text/javascript";
            break;
        case ".css":
            contentType = "text/css";
            break;
    }

    fs.readFile(filePath, function(err, content) {
        if (err) {
            res.writeHead(404, {
                "Content-Type": "text/html"
            });
            res.end("404 Not Found");
        }
        res.writeHead(200, {
            "Content-Type": contentType
        });
        res.end(content, "utf8");
    });
};
