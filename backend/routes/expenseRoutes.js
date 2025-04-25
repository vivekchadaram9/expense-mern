const express = require("express");
const Expense = require("../models/expenseModel");
const router = express.Router();

router.get("/getByUserId?", async (req, res) => {
    try {
      const { userId } = req.query;
      const expense = await Expense.find({user_id:userId});
      if (expense) {
        res.status(200).json({ success: true, data: expense });
      } else {
        res.status(400).json({ message: "expenses not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

  router.get("/getByExpenseId?", async (req, res) => {
    try {
      const { expenseId } = req.query;
      const expense = await Expense.findById(expenseId);
      if (expense) {
        res.json(expense);
      } else {
        res.status(400).json({ message: "Expense not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

  router.post('/saveExpense',async(req,res)=>{
      try {
        const expense = await Expense.create(req.body);
        res.status(201).json({ success: true, data: expense });
      } catch (error) {
        if (error.name === 'ValidationError') {
          const messages = Object.values(error.errors).map(val => val.message);
          return res.status(400).json({ success: false, errors: messages });
        }
        res.status(500).json({ success: false, message: 'Server Error' });
      }
  })

  router.put("/updateExpense?", async (req, res) => {
    const { expenseId } = req.query;
    const updateData = req.body;
    try {
      const updatedExpense = await Expense.findByIdAndUpdate(
        expenseId,
        { $set: updateData },
        { new: true, runValidators: true }
      );
      if (!updatedExpense) {
        res.status(400).json({ message: "Expense not found" });
      }
      res.json(updatedExpense);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  router.delete("/deleteExpense?", async (req, res) => {
    const { expenseId } = req.query;
    try {
      const deletedExpense = await Expense.findByIdAndDelete(expenseId);
      if (!deletedExpense) {
        return res.status(400).json({ message: "Expense not found" });
      }
      return res.status(200).json({ message: "Expense Successfully deleted" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  module.exports = router;