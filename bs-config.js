/*global module, require*/

function less(src) {
    var f = require('fs').readFileSync('src/' + src).toString();
    return require('less').render(f);
}

module.exports = {
    files: ['src/*.less'],
    server: {
        baseDir: 'src',
        middleware: function (req, res, next) {
            if (req.url.match(/\.less$/)) {
                less(req.url).then(function (o) {
                    res.setHeader('Content-Type', 'text/css');
                    res.end(o.css);
                });
            } else { next(); }
        }
    }
};
