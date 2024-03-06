import cors from "cors"
import dotenv from "dotenv"
import express from "express"
import allRoutes from './routes/index';

dotenv.config();

const app = express();

app.use(cors({origin: '*'}))
app.use(express.json())

//api
app.use('/api', allRoutes);

export default app;