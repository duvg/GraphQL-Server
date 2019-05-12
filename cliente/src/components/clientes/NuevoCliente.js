import React, { Component, Fragment } from 'react'

// import apollo mutations
import { Mutation } from 'react-apollo';

// Import mutation
import { NUEVO_CLIENTE } from '../../mutations/ClienteMutations';

// Custom swall
import {showSwall} from '../../helpers/swal';


export default class NuevoCliente extends Component {
  
  state = {
    cliente: {
      nombre: '',
      apellido: '',
      empresa: '',
      email: '',
      edad: '',
      tipo: ''
    },
    error: false,
    emails: []
  };

  // Add emails
  nuevoEmail = () =>{
    this.setState({
      emails: this.state.emails.concat([{email: ''}])
    })
  };

  // Remove email field
  quitarEmail = (i) => {
    this.setState({
      emails: this.state.emails.filter((email, index) => i !== index)
    });
  };

  // Read each email field
  leerEmail = (i, e) => {
    const nuevoEmail = this.state.emails.map((email, index) => {
      if(i !== index) return email;
      return {
        ...email,
        email: e.target.value
      }
    });

    this.setState({
      emails: nuevoEmail
    });
  };

  success = () => {
      showSwall(
          "Actualizacion Exitosa",
          "Se ha actualizado el cliente correctamente",
          "success",
      );

      this.props.history.push('/');
  };

  render() {
    const {error} = this.state;
    let respuesta = (error) ? <p className="alert alert-danger p-3 text-center">Todos los campos son obligatorios</p> : '';

    return (
      <Fragment>
        <h2 className="text-center">Nuevo Cliente</h2>
        {respuesta}
        <div className="row justify-content-center">
          <Mutation 
            mutation={NUEVO_CLIENTE}
            onCompleted={this.success.bind(this)}
          >
            { crearCliente => (
              <form 
                action="" 
                className="col-md-8 m-3"
                onSubmit={ e => {
                  e.preventDefault();
                  const {nombre, apellido, empresa, edad, tipo} = this.state.cliente;
                  
                  const {emails} = this.state;
                  // Validate fields in form
                  if(nombre === '' || apellido === '' || empresa === '' || edad === '' || tipo === ''){
                    this.setState({
                      error: true
                    });
                    return;
                  }

                  this.setState({
                    error: false
                  });

                  const input = {
                    nombre,
                    apellido,
                    empresa,
                    emails,
                    edad : Number(edad),
                    tipo
                  }
              
                  crearCliente({
                    variables: {input}
                  });
                }}
              >
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label >Nombre</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder="Nombre"
                      onChange={e => {
                        this.setState({
                          cliente: {
                            ...this.state.cliente,
                            nombre: e.target.value
                          }
                        })
                      }}
                      />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="apellidos">Apellidos</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder="Apellidos"
                      onChange={e => {
                        this.setState({
                          cliente: {
                            ...this.state.cliente,
                            apellido: e.target.value
                          }
                        })
                      }}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-12">
                    <label >Empresa</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder="Empresa"
                      onChange={e => {
                        this.setState({
                          cliente: {
                            ...this.state.cliente,
                            empresa: e.target.value
                          }
                        })
                      }}
                    />
                  </div>
                  {/* email fields */}
                  {this.state.emails.map((input, index) => (
                    <div key={index} className="form-group col-md-12">
                      <label>E-Mail {index+1}:</label>
                      <div className="input-group">
                        <input 
                          onChange={this.leerEmail.bind(this, index)}
                          type="email" 
                          className="form-control" 
                          placeholder="E-Mail"
                        />

                        <div className="input-group-append">
                          <button 
                            onClick={this.quitarEmail.bind(this, index)}
                            type="button" 
                            className="btn btn-danger"
                          >
                            &times; Eliminar
                          </button>
                        </div>
                      </div>
                    </div>   
                  ))}
                  <div className="form-group d-flex justify-content-center col-md-12">
                      <button 
                        className="btn btn-warning"
                        onClick={this.nuevoEmail}
                        type="button" 
                      >
                        <i className="fas fa-plus"></i> Agregar E-mail
                      </button>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label>Edad</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder="Edad"
                      onChange= {e => {
                        this.setState({
                          cliente: {
                            ...this.state.cliente,
                            edad: e.target.value
                          }
                        })
                      }}
                    />
                    </div>
                  <div className="form-group col-md-6">
                    <label >Tipo Cliente</label>
                    <select 
                      className="form-control" 
                      onChange={e => {
                        this.setState({
                          cliente: {
                            ...this.state.cliente,
                            tipo: e.target.value
                          }
                        })
                      }}
                    >
                      <option value="">Elegir...</option>
                      <option value="PREMIUM">PREMIUM</option>
                      <option value="BASICO">BASICO</option>
                    </select>
                  </div>
                </div>

                <button type="submit" className="btn btn-success float-right">
                  Guardar Cliente
                </button>
              </form>
            )}
         </Mutation>
        </div>
      </Fragment>
      
    )
  }
}
