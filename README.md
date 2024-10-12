# Link Sharing App

This is a full-stack application where users can register, log in, and share links. It features a React frontend, TailwindCSS styling, and a backend powered by Node.js, Express, and Prisma ORM. The app uses PostgreSQL as the database.

## Table of Contents

- [Installation](#installation)
  - [Frontend](#frontend)
  - [Backend](#backend)
- [Usage](#usage)
- [Authentication](#authentication)

## Installation

## Make sure you have installed Node.js in your system.

Clone the repository:

```bash
git clone https://github.com/MdWahiduzzamanEmon/Link-sharing-app.git
```

### Frontend

Navigate to the frontend directory:

```bash
cd frontend
```

Install the dependencies:

```bash
npm install
```

Start the frontend development server:

```bash
npm run dev
```

The frontend will be accessible at http://localhost:5173/.

### Backend

Navigate to the backend directory:

```bash
cd backend
```

Install the dependencies:

```bash
npm install
```

Ensure the PostgreSQL database is set up and configured in `.env` (see below for `.env` configuration).

Start the backend development server:

```bash
npm run start:dev
```

The backend will be accessible at http://localhost:4000/linkShare

## Usage

After setting up both the frontend and backend, the application should be running. You can access the frontend UI on the specified port (usually localhost:5173), and interact with the backend on the API server (usually localhost:4000/linkShare).

## Authentication

The app includes a simple authentication system where users can:

- Register – Create a new account with a username and password.
- Login – Use registered credentials to log in and access the main UI.
- Save Links - Save links to the database and view them in the main UI.
- Order Changes - Change the order with drag and drop feature in the main UI.
- Delete Links - Delete links from the database.
- Profile - View the profile of the user. Added drag and drop feature to change user profile picture.
- Preview - Preview the profile of the user and add link share to the profile.
- Logout - Logout from the application.

### Register

To register a new user, simply navigate to the register page on the frontend and provide the required details (username, email, password).

-password should be atleast 8 characters

### Login

To log in, use the Login page where you can input your credentials (email and password). If the credentials match an existing user in the database, you will be redirected to the main UI.

### Protecting Routes

Once the user logs in, they will receive a JWT token that will be stored in localStorage. This token is used to protect certain routes and ensure only authenticated users can access the main UI and other protected features.

### Testing Demo User

To test the application without registering, you can use the following demo user credentials:

- email: `wahedemon09@gmail.com`
- password: `12345678`
