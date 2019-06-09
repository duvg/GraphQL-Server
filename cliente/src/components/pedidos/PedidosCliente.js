import React, { Fragment } from 'react';
import { Query } from 'react-apollo';
import {PEDIDOS_QUERY} from '../../queries/PedidoQuery';
import Pedido from "./Pedido";

import '../../spinner.css';


const PedidosCliente = (props) => {


    const cliente = props.match.params.id;

    console.log(cliente);

    return (
        <Fragment>
            <h2 className="text-center mb-5">Pedidos del Cliente</h2>

            <div className="row">
                <Query query={PEDIDOS_QUERY} variables={{cliente}} pollInterval={500}>
                    {({ loading, error, data, startPolling, stopPolling}) => {
                        if (loading) return (
                            <div className="spinner" >
                                <div className="bounce1"></div>
                                <div className="bounce2"></div>
                                <div className="bounce3"></div>
                            </div>
                        );

                        if(error) return `Error: ${error.message}`;

                        console.log(data);

                        return (
                            data.getPedidos.map(pedido => (

                                <Pedido
                                    key={pedido.id}
                                    pedido={pedido}
                                    cliente={cliente}
                                />)
                            )
                        );


                    }}
                </Query>
            </div>
        </Fragment>
    )
};

export default PedidosCliente;