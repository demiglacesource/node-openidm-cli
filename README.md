node-opneidm-cli
=========================

OpenIDM CLI for Node.js.

Install
---------

Install from npm:

    $ npm install openidm-cli

Introduction
--------------

Create a profile information.

    $ openidm configure
    Server URL [http://localhost:8080]: OpenIDM server url
    Username [openidm-admin]: X-OpenIDM-Username header value
    Password [openidm-admin]: X-OpenIDM-Password header value

The settings are stored in the following location.

    $ cat ~/.openidm-cli/credentials
    [default]
    openidm_server_url=http://localhost:8080
    openidm_username=xxxxxxxxxx
    openidm_password=xxxxxxxxxx

Operation of a OpenIDM
------------------------

    $ openidm managed/user?_action=create \  
              -X POST \  
              -d '{"userName":"demiglacesource","password":"P@ssw0rd","givenName":"demiglace","sn":"source","mail":"demiglacesource@gmail.com"'

    $ openidm managed/user/demiglacesource -X GET

Options
---------

    $ openidm -h

    Usage: openidm configure

    	"configure" is the first step. 
    	performs a "configure", you can set the authentication information for OpenIDM REST API.

    Usage: openidm resource [options]

    	"resource" is a URI of OpenIDM REST API.

    	--help, -h
    		Displays help information about this script
    
    	--version, -v
    		Displays version info
    
    	--request, -X
    		POST or GET or PUT or PATCH or HEAD or DELETE
    		'script --request=value' or 'script -X value'
    
    	--data, -d
    		JSON value
    		'script --data=value' or 'script -d value'
    
    	--profile, -p
    		OpenIDM profile
    		'script --profile=value' or 'script -p value'
    
    	--rev, -r
    		
    		'script --rev=value' or 'script -r value'

Using Profile
---------------

Profile information can save multiple.  
For example, set as follows.

    $ openidm configure --profile demiglacesource
    Server URL [http://localhost:8080]: http://localhost:8080
    Username [openidm-admin]: openidm-admin
    Password [openidm-admin]: openidm-admin

Profile is added to the credentials.

    $ cat ~/.openidm-cli/credentials
    [demiglacesource]
    openidm_server_url=http://localhost:8080
    openidm_username=openidm-admin
    openidm_password=openidm-admin

Profile specified method can be selected from the following two types.

    $ openidm managed/user/demiglacesource --request GET --profile demiglacesource

or 

    $ export OPENIDM_DEFAULT_PROFILE=demiglacesource
    $ openidm managed/user/demiglacesource --request GET

