import gql from 'graphql-tag';



export const NUEVO_PEDIDO = gql`
    mutation nuevoPedido($input: PedidoInput){
        nuevoPedido(input: $input){
            id
        }
    }
`;