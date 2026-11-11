import mongoose from 'mongoose';

export const TIPOS_TAREA = ['ALIMENTACION', 'MEDICACION', 'PASEO'];
export const ESTADOS_TAREA = ['PENDIENTE', 'HECHO'];
export const HORA_REGEX = /^([01][0-9]|2[0-3]):[0-5][0-9]$/;

// Instancia diaria de una actividad recurrente, con su propio estado
const tareaDiariaSchema = new mongoose.Schema(
  {
    mascotaId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Mascota',
      required: true,
    },
    actividadId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ActividadRecurrente',
    },
    tipo: {
      type: String,
      required: true,
      enum: TIPOS_TAREA,
    },
    // Día de la tarea, guardado a las 00:00 UTC
    fecha: {
      type: Date,
      required: true,
    },
    hora: {
      type: String,
      required: true,
      match: HORA_REGEX,
    },
    descripcion: { type: String, trim: true },
    estado: {
      type: String,
      enum: ESTADOS_TAREA,
      default: 'PENDIENTE',
    },
    realizadaPor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Usuario',
    },
    realizadaEn: { type: Date },
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

tareaDiariaSchema.index({ mascotaId: 1, fecha: 1 });
tareaDiariaSchema.index(
  { actividadId: 1, fecha: 1 },
  { unique: true, partialFilterExpression: { actividadId: { $exists: true } } },
);

const TareaDiaria = mongoose.model('TareaDiaria', tareaDiariaSchema, 'tareasDiarias');

export default TareaDiaria;
