var mongoose = require('mongoose');

var FilterUseSchema = new mongoose.Schema({
    //id: String,
    category: [String],
    dept: [String],
    //Project_Name: String,
    //Project_Description: String,
    //Estimated_Start_Date: { type: Date, default: Date.now },
    //Estimated_End_Date: { type: Date, default: Date.now },
    region: [String],
    institution: [String],
    //Competence: String,
    collaboration: [String],
    agreementStatus: [String],
    //Currency: [String],
    //Cash_Funding: String,
    employee: [String],
    principal: [String]
    //Milestone: [MilestoneSchema],
    //edit_state: [EditStateSchema],
    //memo: String,
    //file_system: {}
});

module.exports = mongoose.model('FilterUse', FilterUseSchema);