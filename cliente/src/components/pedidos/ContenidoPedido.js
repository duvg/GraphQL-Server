import React, {Component, Fragment} from 'react';
import Select from 'react-select';
import Animated from 'react-select/lib/animated';

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
];

class ContenidoPedido extends Component {

    state = {
        productos: []
    };

    seleccionarProducto = (productos) => {
        console.log(productos);
        this.setState({
            productos
        })
        //console.log('Algo paso con', productos);
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
                />
            </Fragment>

        );
    }
}

export default ContenidoPedido;