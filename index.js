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
app.use(
  cors({
    origin: 'https://your-frontend.netlify.app', // Netlify frontend URL
    credentials: true, // if you need to send cookies
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(authenticateCookie('token'));

// Rooutes
app.get('/', (req, res) => {
  res.status(200).send('Server is Running!');
});

app.use('/user', userRoute);
app.use('/bank', bankRoute);

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
