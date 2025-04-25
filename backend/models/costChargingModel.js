const mongoose = require('mongoose');

const costChargingSchema = new mongoose.Schema({
  type:{
    type:String,
    required:true
  }
});

const CostCharging = mongoose.model('costCharging', costChargingSchema);

module.exports = CostCharging;
