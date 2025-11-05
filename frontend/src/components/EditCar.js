// Import React, useState (for form state), and useEffect (for fetching the car data when the component loads)
import React, { useState, useEffect } from 'react';

// Import axios to make HTTP requests to your backend API
import axios from 'axios';

// The EditCar component takes several props from its parent:
// carId - the ID of the car being edited
// fetchCars & fetchOldCars - functions to refresh data after editing
// onClose - function to close the edit form once editing is done
function EditCar({ carId, fetchCars, fetchOldCars, onClose }) {

  // Local state to store the car’s details being edited
  const [car, setCar] = useState({
    make: '',
    model: '',
    year: '',
    owner: '',
    registrationNumber: ''
  });

  // useEffect runs once when the component loads OR when carId changes
  // It fetches the existing car data from the backend and pre-fills the form
  useEffect(() => {
    const fetchCar = async () => {
      try {
        // GET request to fetch the car’s current data from the server by ID
        const response = await axios.get(`http://localhost:5000/cars/${carId}`);
        // Set the car data into local state so the form displays the current values
        setCar(response.data);
      } catch (error) {
        console.error('Error fetching car:', error);
      }
    };

    fetchCar();
  }, [carId]); 
  // Dependency array [carId] ensures the effect re-runs if the selected car changes

  // Handle user typing into the input fields
  // This updates only the field that’s being changed
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCar((prevCar) => ({
      ...prevCar,   // keep all previous fields
      [name]: value // update only the current input field
    }));
  };

  // Handle form submission when user clicks "Save Changes"
  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent browser from refreshing the page
    try {
      // Send PUT request to backend to update the car details by ID
      await axios.put(`http://localhost:5000/cars/${carId}`, car);

      // Refresh both current and old car lists after updating
      fetchCars();
      fetchOldCars();

      // Close the edit form once the update is successful
      onClose();
    } catch (error) {
      console.error('Error updating car:', error);
    }
  };

  return (
    // Form for editing car details
    <form onSubmit={handleSubmit}>
      {/* Input for car make */}
      <input
        type="text"
        name="make"
        placeholder="Make"
        value={car.make}
        onChange={handleChange}
      />

      {/* Input for car model */}
      <input
        type="text"
        name="model"
        placeholder="Model"
        value={car.model}
        onChange={handleChange}
      />

      {/* Input for car year */}
      <input
        type="number"
        name="year"
        placeholder="Year"
        value={car.year}
        onChange={handleChange}
      />

      {/* Input for car owner */}
      <input
        type="text"
        name="owner"
        placeholder="Owner"
        value={car.owner}
        onChange={handleChange}
      />

      {/* Input for registration number */}
      <input
        type="text"
        name="registrationNumber"
        placeholder="Registration Number"
        value={car.registrationNumber}
        onChange={handleChange}
      />

      {/* Button to submit changes */}
      <button type="submit">Save Changes</button>

      {/* Button to cancel editing and close form */}
      <button type="button" onClick={onClose}>Cancel</button>
    </form>
  );
}

// Export component for use in other parts of the app (like CarList.js)
export default EditCar;
