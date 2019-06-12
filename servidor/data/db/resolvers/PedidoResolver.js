import { Pedido } from '../models/Pedido';
import { rejects} from 'assert';
import { Producto } from "../models/Producto";

export const PedidoResolver = {
    Query: {
        getPedidos: (root, {cliente}) => {
            return new Promise((resolve, object) => {
               Pedido.find({cliente: cliente}, (error, pedido) => {
                   if(error) rejects(error);
                   else resolve(pedido);
               })
            });
        }
    },
    Mutation: {
        nuevoPedido: (root, {input}) => {
            const nuevoPedido = new Pedido({
                pedido: input.pedido,
                total: input.total,
                fecha: new Date(),
                cliente: input.cliente,
                estado: "PENDIENTE"
            });

            nuevoPedido.id = nuevoPedido._id;

            return new Promise((resolve, object) => {

                nuevoPedido.save((error) => {
                    if(error) rejects(error)
                    else resolve(nuevoPedido)
                });
            });
        },

        // actualiza el estado
        actualizarEstado: (root, {input}) => {
            return new Promise((resolve, object) => {

                // recorrer y actualizar la cantidad de productos deacuerdo al estado del pedido
                input.pedido.forEach(pedido => {
                    console.log(pedido);
                    Producto.updateOne({ _id: pedido.id },
                        {
                            "$inc":
                                { "stock" : -pedido.cantidad}
                        }, function(error) {
                            console.log("sds");
                            if(error) return new Error(error);
                        })
                });

               Pedido.findOneAndUpdate({_id: input.id}, input, {new: true}, (error) => {
                   if(error) rejects(error);
                   else resolve('Actualizado correctamente');
               })
            });
        }
    }
};