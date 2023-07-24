import { useState, useEffect } from 'react'
import lib from './lib'
import Module from './Module';

function App() {

    const [modules , setModules ] = useState([]);
    const [debut, setDebut] = useState();

    const handle = (evt) => {
        // console.log(evt);
        setModules([...modules, { nom: "Accueil", debut: "2023-07-01", duree: 37}])
    };

    const handleDeleteModule = (index) => {
        console.log("delete " + index)
        let tmp = [...modules]
        console.log("before ")
        console.log(tmp)
        tmp.splice(index,1)
        console.log("after ")
        console.log(tmp)
        setModules([...tmp])
    };

    const handleChangeModule = (index, data) => {
        console.log("change " + index)
        let tmp = [...modules]
        console.log("before ")
        console.log(tmp)
        tmp[index] = data
        console.log("after ")
        console.log(tmp)
        setModules([...tmp])
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
                                <a className="nav-link " href="#">Interruptions</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Calendrier</a>
                            </li>
                        </ul>
                        
                        </div>
                    </div>
                    </nav>
                    <div className="row">

                        <div className='col-4'>
                            <div className="form-floating">
                                <input 
                                    type="date" 
                                    className="form-control" 
                                    id="floatingInput2" 
                                    placeholder="Date de début" 
                                    value={debut} 
                                    onChange={ e => setDebut(e.target.value) }
                                />
                                <label htmlFor="floatingInput2">Date de début</label>
                            </div>
                        </div>
                        <div className="col-4">
                            
                            <button className="btn btn-primary my-3 w-100" onClick={handle}>Ajouter un module</button>

                        </div>
                        <div className="col-4">
                            <button className="btn btn-primary my-3 w-100" onClick={handle}>Calculer</button>

                        </div>
                    </div>
                    {
                        modules.map( (module, index) =>
                            <Module key={index} data={module} onChange={(data) => {handleChangeModule(index, data)} } onDelete={()=> {handleDeleteModule(index)}}/>
                        )
                    }

                </div>
            </div>
        </div>
    )
}

export default App
