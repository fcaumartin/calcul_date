import { useState, useEffect } from 'react';
import * as Icon from 'react-bootstrap-icons';
import lib from './lib';

function Module(props) {
    const [data, setData] = useState(props.data);
    const [couleur, setCouleur] = useState("#DD6677");
    const [duree, setDuree] = useState(props.duree);
    const [debut, setDebut] = useState(props.debut || "");
    const [modules, setModules] = useState([]);  // Liste des modules
    const [fin, setFin] = useState(props.fin);

    const handleChange = (evt) => {
        let tmp = {...data};
        tmp[evt.target.name] = evt.target.value;
        setData(tmp);
        props.onChange(tmp);
    };

    useEffect(() => {
        setCouleur("#" + Math.floor(Math.random()*0xffffff).toString(16));
    }, []);

    useEffect(() => {
        setData(props.data);
    }, [props.duree]);

    const handle = () => {
        const newModule = {
            nom: "Nom du module",
            debut: "",
            couleur: "#DD6677",
            duree: 37
        };
        setModules((prevModules) => {
            const updatedModules = [...prevModules, newModule];
            return planification(updatedModules, debut); // Applique la planification après ajout du module
        });
    };

    const handleChangeModule = (index, field, value) => {
        let tmp = [...modules];
        tmp[index][field] = value;
        if (field === 'duree' || field === 'debut') {
            tmp = planification(tmp, debut);
        }
        setModules(tmp);
    };

    const handleDeleteModule = (index) => {
        let tmp = [...modules];
        tmp.splice(index,1);
        setModules(tmp);
    };

    const planification = (modules, debut) => {
        let start = debut;
        modules.forEach((module, i) => {
            module.debut = start;
            let result = lib.consume(start, module.duree);  // Consomme le temps selon la durée
            modules[i].fin = result.fin;  // Définit la date de fin du module
            start = result.fin;  // Met à jour le début du prochain module
        });
        return modules;
    };

    return (
        <div>
            <div className='row'>
                <div className='col-4'>
                    <div className="form-floating">
                        <input
                            type="date"
                            className="form-control"
                            id="floatingInput2"
                            placeholder="Date de début"
                            value={debut}
                            onChange={(e) => {
                                setDebut(e.target.value);
                                setModules(planification(modules, e.target.value)); // Recalcule les modules lorsque la date de début change
                            }}
                        />
                        <label htmlFor="floatingInput2">Date de début</label>
                    </div>
                </div>
                <div className="col-4">
                    <button className="btn btn-primary my-3 w-100" onClick={handle}>Ajouter un module</button>
                </div>
            </div>

            <div>
                {Array.isArray(modules) && modules.map((module, index) => (
                    <div key={index} className="row module" style={{ backgroundColor: module.couleur }}>
                                                    <div className="col-11">
                                <div className="form-floating mb-2 mt-2">
                                    <input
                                        type="text"
                                        className="form-control"
                                        name='nom'
                                        id={`floatingInput1-${index}`}
                                        placeholder="Nom"
                                        value={module.nom}
                                        onChange={(e) => handleChangeModule(index, 'nom', e.target.value)}
                                    />
                                    <label htmlFor={`floatingInput1-${index}`}>Nom</label>
                                </div>
                            </div>
                            <div className="col-1 text-end align-self-center">
                                <a className="btn btn-primary"><Icon.ArrowUp /></a>
                            </div>
                            <div className="col-3">
                                <a className="btn btn-danger" onClick={() => handleDeleteModule(index)}><Icon.Trash /></a>
                                <div className="form-check form-switch">
                                    <input className="form-check-input" type="checkbox" role="switch" id={`flexSwitchCheckDefault-${index}`} />
                                    <label className="form-check-label" htmlFor={`flexSwitchCheckDefault-${index}`}>Journée entière</label>
                                </div>
                            </div>
                            <div className="col-3">
                                <div className="form-floating">
                                    <input
                                        type="date"
                                        className="form-control"
                                        id={`floatingInput2-${index}`}
                                        placeholder="Date de fin"
                                        value={module.fin}
                                        onChange={(e) => handleChangeModule(index, 'fin', e.target.value)}
                                    />
                                    <label htmlFor={`floatingInput2-${index}`}>Date de fin</label>
                                </div>
                            </div>
                            <div className="col-3">
                                <div className="form-floating mb-2">
                                    <input
                                        type="number"
                                        className="form-control"
                                        id={`floatingInput3-${index}`}
                                        placeholder="Durée"
                                        value={module.duree}
                                        onChange={(e) => handleChangeModule(index, 'duree', e.target.value)}
                                    />
                                    <label htmlFor={`floatingInput3-${index}`}>Durée</label>
                                </div>
                            </div>
                            <div className="col-2">
                                <div className="form-floating mb-2">
                                    <input
                                        type="color"
                                        className="form-control"
                                        id={`floatingInput4-${index}`}
                                        placeholder="Couleur"
                                        value={module.couleur}
                                        onChange={(e) => handleChangeModule(index, 'couleur', e.target.value)}
                                    />
                                    <label htmlFor={`floatingInput4-${index}`}>Couleur</label>
                                </div>
                            </div>
                            <div className="col-1 text-end align-self-center">
                                <a className="btn btn-primary"><Icon.ArrowDown /></a>
                            </div>
                    </div>
                ))}
            </div>
        </div>

    

    );
}

export default Module;
