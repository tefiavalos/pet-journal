import mongoose from 'mongoose';

export const TIPOS_CONSULTA = ['CONTROL', 'URGENCIA', 'ESPECIALISTA', 'VACUNA'];

// Historial veterinario: consultas, vacunas, estudios y diagnósticos ya realizados.
// Una vez registrados no se modifican.
const eventoVeterinarioSchema = new mongoose.Schema(
  {
    mascotaId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Mascota',
      required: true,
    },
    fecha: {
      type: Date,
      required: true,
      default: Date.now,
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
    // Si viene de un evento futuro que se marcó como realizado
    eventoFuturoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'EventoFuturo',
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

eventoVeterinarioSchema.index({ mascotaId: 1, fecha: -1 });

const EventoVeterinario = mongoose.model('EventoVeterinario', eventoVeterinarioSchema, 'eventosVeterinarios');

export default EventoVeterinario;
