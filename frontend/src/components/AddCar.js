import React, { useState } from 'react';
import axios from 'axios';

function AddCar({ fetchCars, fetchOldCars }) {
  const [car, setCar] = useState({
    make: '',
    model: '',
    year: '',
    owner: '',
    registrationNumber: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCar((prevCar) => ({
      ...prevCar,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/cars', car);
      fetchCars(); // Refresh the car list
      fetchOldCars(); // Refresh the old car list
      setCar({ make: '', model: '', year: '', owner: '', registrationNumber: '' }); // Clear the form
    } catch (error) {
      console.error('Error adding car:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="make"
        placeholder="Make"
        value={car.make}
        onChange={handleChange}
      />
      <input
        type="text"
        name="model"
        placeholder="Model"
        value={car.model}
        onChange={handleChange}
      />
      <input
        type="number"
        name="year"
        placeholder="Year"
        value={car.year}
        onChange={handleChange}
      />
      <input
        type="text"
        name="owner"
        placeholder="Owner"
        value={car.owner}
        onChange={handleChange}
      />
      <input
        type="text"
        name="registrationNumber"
        placeholder="Registration Number"
        value={car.registrationNumber}
        onChange={handleChange}
      />
      <button type="submit">Add Car</button>
    </form>
  );
}

export default AddCar;