# User Management Server

This server is designed to handle user management functionalities, including creating, reading, updating, and deleting user records. It utilizes Express.js for routing, PostgreSQL for database management, and provides RESTful APIs for interaction.

## Setup Instructions

1. **Install Dependencies**: Ensure you have Node.js and npm installed on your system. Then, install the required dependencies by running:
2. **Database Configuration**: Set up your PostgreSQL database and configure the connection details in the `database.js` file.
3. **Run the Server**: Start the server by running:
 By default, the server runs on port 3000. You can specify a different port by setting the `PORT` environment variable.

## Endpoints

### GET `/users`

Retrieves all user records along with their address and COVID-19 details.

### POST `/users`

Creates a new user record with the provided information. The request body should contain the following fields:

- `id`: User ID
- `firstName`: User's first name
- `lastName`: User's last name
- `phone`: User's phone number
- `cellphone`: User's cellphone number
- `address`: Object containing address details (`city`, `street`, `houseNumber`)
- `covidDetails`: Object containing COVID-19 details including an array of up to 4 vaccine records (`manufactureName`, `date`), `sickDate`, and `recoveryDate`.

### PUT `/users/:id`

Updates an existing user record identified by the provided ID. The request body should contain fields to update:

- `firstName`: User's updated first name
- `lastName`: User's updated last name
- `phone`: User's updated phone number
- `cellphone`: User's updated cellphone number
- `address`: Object containing updated address details (`city`, `street`, `houseNumber`)
- `covidDetails`: Object containing updated COVID-19 details including `sickDate` and `recoveryDate`.

### DELETE `/users/:id`

Deletes the user record corresponding to the provided ID.

## Database Schema

The server operates with the following database schema:

- **Users**: Stores user information along with references to their address and COVID-19 details.
- **Address**: Contains address details for users.
- **CovidDetails**: Stores COVID-19 related information for users, including vaccine records.

## Dependencies

- **Express**: Web application framework for Node.js
- **body-parser**: Middleware for parsing incoming request bodies
- **cors**: Middleware for enabling Cross-Origin Resource Sharing
- **pg**: PostgreSQL client for Node.js

