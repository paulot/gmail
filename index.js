var path = require('path');
var electron = require('electron-prebuilt');
var proc = require('child_process');

var bootstrapPath = path.join(__dirname, 'lib', 'index.js');
var child = proc.spawn(electron, [bootstrapPath].concat(process.argv), {stdio: 'inherit'});

child.on('error', function(err) { throw new Error(err); });
child.on('exit', function(code) { process.exit(code); });
