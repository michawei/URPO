var mongoose = require('mongoose');

var ProjectOwnerSchema = new mongooes.Schema({
    Project Owner (Delta): String,
    EmpID: String
});

var FileSchema = new mongooes.Schema({
    file_name: String,
    path: String
});

var MilestoneSchema = new mongooes.Schema({
    name: String,
    start_time: { type: Date, default: Date.now },
    end_time: { type: Date, default: Date.now },
    status: String,
    description: String
    file: [FileSchema]
});

var PrincipalInvestigatorSchema = new mongooes.Schema({
    Principal Investigator: String,
    Email Address: String,
    Personal Website: String
});

var EditStateSchema = new mongooes.Schema({
    add or edit: String,
    edit_person: String,
    edit_column: String
});

var ProjectSchema = new mongoose.Schema({
    status: String,
    Category: String,
    Dept./ Team: String,
    Project Name: String,
    Project Description: String,
    Estimated Start Date: { type: Date, default: Date.now },
    Estimated End Date: { type: Date, default: Date.now },
    Project Owner: [ProjectOwnerSchema],
    milestone: [MilestoneSchema],
    Region: String,
    Institution: String,
    Competence: String,
    Principal Investigator: [PrincipalInvestigatorSchema],
    Collaboration Model: String,
    Project Agreement Status: String,
    Currency: String,
    Cash Funding: String,
    memo: String,
    edit_state: [EditStateSchema],
    file system: {}
});

module.exports = mongoose.model('Project', ProjectSchema);