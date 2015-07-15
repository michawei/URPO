var mongoose = require('mongoose');

var ProjectOwnerSchema = new mongoose.Schema({
    Name: String,
    EmpID: String
});

var PrincipalInvestigatorSchema = new mongoose.Schema({
    Name: String,
    Email: String,
    Website: String
});

var EditStateSchema = new mongoose.Schema({
    add_or_edit: String,
    edit_person: String,
    edit_column: String
});

var DraftSchema = new mongoose.Schema({
    Category: String,
    Dept: String,
    Project_Name: String,
    Project_Description: String,
    Edit_Date: { type: Date, default: Date.now },
    Project_Owners: [ProjectOwnerSchema],
    Region: String,
    Institution: String,
    Competence: String,
    Principal_Investigators: [PrincipalInvestigatorSchema],
    Collaboration_Model: String,
    Project_Agreement_Status: String,
    memo: String,
    edit_state: [EditStateSchema],
    file_system: {}
});

module.exports = mongoose.model('Draft', DraftSchema);