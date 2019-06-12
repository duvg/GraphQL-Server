import mongoose from 'mongoose';

import '../config';

const usuariosSchema = new mongoose.Schema({
   nombre: String,
   apellidos: String,
   usuario: String,
   password: String,
});

const Usuario = mongoose.model('usuarios', usuariosSchema);

export { Usuario };