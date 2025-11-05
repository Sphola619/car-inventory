// Import React and hooks
import React, { useState, useEffect } from 'react';

// Import child components that make up the app
import CarList from './components/CarList';
import AddCar from './components/AddCar';
import OldCarsList from './components/OldCarsList';

// Import your app styling
import './styles/App.css';

// Import Axios for making HTTP requests to your backend
import axios from 'axios';

function App() {
  // State to store current (new) cars
  const [cars, setCars] = useState([]);

  // State to store old cars (possibly filtered by year on the backend)
  const [oldCars, setOldCars] = useState([]);

  // ------------------------------
  // 🔹 Function: Fetch all cars (GET)
  // ------------------------------
  const fetchCars = async () => {
    try {
      // Make GET request to your backend to get all cars
      const response = await axios.get('http://localhost:5000/cars');
      // Save the returned data into state
      setCars(response.data);
    } catch (error) {
      console.error('Error fetching cars:', error);
    }
  };

  // ------------------------------
  // 🔹 Function: Fetch all old cars (GET)
  // ------------------------------
  const fetchOldCars = async () => {
    try {
      // Make GET request to your backend endpoint for old cars
      const response = await axios.get('http://localhost:5000/cars/old');
      // Save the old cars into state
      setOldCars(response.data);
    } catch (error) {
      console.error('Error fetching old cars:', error);
    }
  };

  // ------------------------------
  // 🔹 Function: Update a car (PUT)
  // ------------------------------
  const updateCar = async (id, updatedCar) => {
    try {
      // Send a PUT request to update the car with the given ID
      await axios.put(`http://localhost:5000/cars/${id}`, updatedCar);
      // Refresh the lists after updating
      fetchCars();
      fetchOldCars();
    } catch (error) {
      console.error('Error updating car:', error);
    }
  };

  // ------------------------------
  // 🔹 Function: Delete a car (DELETE)
  // ------------------------------
  const deleteCar = async (id) => {
    try {
      // Send DELETE request to remove a car by its ID
      await axios.delete(`http://localhost:5000/cars/${id}`);
      // Refresh lists after deleting
      fetchCars();
      fetchOldCars();
    } catch (error) {
      console.error('Error deleting car:', error);
    }
  };

  // ------------------------------
  // 🔹 useEffect: Run once on page load
  // ------------------------------
  // Fetch both current and old cars when the app first loads
  useEffect(() => {
    fetchCars();
    fetchOldCars();
  }, []); // Empty dependency array = runs only once when the component mounts

  // ------------------------------
  // 🔹 Return (what gets displayed on the screen)
  // ------------------------------
  return (
    <div className="App">
      <h1>Car Inventory</h1>

      {/* Form to add a new car */}
      <AddCar fetchCars={fetchCars} fetchOldCars={fetchOldCars} />

      {/* List of current cars, with Edit and Delete functionality */}
      <CarList
        cars={cars}
        updateCar={updateCar}
        deleteCar={deleteCar}
        fetchCars={fetchCars}
        fetchOldCars={fetchOldCars}
      />

      {/* List of old cars (read-only) */}
      <OldCarsList oldCars={oldCars} />
    </div>
  );
}

// Export the main App component so it can be rendered in index.js
export default App;
