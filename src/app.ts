import compression from 'compression';
import { config } from 'dotenv';
import express from 'express';
import morgan from 'morgan';

config();

const { NODE_ENV } = process.env;
const app = express();

app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
if (['development', 'production'].includes(NODE_ENV)) app.use(morgan('dev'));

export default app;
