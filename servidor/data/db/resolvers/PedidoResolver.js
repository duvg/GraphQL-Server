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
        },

        topClientes: (root) => {
            return new Promise((resolve, object) => {
                Pedido.aggregate([
                    {
                        $match :  { estado :  "COMPLETADO" }
                    },
                    {
                        $group : {
                            _id: "$cliente",
                            total: { $sum : "$total" }
                        }
                    },
                    {
                        $lookup : {
                            from : "Clientes",
                            localField : '_id',
                            foreignField : '_id',
                            as : 'cliente'
                        }
                    },
                    {
                        $sort :  { total : -1 }
                    },
                    {
                        $limit: 10
                    }
                ], (error, result) => {
                    if(error) rejects(error);
                    else resolve(result);
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
            console.log(input);
            return new Promise((resolve, object) => {


                // recorrer y actualizar la cantidad de Productos deacuerdo al estado del pedido
                input.pedido.forEach(pedido => {

                    let cantidadN = 0;
                    if(input.estado === 'CANCELADO'){
                        cantidadN = pedido.cantidad;
                    } else if(input.estado === 'COMPLETADO')
                    {
                        cantidadN = -pedido.cantidad;
                    }


                    Producto.updateOne({ _id: pedido.id },
                        {
                            "$inc":
                                { "stock" :  cantidadN}
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