import { Sequelize } from 'sequelize';
import 'dotenv/config';

// Validate database environment variables
const requiredEnvVars = ['PGUSER', 'PGHOST', 'PGPASSWORD', 'PGDATABASE', 'PGPORT'];
const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
  throw new Error(
    `Missing required environment variables: ${missingVars.join(', ')}. ` +
    'Please check your .env file and ensure all required variables are set.'
  );
}

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.PGHOST,
  port: parseInt(process.env.PGPORT || '5432'),
  username: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  pool: {
    max: 20,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  logging: process.env.NODE_ENV === 'development' ? console.log : false
});

export default sequelize;