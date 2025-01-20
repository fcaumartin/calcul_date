import { useState } from 'react';
import Module from './Module';
import Interruptions from './Interruptions';
import { FaHome, FaBook, FaCalendarAlt, FaCog } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import Calendar from './Calendar';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function App() {
    const [page, setPage] = useState("accueil"); // Gestion des pages

    return (
        <BrowserRouter>
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
                                    {/* <Link to="/" className={`nav-link ${page === "accueil" ? "active" : ""}`}>
                                        Accueil
                                    </Link> */}
                                </li>
                                <li className="nav-item">
                                    <Link to="/module" className={`nav-link ${page === "accueil" ? "active" : ""}`}>
                                        Module
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/interruption" className={`nav-link ${page === "accueil" ? "active" : ""}`}>
                                        Interruption
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/calendar" className={`nav-link ${page === "accueil" ? "active" : ""}`}>
                                        Calendrier
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </nav>

                    <main className='my-3'>
                        <Routes>
                            {/* <Route path="/" element={<App />}></Route> */}
                            <Route path="/module" element={<Module />}></Route>
                            <Route path="/calendar" element={<Calendar />}></Route>
                            <Route path="/interruption" element={<Interruptions />}></Route>
                        </Routes>
                    </main>
            </div>
        </div>
        </BrowserRouter>
    );
}

export default App;
