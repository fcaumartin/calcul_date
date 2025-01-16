import { useState } from 'react';
import Module from './Module';
import Interruptions from './Interruptions';
import { FaHome, FaBook, FaCalendarAlt, FaCog } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import Calendar from './Calendar';

function App() {
    const [page, setPage] = useState("accueil"); // Gestion des pages

    return (
        <div className="container-fluid">
            {/* Navbar */}
            <div className="row">
                    {/* Affichage de la navbar */}
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <a className="navbar-brand" href="#">Gestion des Modules</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <button className={`nav-link ${page === "accueil" ? "active" : ""}`} onClick={() => setPage("accueil")}>
                                        Accueil
                                    </button>
                                </li>
                                <li className="nav-item">
                                    <button className={`nav-link ${page === "modules" ? "active" : ""}`} onClick={() => setPage("modules")}>
                                        Modules
                                    </button>
                                </li>
                                <li className="nav-item">
                                    <button className={`nav-link ${page === "interruptions" ? "active" : ""}`} onClick={() => setPage("interruptions")}>
                                        Interruptions
                                    </button>
                                </li>
                                <li className="nav-item">
                                    <button className={`nav-link ${page === "calendrier" ? "active" : ""}`} onClick={() => setPage("calendrier")}>
                                        Calendrier
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </nav>

                    <main className='my-3'>
                        {/* Affichage de la page active */}
                        {page === "accueil" && <div><h2>Bienvenue sur l'application de gestion de Formation !</h2><p>Choisissez une option dans la navigation pour commencer.</p></div>}
                        {page === "modules" && <Module />}
                        {page === "interruptions" && <Interruptions />}
                        {page === "calendrier" && <Calendar />}
                    </main>
            </div>
        </div>
    );
}

export default App;
