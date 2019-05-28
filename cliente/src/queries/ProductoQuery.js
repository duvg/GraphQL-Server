import gql from 'graphql-tag';

export const PRODUCTOS_QUERY = gql`
    query getProductos($limit: Int, $offset: Int){
        getProductos(limit: $limit, offset: $offset){
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