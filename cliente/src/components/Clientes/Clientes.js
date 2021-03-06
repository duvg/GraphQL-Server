import React, { Component, Fragment } from 'react';
import { Query, Mutation } from 'react-apollo';
import { Link } from 'react-router-dom';

import { CLIENTES_QUERY } from '../../queries/ClienteQuery';
import { ELIMINAR_CLIENTE } from "../../mutations/ClienteMutations";

import {showSwall} from '../../helpers/swal';
import {confirm} from '../../helpers/swal';
import Paginator from '../Shared/Paginator';


class Clientes extends Component{

    limit = 5;
    state = {
        paginate: {
            offset: 0,
            page: 1
        }
    };

    previousPage = () => {
        this.setState({
            paginate: {
                offset: this.state.paginate.offset - this.limit,
                page: this.state.paginate.page - 1
            }
        });
    };

    nextPage = () => {
        this.setState({
            paginate: {
                offset: this.state.paginate.offset + this.limit,
                page: this.state.paginate.page + 1
            }
        });
    };

    goToPage = (offset, page) => {
        this.setState({
            paginate: {
                offset: offset,
                page: page
            }
        });
        console.log("offset ", offset, "page: ", page );
    };

    render () {
        return (<Query query={CLIENTES_QUERY} pollInterval={1000} variables={{ limit: this.limit, offset: this.state.paginate.offset}}>
        {({ loading, error, data, startPolling, stopPolling }) => {
            if(loading) return "Cargando...";
            if(error) return `Error ${error.message}`;
            console.log(data);

            return (
                <Fragment>
                    <h2 className="text-center">Listado de Clientes</h2>
                    <ul className="list-group" >
                        {data.getClientes.map(item => {
                            const {id} = item;

                            return (
                                <li key={item.id} className="list-group-item">
                                    <div className="row justify-content-between align-items-center">
                                        <div className="col-md-6 d-flex justify-content-between align-items-center">
                                            <span> {item.nombre} {item.apellido}  - <strong>{item.empresa}</strong>  </span>
                                        </div>
                                        <div className="col-md-6 d-flex justify-content-end">

                                            <Link
                                                to={`/pedidos/nuevo/${id}`}
                                                className="btn btn-warning d-block d-md-inline-block btn-sm mr-1"
                                            > <i className="fas fa-plus"></i> Nuevo Pedido</Link>

                                            <Link
                                                to={`/pedidos/${id}`}
                                                className="btn btn-primary d-block d-md-inline-block btn-sm mr-1"
                                            >Ver Pedidos</Link>

                                            <Link to={`/clientes/editar/${item.id}`}
                                                  className="btn btn-success d-block d-md-inline-block btn-sm mr-1"
                                            >
                                                <i className="fas fa-edit"></i> Editar Cliente
                                            </Link>

                                            <Mutation
                                                mutation={ELIMINAR_CLIENTE}
                                                onCompleted={
                                                    showSwall.bind(
                                                        this,
                                                        "Operación exitosa",
                                                        "Cliente eliminado correctamente",
                                                        "success"
                                                    )
                                                }
                                            >
                                                {eliminarCliente => (
                                                    <button
                                                        type="button"
                                                        className="btn btn-danger btn-sm"
                                                        onClick={() => {
                                                            confirm().then((result) => {
                                                                if (result.value) {
                                                                    eliminarCliente({
                                                                        variables: {id}
                                                                    })
                                                                }
                                                            });
                                                            //console.log(result);

                                                        }}
                                                    >
                                                        <i className="fas fa-trash"></i> Eliminar
                                                    </button>
                                                )}
                                            </Mutation>
                                        </div>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                    <Paginator
                        page={this.state.paginate.page}
                        total={data.totalClientes}
                        limit={this.limit}
                        goToPage={this.goToPage}
                        previousPage={this.previousPage}
                        nextPage={this.nextPage}
                    />
                </Fragment>
            )
        }}
     </Query>);
    }
 }

 export default Clientes;
