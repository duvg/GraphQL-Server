import mongoose from 'mongoose';

mongoose.Promise = global.Promise;
mongoose.set('useFindAndModify', false);
mongoose.connect('mongodb://localhost/Clientes', {useNewUrlParser: true} );
