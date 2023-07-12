import { useState, useEffect } from 'react'
import * as Icon from 'react-bootstrap-icons';
import lib from './lib'

function Module() {

    const [nom, setNom] = useState("");
    const [couleur, setCouleur] = useState("#DD6677");
    const [duree, setDuree] = useState(35);
    const [debut, setDebut] = useState("2023-07-11");
    const [fin, setFin] = useState(null);

    useEffect( () => {
        setCouleur("#" + Math.floor(Math.random()*0xffffff).toString(16))
    }, []);

    return (
        <div className='row module' style={{backgroundColor: couleur}}>
            <div className="col-11">
                <div class="form-floating mb-2 mt-2">
                    <input type="text" class="form-control" id="floatingInput1" placeholder="Nom" value={nom} onChange={ e => setNom(e.target.value) }/>
                    <label for="floatingInput1">Nom</label>
                </div>
            </div>
            <div className="col-1 text-end align-self-center">
                <a  className="btn btn-primary" ><Icon.ArrowUp /></a>
            </div>
            <div className="col-3">
                <div class="form-floating">
                    <input type="date" class="form-control" id="floatingInput2" disabled placeholder="Date de début" value={debut} onChange={ e => setDebut(e.target.value) }/>
                    <label for="floatingInput2">Date de début</label>
                </div>
            </div>
            <div className="col-3">
                <div class="form-floating">
                    <input type="date" class="form-control" id="floatingInput2" disabled placeholder="Date de début" value={debut} onChange={ e => setDebut(e.target.value) }/>
                    <label for="floatingInput2">Date de début</label>
                </div>
            </div>
            <div className="col-3">
                <div class="form-floating mb-2">
                    <input type="number" class="form-control" id="floatingInput3" placeholder="Durée" value={duree} onChange={ e => setDuree(e.target.value) }/>
                    <label for="floatingInput3">Durée</label>
                </div>
            </div>
            <div className="col-2">
                <div class="form-floating mb-2">
                    <input type="color" class="form-control" id="floatingInput3" placeholder="Couleur" value={couleur} onChange={ e => setCouleur(e.target.value) }/>
                    <label for="floatingInput3">Couleur</label>
                </div>
            </div>
            <div className="col-1 text-end align-self-center">
                <a  className="btn btn-primary"><Icon.ArrowDown /></a>
            </div>
        </div>
    )
}

export default Module       