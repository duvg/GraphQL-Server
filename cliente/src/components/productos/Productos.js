import React, {Component, Fragment} from 'react';

import { Query, Mutation } from 'react-apollo';

import { PRODUCTOS_QUERY } from "../../queries/ProductoQuery";
import { ELIMINAR_PRODUCTO } from "../../mutations/ProductoMutation";
import { Link } from 'react-router-dom';
import {confirm} from '../../helpers/swal'
import Paginator from "../shared/Paginator";

class Productos extends Component {

    // Variables and method to pagiante products
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

    };

    render() {

        return (
            <Fragment>
                <h1 className="text-center mb-5">Productos</h1>
                <Query
                    query={PRODUCTOS_QUERY}
                    pollInterval={1000}
                    variables={{ limit: this.limit, offset: this.state.paginate.offset}}
                >
                    {({ loading, error, data, startPolling, stopPolling}) => {
                        if(loading) return "Cargando...";
                        if(error) return `Error ${error.message}`;

                        console.log(data.getProductos);
                        return (
                            <Fragment>
                                <table className="table table-striped table-bordered table-hover">
                                    <thead>
                                        <tr className="table-primary">
                                            <th scope="col">ID</th>
                                            <th scope="col">Codigo</th>
                                            <th scope="col">Nombre</th>
                                            <th scope="col">Precio</th>
                                            <th scope="col">Stock</th>
                                            <th scope="col" style={{'width': '220px'}}>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {data.getProductos.map(item => {
                                        const {id} = item;

                                        const { stock } = item;

                                        let clase;
                                        if( stock  < 50 ) {
                                            clase = 'table-danger text-light';
                                        } else if(stock > 51 && stock < 100) {
                                            clase = 'table-warning text-light';
                                        } else {
                                            clase = '';
                                        }


                                        return (
                                             <tr key={id} className={clase}>
                                                <td>{item.id}</td>
                                                <td>{item.codigo}</td>
                                                <td>{item.nombre}</td>
                                                <td>{item.precio}</td>
                                                <td>{item.stock}</td>
                                                <td>
                                                    <Link to={`/productos/editar/${id}`} className="btn btn-success" >
                                                        <i className='fas fa-edit'></i> Editar
                                                    </Link>
                                                    &nbsp;
                                                    <Mutation
                                                        mutation={ELIMINAR_PRODUCTO}
                                                    >
                                                        {eliminarProducto => (
                                                            <button
                                                                onClick={ () => {
                                                                    confirm().then((result) => {
                                                                        if(result.value){
                                                                            eliminarProducto({
                                                                                variables: {id}
                                                                            })
                                                                        }
                                                                    })

                                                                }}
                                                                className="btn btn-danger">
                                                                <i className="fas fa-trash"></i> Eliminar
                                                            </button>
                                                        )}
                                                    </Mutation>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                    </tbody>
                                </table>
                                <Paginator
                                    page={this.state.paginate.page}
                                    total={data.totalProductos}
                                    limit={this.limit}
                                    goToPage={this.goToPage}
                                    previousPage={this.previousPage}
                                    nextPage={this.nextPage}
                                />
                            </Fragment>

                        );



                }}



                </Query>
            </Fragment>
        );
    }
}

export default Productos;