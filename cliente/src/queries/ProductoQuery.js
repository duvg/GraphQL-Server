import gql from 'graphql-tag';

export const PRODUCTOS_QUERY = gql`
    query getProductos($limit: Int, $offset: Int, $stock: Boolean){
        getProductos(limit: $limit, offset: $offset, stock: $stock){
            id
            codigo
            nombre
            precio
            stock
        }
        totalProductos
    }
`;


export const PRODUCTO_QUERY = gql`
    query getProducto($id: ID!){
        getProducto(id: $id){
            id
            codigo
            nombre
            precio
            stock
        }
    }
`;