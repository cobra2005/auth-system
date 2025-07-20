import express from 'express';
import authRouter from './routes/auth.mjs';
import 'dotenv/config';

const app = express();

app.use(express.json());
app.use(authRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
})