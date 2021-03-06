import gql from "graphql-tag";

export const CLIENTES_QUERY =  gql`    
    query getClientes($limit: Int, $offset: Int) {
        getClientes(limit: $limit, offset: $offset)
        {
            id
            nombre
            apellido
            empresa
        },
        totalClientes
}`;

export const CLIENTE_QUERY = gql`
    query consultarCliente ($id: ID) {
        getCliente(id: $id) {
            id
            nombre
            apellido
            empresa
            edad
            tipo
            emails {
                email
            }
        }
    }
`;