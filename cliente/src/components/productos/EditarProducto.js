import React, {Component, Fragment} from 'react';
import { Query } from 'react-apollo';

import { PRODUCTO_QUERY } from "../../queries/ProductoQuery";
import FormularioEditarProducto from "./FormularioEditarProducto";


class EditarProducto extends Component {
    render() {
        // TAke id to edit data
        const {id} = this.props.match.params;
        console.log(id);
        return (
            <Fragment>
                <h2 className="text-center">Editar Producto</h2>
                <div className="row justify-content-center">
                    <Query query={PRODUCTO_QUERY} variables={{id}}>
                        {({ loading, error, data, refetch }) => {
                            if(loading) return "Cargando...";
                            if(error) return `Error ${error.message}`;
                            console.log("data", data);

                            return (
                                <FormularioEditarProducto
                                    id={id}
                                    producto={data}
                                    refetch={refetch}
                                />
                            )
                        }}
                    </Query>
                </div>
            </Fragment>
        );
    }
}

export default EditarProducto;
