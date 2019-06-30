import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import '../config';

const usuariosSchema = new mongoose.Schema({
   nombre: String,
   apellidos: String,
   usuario: String,
   password: String,
});

// Hashear los passwords antes de guardarlos en la base de datos
usuariosSchema.pre('save', function(next) {
   // Si el password no esta modificado ejecutar la soguiente funcion
   if(!this.isModified('password')) {
      return next();
   }

   bcrypt.genSalt(10, (err, salt) => {
      if(err) return next (err);

      bcrypt.hash(this.password, salt, (err, hash) => {
         if(err) return next(err);
         this.password = hash;
         next();
      })
   });
});


const Usuario = mongoose.model('usuarios', usuariosSchema);

export { Usuario };