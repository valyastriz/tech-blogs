# Daily Echo

## Description
Daily Echo is a personal diary web application that allows users to log their daily experiences, thoughts, and reflections. The platform provides a secure and intuitive interface for users to create, edit, delete, and view their diary entries. Users can also email themselves copies of their entries for safekeeping or sharing.

## Features
- User authentication and session management
- Create, view, edit, and delete diary entries
- Email entries to the user's registered email address
- Responsive design with intuitive user interface
- Integrated with PostgreSQL for data persistence
- Secure password management using bcrypt
- Email functionality using Nodemailer

## Installation
1. Clone the repository:
    ```
    git clone https://github.com/valyastriz/tech-blogs.git
    ```
2. Navigate to the project directory:
    ```
    cd daily-echo
    ```
3. Install dependencies:
    ```
    npm install
    ```
4. Create a `.env` file in the root directory with the following environment variables:
    ```
    DB_NAME=yourDatabaseName
    DB_USER=yourDatabaseUser
    DB_PASSWORD=yourDatabasePassword
    EMAIL_USER=youremail@gmail.com
    EMAIL_PASS=yourpassword
    ```

5. Set up your database by running the following commands:
    ```
    npx sequelize-cli db:create
    npx sequelize-cli db:migrate
    ```

6. Start the server:
    ```
    npm start
    ```

## Usage
1. Sign up or log in to your account.
2. Create a new diary entry by clicking the "New Entry" button.
3. View, edit, or delete your existing entries.
4. Email yourself a copy of any entry by clicking the "Email" button on the entry page.

## Live Deployed Site
Check out the live version of the site [here](https://tech-blogs-84ox.onrender.com).

## GitHub Repository
You can view the code for this project on GitHub [here](https://github.com/valyastriz/tech-blogs.git).

## Technologies Used
- Node.js
- Express.js
- Sequelize (PostgreSQL)
- Handlebars.js
- bcrypt for password hashing
- Nodemailer for email functionality
- Bootstrap for styling
- Render for deployment

