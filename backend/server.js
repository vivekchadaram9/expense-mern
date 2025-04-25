const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const expenseRoutes = require('./routes/expenseRoutes')
const reportRoutes = require('./routes/reportRoutes')
const reportTypeRoutes = require('./routes/reportTypeRoutes')
const cors = require('cors')

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true        
}));
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Error connecting to MongoDB', err));

app.use('/user', userRoutes);
app.use('/report',reportRoutes)
app.use('/reportType',reportTypeRoutes)

app.listen(port,'0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});
