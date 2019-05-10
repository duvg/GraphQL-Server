import  React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

// Components
import Header from './components/shared/Header';
import Clientes from './components/clientes/Clientes';
import NuevoCliente from './components/clientes/NuevoCliente';
import EditarCliente from './components/clientes/EditarCliente';


const Routing = () => (
    <Router>
        <Fragment>
            <Header />
            <div className="container">
                <Switch>
                    <Route exact path="/" component={Clientes} />
                    <Route exact path="/cliente/nuevo" component={NuevoCliente} />
                    <Route exact path="/cliente/editar/:id" component={EditarCliente} />
                </Switch>
            </div>
        </Fragment>
    </Router>

);

export default Routing;