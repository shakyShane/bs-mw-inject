var url = require("url");

function less(src) {
    var f = require('fs').readFileSync('src/' + src).toString();
    return require('less').render(f);
}

module.exports = {
    files: ['src/*.less'],
    injectFileTypes: ["less"],
    server: 'src',
    middleware: function (req, res, next) {
        var parsed = require("url").parse(req.url);
        if (parsed.pathname.match(/\.less$/)) {
            less(parsed.pathname).then(function (o) {
                res.setHeader('Content-Type', 'text/css');
                res.end(o.css);
            });
        } else { next(); }
    }
};
