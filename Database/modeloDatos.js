const mongoose = require('mongoose');
const Schema = mongoose.Schema;




var modeloDatosSchema = Schema({
					
					createdOn: { type: Date, default: Date.now, unique:true },
					"dia": String,
					"mes": String,
					"año": Number,
					"promedio": Number,					
					"moneda": String, 									
					"agencia": String,
					"precio": Number,
					"igual": String,
					"porcentaje": Number	
});

module.exports = mongoose.model('modeloDatos', modeloDatosSchema); 

