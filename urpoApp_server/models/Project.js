var mongoose = require('mongoose');

var ProjectOwnerSchema = new mongoose.Schema({
    Name: String,
    EmpID: String
});

var FileSchema = new mongoose.Schema({
    file_name: String,
    file_path: String
});

var MilestoneSchema = new mongoose.Schema({
    name: String,
    start_time: { type: Date, default: Date.now },
    end_time: { type: Date, default: Date.now },
    status: String,
    description: String,
    file: [FileSchema]
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

var ProjectSchema = new mongoose.Schema({
    id: String,
    Category: String,
    Dept: String,
    Project_Name: String,
    Project_Description: String,
    Estimated_Start_Date: { type: Date, default: Date.now },
    Estimated_End_Date: { type: Date, default: Date.now },
    Region: String,
    Institution: String,
    Competence: String,
    Collaboration_Model: String,
    Project_Agreement_Status: String,
    Currency: String,
    Cash_Funding: String,
    Project_Owners: [ProjectOwnerSchema],
    Principal_Investigators: [PrincipalInvestigatorSchema],
    Milestone: [MilestoneSchema],
    edit_state: [EditStateSchema],
    memo: String,
    file_system: {}
});

module.exports = mongoose.model('Project', ProjectSchema);