const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3001;
const mongoose = require('mongoose');
const modelodatos = require('../Database/modeloDatos');



//confugrando mongo
mongoose.set('useUnifiedTopology', true); 
mongoose.set('useNewUrlParser', true); 
mongoose.set('useCreateIndex', true);
//conectando a db
// y servidor
mongoose.connect('mongodb://localhost/monitorDolarLocal', (err,res)=> {
	if (err) return err 
		console.log(err);	
		console.log('conexion a la base de datos establecida!!!');

		
		
	 app.listen(port,  () => {
  		console.log(`Servidor Arriba! ${port}!`);
 		
 	});  

	
});





app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

//index
app.get('/', function (req, res) {
  res.send('index.js');
});

//error 404
app.get('/404/:redirection', (req, res) => {
	res.send({error2: `${req.params.redirection}`});
});

//requiriendo el documento completo
app.get('/api/monitorDolarLocal', (req, res) => {
	res.status(200).send({moneda: "dolar"});

});

//requiriendo documentos por id
app.get('/api/monitorDolarLocal/:modelodatosId', (req, res) => {
		let modelodatosId = req.params.modelodatosId

		modelodatos.findById(modelodatosId, (err, modelodatos) => {

			if (err) return res.status(500).send({message: `error en db nativo ${err}`})
			if(!modelodatos) return res.status(404).send({message: `no existe ese id`})

			res.status(200).send({ modelodatos })
		})

});



//queriying data to dia



//requiriendo documentos por dia
app.get('/api/monitorDolarLocal/dia/modelodatosDiario', (req, res,) => {
		
		
		
		modelodatos.find({ createdOn : '2020-05-12' }, (err, modelodatos) => {

			if (err) return res.status(500).send({message: `error en db nativo ${err}`})
			if(!modelodatos) return res.status(404).send({message: `no existe ese dia`})

			res.status(200).send({ modelodatos })
		}).sort({createdOn: 'desc'}).limit()


		

});


//enviando de tipo post
app.post('/api/monitorDolarLocal', (req, res) => {
	

	
	let ModeloDatos = new modelodatos()
	ModeloDatos.createdOn = req.body.createdOn
	ModeloDatos.dia = req.body.dia
	ModeloDatos.mes = req.body.mes
	ModeloDatos.año = req.body.año
	ModeloDatos.promedio = req.body.promedio
	ModeloDatos.moneda = req.body.moneda
	ModeloDatos.agencia = req.body.agencia
    ModeloDatos.precio = req.body.precio
    ModeloDatos.igual = req.body.igual
    ModeloDatos.porcentaje = req.body.porcentaje
	
	var cuerpo = req.body;
	var cuerpoCurado = JSON.stringify(cuerpo);
	console.log(cuerpo);

	ModeloDatos.save((err, ModeloDatosStored) => {
		if (err) res.status(500).send({message: `error al guardar en DB`});


		res.status(200).send({ModeloDatos: "datos guardados en DB!"});
	});


	

});


//actualizando documentos por id
app.put('/api/monitorDolarLocal/:monitorDolarLocalId', (req, res) => {

});


//borrando
app.delete('/api/monitorDolarLocal/:monitorDolarLocalId', (req, res) => {
	

});
 

 