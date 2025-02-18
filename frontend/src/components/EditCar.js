import React, { useState, useEffect } from 'react';
import axios from 'axios';

function EditCar({ carId, fetchCars, fetchOldCars, onClose }) {
  const [car, setCar] = useState({
    make: '',
    model: '',
    year: '',
    owner: '',
    registrationNumber: ''
  });

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/cars/${carId}`);
        setCar(response.data);
      } catch (error) {
        console.error('Error fetching car:', error);
      }
    };

    fetchCar();
  }, [carId]);

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
      await axios.put(`http://localhost:5000/cars/${carId}`, car);
      fetchCars();
      fetchOldCars();
      onClose();
    } catch (error) {
      console.error('Error updating car:', error);
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
      <button type="submit">Save Changes</button>
      <button type="button" onClick={onClose}>Cancel</button>
    </form>
  );
}

export default EditCar;