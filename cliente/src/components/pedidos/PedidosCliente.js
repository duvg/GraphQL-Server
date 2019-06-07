import React, { Fragment } from 'react';

const PedidosCliente = (props) => {


    const clienteId = props.match.params.id;

    console.log(clienteId);

    return (
        <Fragment>
            <h2 className="text-center mb-5">Pedidos del Cliente</h2>

            <div className="row">
                <p>Pedidos del cliente aqui</p>
            </div>
        </Fragment>
    )
};

export default PedidosCliente;