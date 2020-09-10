const colors = require('colors');
const cheerio = require('cheerio');
const request = require('request');
const fs = require('fs');
const moment = require('moment');
const Fecha = require('./fecha');
const mongoose = require('mongoose');

//confugrando mongo db
//mongoose.set('useUnifiedTopology', true);
//mongoose.set('useNewUrlParser', true);
//mongoose.set('useCreateIndex', true);
//mongoose.connect('mongodb://localhost/monitorDolarLocal');

var schemaMonitorDolar = mongoose.model('modelodatos', {
	         
          createdOn: { type: Date, default: Date.now, unique:true },
					"dia": String,
          "mes": String,
          "año": String,
          "promedio": String,         
          "moneda": String,                   
          "agencia": String,
          "precio": String,
          "igual": String,
          "porcentaje": String
	
});


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





module.exports = function() {

    request({url: 'http://monitordolarvenezuela.com/', encoding: 'utf-8'}, function(err, resp, body){
        if(!err && resp.statusCode == 200){
          var $ = cheerio.load(body);
          //let title = $('title').text();
          //console.log(title);

          //SECTOR DE TASA DEL DIA Y CALCULADORA
          $('div[class="head-price"]').each( (i, el) => {

            var selectorTruco1 = 'small';
            var selectorTruco2 = 'span[class="indica-prom"]';
            var selectorTasaDelDia = 'h6[class="text-center"]';

            const curandoPrecios1 = $(el).find(selectorTruco1).empty();
            const curandoPrecios2 = $(el).find(selectorTruco2).empty();
            const tasaDelDia = $(el).find(selectorTasaDelDia).text().replace(/\s/g, '');

            

            var tasaDelDiaCalc = `'` + tasaDelDia + `',` + '\n';
            var comentarioTasaDelDia = 'la tasa del dia es: ';
            var tasaDelDiaCurada = `'` + comentarioTasaDelDia + tasaDelDia + `',` + '\n';
            console.log(tasaDelDiaCurada);

            

                  fs.appendFileSync('datos.csv', tasaDelDiaCalc, function(err){
                    if (err) {
                      console.log('fallo al guardar el dato para la calculadora!!');
                    } else {
                    console.log('tasa para la calculadora guardada!');
                  }
                    
                }
                );


                fs.appendFileSync('datos.csv', tasaDelDiaCurada, function(err){
                  if (err) {
                    console.log('fallo al guardar la tasa del dia!!');
                  } else {
                  console.log('tasa del dia guardada!');
                }
                  
              }
              );


          

          //CAJA DE PRECIOS 
          $('.box-prices').each( (i, el) => {
           var cuadroDePrecios = 'div[class="box-cont"]';
           var cajaNombres =  'div[class="box-prices row"]';
           var selectorNombres = 'div[class="col-12 col-lg-5"]';
           var selectorPrecios = 'div[class="col-6 col-lg-4"]';
           var selectorPorcentaje = 'div[class="col-4 col-lg-2 text-center"]';
           var igual = '= ';
           var selectorTruco = 'b[class="hidden"]';
           
           
           
           const nombres = $(el).find(selectorNombres).append('').text();
           const curandoPrecios = $(el).find(selectorTruco).empty();
           const precios = $(el).find(selectorPrecios).append('').text().replace(/\,\s\s+/g, '');
           const porcentajes = $(el).find(selectorPorcentaje).append('').text();
           

           
           var datos = nombres + precios + igual + porcentajes + '\n';

           var datosParaGuardar = `'` + nombres + precios + igual + porcentajes;

           
           //let fecha = new Date();
           
           //console.log('La fecha actual es', fechaMomentjs + horaMomentjs);          
           console.log('---'.verbose);
           
           console.log(`'` + nombres + precios + igual + porcentajes);

            
           //captando los headers 
           //escribiendoArchivo = fs.createWriteStream('archivoDeDatos.txt');

           //var datosCurados = datos.toString();
           //escribiendo el archivo que va para la DB
            //escribiendoArchivo.write(`${datosCurados}`);
           

           /*fs.readFile('datos.txt', 'utf-8', (err, data)=>{
            if (err)  {
              throw err + console.log('archivo no se pudo leer!');

            } else {
              console.log(data);
            }
           });*/


           //montando objeto json a ver que tal :v
/*
            var properties = new Object();
            properties.version = "1";
            properties.finish = "0";
            properties.number = 3;

            var arrayProperties = new Array();
            arrayProperties.push(properties);



            var miObjeto = new Object();
            miObjeto.nombre = "Pedro";
            miObjeto.edad = 12;
            miObjeto.mascota = "Gato";
            miObjeto.properties = arrayProperties;

            //var myString = JSON.stringify(miObjeto);

            //console.log(myString);
            */

           //fin del objeto
           
           var fechaJS = new Date();


                  /*probando*/

          
          
          
          var valoragencia = 'valor agencia';
          valoragencia = new Object();
          var contenidoItems = new Object();
          contenidoItems.agencia = nombres;
          contenidoItems.valoragencia = precios;
          contenidoItems.igual = '=';
          contenidoItems.porcentaje = porcentajes;
          
          

          var arrayContenidoitems = new Array();
          arrayContenidoitems.push(contenidoItems);

          var items = new Object();
          items.contenidoItems = arrayContenidoitems;
          
           
          
          var valor_del_dia = new Object();
          valor_del_dia.monitor_dolar = items;
         


          var arrayValorDelDia = new Array();
          arrayValorDelDia.push(valor_del_dia);
		  
		  

          var valor = new Object();
		      valor.dia = '23';
          valor.moneda = 'dolar';
          valor.promedio_del_dia = tasaDelDia;
          valor.valor_del_dia = arrayValorDelDia;

          
          var datosToJson = JSON.stringify(valor);
         

          fs.appendFileSync('datos.json', datosToJson, function(err){
            if (err) {
              console.log('fallo al guardar json!!');
            } else {
             console.log('archivo con los datos de hoy json!');
           }
            
        }
        );
				
        
               /*fin de probando */       
           /* creando base de datos */
		   
						var fechaDia = moment().format("dddd D");
						var mes = moment().format("MMMM");
						var año = moment().format("YYYY");
		   
				var modelodatos = new schemaMonitorDolar({
							
              "dia": fechaDia,
              "mes": mes,
              "año": año,
              "promedio": tasaDelDia,         
              "moneda": "dolar",                   
              "agencia": nombres,
              "precio": precios,
              "igual": "=",
              "porcentaje": porcentajes
			});
			
      
			modelodatos.save(function(error){
					if (error){
						console.log('error mongoose!!');
					}
					
					
			});
			
			var modelodatosCurada = JSON.stringify(modelodatos);
			
			//console.log(baseDeDatosCurada);
			
			fs.appendFileSync('datos1.json', modelodatosCurada, function(err){
               if (err) {
                 console.log('fallo al guardar los datos de hoy!!');
               } else {
                console.log('archivo con los datos de hoy guardado!');
              }
               
           }
           );
		   
		   
		   /*fin de la base de datos*/


           fs.appendFileSync('datos.csv', datosParaGuardar, function(err){
               if (err) {
                 console.log('fallo al guardar los datos de hoy!!');
               } else {
                console.log('archivo con los datos de hoy guardado!');
              }
               
           }
           );


              
                
          });
         
        });

        }})


}
    

/*
{
	"nombre": "Pedro",
	"edad": 12,
	"mascota": "Gato",
	"properties": [{
		"version": "1",
		"finish": "0",
		"number": 3
	}]
}

{{
	"dia": "21",
	"moneda": "dolar",
	"promedio del dia": "string number",
	"precios del dia": [{
	
			"dolar today":[{ "precio": "100.000", "igual": "=",  "porcentaje": "1,0%" }]
	}]
	  
}
	
	

*/


