import express from 'express';
import { addCar, listCars, listOldCars, getCarById, updateCar, updateMultipleCars, deleteCar } from '../controllers/carController.js';

const router = express.Router();

// Add a new car
router.post('/', addCar);

// List all cars
router.get('/', listCars);

// List cars older than 5 years
router.get('/old', listOldCars);

// Get a single car by ID
router.get('/:id', getCarById);

// Update a single car
router.put('/:id', updateCar);

// Update multiple cars
router.put('/', updateMultipleCars);

// Delete a specific car
router.delete('/:id', deleteCar);

export default router;