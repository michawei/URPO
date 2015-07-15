var mongoose = require('mongoose');

var ProjectManagerSchema = new mongoose.Schema({
    name: String,
    password: String,
    EMPID: String,
    Project_ID: [String],
    Draft_ID: [String],
    Profile: String,    //存路徑
    memo: String
});

module.exports = mongoose.model('ProjectManager', ProjectManagerSchema);