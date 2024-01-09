# WaterTracker Backend

<img src="https://res.cloudinary.com/doj55bihz/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1704651372/img/Logo-890d13ba_to7trg.jpg?_s=public-apps" alt="Logo">

Node.js server for the [WaterTracker](https://water-tracker-app.netlify.app) || [GitHub](https://github.com/YanLozovskyi/water-tracker)

WaterTracker is a application that allows the user to monitor their daily water consumption.

## Table of Content

- [Routing](#routing)
- [Features](#features)
- [Getting Started](#getting-started)
- [Technologies and packages Used](#technologies-and-packages-used)
- [Contributors](#contributors)

## Routing

### Auth Routes

- `POST /api/auth/register`: Registration user
- `POST /api/auth/login`: Login user
- `POST /api/auth/request-pass`: Send password recovery request
- `POST /api/auth/reset-pass`: Change password after email request
- `POST /api/auth/logout`: Logout user

### User Routes

- `PATCH /api/user/avatar`: Add/change user avatar
- `GET /api/user/current`: Get current user information
- `PATCH /api/user/edit`: Change user information
- `DELETE /api/user/delete-account`: Delete user account

### WaterRate Routes

- `PATCH /api/waterrate`: Change user waterrate

### Water Routes

- `POST /api/water`: Add water value
- `PATCH /api/water/{id}`: Update water value
- `DELETE /api/water/{id}`: Delete water value

### Today Routes

- `GET /api/today`: Get today water values

### Month Routes

- `GET /api/month`: Get period water values

## Features

- User registration and loginization by using password or Google Auth
- Password recovery through email confirmation request
- User authorization and logout
- Editting user data (avatar, name, email, password)
- Deleting a user account and his water values
- Changing the calculation of the daily rate of water consumption
- Adding, update, delete a record of consumed water
- Calculation of the amount of water for the current day or the selected month

## Getting Started

1. Clone the repo: `git clone https://github.com/LIGHT131313/WaterTracker_backend.git`
2. Install dependencies: `npm install`
3. Start the server: `npm start` or `npm run start:dev`

## Technologies and packages Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (JSON Web Tokens)
- Bcrypt
- Dotenv
- CORS
- Nodemon
- Axios
- Cloudinary
- Cross-env
- Joi
- Morgan
- Multer
- Nanoid
- Nodemailer
- Query-string
- Swagger-ui-express

## Contributors

- Serhii Kozhanov [GitHub](https://github.com/LIGHT131313) || [LinkedIn](https://www.linkedin.com/in/serhii-kozhanov/)
- Volodymyr Fetisov [GitHub](https://github.com/Fetivol) || [LinkedIn](https://www.linkedin.com/in/volodymyr-fetisov-7aa069173)
- Stanislav Boychuk [GitHub](https://github.com/Fasten-belts) || [LinkedIn](https://www.linkedin.com/in/stanislav-boychuk)
