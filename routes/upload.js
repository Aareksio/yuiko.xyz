var express = require('express');
var multer = require('multer');
var mkdirp = require('mkdirp');
var cors = require('cors');
var rateLimit = require('express-rate-limit');
var config = require('../config/core');
var util = require('../util/core');

var db = util.getDatabase();
var router = express.Router();

mkdirp(config.UPLOAD_DIRECTORY);

db.run('CREATE TABLE IF NOT EXISTS files (id integer primary key, filename text unique, originalname text, size number, created datetime)');

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, config.UPLOAD_DIRECTORY);
    },
    filename: function(req, file, cb) {
        util.generate_name(file, db, function(name) {
            cb(null, name);
        });
    }
});

var upload = multer({storage: storage, limits: {fileSize: config.MAX_UPLOAD_SIZE}, fileFilter: util.fileFilter});

var limiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    delayAfter: 0,
    delayMs: 0,
    max: 100
});

/* Handle CORS pre-flight requests */
router.options('/', cors());

/* POST upload page. */
router.post('/', cors(), limiter, upload.array('files[]', config.MAX_UPLOAD_COUNT), function(req, res, next) {
    var files = [];
    req.files.forEach(function(file) {
        db.run('UPDATE files SET size = ? WHERE filename = ?', [file.size, file.filename]);
        files.push({'name': file.originalname, 'url': file.filename, 'fullurl': config.FILE_URL + '/' + file.filename, 'size': file.size});
    });
    
    if (req.query.output === 'gyazo') {
        res.status(200).send(files[0].fullurl);
    } else {
        res.status(200).json({'success': true, 'files': files});
    }
});

module.exports = router;
