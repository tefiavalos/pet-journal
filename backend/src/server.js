import app from './app.js';
import { env } from './config/env.js';
import { conectarDB } from './config/db.js';

try {
  await conectarDB(env.mongodbUri);

  app.listen(env.port, () => {
    console.log(`Servidor escuchando en http://localhost:${env.port}`);
  });
} catch (error) {
  console.error('No se pudo conectar a MongoDB:', error.message);
  process.exit(1);
}
