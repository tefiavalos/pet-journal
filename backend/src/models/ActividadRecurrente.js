import mongoose from 'mongoose';
import { TIPOS_TAREA, HORA_REGEX } from './TareaDiaria.js';

// Actividad que se repite todos los días (por ejemplo, comida a las 08:00).
// A partir de ellas se generan las tareas diarias.
const actividadRecurrenteSchema = new mongoose.Schema(
  {
    mascotaId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Mascota',
      required: true,
    },
    tipo: {
      type: String,
      required: [true, 'El tipo es obligatorio'],
      enum: { values: TIPOS_TAREA, message: 'El tipo de actividad no es válido' },
    },
    hora: {
      type: String,
      required: [true, 'La hora es obligatoria'],
      match: [HORA_REGEX, 'La hora tiene que tener el formato HH:MM'],
    },
    descripcion: { type: String, trim: true },
    // Primer día en que se generan tareas para esta actividad
    desde: {
      type: Date,
      required: true,
    },
    activa: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        delete ret.__v;
        return ret;
      },
    },
  },
);

actividadRecurrenteSchema.index({ mascotaId: 1, activa: 1 });

const ActividadRecurrente = mongoose.model(
  'ActividadRecurrente',
  actividadRecurrenteSchema,
  'actividadesRecurrentes',
);

export default ActividadRecurrente;
