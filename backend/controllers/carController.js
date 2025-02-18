import Car from '../models/carModel.js';

// Add a car
export const addCar = async (req, res) => {
  try {
    const newCar = new Car(req.body);
    const savedCar = await newCar.save();
    res.status(201).json(savedCar);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// List all cars
export const listCars = async (req, res) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// List cars older than 5 years
export const listOldCars = async (req, res) => {
  try {
    const fiveYearsAgo = new Date();
    fiveYearsAgo.setFullYear(fiveYearsAgo.getFullYear() - 5);
    const oldCars = await Car.find({ year: { $lt: fiveYearsAgo.getFullYear() } });
    res.json(oldCars);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single car by ID
export const getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    res.json(car);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a single car
export const updateCar = async (req, res) => {
  try {
    const updatedCar = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedCar);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update multiple cars
export const updateMultipleCars = async (req, res) => {
  try {
    const { filter, update } = req.body;
    const result = await Car.updateMany(filter, update);
    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a specific car
export const deleteCar = async (req, res) => {
  try {
    await Car.findByIdAndDelete(req.params.id);
    res.json({ message: 'Car deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};