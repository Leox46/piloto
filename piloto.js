var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// ci sono solo 3 data type: Object, String e Number.
var PilotoSchema = new Schema({
	pilotoId: String,
	name: String,
	surname: String,
	bike: String
});

module.exports = mongoose.model('Piloto', PilotoSchema);
