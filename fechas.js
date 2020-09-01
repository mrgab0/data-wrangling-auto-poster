const moment = require('moment');
const colors = require('colors');
const fs = require('fs');

colors.setTheme({
    right: ['green', 'bold'],
    input: ['grey', 'bold'],
    verbose: ['cyan', 'bold', 'underline'],
    prompt: 'grey',
    info: 'green',
    data: 'grey',
    help: 'cyan',
    warn: 'yellow',
    debug: 'blue',
    error: ['red', 'bold']
  });
  

moment.locale('es');

module.exports = () => {

//console.log('jajaja: ' + moment().format());
var horaMomentjs = ' a las ' + moment().format("h:mm a");
var fechaMomentjs = moment().format("dddd Do");
var mesMomentjs = ' de ' + moment().format("MMMM");
var añoMomentjs = ' Del ' + moment().format("YYYY");


          var fechaDatoshoy = '\n' + `'` + 'precio del dolar a dia de hoy ' + fechaMomentjs + mesMomentjs + añoMomentjs + 
           horaMomentjs + `',` + '\n';


          fs.appendFileSync('datos.csv', fechaDatoshoy, function(err){
            if (err) {
              console.log('fallo al guardar la fecha del dia!!');
            } else {
            console.log('fecha del dia guardada!');
            }
            
           }
          );

}




