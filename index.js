let ldap = require('ldapjs');
var assert = require('assert');

let client = ldap.createClient({
    url: 'ldap://localhost:389'
});

client.bind('cn=admin,dc=arqsoft,dc=unal,dc=edu,dc=co', 'admin', function(err,res) {
    assert.ifError(err);
  });

let entry= {
    cn: 'corre@unal.edu.co',
    sn: 'ApellidoNuevo',
    uid: 'foobar',
    //gidNumber: 'cn = user',
    //hohomeDirectory: '/home/users/foobar',
    objectclass: 'inetOrgPerson'
};
let options = {
    filter: '(objectClass=*)',
    scope: 'one'
};
client.search("ou=sa,dc=arqsoft,dc=unal,dc=edu,dc=co",options,function(err, res){
    
        if (err) {
            console.log("Error in search " + err)
        } else {
            res.on('searchEntry', function (entry) {
                console.log('entry: ' + JSON.stringify(entry.object));
            });
            res.on('searchReference', function (referral) {
                console.log('referral: ' + referral.uris.join());
            });
            res.on('error', function (err) {
                console.error('error: ' + err.message);
            });
            res.on('end', function (result) {
                console.log('status: ' + result.status);
            });
        }
    }
);

client.add("cn=nuevoooooo,ou=sa,dc=arqsoft,dc=unal,dc=edu,dc=co", entry, function(err,res){
    if(err){
        console.log("Error");
    }
    else{
        console.log(res);
    }
});

