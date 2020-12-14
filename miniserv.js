const express = require("express");
const app = express();
var logger = require('morgan');
const port = 3000;
var path = require("path");

// Call scripts to run
// require('./app/assets/js/csv/api/request')

// Logger
app.use(logger('dev'));
// Static
app.use('/assets', express.static('app/assets'));
app.use('/bower_components', express.static('bower_components'));
app.use('/', express.static('app'));

// Run
app.listen(port, () => console.log(`MiniServ listening \u001b[36mhttp://127.0.0.1:${port}\u001b[0m`));