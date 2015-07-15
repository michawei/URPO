var mongoose = require('mongoose');

var ProjectOwnerSchema = new mongooes.Schema({
    Project Owner (Delta): String,
    EmpID: String
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

var DraftSchema = new mongoose.Schema({
    Category: String,
    Dept./ Team: String,
    Project Name: String,
    Project Description: String,
    Edit Date: { type: Date, default: Date.now },
    Project Owner: [ProjectOwnerSchema],
    Region: String,
    Institution: String,
    Competence: String,
    Principal Investigator: [PrincipalInvestigatorSchema],
    Collaboration Model: String,
    Project Agreement Status: String,
    memo: String,
    edit_state: [EditStateSchema],
    file system: {}
});

module.exports = mongoose.model('Draft', DraftSchema);