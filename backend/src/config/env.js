import 'dotenv/config';

export const env = {
  port: Number(process.env.PORT) || 3000,
  mongodbUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/petjournal',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173',
};
