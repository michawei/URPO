var mongoose = require('mongoose');

var HistorySchema = new mongoose.Schema({
	project_id: String,
	Project_Name: String,
    Region: String,
    Institution: String,
    Project_Owners: [String],
    Project_Agreement_Status: [String],
	edit_state: {
		add_or_edit: String, 
		edit_person: String, 
		edit_column: String
	},
	Update_Date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('History', HistorySchema);