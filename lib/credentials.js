var credentials = module.exports = {};
var fs = require('fs');
var url = require('url');
var readline = require('readline-sync');
var ini = require('ini');

var configDir = process.env['HOME'] + '/.openidm-cli';
var credentialsFile = configDir + '/credentials';
var cServerUrl = 'http://localhost:8080';
var cUsername = 'openidm-admin';
var cPassword = 'openidm-admin';
var permission = 0644;
var createFilePermission = { flags: 'w', encoding: 'utf8', mode: permission };

credentials.configure = function(profile) {
    var serverUrl = readline.question('Server URL [' + cServerUrl + ']: ');
    if (serverUrl) { 
        if (!url.format(serverUrl)) { 
            console.error('Invelid server url.');
            return ;
        } else if (!parseInt(url.parse(serverUrl)['port'])) {
            console.error('Invelid server url port.');
            return ;
        }
    }
    var username = readline.question('Username [' + cUsername + ']: ');
    var password = readline.question('Password [' + cUsername + ']: ');
    createCredentials(profile, serverUrl, username, password);
};

var createCredentials = function(profile, serverUrl, username, password) {
    fs.exists(configDir, function(exists) {
        if (!exists) {
            fs.mkdirSync(configDir, permission);
        }
        fs.exists(credentialsFile, function(exists) {
            if (!exists) {
                fs.createWriteStream(credentialsFile, createFilePermission);
            }

            var config = getConfig();
            profile = profile || 'default';

            config[profile] = {};
            config[profile]['openidm_server_url'] = (serverUrl || cServerUrl);
            config[profile]['openidm_username'] = (username || cUsername);
            config[profile]['openidm_password'] = (password || cPassword);

            fs.writeFileSync(credentialsFile, ini.stringify(config))
        });
    });
};

var getConfig = function() {
    return ini.parse(fs.readFileSync(credentialsFile, 'utf8'));
}

credentials.getCredential = function(profileName) {
    if (!fs.existsSync(credentialsFile)) {
        console.error('Prease "openidm configure".');
        return undefined;
    }

    var config = getConfig();
    var profile = config[profileName];
    if (!profile) {;
        console.error('The profile is present?');
        return undefined;
    }

    var tmp = url.parse(profile['openidm_server_url']);
    var credential = {};
    credential['host'] = tmp['hostname'];
    credential['port'] = parseInt(tmp['port']);
    credential['userName'] = profile['openidm_username'];
    credential['password'] = profile['openidm_password'];
    credential['useSsl'] = (tmp['protocol'] == 'https://') ? true : false;

    return credential;
};

