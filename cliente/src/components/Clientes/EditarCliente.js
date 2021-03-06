import React, { Component, Fragment } from 'react'

import { CLIENTE_QUERY } from '../../queries/ClienteQuery';
import { Query } from 'react-apollo';
import FormularioEditarCliente from './FormularioEditarCliente';



export default class EditarCliente extends Component {
    state = {}
    
    render() {
        const { id } = this.props.match.params;
        console.log(id);
        return (
            <Fragment>
                <h2 className="text-center">Editar Cliente</h2>    

                <div className="row justify-content-center">
                    <Query query={CLIENTE_QUERY} variables={{id}}>
                        {({ loading, error, data, refetch }) => {
                            if(loading) return "Cargando...";
                            if(error) return `Error! ${error.message}`;
                            console.log(data);
                            console.log(this.props);
                            return (
                                <FormularioEditarCliente 
                                    cliente={data.getCliente}
                                    refetch={refetch}
                                />
                            );
                        }}
                    </Query>
                </div>
            </Fragment>
        );
    }
}
