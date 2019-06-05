import { Pedido } from '../models/Pedido';
import { rejects} from 'assert';
import { Producto } from "../models/Producto";

export const PedidoResolver = {
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

                // recorrer y actualizar la cantidad de productos
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



                nuevoPedido.save((error) => {
                    if(error) rejects(error)
                    else resolve(nuevoPedido)
                });
            });
        }
    }
};