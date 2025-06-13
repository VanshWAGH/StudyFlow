import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import { connect } from 'mongoose';
import {connectDB} from './config/db.js';
import userRouter from './routes/userRoute.js';
import taskRouter from './routes/taskRoute.js';

const app = express();
const port = process.env.PORT || 4000;

// MIDDLEWARE
app.use(cors({
  origin: 'http://localhost:5173', // Your frontend origin
  credentials: true // If you're using cookies/sessions
}));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

// DB CONNECTION
connectDB();

// ROUTES
app.use("/api/user", userRouter);
app.use("/api/tasks", taskRouter);

app.get('/', (req, res) => {
    res.send('API WORKING');
})

app.listen(port, ()=>{
    console.log(`Server Started on http://localhost:${port}`)
})