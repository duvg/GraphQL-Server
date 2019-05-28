/*import { importSchema } from 'graphql-import';
import { mergeTypes } from 'merge-graphql-schemas';

const ClientType = importSchema('data/ClienteSchema.graphql');
const ProductType = importSchema('data/ProductoSchema.graphql');

const types = [
    ClientType,
    ProductType
];
export default mergeTypes(types, { all: true });
*7


 */

import path from 'path';
import { fileLoader, mergeTypes } from 'merge-graphql-schemas';

const typesArray = fileLoader(path.join(__dirname, './types'));

export default mergeTypes(typesArray, { all: true });