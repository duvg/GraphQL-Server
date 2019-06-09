import gql from 'graphql-tag';

export const PEDIDOS_QUERY = gql`
    query getPedidos($cliente: String) {
        getPedidos(cliente: $cliente){
            id
            total
            fecha
            cliente
            pedido {
                id
                cantidad
            }
            estado
        }
    }
`;