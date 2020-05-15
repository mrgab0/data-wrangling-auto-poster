const mongoose = require('mongoose');
const Schema = mongoose.Schema;




var modeloDatosSchema = Schema({
					
					createdOn: { type: Date, default: Date.now, unique:true },
					"dia": String,
					"mes": String,
					"año": Number,
					"promedio": String,					
					"moneda": String, 									
					"agencia": String,
					"precio": String,
					"igual": String,
					"porcentaje": String	
});

module.exports = mongoose.model('modeloDatos', modeloDatosSchema); 

