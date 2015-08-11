var mongoose = require('mongoose');

var ProjectOwnerSchema = new mongoose.Schema({
	id: String,
	name: String
});

var FileSchema = new mongoose.Schema({
	file_name: String,
	file_path: String
});

var MilestoneSchema = new mongoose.Schema({
	name: String,
	status:	String,
	issue: String,
	date: {
		start: String,
		end: String
	}
});

var PrincipalInvestigatorSchema = new mongoose.Schema({
	investigator: String,
	email: String,
	website: String
});

var ProjectSchema = new mongoose.Schema({
	category: String,
	dept: String,
	project: {
		name: String,
		description: String,
		remark: String
	},
	date: {
		start: String,
		end: String
	},
	region: String,
	institution: String,
	competence: String,
	collaboration: String,
	agreementStatus: String,
	funding: {
		currency: String,
		cash: String,
		remark: String
	},
	principal: [PrincipalInvestigatorSchema],
	employee: [ProjectOwnerSchema],
	milestone: [MilestoneSchema],
});

module.exports = mongoose.model('Project', ProjectSchema);