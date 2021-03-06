var config = module.exports;
var secret = require('./secret');

// Directory to store uploaded files
config.UPLOAD_DIRECTORY = './files';

// Database filename
// Only SQLITE is supported right now
config.DB_FILENAME = './database.db';

// Maximum file size (in bytes)
// Default: 100MB (100000000)
config.MAX_UPLOAD_SIZE = 100000000;

config.SITE_NAME = 'Yuiko.xyz';
config.HELLO = 'Hurr Durr~!';
config.TAGLINE = 'Private-ish file hosting!';
config.DESCRIPTION = 'Upload whatever you want here, as long as it\'s under ' + Math.round(config.MAX_UPLOAD_SIZE / 1000000) + 'MB.<br>' +
    'Please read our <a href=\'/faq\'>FAQ</a>, as we may remove files under specific circumstances. <br>';

// Main URL (User-facing)
// config.URL = 'http://my.domain.is.moe/';
config.URL = 'http://yuiko.xyz';

// URL to access uploaded files
// config.FILE_URL = 'http://a.my.domain.is.moe/';
config.FILE_URL = 'http://yuiko.xyz/f';

// DO NOT TOUCH UNLESS YOU KNOW HOW TO PROPERLY CONFIGURE CORS (qq)
// Changes the file upload form to POST to this URL instead of the one it's loaded from.
config.UPLOAD_URL = config.URL;

// config.IFACES = '0.0.0.0';
config.IFACES = 'localhost';

// Run on 3333 and then proxy with nginx to 80, or just directly open to 80 (not recommended)
// config.PORT = '80';
config.PORT = '3333';

config.CONTACTS = [
    '<b>Arkadiusz \'Mole\' Sygulski</b><br>' +
    '<a href=\'mailto:arkadiusz@sygulski.pl\'>arkadiusz@sygulski.pl</a><br>'
];

// Put your grills in public/images/grills and then link them here for them to randomly appear on rendered pages.
config.GRILLS = [
    '/images/grills/rory_mercury.png',
    '/images/grills/enju.png',
    '/images/grills/grill.png',
    '/images/grills/akemi_homura.png',
    '/images/grills/himawari_x_sakurako.png',
    '/images/grills/krul_tepes.png',
    '/images/grills/nazuna.png',
    '/images/grills/nori.png',
    '/images/grills/shoukaku_x_zuikaku.png'
];

// Maximum number of files to upload at once
// Default: 10
config.MAX_UPLOAD_COUNT = 10;

// Filename key length
// Default: 6 (gives 36^6 = 2176782336 possibilities)
config.KEY_LENGTH = 6;

// Extensions that should be automatically rejected.
// config.BANNED_EXTS = [];
config.BANNED_EXTS = [];

config.COMPLEX_EXTS = [];

// Github client id and secret keys, for Kanri authentication
config.GITHUB_CLIENT_ID = secret.auth.clientID;
config.GITHUB_CLIENT_SECRET = secret.auth.clientSecret;

// Session options for Kanri. (Kanri is a clever word for admin, right? I like it!)
config.SESSION_OPTIONS = {
    name: 'kanri.session',
    keys: secret.keys,
    maxAge: (86400 * 1000),
    secureProxy: true,
    domain: 'yuiko.xyz'
};

// Rate limiter options
config.RATE_LIMITER = {
    window: 60 * 60 * 60,
    max: 100
};

for (var attr in process.env) {
    if (attr && attr.startsWith('y_')) {
        eattr = attr.replace('y_', '');
        config[eattr] = process.env[attr];
    }
}
