var mongoose = require('mongoose');

var ProjectManagerSchema = new mongoose.Schema({
    name: String,
    username: { type: String, unique: true },
    password: String,
    id: String,
    projectID: [String],
    //Draft_ID: [String],
    profile: String,    //存路徑
    remark: String,
    //role: String
});

module.exports = mongoose.model('ProjectManager', ProjectManagerSchema);