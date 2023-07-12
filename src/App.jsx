import { useState, useEffect } from 'react'
import lib from './lib'
import Module from './Module';

function App() {

    const [modules , setModules ] = useState([]);

    const handle = (evt) => {
        // console.log(evt);
        setModules([...modules, "Accueil", "2023-07-01", 37])
    };
    
    useEffect( () => {
        console.log(lib.consume("2023-07-01", 17));
        
    }, []);


    return (
        <div className='container'>
            <div className="row">
                <div className="col-12">
                <nav className="navbar navbar-expand-lg bg-body-tertiary">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="#">Planning</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link " aria-current="page" href="#">Modules</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Calendrier</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link ">Interruptions</a>
                            </li>
                        </ul>
                        
                        </div>
                    </div>
                    </nav>
                    <button className="btn btn-primary" onClick={handle}>Ajouter un module</button>
                    {
                        modules.map( (module, index) =>
                            <Module key={index}/>
                        )
                    }

                </div>
            </div>
        </div>
    )
}

export default App
