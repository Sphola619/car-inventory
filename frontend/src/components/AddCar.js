// Import React and the useState hook for managing form state
import React, { useState } from 'react';

// Import axios for making HTTP requests to your backend API
import axios from 'axios';

// The AddCar component receives two functions from its parent as props:
// fetchCars and fetchOldCars — these will refresh the car lists after adding a new car
function AddCar({ fetchCars, fetchOldCars }) {
  // Initialize local state to store form input values for a new car
  const [car, setCar] = useState({
    make: '',                 // e.g., "Toyota"
    model: '',                // e.g., "Corolla"
    year: '',                 // e.g., "2020"
    owner: '',                // e.g., "Sipho"
    registrationNumber: ''    // e.g., "ABC 123 GP"
  });

  // Handle input field changes
  // This function updates the specific field that the user is typing in
  const handleChange = (e) => {
    const { name, value } = e.target; // Extract input name and value
    setCar((prevCar) => ({
      ...prevCar,           // Copy the previous car object
      [name]: value         // Update only the field that changed
    }));
  };

  // Handle form submission when the user clicks "Add Car"
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the page from refreshing (default browser behavior)

    try {
      // Send a POST request to the backend API to add a new car
      await axios.post('http://localhost:5000/cars', car);

      // Refresh the car lists in the parent component (so the new car shows up)
      fetchCars();    
      fetchOldCars(); 

      // Reset the form fields to empty after submission
      setCar({ make: '', model: '', year: '', owner: '', registrationNumber: '' });
    } catch (error) {
      // Log any error if something goes wrong
      console.error('Error adding car:', error);
    }
  };

  return (
    // Form for adding a new car — runs handleSubmit when submitted
    <form onSubmit={handleSubmit}>

      {/* Input field for "make" */}
      <input
        type="text"
        name="make"
        placeholder="Make"
        value={car.make}
        onChange={handleChange}
      />

      {/* Input field for "model" */}
      <input
        type="text"
        name="model"
        placeholder="Model"
        value={car.model}
        onChange={handleChange}
      />

      {/* Input field for "year" */}
      <input
        type="number"
        name="year"
        placeholder="Year"
        value={car.year}
        onChange={handleChange}
      />

      {/* Input field for "owner" */}
      <input
        type="text"
        name="owner"
        placeholder="Owner"
        value={car.owner}
        onChange={handleChange}
      />

      {/* Input field for "registration number" */}
      <input
        type="text"
        name="registrationNumber"
        placeholder="Registration Number"
        value={car.registrationNumber}
        onChange={handleChange}
      />

      {/* Button to submit the form */}
      <button type="submit">Add Car</button>
    </form>
  );
}

// Export the component so it can be used in another file (like App.js)
export default AddCar;
