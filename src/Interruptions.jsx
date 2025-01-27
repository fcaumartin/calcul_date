import React, { useState } from "react";
import useStore from "./data";
import * as Icon from "react-bootstrap-icons";

function Interruptions() {
  const {
    interruptions,
    dateDebut,
    setDateDebut,
    addInterruption,
  } = useStore();

  // Local state for dateFin
  const [dateFin, setDateFin] = useState("");

  const handleAddInterruption = () => {
    if (!dateDebut || !dateFin) {
      alert("Veuillez remplir les deux dates !");
      return;
    }

    const newInterruption = {
      dateDebut,
      dateFin,
      couleur: "yellow",
      active: true,
    };

    addInterruption(newInterruption);
    setDateDebut("");
    setDateFin("");
  };

  return (
    <div>
      <div>
        <h3>
          Choisissez une date et appuyez sur le bouton pour ajouter la date à la liste des dates d'interruptions.
        </h3>
      </div>

      <div className="row">
        <div className="form-floating col-5">
          <input
            type="date"
            className="form-control"
            id="floatingInput1"
            value={dateDebut}
            onChange={(e) => setDateDebut(e.target.value)}
            placeholder="Date de début"
          />
          <label htmlFor="floatingInput1">Date de début d'interruption</label>
        </div>
        <div className="form-floating col-5">
          <input
            type="date"
            className="form-control"
            id="floatingInput2"
            value={dateFin}
            onChange={(e) => setDateFin(e.target.value)}
            placeholder="Date de fin"
          />
          <label htmlFor="floatingInput2">Date de fin d'interruption</label>
        </div>
      </div>

      <div className="col-4">
        <button
          className="btn btn-primary my-3 w-100"
          onClick={handleAddInterruption}
        >
          Ajouter la(les) date(s)
        </button>
      </div>

      <div>
        <h4>Liste des interruptions :</h4>
        <ul>
          {interruptions.map((interruption, index) => (
            <li key={index}>
              {interruption.dateDebut} - {interruption.dateFin}              
              <a className="btn btn-danger" onClick={() => handleDeleteInterruption(index)}>
                <Icon.Trash />
              </a>
            </li>
            
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Interruptions;
