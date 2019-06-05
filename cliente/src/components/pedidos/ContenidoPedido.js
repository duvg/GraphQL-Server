import React, {Component, Fragment} from 'react';
import Select from 'react-select';
import Animated from 'react-select/lib/animated';
import Resumen from "./Resumen";
import GenerarPedido from "./GenerarPedido";


const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
];

class ContenidoPedido extends Component {

    state = {
        productos: [],
        total: 0
    };

    seleccionarProducto = (productos) => {
        console.log(productos);
        this.setState({
            productos
        }, () => {
            this.actualizarTotal()
        })
        //console.log('Algo paso con', productos);
    };

    actualizarTotal = () => {
        // Leer el state de productos
        const productos = this.state.productos;

        // Cuando el listado de productos esta ven 0
        if(productos.length === 0) {
            this.setState({
                total: 0
            });

            return;
        }

        let nuevoTotal = 0;



        // Calcular el total del producto cantidad * precio
        productos.map(producto => nuevoTotal += (producto.cantidad * producto.precio));

        this.setState({
            total: nuevoTotal
        })

    };

    actualizarCantidad = (cantidad, index) => {

        // Leer el state de productos
        const productos = this.state.productos;

        // Agregar la cantidad
        productos[index].cantidad = Number(cantidad);

        // Actualizar la cantidad de los productos

        // Valdiacion

        // Agregamos al state

        this.setState({
            productos
        }, () => {
            this.actualizarTotal()
        })
    };

    eliminarProducto = (id) => {
        const productos = this.state.productos;

        const productosRestantes = productos.filter(producto => producto.id !== id);

        this.setState({
            productos: productosRestantes
        }, () => {
            this.actualizarTotal()
        })
    };

    render() {
        return (
            <Fragment>
                <h2 className="text-center">Seleccionar articulos</h2>
                <Select
                    onChange={this.seleccionarProducto}
                    options={this.props.productos}
                    isMulti={true}
                    components={Animated()}
                    placeholder={'Seleccionar Productos'}
                    getOptionValue={(options) => options.id}
                    getOptionLabel={(options) => options.nombre}
                    className="my-5"
                    value={this.state.productos}
                />

                <Resumen
                    productos={this.state.productos}
                    actualizarCantidad={this.actualizarCantidad}
                    eliminarProducto={this.eliminarProducto}
                />

                <p className="font-weight-bold float-right mt-3">
                    Total:
                    <span className="font-weight-normal">
                        $ {this.state.total}
                    </span>
                </p>

                <GenerarPedido
                    productos={this.state.productos}
                    total={this.state.total}
                    idCliente={this.props.id}
                />
            </Fragment>

        );
    }
}

export default ContenidoPedido;