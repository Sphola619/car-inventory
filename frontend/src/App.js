import React, { useState, useEffect } from 'react';
import CarList from './components/CarList';
import AddCar from './components/AddCar';
import OldCarsList from './components/OldCarsList';
import './styles/App.css';
import axios from 'axios';

function App() {
  const [cars, setCars] = useState([]);
  const [oldCars, setOldCars] = useState([]);

  const fetchCars = async () => {
    try {
      const response = await axios.get('http://localhost:5000/cars');
      setCars(response.data);
    } catch (error) {
      console.error('Error fetching cars:', error);
    }
  };

  const fetchOldCars = async () => {
    try {
      const response = await axios.get('http://localhost:5000/cars/old');
      setOldCars(response.data);
    } catch (error) {
      console.error('Error fetching old cars:', error);
    }
  };

  const updateCar = async (id, updatedCar) => {
    try {
      await axios.put(`http://localhost:5000/cars/${id}`, updatedCar);
      fetchCars();
      fetchOldCars();
    } catch (error) {
      console.error('Error updating car:', error);
    }
  };

  const deleteCar = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/cars/${id}`);
      fetchCars();
      fetchOldCars();
    } catch (error) {
      console.error('Error deleting car:', error);
    }
  };

  useEffect(() => {
    fetchCars();
    fetchOldCars();
  }, []);

  return (
    <div className="App">
      <h1>Car Inventory</h1>
      <AddCar fetchCars={fetchCars} fetchOldCars={fetchOldCars} />
      <CarList cars={cars} updateCar={updateCar} deleteCar={deleteCar} fetchCars={fetchCars} fetchOldCars={fetchOldCars} />
      <OldCarsList oldCars={oldCars} />
    </div>
  );
}

export default App;