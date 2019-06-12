import { Usuario } from '../models/Usuario';
import { rejects } from 'assert';

export const UsuarioResolver = {
    Mutation: {
        crearUsuario: async(root, {input}) => {

            const nuevoUsuario = await new Usuario({
                nombre: input.nombre,
                apellidos: input.apellidos,
                usuario: input.usuario,
                password: input.password
            });

            console.log(nuevoUsuario);
        }
    }
};