const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  report_name: {
    type: String,
    required: true,
  },
  report_description:{
    type:String,
    required:true,
  },
  advance_taken: {
    type: String,
    required: true,
  },
  report_type: {
    type: mongoose.SchemaTypes.Mixed,
    required: true,
  },
  cost_charging: {
    type: mongoose.SchemaTypes.Mixed,
    required: true,
  },
  charging: {
    type: String,
    required: true,
  },
  billing_details: {
    type: String,
  },
  user_id : {
    type : mongoose.SchemaTypes.ObjectId,
    required : true
  },
  expense_id :{
    type : mongoose.SchemaTypes.ObjectId,
  },
  status :{
    type : String,
    default : "not submitted"
  }
});

const Report = mongoose.model('Report', reportSchema);

module.exports = Report;




