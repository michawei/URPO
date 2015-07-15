var mongoose = require('mongoose');

var HistorySchema = new mongoose.Schema({
	project_id: String,
	edit_state: {
		add_or_edit: String, 
		edit_person: String, 
		edit_column: String
	}
});

module.exports = mongoose.model('History', HistorySchema);