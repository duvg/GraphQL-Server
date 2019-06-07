import { Producto } from "../models/Producto";
import { rejects } from 'assert';
import {Cliente} from "../models/Cliente";

export const ProductoResolver = {
    Query: {
        getProductos: (root, {limit, offset, stock}) => {
            let filtro;
            if(stock) {
                filtro = { stock: {$gt : 0} }
            }
            return Producto.find(filtro).limit(limit).skip(offset);
        },
        getProducto: (root, {id}) => {
            return new Promise((resolve, object) => {
                Producto.findById(id, (error, producto) => {
                   if(error) rejects(error);
                   else resolve(producto)
                });
            })
        },
        totalProductos: (root) => {
            return new Promise((resolve, object) => {
                Producto.countDocuments({}, (error, count) => {
                    if(error) rejects(error);
                    else resolve(count)
                });
            });
        }
    },
    Mutation: {
        // Crear un nuevo producto
        nuevoProducto: (root, {input}) => {
            const nuevoProducto = new Producto({
                nombre: input.nombre,
                precio: input.precio,
                stock: input.stock,
                codigo: input.codigo
            });

            // Mongodb create the id to object
            nuevoProducto.id = nuevoProducto._id;

            return new Promise((resolve, object) => {
                nuevoProducto.save((error) => {
                    if(error) rejects(error);
                    else resolve(nuevoProducto)
                })
            })
        },

        // Actualizar un producto
        actualizarProducto: (root, {input}) => {
            return new Promise((resolve, object) => {
               Producto.findOneAndUpdate({_id: input.id}, input, {new: true}, (error, producto) => {
                  if(error) rejects(error);
                  else resolve(producto)
               });
            });
        },

        // Eliminar un producto
        eliminarProducto: (root, {id}) => {
          return new Promise((resolve, reject) => {
              Producto.findOneAndDelete({_id: id}, (error) => {
                  if(error) rejects(error);
                  else resolve("Se elimino correctamente")
              });
          });
        },
    }
};