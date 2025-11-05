# Transit

Transit is a full stack web application that provides real time transit information for San Francisco Muni. This project utilizes public transit data from GTFS feeds and the 511 API and is built with React, Node.js, and PostgreSQL.

The app uses Render to host the PostgreSQL database and backend and GitHub pages to host the frontend.

Access a live Demo [here](https://pan-cynthia.github.io/transit/).

## Features

- Browse nearby transit stops using geolocation
- View routes, directions, and stops for each transit line
- Real-time data integration with 511 API
- Database driven route and stop data for fast querying
- Interactive map with stop locations and routes

## Tech Stack

### Frontend
  - React - Component based UI
  - Axios - API communication
  - React Router - Client side routing
  - Tailwind CSS - Styling and responsive design

### Backend
  - Node.js & Express - RESTful API and server logic

### Database
  - PostgreSQL - Database

### Deployment
  - Frontend - GitHub Pages
  - Backend + Database - Render

## Note

The backend is hosted on a free Render service that goes to sleep when inactive.

If the frontend (GitHub pages) appears blank, please visit the backend once to wake it up:

[Backend API](https://transit-43ic.onrender.com/)

After ~30 seconds, refresh the frontend and it should load correctly.

## Getting Started

### Installation

To install and run the app locally, follow these steps in your terminal:

#### 1. Clone the repository

```bash
git clone https://github.com/pan-cynthia/transit.git
cd transit
```

#### 2. Install dependencies

```bash
cd backend
npm install

cd ../frontend
npm install
```

#### 3. Configure environment variables

Copy the example env file (.env.example) and fill in your own values. 

Do not commit your .env files to GitHub as they contain private information such as API keys.

##### Backend

```bash
cp backend/.env.example backend/.env
```

- `DATABASE_URL`=postgres://transit_user:transit_password@transit-43ic.onrender.com:5432/sfmta_gtfs_ou5z
- `FRONTEND_URL`=http://localhost:5173 (for local development)
- `TRANSIT_API_KEY`=your_511_api_key
- `NODE_ENV`=production

##### Frontend

```bash
cp frontend/.env.example frontend/.env
```

- `VITE_API_BASE_URL`=http://localhost:3000

#### 4. Obtain an API key

1. Visit the [511 API portal](https://511.org/open-data/token)
2. Sign up and paste your token into `TRANSIT_API_KEY` in `backend/.env`


#### 5. Start the development server

```bash
cd backend
npm run dev
```

Backend should be up and running on http://localhost:3000

#### 6. Run the frontend
In a new terminal:

```
cd frontend
npm run dev
```
Frontend should be running at http://localhost:5173

---
