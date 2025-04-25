const mongoose = require('mongoose');

const reportTypesSchema = new mongoose.Schema({
  type:{
    type:String,
    required:true
  }
});

const ReportTypes = mongoose.model('ReportTypes', reportTypesSchema);

module.exports = ReportTypes;
