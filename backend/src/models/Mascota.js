import mongoose from 'mongoose';

export const TIPOS_MASCOTA = ['perro', 'gato', 'otro'];
export const SEXOS_MASCOTA = ['macho', 'hembra'];

const responsableSchema = new mongoose.Schema(
  {
    usuarioId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Usuario',
      required: true,
    },
    fechaAsociacion: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false },
);

const mascotaSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, 'El nombre es obligatorio'],
      trim: true,
    },
    tipo: {
      type: String,
      required: [true, 'El tipo es obligatorio'],
      enum: { values: TIPOS_MASCOTA, message: 'El tipo de mascota no es válido' },
    },
    raza: { type: String, trim: true },
    fechaNacimiento: { type: Date },
    sexo: {
      type: String,
      enum: { values: SEXOS_MASCOTA, message: 'El sexo no es válido' },
    },
    peso: { type: Number, min: [0, 'El peso no puede ser negativo'] },
    foto: { type: String, trim: true },
    condicionesMedicas: { type: String, trim: true },
    codigoInvitacion: {
      type: String,
      required: true,
      unique: true,
    },
    // Relación muchos a muchos con usuarios: los responsables se embeben en la mascota
    responsables: {
      type: [responsableSchema],
      validate: {
        validator: (responsables) => responsables.length > 0,
        message: 'La mascota tiene que tener al menos un responsable',
      },
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

mascotaSchema.index({ 'responsables.usuarioId': 1 });

const Mascota = mongoose.model('Mascota', mascotaSchema, 'mascotas');

export default Mascota;
