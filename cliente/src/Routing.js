import  React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

// Components

// Clientes
import Header from './components/shared/Header';
import Clientes from './components/clientes/Clientes';
import NuevoCliente from './components/clientes/NuevoCliente';
import EditarCliente from './components/clientes/EditarCliente';

// Productos
import Productos from "./components/productos/Productos";
import NuevoProducto from './components/productos/NuevoProducto';
import EditarProducto from "./components/productos/EditarProducto";


// Pedidos
import NuevoPedido from "./components/pedidos/NuevoPedido";
import PedidosCliente from "./components/pedidos/PedidosCliente";

import Panel from "./components/panel/Panel";


const Routing = () => (
    <Router>
        <Fragment>
            <Header />
            <div className="container">
                <Switch>
                    {/* Rutas de clientes */}
                    <Route exact path="/" component={Clientes} />
                    <Route exact path="/clientes" component={Clientes} />
                    <Route exact path="/clientes/nuevo" component={NuevoCliente} />
                    <Route exact path="/clientes/editar/:id" component={EditarCliente} />


                    {/* Rutas de producto */}
                    <Route exact path="/productos/nuevo" component={NuevoProducto} />
                    <Route exact path="/productos/editar/:id" component={EditarProducto} />
                    <Route exact path="/productos" component={Productos} />

                    {/* Rutas de pedidos */}
                    <Route exact path="/pedidos/nuevo/:id" component={NuevoPedido} />
                    <Route exact path="/pedidos/:id" component={PedidosCliente} />

                    {/* Rutas para las graficas estadisticas */}
                    <Route exact path="/panel" component={Panel} />


                </Switch>
            </div>
        </Fragment>
    </Router>

);

export default Routing;