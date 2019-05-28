import React, {Component} from 'react';
import { Mutation } from 'react-apollo';

import {ACTUALIZAR_PRODUCTO} from "../../mutations/ProductoMutation";

import { withRouter } from 'react-router-dom';

const initialState = {
    codigo: '',
    nombre: '',
    precio: '',
    stock: ''
};

class FormularioEditarProducto extends Component {
    state = {
        ...this.props.producto.getProducto
    };

    // Clear state
    limpiarState = () => {
        this.setState({
            ...initialState
        });
    };

    // Actualiza el state
    actualizarState = (e) => {
        const {name, value} = e.target;

        this.setState({
            [name] : value
        })
    };


    // Validar formulario
    validarForm = () => {
        const { codigo, nombre, precio, stock } = this.state;

        const noValido = !codigo || !nombre || !precio || !stock;


    };

    // Editar el producto, guardar los cambios
    editarProductoForm = (e, actualizarProducto) => {
        e.preventDefault();
        actualizarProducto().then(data => {
           this.setState({
               ...initialState
           })
        });
    };

    render() {
        const { id } = this.props;
        const { codigo, nombre, precio, stock } = this.state;
        const input = {
            id,
            codigo,
            nombre,
            precio: Number(precio),
            stock: Number(stock)
        };

        return (
            <Mutation
                mutation={ACTUALIZAR_PRODUCTO}
                variables={{input}}
                key={id}
                onCompleted={() => this.props.refetch().then(() => {
                    this.props.history.push('/productos');
                })}
            >

                {( actualizarProducto, { loading, error, data }) => {
                    return (
                        <form
                            className="col-md-8"
                            onSubmit={ e => this.editarProductoForm(e, actualizarProducto)}
                        >
                            <div className="form-group">
                                <label>Codigo:</label>
                                <input
                                    onChange={this.actualizarState}
                                    type="text"
                                    name="nombre"
                                    className="form-control"
                                    placeholder="Nombre del Producto"
                                    value={codigo}
                                />
                            </div>
                            <div className="form-group">
                                <label>Nombre:</label>
                                <input
                                    onChange={this.actualizarState}
                                    type="text"
                                    name="nombre"
                                    className="form-control"
                                    placeholder="Nombre del Producto"
                                    value={nombre}
                                />
                            </div>
                            <div className="form-group">
                                <label>Precio:</label>
                                <input
                                    onChange={this.actualizarState}
                                    type="number"
                                    name="precio"
                                    className="form-control"
                                    placeholder="Precio del Producto"
                                    value={precio}
                                />
                            </div>
                            <div className="form-group">
                                <label>Stock:</label>
                                <input
                                    onChange={this.actualizarState}
                                    type="text"
                                    name="stock"
                                    className="form-control"
                                    placeholder="Stock del Producto"
                                    value={stock}
                                />
                            </div>
                            <button
                                disabled={this.validarForm()}
                                type="submit"
                                className="btn btn-success float-right"
                            >
                                Guardar Cambios
                            </button>
                        </form>
                    )
                }}
            </Mutation>
        );
    }
}

export default withRouter(FormularioEditarProducto);