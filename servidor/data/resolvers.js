import mongoose from 'mongoose';
import { Cliente } from './db';
import { rejects } from 'assert';

export const resolvers = {
    Query: {
        getClientes: (root, {limite}) => {
            return Cliente.find({}).limit(limite);
        },
        getCliente : (root, {id}) => {
            return new Promise((resolve, object) => {
                Cliente.findById(id, (error, cliente) => {
                    if(error) rejects(error)
                    else resolve(cliente)
                });
            });
        },
    },
    Mutation: {
        crearCliente : (root, {input}) => {
            const nuevoCliente = new Cliente({
                nombre : input.nombre,
                apellido : input.apellido,
                empresa : input.empresa,
                emails : input.emails,
                edad : input.edad,
                tipo : input.tip,
                pedidos : input.pedidos,
            });

            nuevoCliente.id = nuevoCliente._id;

            return new Promise((resolve, object) => {
                nuevoCliente.save((error) => {
                    if(error) rejects(error)
                    else resolve(nuevoCliente)
                });
            });
        },
        actualizarCliente : (root, {input}) => {
            return new Promise((resolve, object) => {
                Cliente.findOneAndUpdate({ _id : input.id}, input, {new: true}, (error, cliente) => {
                    if(error) rejects(error)
                    else resolve(cliente)
                });
            });
        },
        eliminarCliente: (root, {id}) => {
            return new Promise((resolve, object) => {
                Cliente.findOneAndRemove({_id: id}, (error) => {
                    if(error) rejects(error)
                    else resolve("Se elimino Correctamente")
                });
            });
        }
    }
}; 