var http = require("http"),
    path = require("path"),
    fs = require("fs");

var server = http.createServer((req, res) => {
    var filePath = path.join(
            __dirname,
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

    fs.readFile(filePath, (err, content) => {
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

    if (req.method == "POST") {
        var body = "";
        req.on("data", function(data) {
            body += data;
            fs.writeFile("./todoS.txt", data, err => {
                if (err) throw err;
            });
        });
        req.on("end", () => {
            console.log("Saved successfully!");
        });

        res.writeHead(200, { "Content-Type": "text/html" });
        res.end();
    }
});

var PORT = process.env.PORT || 8000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
