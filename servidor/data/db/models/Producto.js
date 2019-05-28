import mongoose from 'mongoose';
// import config to connect mongodb
import '../config';


const productosSchema = new mongoose.Schema({
   nombre: String,
   precio: Number,
   stock: Number,
   codigo: String
});

const Producto = mongoose.model('productos', productosSchema);

export { Producto };