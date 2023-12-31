# Notes App By Pablo Amico

This project is a simple web application that allows users to create, edit, and manage notes. It is structured as a Full Stack application with a separate frontend and backend.

## Table of Contents

- [Requirements](#requirements)
- [Technologies Used](#technologies-used)
- [Folder Structure](#folder-structure)
- [Usage](#usage)
- [User Stories](#user-stories)
- [Extra Functional and Non-Functional Requirements](#extra-functional-and-non-functional-requirements)
- [Login](#login)
- [Live Deployed Version](#live-deployed-version)

## Requirements

This project is divided into two phases:

### Phase 1: Note creation

- Allow users to create, edit, and delete notes.
- Archive/unarchive notes.
- List active and archived notes.

### Phase 2: Tag application and filtering

- Allow users to add/remove categories to notes.
- Filter notes by category.

## Technologies Used

### Backend (backend folder)

- **Node.js v20.9.0/Express4.18.2**: Used for building the backend server to handle API requests.
- **PostgreSQL 8.11.3**: Database for persisting note data.
- **Sequelize 6.35.2**: ORM for interacting with the PostgreSQL database.
- **dotenv 16.3.1**: For environment variables handling.
- **morgan 1.10.0**: HTTP request logger middleware.
- **xss 1.0.14**: Prevents Cross-Site Scripting (XSS) attacks.
- **nodemon 3.0.2**: Development tool for auto-restarting the server.

### Frontend (frontend folder)

- **Next.js 14.0.4**: React framework for building the frontend.
- **React 18**: JavaScript library for building user interfaces.
- **Tailwind CSS 3.3.0**: Utility-first CSS framework used for styling.
- **TypeScript 5**: Typed JavaScript.
- **@clerk/nextjs 4.29.1**: Authentication system for Next.js.
- **@formkit/auto-animate 0.8.1**: Animation library for UI transitions.
- **ESLint and Prettier 8**: Code linting and formatting tools for maintaining code quality.

## Folder Structure

my-project/
│
├── backend/
│ ├── controllers for logic and data manipulation
│ ├── handlers for calling controllers and handling responses separatedly
│ ├── middlewares for security validations and general backend filtering
│ ├── models for database modeling
│ ├── app.js for server purposes
│ ├── db.js separete db file for handling database relations in case is necesary
│ ├── .env file for secure keys management.
│ ├── package.json
│ ├── ...
│
└── frontend/
├── app ├── components (custom-buttons / card / card-container / nav / notes / custom-select / Sign-in / Sign-up)
│ ├── context (NoteContext for state management y api calls / Filtercontext por getting filter products using backend filtering middlware)
│ ├── notesapp Page route only allowed once you authenticades via clerk login sistem
│ ├── types folder
│ ├── Layout.tsx ssr with context providers
│ ├── Page.tsx main welcome page pre-login
│ ├── app
│ ├── app
│
│
├── package.json // for global starting the app with "npm start command"

## User Stories

- Phase 1:
- As a user, you will be able to create, edit, and delete notes.
- As a user, you will be able to archive/unarchive notes.
- As a user, you will be able to list both my active notes.
- As a user, you will be able to list both my archived notes.

- Phase 2:
- As a user, you will be able to add/remove categories to notes.
- As a user, you will be able to filter notes by category.

### App Setup

1. Go to the `root` folder and run `npm start` to install dependencies and run the app.
2. Set up a PostgreSQL database and configure the `.env` file with the necessary credentials.
   \*.env variables for backend
   DB_NAME=postgres
   DB_USER=postgres
   DB_PASSWORD=admin
   DB_HOST=localhost

   \*.env variables for frontend
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_ZmlybS1veXN0ZXItNjMuY2xlcmsuYWNjb3VudHMuZGV2JA
   CLERK_SECRET_KEY=sk_test_NxnfZS312YvEsTxDcr1wgy41VJyOnWksWAcDBaXv7K
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/notesapp
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/notesapp

(backend runs in http://localhost:3000 and frontend runns in http://localhost:3001)

3. Enjoy the app !.

## Usage

Filtering works with an input to search by title with substrings, a select for the categories, and a toggle button that change between archived and unarchived notes.

Notes deletition has a confirmation modal in order to avoid accidental deletitions.

## Extra Functional and Non-Functional Requirements

### Login

- The app utilizes Clerk for fast and reliable config user authentication.

Default user:
-user: institutointerchange@gmail.com
-password: ExamplePassword!

### Live Deployed Version

- [Add URL of live deployed version, if available]
