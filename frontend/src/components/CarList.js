// Import React and the useState hook for managing local state
import React, { useState } from 'react';

// Import the EditCar component (used when a user clicks "Edit")
import EditCar from './EditCar';

// CarList component receives props from its parent (App or another component)
function CarList({ cars, updateCar, deleteCar, fetchCars, fetchOldCars }) {
  // Local state to track which car is being edited (by its ID)
  const [editingCarId, setEditingCarId] = useState(null);

  // When user clicks "Edit", store the car's ID in state
  const handleEdit = (id) => {
    setEditingCarId(id);
  };

  // When editing is finished or cancelled, clear the editingCarId
  const handleCloseEdit = () => {
    setEditingCarId(null);
  };

  return (
    <div>
      <h2>Car List</h2>

      {/* Display all cars in an unordered list */}
      <ul>
        {/* Loop through the cars array and display each car’s details */}
        {cars.map((car) => (
          // Each <li> must have a unique "key" (React uses it for performance)
          <li key={car._id}>
            {/* Show car details */}
            {car.make} {car.model} ({car.year}) - Owner: {car.owner} - Registration Number: {car.registrationNumber}

            {/* "Edit" button sets the car to be edited */}
            <button onClick={() => handleEdit(car._id)}>Edit</button>

            {/* "Delete" button calls the deleteCar function (passed in as a prop) */}
            <button onClick={() => deleteCar(car._id)}>Delete</button>
          </li>
        ))}
      </ul>

      {/* If a car is currently being edited (editingCarId not null), show the EditCar form */}
      {editingCarId && (
        <EditCar
          carId={editingCarId}      // Pass the selected car ID to EditCar
          fetchCars={fetchCars}      // Function to refresh the updated car list
          fetchOldCars={fetchOldCars} // Possibly used to fetch historical data (if applicable)
          onClose={handleCloseEdit}  // Function to close the edit form
        />
      )}
    </div>
  );
}

// Export this component so it can be used in other files (like App.js)
export default CarList;
