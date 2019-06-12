import { merge } from 'lodash';

import { ClienteResolver } from './ClienteResolver';
import { ProductoResolver } from "./ProductoResolver";
import { PedidoResolver } from "./PedidoResolver";
import { mergeResolvers } from 'merge-graphql-schemas';
import {UsuarioResolver} from "./UsuarioResolver";

const resolvers = [
    ProductoResolver,
    ClienteResolver,
    PedidoResolver,
    UsuarioResolver
];

export default mergeResolvers(resolvers);
/*

merge resolvers without plugin merge-grahql-schemas
export const resolvers = {
    // Queries
    Query: Object.assign(
        {},
        ClienteResolver.Query,
        ProductoResolver.Query
    ),
    // Mutations
    Mutation: Object.assign(
        {},
        ClienteResolver.Mutation,
        ProductoResolver.Mutation
    )
};

*/

