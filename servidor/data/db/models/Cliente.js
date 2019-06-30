import mongoose from 'mongoose';
// import config to connect mongodb
import '../config';

const clientesSchema = new mongoose.Schema({
    nombre : String,
    apellido : String,
    empresa : String,
    emails : Array,
    edad : Number,
    tipo : String,
    pedidos : Array 
});
const Cliente = mongoose.model('Clientes', clientesSchema);

export { Cliente };