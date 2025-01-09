# Solita dev academy 2023 exercise
https://github.com/solita/dev-academy-2023-exercise
# Web App

This is a web application built with React for the frontend, Node.js for the backend, and MongoDB for the database. Follow the instructions below to set up and run the app locally.

## Prerequisites

Before getting started, make sure you have the following installed on your machine:

- Node.js: https://nodejs.org
- MongoDB: https://www.mongodb.com

## Installation

1. Clone the repository from GitHub:

```bash
git clone https://github.com/ArttuLeh/dev-academy-2023-exercise.git
```

- if you use SHH

```bash
git clone git@github.com:ArttuLeh/dev-academy-2023-exercise.git
```

2. Change into the project's directory:

```bash
cd your-dir
```

3. Install the dependencies for both the frontend and the backend:

```bash
cd frontend
npm install
```

```bash
cd ../backend
npm install
```

## Configuration

1. Create a `.env` file in the `backend` directory and configure the following environment variables:

```makefile
PORT=3003
MONGODB_URI=your-mongodb-connection-string
```

Replace `your-mongodb-connection-string` with the actual connection string for your MongoDB database.

2. Save the file.

## Running the App

1. Start the backend by running the following command in a separate terminal window or tab:

```bash
cd backend
npm run dev
```

2. Open another terminal window or tab, and in the project's root directory, start the frontend

```bash
cd frontend
npm start
```

3. Your web app should now be running locally. Open your browser and visit http://localhost:3000 to see the app in action.
