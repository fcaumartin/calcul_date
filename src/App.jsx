import { useState, useEffect } from 'react'
import lib from './lib'
import Module from './Module';

function App() {

    const [modules , setModules ] = useState([]);
    const [debut, setDebut] = useState();
    const [nom, setNom] = useState("");

    const handle = (evt) => {
        let tmp = [...modules, { nom: "Accueil", duree: 35}]
        tmp = planification(tmp, debut)
        setModules([...tmp])
    };

    const handleChangeDebut = (e) => {
        setDebut(e.target.value)
        let tmp = [...modules]
        tmp = planification(tmp, e.target.value)
        setModules([...tmp])
    };

    const handleDeleteModule = (index) => {
        // console.log("delete " + index)
        let tmp = [...modules]
        // console.log("before ")
        // console.log(tmp)
        tmp.splice(index,1)
        // console.log("after ")
        // console.log(tmp)
        setModules([...tmp])
    };

    const handleChangeModule = (index, data) => {
        // console.log("change " + index)
        let tmp = [...modules]
        // console.log("before ")
        // console.log(tmp)
        tmp[index] = data
        // console.log("after ")
        // console.log(tmp)
        tmp = planification(tmp, debut)
        setModules([...tmp])
    };

    const planification = (modules, debut) => {
        let start = debut
        let retard = 0;
        modules.forEach((e, i) => {
            e.debut = start
            console.log("-------------------------------------------------")
            console.log(e, i);
            console.log(e.debut, e.duree);
            let result = lib.consume(start, e.duree)
            console.log(result)
            modules[i].fin = result.fin


            start = result.fin
            retard = result.retard

        });

        return modules
    }

    
    useEffect( () => {
        console.log(lib.consume("2024-12-20", 17));
        
    }, []);


    return (
        <div className='container'>
            <div className="row">
                <div className="col-12">
                <nav className="navbar navbar-expand-md bg-body-tertiary mb-3">
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
                                    onChange={ handleChangeDebut }
                                />
                                <label htmlFor="floatingInput2">Date de début</label>
                            </div>
                        </div>
                        <div className="col-4">
                            
                            <button className="btn btn-primary my-3 w-100" onClick={handle}>Ajouter un module</button>

                        </div>
                        <div className="col-4">
                            {/* <button className="btn btn-primary my-3 w-100" onClick={handle}>Calculer</button> */}

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
