import  React  from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-4">
        <Link to="/" className="navbar-brand">DU CRM</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarColor01">
            <ul className="navbar-nav ml-auto text-right">
                <li className="nav-item active">
                    <Link to="/cliente/nuevo" className="btn btn-success">
                        Nuevo Cliente
                    </Link>
                </li>
            </ul>
        </div>
    </nav>
);


export default Header;

