import { Cliente } from '../models/Clientes';
import { rejects } from 'assert';


export const ClienteResolver = {
    Query: {
        getClientes: (root, {limit, offset}) => {
            return Cliente.find({}).limit(limit).skip(offset);
        },
        getCliente : (root, {id}) => {
            return new Promise((resolve, object) => {
                Cliente.findById(id, (error, cliente) => {
                    if(error) rejects(error)
                    else resolve(cliente)
                });
            });
        },
        totalClientes: (root) => {
            return new Promise((resolve, object) => {
               Cliente.countDocuments({}, (error, count) => {
                  if(error) rejects(error)
                   else resolve(count)
               });
            });
        }
    },
    Mutation: {
        crearCliente : (root, {input}) => {
            const nuevoCliente = new Cliente({
                nombre : input.nombre,
                apellido : input.apellido,
                empresa : input.empresa,
                emails : input.emails,
                edad : input.edad,
                tipo : input.tipo,
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
                Cliente.findOneAndUpdate({ _id : input.id }, input, {new: true}, (error, cliente) => {
                    if(error) rejects(error)
                    else resolve(cliente)
                });
            });
        },
        eliminarCliente: (root, {id}) => {
            return new Promise((resolve, object) => {
                Cliente.findOneAndDelete({_id: id}, (error) => {
                    if(error) rejects(error)
                    else resolve("Se elimino Correctamente")
                });
            });
        }
    }
}; 