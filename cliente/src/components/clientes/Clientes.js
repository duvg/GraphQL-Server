import React, { Fragment } from 'react';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';

import { CLIENTES_QUERY } from '../../queries';
 const Clientes= () => {
     return (<Query query={CLIENTES_QUERY} pollInterval={1000}>
        {({ loading, error, data, startPolling, stopPolling }) => {
            if(loading) return "Cargando...";
            if(error) return `Error ${error.message}`;
            console.log(data);

            return (
                <Fragment>
                    <h2 className="text-center">Listado de Clientes</h2>
                    <ul className="list-group" >
                        {data.getClientes.map(item => (
                            <li key={item.id} className="list-group-item">
                                <div className="row justify-content-between align-items-center">
                                    <div className="col-md-8 d-flex justify-content-between align-items-center">
                                        <span> {item.nombre} {item.apellido}  - <strong>{item.empresa}</strong>  </span>
                                    </div>
                                    <div className="col-m4 d-flex justify-content-end">
                                        <Link to={`/cliente/editar/${item.id}`} className="btn btn-success d-block d-md-inline-block"><i className="fas fa-edit"></i> Editar Cliente</Link>
                                    </div>
                                </div>
                            </li>  
                        ))}
                    </ul>
                </Fragment>
            )
        }}
     </Query>);
 }

 export default Clientes;
