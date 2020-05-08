const mongoose = require('mongoose');
const Schema = mongoose.Schema;




var modeloDatosSchema = Schema({
	
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

module.exports = mongoose.model('modeloDatos', modeloDatosSchema); 

