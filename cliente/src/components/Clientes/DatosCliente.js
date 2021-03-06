import React, {Fragment} from 'react';
import { Query } from 'react-apollo';
import {CLIENTE_QUERY} from "../../queries/ClienteQuery";


const DatosCliente = ({id}) => {
    return (
        <Fragment>
            <h2 className="text-center">Resumen del cliente</h2>

            <Query query={CLIENTE_QUERY} variables={{id}} pollInterval={500}>
                {({ loading, error, data, startPolling, stopPolling}) => {
                    if(loading) return "Cargando...";
                    if(error) return `Error ${error.message}`;

                    const { nombre, apellido, edad, emails, empresa, tipo} = data.getCliente;
                    return(
                        <ul className="list-unstyled my-5">
                            <li className="border font-weight-bold p-2">
                                Nombre: <span className="font-weight-normal">{nombre}</span>
                            </li>
                            <li className="border font-weight-bold p-2">
                                Apellido: <span className="font-weight-normal">{apellido}</span>
                            </li>
                            <li className="border font-weight-bold p-2">
                                Edad: <span className="font-weight-normal">{edad}</span>
                            </li>
                            <li className="border font-weight-bold p-2">
                                <span className=" d-block">Email: </span>
                                {emails.map((email, index) => {

                                    return(<span key={index}  className="font-weight-normal d-inline-block">{email.email}</span>)


                                })}
                            </li>
                            <li className="border font-weight-bold p-2">
                                Empresa: <span className="font-weight-normal">{empresa}</span>
                            </li>
                            <li className="border font-weight-bold p-2">
                                Tipo: <span className="font-weight-normal">{tipo}</span>
                            </li>
                        </ul>
                    )
                }}
            </Query>
        </Fragment>
    );
};

export default DatosCliente;