import mongoose from 'mongoose';

import '../config';


const pedidosSchema = new mongoose.Schema({
    pedido: Array,
    total: Number,
    fecha: Date,
    cliente: String,
    estado: String
});

const Pedido = mongoose.model('pedidos', pedidosSchema);

export { Pedido }