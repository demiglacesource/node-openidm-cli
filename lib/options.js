var options = module.exports = {};
var packageJson = require('../package');
var argv = require('argv');

var helpInfo = 'Usage: ' + argv.name + ' configure\n\n' + 
  '	"configure" is the first step. \n' + 
  '	performs a "configure", you can set the authentication information for OpenIDM REST API.\n\n' + 
  'Usage: ' + argv.name + ' resource [options]\n\n' + 
  '	"resource" is a URI of OpenIDM REST API.';

var getOptions = function() {
    return [
        {
            name: 'help',
            short: 'h',
            type: 'string',
            description: 'Displays help information about this script'
        },
        {
            name: 'version',
            short: 'v',
            type: 'string',
            description: 'Displays version info'
        },
        {
            name: 'request',
            short: 'X',
            type: 'string',
            description: 'POST or GET or PUT or PATCH or HEAD or DELETE',
            example: "'script --request=value' or 'script -X value'"
        },
        {
            name: 'data',
            short: 'd',
            type: 'string',
            description: 'JSON value',
            example: "'script --data=value' or 'script -d value'"
        },
        {
            name: 'profile',
            short: 'p',
            type: 'string',
            description: 'OpenIDM profile',
            example: "'script --profile=value' or 'script -p value'"
        },
        {
            name: 'rev',
            short: 'r',
            type: 'int',
            description: '',
            example: "'script --rev=value' or 'script -r value'"
        }
    ];
};

options.parse = function() {
    argv.name = 'openidm';
    argv.info(helpInfo);
    argv.option(getOptions());
    var args = argv.run();
    if (args.options.help) {
        argv.help('help');
        process.exit(0);
    } else if (args.options.version) {
        console.log(packageJson.version);
        process.exit(0);
    }
    return args;
};

