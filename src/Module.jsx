import { useState, useEffect } from 'react'
import * as Icon from 'react-bootstrap-icons';
import lib from './lib'

function Module(props) {

    const [data, setData] = useState(props.data);
    const [nom, setNom] = useState(props.data.nom);
    const [couleur, setCouleur] = useState("#DD6677");
    const [duree, setDuree] = useState(props.data.duree);
    const [debut, setDebut] = useState(props.data.debut);
    const [fin, setFin] = useState(null);

    const handleChange = (evt) => {
        // console.log(evt);
        let tmp = {...data}
        tmp[evt.target.name] = evt.target.value
        setData({...tmp})
        props.onChange(tmp)
    };
    

    useEffect( () => {
        setCouleur("#" + Math.floor(Math.random()*0xffffff).toString(16))
    }, []);

    useEffect( () => {
        setDuree(props.data.duree)
    }, [props.data.duree]);

    return (
        <div className='row module' style={{backgroundColor: couleur}}>
            <div className="col-11">
                <div className="form-floating mb-2 mt-2">
                    <input type="text" className="form-control" name='nom' id="floatingInput1" placeholder="Nom" value={props.data.nom} onChange={ handleChange }/>
                    <label htmlFor="floatingInput1">Nom</label>
                </div>
            </div>
            <div className="col-1 text-end align-self-center">
                <a  className="btn btn-primary" ><Icon.ArrowUp /></a>
            </div>
            <div className="col-3">
            <a  className="btn btn-danger" onClick={props.onDelete}><Icon.Trash /></a>
            <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
                <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Journée entière</label>
            </div>

            </div>
            <div className="col-3">
                <div className="form-floating">
                    <input type="date" className="form-control" id="floatingInput2" disabled placeholder="Date de début" value={fin} onChange={ e => setFin(e.target.value) }/>
                    <label htmlFor="floatingInput2">Date de fin</label>
                </div>
            </div>
            <div className="col-3">
                <div className="form-floating mb-2">
                    <input type="number" className="form-control" id="floatingInput3" placeholder="Durée" value={duree} onChange={ e => setDuree(e.target.value) }/>
                    <label htmlFor="floatingInput3">Durée</label>
                </div>
            </div>
            <div className="col-2">
                <div className="form-floating mb-2">
                    <input type="color" className="form-control" id="floatingInput3" placeholder="Couleur" value={couleur} onChange={ e => setCouleur(e.target.value) }/>
                    <label htmlFor="floatingInput3">Couleur</label>
                </div>
            </div>
            <div className="col-1 text-end align-self-center">
                <a  className="btn btn-primary"><Icon.ArrowDown /></a>
            </div>
        </div>
    )
}

export default Module       