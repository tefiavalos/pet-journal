import express from 'express';
import cors from 'cors';
import { env } from './config/env.js';
import routes from './routes/index.js';
import { rutaNoEncontrada, manejarErrores } from './middlewares/errorHandler.js';

const app = express();

app.use(cors({ origin: env.corsOrigin }));
app.use(express.json());

app.use('/api', routes);

app.use(rutaNoEncontrada);
app.use(manejarErrores);

export default app;
