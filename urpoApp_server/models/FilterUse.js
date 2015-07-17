var mongoose = require('mongoose');

var FilterUseSchema = new mongoose.Schema({
    //id: String,
    Category: [String],
    Dept: [String],
    //Project_Name: String,
    //Project_Description: String,
    //Estimated_Start_Date: { type: Date, default: Date.now },
    //Estimated_End_Date: { type: Date, default: Date.now },
    Region: [String],
    Institution: [String],
    //Competence: String,
    Collaboration_Model: [String],
    Project_Agreement_Status: [String],
    //Currency: [String],
    //Cash_Funding: String,
    Project_Owners: [String],
    Principal_Investigators: [String],
    //Milestone: [MilestoneSchema],
    //edit_state: [EditStateSchema],
    //memo: String,
    //file_system: {}
});

module.exports = mongoose.model('FilterUse', FilterUseSchema);