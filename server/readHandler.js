var fs = require("fs");

module.exports.readHandler = function(req, res) {
    fs.readFile("./todos.txt", function(err, data) {
        if (err) throw err;
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(data);
        res.end();
    });
};
