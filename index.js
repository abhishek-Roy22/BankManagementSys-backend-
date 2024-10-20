import 'dotenv/config';
import express from 'express';
import connectToDatabase from './services/connection.js';
import userRoute from './routes/userRoute.js';
import bankRoute from './routes/bankRoute.js';
import cors from 'cors';
import { authenticateCookie } from './middleware/auth.js';
import cookieParser from 'cookie-parser';

const app = express();
const PORT = process.env.PORT || 3000;
const URL = process.env.MONGO_URI;

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: 'https://bankmanagementsys.netlify.app', // change in production
    credentials: true,
  })
);
app.use(cookieParser());

// Rooutes
app.get('/', (req, res) => {
  res.status(200).send('Server is Running!');
});

//To check whether the user is logged
app.get('/auth/check', authenticateCookie('token'), (req, res) => {
  res.status(200).json({ message: 'User is authenticated', user: req.user });
});

app.use('/user', userRoute);
app.use('/bank', authenticateCookie('token'), bankRoute);

// connect to db
connectToDatabase(URL).then(() => {
  try {
    app.listen(PORT, () => {
      console.log(`Server is running at port ${PORT} & connected to db`);
    });
  } catch (error) {
    console.log(error.message);
  }
});
