import React, {Component, Fragment} from 'react';
import { Mutation } from 'react-apollo';
import { NUEVO_USUARIO } from "../../mutations/UsuarioMutation";
import Error from "../Alertas/Error";

import { withRouter } from 'react-router-dom';

const initialState = {
    nombre: '',
    apellidos: '',
    usuario: '',
    password: '',
    repitePassword: ''
};


class Registro extends Component {

    state = {
        ...initialState
    };

    // Actualizar el state
    actualizarState = e => {
        const { name, value } = e.target;

        this.setState({
            [name] : value
        })
    };

    // Validacion del formulario
    validarForm = () => {
        const { nombre, apellidos, usuario, password, repitePassword } = this.state;

        const noValido = !nombre || !apellidos || !usuario || !password || password !== repitePassword;

        return noValido;
    };

    // Limpiar el state
    limpiarState = () => {
        this.setState({...initialState});
    };


    crearRegistro = (e, crearUsuario) => {
        e.preventDefault();

        crearUsuario().then(data => {
            console.log(data);
            this.limpiarState();

            // Redireccionar al login
            this.props.history.push('/login');
        })
    };



    render() {
        const  {nombre, apellidos, usuario, password, repitePassword} = this.state;
        const input  = { nombre, apellidos, usuario, password };
        return (
           <Fragment>
               <h1 className="text-center mb-5">Nuevo Usuario</h1>
               <div className="row  justify-content-center">
                   <Mutation
                       mutation={NUEVO_USUARIO}
                       variables={{ input }}
                   >
                       {(crearUsuario, {loading, error, data}) => {
                           return(
                               <form
                                   className="col-md-8"
                                   onSubmit={ e => this.crearRegistro(e, crearUsuario)}
                               >
                                   {error && <Error error={error} />}
                                   <div className="form-group">
                                       <label htmlFor="">Nombre</label>
                                       <input
                                           onChange={this.actualizarState}
                                           className="form-control"
                                           type="text"
                                           name="nombre"
                                           placeholder="nombre"
                                           value={nombre}
                                       />
                                   </div>
                                   <div className="form-group">
                                       <label htmlFor="">Apellidos</label>
                                       <input
                                           onChange={this.actualizarState}
                                           className="form-control"
                                           type="text"
                                           name="apellidos"
                                           placeholder="Apellidos"
                                           value={apellidos}
                                       />
                                   </div>
                                   <div className="form-group">
                                       <label>Usuario</label>
                                       <input
                                           onChange={this.actualizarState}
                                           type="text"
                                           name="usuario"
                                           className="form-control"
                                           placeholder="Nombre Usuario"
                                           value={usuario}
                                       />
                                   </div>
                                   <div className="form-group">
                                       <label>Password</label>
                                       <input
                                           onChange={this.actualizarState}
                                           type="password"
                                           name="password"
                                           className="form-control"
                                           placeholder="Password"
                                           value={password}
                                       />
                                   </div>
                                   <div className="form-group">
                                       <label>Repetir Password</label>
                                       <input
                                           onChange={this.actualizarState}
                                           type="password"
                                           name="repitePassword"
                                           className="form-control"
                                           placeholder="Repetir Password"
                                           value={repitePassword}
                                       />
                                   </div>

                                   <button
                                       disabled={ loading || this.validarForm() }
                                       type="submit"
                                       className="btn btn-success float-right">
                                       Crear Usuario
                                   </button>
                               </form>
                           )
                       }}
                   </Mutation>

               </div>
           </Fragment>
        );
    }
}

export default withRouter(Registro);