import { randomInt } from 'node:crypto';

// Sin 0, O, 1, I ni L para que el código no se confunda al copiarlo a mano
const CARACTERES = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';

// Genera códigos con el formato NOMBRE-XXXX, por ejemplo LUNA-7F3K
export function generarCodigoInvitacion(nombreMascota) {
  const prefijo =
    nombreMascota
      .normalize('NFD')
      .replace(/[^a-zA-Z]/g, '')
      .toUpperCase()
      .slice(0, 4) || 'PET';

  let sufijo = '';
  for (let i = 0; i < 4; i++) {
    sufijo += CARACTERES[randomInt(CARACTERES.length)];
  }

  return `${prefijo}-${sufijo}`;
}
