import React, { useState } from 'react';
import EditCar from './EditCar';

function CarList({ cars, updateCar, deleteCar, fetchCars, fetchOldCars }) {
  const [editingCarId, setEditingCarId] = useState(null);

  const handleEdit = (id) => {
    setEditingCarId(id);
  };

  const handleCloseEdit = () => {
    setEditingCarId(null);
  };

  return (
    <div>
      <h2>Car List</h2>
      <ul>
        {cars.map((car) => (
          <li key={car._id}>
            {car.make} {car.model} ({car.year}) - Owner: {car.owner} - Registration Number: {car.registrationNumber}
            <button onClick={() => handleEdit(car._id)}>Edit</button>
            <button onClick={() => deleteCar(car._id)}>Delete</button>
          </li>
        ))}
      </ul>
      {editingCarId && (
        <EditCar
          carId={editingCarId}
          fetchCars={fetchCars}
          fetchOldCars={fetchOldCars}
          onClose={handleCloseEdit}
        />
      )}
    </div>
  );
}

export default CarList;