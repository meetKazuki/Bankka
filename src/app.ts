import compression from 'compression';
import express from 'express';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import swaggerDoc from '../docs/bankka-docs.json';

require('dotenv').config();

const app = express();

app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.get('/', (_, res: express.Response) => res.status(301).redirect('/docs'));

export default app;
