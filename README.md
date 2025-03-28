# E-Voting System

A modern, secure, and user-friendly electronic voting system built for MallaReddy University. This system enables students to participate in elections digitally while maintaining transparency and security.

## Features

- **User Authentication**
  - Secure login and registration system
  - Role-based access (Admin/Student)
  - Email domain validation (@mallareddyuniversity.ac.in)

- **Election Management**
  - Create and manage elections
  - Set election duration
  - Add candidates
  - Real-time election status tracking

- **Voting System**
  - Secure voting interface
  - One-time voting per election
  - Real-time vote counting
  - Election results visualization

- **Admin Dashboard**
  - Create and manage elections
  - View election statistics
  - Monitor active elections
  - Access detailed reports

- **Student Dashboard**
  - View active elections
  - Cast votes
  - Access election results
  - Track voting history

## Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Framer Motion (Animations)
- React Router
- Axios

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Nodemailer

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd E-Voting
```

2. Install Frontend Dependencies:
```bash
cd project
npm install
```

3. Install Backend Dependencies:
```bash
cd ../Backend
npm install
```

4. Environment Setup:
   - Create a `.env` file in the Backend directory with the following variables:
   ```
   DB_CONNECTION_SECRET=your_mongodb_connection_string
   PORT=5000
   JWT_SECRET=your_jwt_secret
   ```

## Running the Application

1. Start the Backend Server:
```bash
cd Backend
npm start
```
The backend server will run on `http://localhost:5000`

2. Start the Frontend Development Server:
```bash
cd project
npm run dev
```
The frontend application will run on `http://localhost:5173`

## Deployment

The application is deployed at:
- Backend: https://e-voting-deqp.onrender.com
- Frontend: [Your frontend deployment URL]

The application automatically detects the environment and uses the appropriate API URL:
- Development: http://localhost:5000
- Production: https://e-voting-deqp.onrender.com

## Project Structure

```
E-Voting/
├── Backend/
│   ├── src/
│   │   ├── config/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
|   |   |── utils/
│   │   └── app.js
│   ├── package.json
│   └── .env
└── project/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── context/
    │   └── App.jsx
    ├── package.json
    └── index.html
```

## API Endpoints

### Authentication
- POST `/signup` - Register a new user (student/admin)
- POST `/login` - User login
- POST `/logout` - User logout
- GET `/user` - Get authenticated user's data

### Admin Routes
- POST `/createelection` - Create a new election
- GET `/elections` - Get all elections created by the admin
- GET `/admin/elections/:id` - Get specific election details
- POST `/admin/elections/:id/close` - Close an election
- DELETE `/admin/elections/:id` - Delete an election
- GET `/eligible-students` - Get list of eligible students for election

### Student Routes
- GET `/elections/:section/:year` - Get all elections for student's section and year
- GET `/elections/:id` - Get specific election details
- POST `/vote` - Cast a vote in an election

## Security Features

- JWT-based authentication
- Email domain validation
- One-time voting per election
- Secure password hashing
- Protected routes
- Input validation

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email evotingsupport@gmail.com.
