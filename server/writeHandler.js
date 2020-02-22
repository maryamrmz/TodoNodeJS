module.exports.writeHandler = function(req, res) {
    req.on("data", function(data) {
        fs.writeFile("../todos.txt", data, function(err) {
            if (err) throw err;
        });
    });
    req.on("end", function() {
        console.log("Saved successfully!");
    });

    res.writeHead(200, { "Content-Type": "text/html" });
    res.end();
};
