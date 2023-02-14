import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './Navbar.css'

const Navbar = () => {
    return (
        <>
            <nav className="navbar navbar-expand navbar-dark bg-dark">
                <a href="/tasks" className="navbar-brand">
                    <div className="main-logo" >
                        <img src="/app/icon.png" alt="Tareas" />
                    </div>
                </a>
                <div className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link to={"/tasks/new"} className="nav-link">
                            Crear Tarea
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to={"/tasks"} className="nav-link">
                            Ver Tareas
                        </Link>
                    </li>
                </div>
            </nav>
        </>
    );
}


export default Navbar;