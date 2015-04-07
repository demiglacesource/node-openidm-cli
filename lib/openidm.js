var OpenIdm = require('openidm');
var options = require('./options');
var credentials = require('./credentials');

var exit = function(code) {
    process.exit(code);
};

var checkResponse = function(err, data) {
    if (err) console.error(err.response.message);
    if (data) console.log(data);
};

// Parse arguments
var args = options.parse();
var target = args.targets[0];

if (target == undefined) {
    console.log('Missing resource parameter.');
    exit(1);
}

// Start configure process
var profile = args.options.profile;
if (target == 'configure') {
    credentials.configure(profile);
    return ;
}

// Get profile
var credential = credentials.getCredential(profile || process.env.OPENIDM_DEFAULT_PROFILE || 'default');
if (!credential) {
    exit(1);
}
var openidm = new OpenIdm(credential);

// Operation of a OpenIDM
var rev = args.options.rev || '';
var data = args.options.data ? JSON.parse(args.options.data) : {};
switch (args.options.request) {
    case 'POST':
        openidm.post(target, rev, data, function(err, data) { checkResponse(err, data); });
        break;
    case 'GET':
        openidm.get(target, function(err, data) { checkResponse(err, data); });
        break;
    case 'PUT':
        openidm.put(target, rev, data, function(err, data) {checkResponse(err, data); });
        break;
    case 'PATCH':
        openidm.patch(target, rev, data, function(err, data) { checkResponse(err, data); });
        break;
    case 'HEAD':
        openidm.head(target, function(err, data) { checkResponse(err, data); });
        break;
    case 'DELETE':
        openidm.delete(target, rev, function(err, data) { checkResponse(err, data); });
        break;
    default:
        console.error('Missing request parameter.');
        exit(1);
}

process.on('uncaughtException', function (err) {
    console.error('Error: ' + err.message);
    if (err.message == 'socket hang up') console.error('hmmm... OpenIDM ready?');
});

