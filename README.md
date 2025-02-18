# Car Inventory

This is a car inventory application that allows users to add, list, update, and delete cars. The application consists of a backend server built with Express and Mongoose, and a frontend built with React.

## Features

- Add a new car
- List all cars
- List cars older than 5 years
- Get a single car by ID
- Update a single car
- Update multiple cars
- Delete a specific car

## Technologies Used

- Backend: Node.js, Express, Mongoose, MongoDB
- Frontend: React, Axios

## Getting Started

### Prerequisites

- Node.js
- npm (Node Package Manager)
- MongoDB

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/Sphola619/car-inventory.git
   cd car-inventory

2. Install backend dependencies:

   cd backend
   npm install

3. Update the MongoDB connection string: Open the db.js file and
   replace the URL with your own MongoDB connection string:

  const dbConfig = {
    url: 'your-mongodb-connection-string'
  };

  export default dbConfig;

4. Install frontend dependencies:
   
   cd ../frontend/my-react-app
   npm install

### Running the Application 

1. Start the backend server:
    
   cd backend
   npm run dev or node server.js

2. Start the frontend development server:
   
   cd ../frontend/my-react-app
   npm start

3. Open your browser and navigate to http://localhost:3000 to view the
   application.

### API Endpoints

- POST /cars: Add a new car
- GET /cars: List all cars
- GET /cars/old: List cars older than 5 years
- GET /cars/:id: Get a single car by ID
- PUT /cars/:id: Update a single car
- PUT /cars: Update multiple cars
- DELETE /cars/:id: Delete a specific car

### License

This project is licensed under the ISC License.

