import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import carRoutes from './routes/carRoutes.js';
import dbConfig from './config/db.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(dbConfig.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

// Routes
app.use('/cars', carRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Car Inventory API');
});

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});