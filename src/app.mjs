import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import connectDB from './config/db.mjs';
import routes from './routes/index.mjs';
import notFoundHandler from './middlewares/errors/notFoundHandler.mjs';
import globalErrorHandler from './middlewares/errors/globalErrorHandler.mjs';
import './strategies/localStrategy.mjs';

const app = express();

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION_SECRET,
  saveUninitialized: false,
  resave: false,
  cookie: {
    maxAge: 60000 * 60,
  }
}));

app.use(passport.initialize());
app.use(passport.session());

// Database connection
connectDB();

app.use(routes);
app.use(notFoundHandler);
app.use(globalErrorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
});