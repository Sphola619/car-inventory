import mongoose from 'mongoose';

// Define the schema for a car
const carSchema = new mongoose.Schema({
  // The make of the car (e.g., Toyota, Ford)
  make: {
    type: String,
    required: true
  },
  // The model of the car (e.g., Camry, Mustang)
  model: {
    type: String,
    required: true
  },
  // The year the car was manufactured
  year: {
    type: Number,
    required: true
  },
  // The owner of the car
  owner: {
    type: String,
    required: true
  },
  // The registration number of the car
  registrationNumber: {
    type: String,
    required: true
  }
});

// Create a model from the schema
const Car = mongoose.model('Car', carSchema);

// Export the model to use it in other parts of the application
export default Car;