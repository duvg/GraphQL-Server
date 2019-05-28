import  React  from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-4">
        <Link to="/" className="navbar-brand">DU CRM</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse mr-5" id="navbarColor01">
            <ul className="navbar-nav ml-auto text-right mr-5">
                <li className="nav-item dropdown">
                    <a
                        className="nav-link dropdown-toggle"
                        data-toggle="dropdown"
                    >Clientes</a>
                    <div className="dropdown-menu" aria-labelledby="navegacion">
                        <Link to="/" className="dropdown-item">Ver Clientes</Link>
                        <Link to="/clientes/nuevo" className="dropdown-item">Nuevo Cliente</Link>
                    </div>
                </li>
                <li className="nav-item dropdown">
                    <a
                        className="nav-link dropdown-toggle"
                        data-toggle="dropdown"
                    >Productos</a>
                    <div className="dropdown-menu" aria-labelledby="navegacion">
                        <Link to="/productos" className="dropdown-item">Ver Productos</Link>
                        <Link to="/productos/nuevo" className="dropdown-item">Nuevo Producto</Link>
                    </div>
                </li>

            </ul>
        </div>
    </nav>
);


export default Header;