# Project Name

This project consists of a frontend and a backend. The frontend is built with React and uses Vite as the build tool, while the backend is a Node.js application using Express.

## Project Structure

### Frontend

- **frontend/**: Contains the React application.
  - **src/**: Source code for the frontend.
    - **services/**: Contains service files that handle API calls using axios.
      - **realEstateService.js**: Handles API calls related to real estate data.
      - **marketingVideoService.js**: Handles API calls related to marketing video data.
    - **components/**: React components.
    - **pages/**: Contains page components for different views.
    - **hooks/**: Custom React hooks.
    - **lib/**: Utility libraries.
    - **assets/**: Static assets like images and styles.
    - **App.jsx**: Main application component.
    - **main.jsx**: Entry point for the React application.
    - **index.css**: Global styles.
  - **package.json**: Frontend dependencies and scripts.
  - **vite.config.js**: Configuration for Vite.

### Backend

- **backend/**: Contains the Node.js backend application.
  - **src/**: Source code for the backend.
    - **controllers/**: Contains controller files that handle business logic.
      - **realEstateController.js**: Handles real estate data logic.
      - **marketingController.js**: Handles marketing data logic.
    - **routes/**: Contains route files that define API endpoints.
      - **realEstateRoutes.js**: Defines routes for real estate data.
      - **marketingRoutes.js**: Defines routes for marketing data.
    - **services/**: Contains service files that interact with external services or databases.
    - **utils/**: Utility functions and helpers.
  - **server.js**: Entry point for the backend application.
  - **package.json**: Backend dependencies and scripts.
  - **.env**: Environment variables for the backend.

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

### Frontend

1. Navigate to the frontend directory:
   ```sh
   cd frontend
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Start the development server:
   ```sh
   npm run dev
   ```
   The frontend will be available at `http://localhost:5173`.

### Backend

1. Navigate to the backend directory:
   ```sh
   cd backend
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Create a `.env` file in the backend directory with the following content (adjust as needed):
   ```
   PORT=5000
   FRONTEND_URL=http://localhost:5173
   ```

4. Start the backend server:
   ```sh
   npm run dev
   ```
   The backend will be available at `http://localhost:5000`.

## How the Project Works

### Frontend

The frontend is a React application that interacts with the backend API. It uses axios to make HTTP requests to the backend. The main components are:

- **App.jsx**: The main component that renders the application.
- **services/realEstateService.js**: A service file that contains functions to interact with the backend API. For example:
  ```javascript
  import axios from 'axios';

  const API_URL = 'http://localhost:5000/api';

  export const getRealEstateData = async () => {
    const response = await axios.get(`${API_URL}/realestate`);
    return response.data;
  };
  ```

- **services/marketingVideoService.js**: A service file that contains functions to interact with the backend API for marketing video data. For example:
  ```javascript
  import axios from 'axios';

  const API_URL = 'http://localhost:5000/api';

  export const getMarketingVideoData = async () => {
    const response = await axios.get(`${API_URL}/marketing`);
    return response.data;
  };
  ```

### Backend

The backend is a Node.js application using Express. It provides API endpoints for the frontend to interact with. The main components are:

- **server.js**: The entry point for the backend application. It sets up the Express server and connects to the routes.
  ```javascript
  import express from 'express';
  import realEstateRoutes from './src/routes/realEstateRoutes.js';
  import marketingRoutes from './src/routes/marketingRoutes.js';

  const app = express();
  const PORT = process.env.PORT || 5000;

  app.use(express.json());
  app.use('/api/realestate', realEstateRoutes);
  app.use('/api/marketing', marketingRoutes);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
  ```

- **routes/realEstateRoutes.js**: Defines the API endpoints for real estate data. For example:
  ```javascript
  import express from 'express';
  import { getRealEstateData } from '../controllers/realEstateController.js';

  const router = express.Router();

  router.get('/realestate', getRealEstateData);

  export default router;
  ```

- **routes/marketingRoutes.js**: Defines the API endpoints for marketing data. For example:
  ```javascript
  import express from 'express';
  import { getMarketingData } from '../controllers/marketingController.js';

  const router = express.Router();

  router.get('/marketing', getMarketingData);

  export default router;
  ```

- **controllers/realEstateController.js**: Contains the business logic for handling requests. For example:
  ```javascript
  export const getRealEstateData = (req, res) => {
    // Logic to fetch real estate data
    res.json({ message: 'Real estate data retrieved successfully' });
  };
  ```

- **controllers/marketingController.js**: Contains the business logic for handling marketing requests. For example:
  ```javascript
  export const getMarketingData = (req, res) => {
    // Logic to fetch marketing data
    res.json({ message: 'Marketing data retrieved successfully' });
  };
  ```

## API Endpoints

- **POST /api/real-estate/generate-video**: Generates a real estate property video tour script.
- **POST /api/real-estate/validate-parameters**: Validates real estate video parameters.
- **GET /api/real-estate/info**: Provides information about the real estate API.

- **POST /api/marketing/generate-video**: Generates a marketing video script for Suplimax Energy Drink.
- **POST /api/marketing/validate-parameters**: Validates marketing video parameters.
- **GET /api/marketing/suggested-features**: Gets suggested product features for Suplimax Energy Drink.
- **GET /api/marketing/info**: Provides information about the marketing API.

## Conclusion

This project demonstrates a simple full-stack application with a React frontend and a Node.js backend. The frontend interacts with the backend API to fetch and display data. The project structure is organized to separate concerns and make it easy to maintain and scale.

For any questions or issues, please open an issue in the repository. 