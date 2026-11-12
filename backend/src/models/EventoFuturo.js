import mongoose from 'mongoose';
import { TIPOS_CONSULTA } from './EventoVeterinario.js';

export const ESTADOS_EVENTO_FUTURO = ['PENDIENTE', 'REALIZADO', 'CANCELADO'];

// Turnos y controles programados. Se pueden modificar mientras estén PENDIENTES.
const eventoFuturoSchema = new mongoose.Schema(
  {
    mascotaId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Mascota',
      required: true,
    },
    // Fecha y hora del turno
    fecha: {
      type: Date,
      required: [true, 'La fecha es obligatoria'],
    },
    titulo: {
      type: String,
      required: [true, 'El título es obligatorio'],
      trim: true,
    },
    tipoConsulta: {
      type: String,
      required: [true, 'El tipo de consulta es obligatorio'],
      enum: { values: TIPOS_CONSULTA, message: 'El tipo de consulta no es válido' },
    },
    descripcion: { type: String, trim: true },
    estado: {
      type: String,
      enum: ESTADOS_EVENTO_FUTURO,
      default: 'PENDIENTE',
    },
    // Registro del historial que se creó al marcarlo como realizado
    eventoVeterinarioId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'EventoVeterinario',
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

eventoFuturoSchema.index({ mascotaId: 1, fecha: 1 });
eventoFuturoSchema.index({ estado: 1, fecha: 1 });

const EventoFuturo = mongoose.model('EventoFuturo', eventoFuturoSchema, 'eventosFuturos');

export default EventoFuturo;
