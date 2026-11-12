import 'dotenv/config';

if (!process.env.JWT_SECRET) {
  throw new Error('Falta definir JWT_SECRET en el archivo .env');
}

export const env = {
  port: Number(process.env.PORT) || 3000,
  mongodbUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/petjournal',
  // Puede tener varias URLs separadas por coma (por ejemplo, la local y la de producción)
  corsOrigin: (process.env.CORS_ORIGIN || 'http://localhost:5173').split(',').map((url) => url.trim()),
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
};
