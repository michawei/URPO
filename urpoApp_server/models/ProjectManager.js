var mongoose = require('mongoose');

var ProjectManagerSchema = new mongoose.Schema({
    name: String,
    username: { type: String, unique: true },
    password: String,
    EMPID: String,
    Project_ID: [String],
    Draft_ID: [String],
    Profile: String,    //存路徑
    memo: String,
    role: String
});

module.exports = mongoose.model('ProjectManager', ProjectManagerSchema);