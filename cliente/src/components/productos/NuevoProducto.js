import React, {Component, Fragment} from 'react';

import { Mutation } from 'react-apollo';

import { NUEVO_PRODUCTO } from "../../mutations/ProductoMutation";

// Custom swall
import {showSwall} from '../../helpers/swal';


const initialState = {
    codigo: '',
    nombre: '',
    precio: '',
    stock: ''
}


class NuevoProducto extends Component {
    state = {
        ...initialState
    };

    // Actualizar el state
    actualizarState = (e) => {
        const {name, value} = e.target;
        this.setState({
            [name]: value
        })
    };

    validarForm = () => {
        const { codigo, nombre, precio, stock } = this.state;

        const noValido = !codigo || !nombre || !precio || !stock;

        return noValido;
    };

    limpiarState = () => {
        this.setState({
            ...initialState
        })
    }

    crearNuevoProducto = (e, nuevoProducto) => {
        e.preventDefault();

        // Insert data in database
        nuevoProducto().then(data => {
            // Clear state
            this.limpiarState();

            // Success Swal
            this.success();
        });

    };


    success = () => {
        showSwall(
            "Operación Exitosa",
            "Se ha creado el nuevo producto correctamente",
            "success",
        );

        // Redirect
        this.props.history.push('/productos');
    };

    render() {
        const {codigo, nombre, precio, stock} = this.state;
        const input = {
            codigo,
            nombre,
            precio: Number(precio),
            stock: Number(stock)
        };

        return (
            <Fragment>
                <h2 className="text-center mb-5">Crear un producto</h2>
                <div className="row justify-content-center">
                    <Mutation
                        mutation={NUEVO_PRODUCTO}
                        variables={{input}}
                        onCompleted={() => console.log("producto creado")}>

                        {(nuevoProducto, {loading, error, data}) => {
                            return(

                                <form
                                    className="col-md-8"
                                    onSubmit={e => this.crearNuevoProducto( e, nuevoProducto)}
                                >
                                    <div className="form-group">
                                        <label htmlFor="">Codigo:</label>
                                        <input
                                            type="text"
                                            name="codigo"
                                            placeholder="Codigo del producto"
                                            className="form-control"
                                            onChange={this.actualizarState.bind(this)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="">Nombre:</label>
                                        <input
                                            type="text"
                                            name="nombre"
                                            placeholder="Nombre dle producto"
                                            className="form-control"
                                            onChange={this.actualizarState.bind(this)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="">Precio:</label>
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text">$</div>
                                            </div>
                                            <input
                                                type="number"
                                                name="precio"
                                                placeholder="Precio del Producto"
                                                className="form-control"
                                                onChange={this.actualizarState.bind(this)}
                                            />
                                        </div>

                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="">Stock:</label>
                                        <input
                                            type="number"
                                            name="stock"
                                            placeholder="Stock del producto"
                                            className="form-control"
                                            onChange={this.actualizarState.bind(this)}
                                        />
                                    </div>
                                    <button
                                        disabled={this.validarForm()}
                                        type="submit"
                                        className="btn btn-success float-right">
                                        Crear Producto
                                    </button>
                                </form>
                            );
                        }}
                    </Mutation>
                </div>
            </Fragment>
        );
    }
}

export default NuevoProducto;