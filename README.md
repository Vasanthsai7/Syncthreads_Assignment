# SyncThreads Full-Stack Application  

MapView is a full-fledged React and Node.js application that includes authentication, a dashboard with interactive cards, and a map integration using an open-source mapping library.  

## Installation  

Clone the repository and install dependencies for both backend and frontend.  

```bash
git clone https://github.com/your-repository/syncthreads-app.git
cd syncthreads-app
```

### Backend Setup  

1. Navigate to the backend directory and install dependencies:  

```bash
cd backend
npm install
```  

2. Create a `.env` file in the backend directory with the following environment variables:  

```bash
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/Syncthreads
JWT_SECRET=your_jwt_secret
```  

3. Start the backend server:  

```bash
node server.js
```  

The backend will be running on `http://localhost:5000`.  

### Frontend Setup  

1. Navigate to the frontend directory and install dependencies:  

```bash
cd frontend
npm install
```  

2. Start the frontend development server:  

```bash
npm start
```  

The frontend will be running on `http://localhost:3000`.  

## Features  

- **User Authentication**: Register and login using JWT authentication.  
- **Dashboard**: Displays interactive location-based cards.  
- **Map Integration**: Shows locations dynamically on a map.  
- **Private Routes**: Secure routes for authenticated users.  
- **API Handling**: Fetch data securely from the backend.  

## API Endpoints  

### Authentication  

- **POST** `/api/auth/register` → Register a new user  
- **POST** `/api/auth/login` → Login user and get token  

### Dashboard  

- **GET** `/api/dashboard` → Fetch dashboard data (protected route)  

### Map Integration  

- **GET** `/api/map/:location` → Fetch map data for a specific location  

## Usage  

After running both frontend and backend, navigate to `http://syncthreads-assignment-ndhu.vercel.app/` and:  

1. Register a new account.  
2. Login with your credentials.  
3. View dashboard with location cards.  
4. Click a card to view the map.  



