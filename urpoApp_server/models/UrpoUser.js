var mongoose = require('mongoose');

var searchHisSchema = new mongooes.Schema( {
	search_condition: {},
	date: { type: Date, default: Date.now }
});

var urpoUserSchema = new mongoose.Schema({
  name: String,
  username: String,
  password: String,
  EMPID: String,
  search_history: [searchHisSchema],
  Profile: String,
  memo: String,
  Draft_ID: [String],
  role: String
});

module.exports = mongoose.model('urpoUser', urpoUserSchema);