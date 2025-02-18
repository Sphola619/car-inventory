import React from 'react';

// Functional component to display a list of cars older than 5 years
function OldCarsList({ oldCars }) {
  return (
    <div>
      <h2>Cars Older Than 5 Years</h2>
      <ul>
        {oldCars.map((car) => (
          // Each car is displayed as a list item with key as car's unique ID
          <li key={car._id}>
            {car.make} {car.model} ({car.year}) - Owner: {car.owner} - Registration Number: {car.registrationNumber}
          </li>
        ))}
      </ul>
    </div>
  );
}

// Export the component to be used in other parts of the application
export default OldCarsList;