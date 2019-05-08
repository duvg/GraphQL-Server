import mongoose, { connect } from 'mongoose';

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/clientes', {useNewUrlPasrser: true} );

// Definicion de schema clientes

const clientesSchema = new mongoose.Schema({
    nombre : String,
    apellido : String,
    empresa : String,
    emails : Array,
    edad : Number,
    tipo : String,
    pedidos : Array 
});

const Cliente = mongoose.model('clientes', clientesSchema);

export { Cliente };