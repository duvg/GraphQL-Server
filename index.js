import express from 'express';

// Graphql
import graphqlHTTP from 'express-graphql';
import schema from './schema';

const app = express();

app.get('/', (req, res) => {
    res.send('Todo listo');
});

// El resolver
const root = {cliente: () => {
    return {
        "id" : 121213425242545,
        "nombre": "Duviel",
        "apellido": "Garcia",
        "empresa": "Duvg Corp",
        "email": "duviel7@gmail.com"
    }
}};

app.use('/graphql', graphqlHTTP({
    // El schema a utilizar
    schema,
    // El resoler se pasa como rootValue
    rootValue: root,
    // Utilizar graphiql
    graphiql: true
}));

app.listen(8000, () => console.log("El servidor esta funcionando"));