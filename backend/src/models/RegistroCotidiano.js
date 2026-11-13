import mongoose from 'mongoose';

export const TIPOS_REGISTRO = ['PESO', 'NOTA'];

// Información cotidiana que no sale de una tarea: cambios de peso y
// notas o acontecimientos relevantes de la mascota
const registroCotidianoSchema = new mongoose.Schema(
  {
    mascotaId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Mascota',
      required: true,
    },
    tipo: {
      type: String,
      required: true,
      enum: { values: TIPOS_REGISTRO, message: 'El tipo de registro no es válido' },
    },
    // Día del registro, guardado a las 00:00 UTC
    fecha: {
      type: Date,
      required: true,
    },
    // Solo para los registros de PESO, en kg
    peso: {
      type: Number,
      min: [0, 'El peso no puede ser negativo'],
    },
    // Texto de la nota, o un comentario opcional en los de PESO
    texto: { type: String, trim: true },
    registradoPor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Usuario',
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

registroCotidianoSchema.index({ mascotaId: 1, fecha: -1 });

const RegistroCotidiano = mongoose.model('RegistroCotidiano', registroCotidianoSchema, 'registrosCotidianos');

export default RegistroCotidiano;
