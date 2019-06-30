import  React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

// Components

// Clientes
import Header from './components/Shared/Header';
import Clientes from './components/Clientes/Clientes';
import NuevoCliente from './components/Clientes/NuevoCliente';
import EditarCliente from './components/Clientes/EditarCliente';

// Productos
import Productos from "./components/Productos/Productos";
import NuevoProducto from './components/Productos/NuevoProducto';
import EditarProducto from "./components/Productos/EditarProducto";


// Pedidos
import NuevoPedido from "./components/Pedidos/NuevoPedido";
import PedidosCliente from "./components/Pedidos/PedidosCliente";

// Auth
import Registro from './components/Auth/Registro';
import Login from "./components/Auth/Login";

import Panel from "./components/Panel/Panel";



const Routing = () => (
    <Router>
        <Fragment>
            <Header />
            <div className="container">
                <Switch>
                    {/* Rutas de Clientes */}
                    <Route exact path="/" component={Clientes} />
                    <Route exact path="/clientes" component={Clientes} />
                    <Route exact path="/clientes/nuevo" component={NuevoCliente} />
                    <Route exact path="/clientes/editar/:id" component={EditarCliente} />


                    {/* Rutas de producto */}
                    <Route exact path="/productos/nuevo" component={NuevoProducto} />
                    <Route exact path="/productos/editar/:id" component={EditarProducto} />
                    <Route exact path="/productos" component={Productos} />

                    {/* Rutas de Pedidos */}
                    <Route exact path="/pedidos/nuevo/:id" component={NuevoPedido} />
                    <Route exact path="/pedidos/:id" component={PedidosCliente} />

                    {/* Rutas para las graficas estadisticas */}
                    <Route exact path="/panel" component={Panel} />

                    {/*Rutas para Auth*/}
                    <Route exact path="/registro" component={Registro} />
                    <Route exact path="/login" component={Login} />


                </Switch>
            </div>
        </Fragment>
    </Router>

);

export default Routing;