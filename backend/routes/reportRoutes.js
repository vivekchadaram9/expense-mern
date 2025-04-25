const express = require("express");
const Report = require("../models/reportModel");
const router = express.Router();

router.get("/getByUserId?", async (req, res) => {
    try {
      const { userId } = req.query;
      const report = await Report.find({user_id:userId});
      if (report) {
        res.status(200).json({ success: true, data: report });
      } else {
        res.status(400).json({ message: "Reports not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });


  router.get("/getByReportId?", async (req, res) => {
    try {
      const { reportId } = req.query;
      const report = await Report.findById(reportId);
      if (report) {
        res.json(report);
      } else {
        res.status(400).json({ message: "Report not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

  router.post('/saveReport',async(req,res)=>{
      try {
        const report = await Report.create(req.body);
        res.status(201).json({ success: true, data: report });
      } catch (error) {
        if (error.name === 'ValidationError') {
          const messages = Object.values(error.errors).map(val => val.message);
          return res.status(400).json({ success: false, errors: messages });
        }
        res.status(500).json({ success: false, message: 'Server Error' });
      }
  })

  router.put("/updateReport?", async (req, res) => {
    const { reportId } = req.query;
    const updateData = req.body;
    try {
      const updatedReport = await Report.findByIdAndUpdate(
        reportId,
        { $set: updateData },
        { new: true, runValidators: true }
      );
      if (!updatedReport) {
        res.status(400).json({ message: "Report not found" });
      }
      res.json(updatedReport);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  router.delete("/deleteReport?", async (req, res) => {
    const { reportId } = req.query;
    try {
      const deletedReport = await Report.findByIdAndDelete(reportId);
      if (!deletedReport) {
        return res.status(400).json({ message: "Report not found" });
      }
      return res.status(200).json({ message: "Report Successfully deleted" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  module.exports = router;