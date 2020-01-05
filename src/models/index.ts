const { Sequelize } = require('sequelize');

require('dotenv').config();

const env = process.env.NODE_ENV || 'development';
const config = require(`${__dirname}/../sequelize.config.ts`)[env];

const sequelize = config.use_env_variable
  ? new Sequelize(config.use_env_variable, config)
  : new Sequelize(config.database, config.username, config.password, config);

export default sequelize;
