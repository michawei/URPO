var mongoose = require('mongoose');

var HistorySchema = new mongoose.Schema({
    project_id: [String]
});

module.exports = mongoose.model('History', HistorySchema);