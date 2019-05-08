import express from 'express';

// Graphql
import graphqlHTTP from 'express-graphql';
import { schema } from './data/schema';

const app = express();

app.get('/', (req, res) => {
    res.send('Todo listo');
});


app.use('/graphql', graphqlHTTP({
    // El schema a utilizar
    schema,
    // Utilizar graphiql
    graphiql: true
}));

app.listen(8000, () => console.log("El servidor esta funcionando"));