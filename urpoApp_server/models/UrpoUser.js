var mongoose = require('mongoose');

var searchHisSchema = new mongoose.Schema( {
	search_condition: {},
	date: { type: Date, default: Date.now }
});

//URPO部門
var urpoUserSchema = new mongoose.Schema({
    name: String,
    username: { type: String, unique: true },
    password: String,
    EMPID: String,
    search_history: [searchHisSchema],
    Profile: String,
    memo: String,
    Draft_ID: [String],
    role: String
});

module.exports = mongoose.model('urpoUser', urpoUserSchema);