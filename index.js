const colors = require('colors');
const cheerio = require('cheerio');
const request = require('request');
const Stories = require('./stories');
const Datos = require('./datos');
const Fecha = require('./fecha');
const Server = require('./Backend/server');
const saveToDB = require('./saveToDB');

/*here we need to add some things
*
 TODO List:
*
* */
saveToDB();
Server();
Stories();
Fecha();
Datos();




