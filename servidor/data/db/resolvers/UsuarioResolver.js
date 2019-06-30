import { Usuario } from '../models/Usuario';
import { rejects } from 'assert';

export const UsuarioResolver = {
    Mutation: {
        crearUsuario: async(root, {input}) => {

            // Verificar si el usuario existe
            const usuarioExiste = await Usuario.findOne({usuario : input.usuario});
            console.log(usuarioExiste);
            if(usuarioExiste) {
                throw new Error('El usuario ya existe');
            }

            // Guardar el usuario en la base de datos
            const nuevoUsuario = await new Usuario({
                nombre: input.nombre,
                apellidos: input.apellidos,
                usuario: input.usuario,
                password: input.password
            }).save();

            return "Creado satisfactoriamente";
        },

        // Login
        autenticarUsuario : async (root, {usuario, password}) => {
            const nombreUsuario = await Usuario.findOne({usuario});
        }
    }
};