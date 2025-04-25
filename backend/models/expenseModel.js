const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  expense_type: {
    type: mongoose.SchemaTypes.Mixed,
    required: true,
  },
  invoice_number:{
    type:String,
    required:true,
  },
  amount: {
    type: Number,
    required: true,
  },
  currency: {
    type: mongoose.SchemaTypes.Mixed,
    required: true,
  },
  category: {
    type: mongoose.SchemaTypes.Mixed,
    required: true,
  },
  spent_at: {
    type: String,
    required: true,
  },
  city_name: {
    type: String,
    required: true,
  },
  user_id : {
    type : mongoose.SchemaTypes.ObjectId,
    required : true
  },
  date_of_expense :{
    type : Date,
    required:true
  },
  time_of_expense :{
    type : Date,
    required:true
  },
  description:{
    type:String,
    required:true
  },
  multi_day_expense:{
    type:Boolean,
    required : true,
    default : false
  },
  from_date:{
    type : Date
  },
  to_date:{
    type : Date
  },
  status :{
    type : String,
    default : "not submitted"
  },
  attachment_url:{
    type:String
  }
});

const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;




