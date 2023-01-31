import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Navbar = () => {
    return (
        <>
            <nav className="navbar navbar-expand navbar-dark bg-dark">
                <a href="/tareas" className="navbar-brand">
                    <div className="main-logo" >
                        <img src="/app/car-logo.png" alt="Tareas" />
                    </div>
                </a>
                <div className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link to={"/tareas"} className="nav-link">
                            Tareas xd
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to={"/tareas"} className="nav-link">
                            Illooo kiere mete una hempresa má??
                        </Link>
                    </li>
                </div>
            </nav>
        </>
    );
}


export default Navbar;