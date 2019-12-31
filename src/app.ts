import compression from 'compression';
import express from 'express';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import swaggerDoc from '../docs/bankka-docs.json';

require('dotenv').config();

// const isProduction = process.env.NODE_ENV === 'production';

const app: express.Application = express();

app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
/* app.use(morgan('combined', {
  stream: logger.stream(),
  skip: () => !isProduction,
})); */
app.use(morgan('dev'));

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.get('/', (_, res: express.Response) => res.status(301).redirect('/docs'));

app.all('*', (_, res: express.Response) => {
  res.status(404).json({
    status: 'error',
    error: 'not found',
  });
});

const Sequelize = require('sequelize');

let sequelize;

if (process.env.NODE_ENV === 'development') {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS, {
      host: process.env.DB_HOST,
      dialect: 'postgres',
    },
  );
}

if (process.env.NODE_ENV === 'test') {
  sequelize = new Sequelize(
    process.env.TEST_DB_NAME,
    process.env.TEST_DB_USER,
    process.env.TEST_DB_PASS, {
      host: process.env.TEST_DB_HOST,
      dialect: 'postgres',
    },
  );
}

sequelize
  .authenticate()
  .then(() => {
    console.log('connection has been established');
  })
  .catch((err: Error) => {
    console.error('unable to connect to the database', err);
  });

sequelize
  .query('SELECT current_database();')
  .then((result: any) => console.log(result))
  .catch((err: Error) => {
    console.error('database issue: ', err);
  });

export default app;
