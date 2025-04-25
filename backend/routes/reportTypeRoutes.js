const reportTypes = [
    { type: 'Office Expenses' },
    { type: 'Travel Expenses' },
    { type: 'Food and Entertainment' },
    { type: 'Utilities' },
    { type: 'Stationery' },
    { type: 'Software Subscriptions' },
    { type: 'Miscellaneous' },
  ];
const express = require("express");
const router = express.Router();
  const ReportType = require('../models/reportTypesModel')
  
  router.post('/saveReportTypes',async(req,res)=>{
    try {
        const result = await ReportType.insertMany(reportTypes);
        res.status(201).json({ success: true, data: result });
    } catch (error) {
      if (error.name === 'ValidationError') {
        const messages = Object.values(error.errors).map(val => val.message);
        return res.status(400).json({ success: false, errors: messages });
      }
      res.status(500).json({ success: false, message: 'Server Error' });
    }
})

router.get('/getAllReportTypes',async (req, res) => {
    try {
        const result = await ReportType.find();
      if (result) {
        res.json(result);
      } else {
        res.status(400).json({ message: "ReportTypes not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  })

module.exports = router