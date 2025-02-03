import React, { useState } from "react";
import useStore from "./data";
import * as Icon from "react-bootstrap-icons";

function Interruptions() {
  const {
    interruptions,
    dateDebut,
    // setDateDebut,
    addInterruption,
    deleteInterruption,
    updateInterruption,
  } = useStore();

  // Local state for dateFin
  const [dateFinI, setDateFinI] = useState("");
  const [dateDebutI, setDateDebutI] = useState("");

  const handleAddInterruption = () => {
    if (!dateDebutI || !dateFinI) {
      alert("Veuillez remplir les deux dates !");
      return;
    }

    const newInterruption = {
      dateDebut: dateDebutI,
      dateFin: dateFinI,
      couleur: "yellow",
      active: true,
    };

    addInterruption(newInterruption);
    setDateDebutI("");
    setDateFinI("");
  };

  const handleUpdateInterruption = (index, value) => {
    const updatedInterruption = { ...interruptions[index]};
    
      updateInterruption(index, updatedInterruption);
    
  };

  const handleDeleteInterruption = (index) => {
    deleteInterruption(index);
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
            value={dateDebutI}
            onChange={(e) => setDateDebutI(e.target.value)}
            placeholder="Date de début"
          />
          <label htmlFor="floatingInput1">Date de début d'interruption</label>
        </div>
        <div className="form-floating col-5">
          <input
            type="date"
            className="form-control"
            id="floatingInput2"
            value={dateFinI}
            onChange={(e) => setDateFinI(e.target.value)}
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

        <div>
        <h4>Liste des interruptions :</h4>
        <ul>
          {interruptions.map((interruption, index) => (
            <li key={index}>
                
              {interruption.dateDebut} - {interruption.dateFin}              
              <a className="btn btn-danger" onClick={() => handleDeleteInterruption(index)}>
                <Icon.Trash />
              </a>

              <a className="form btn btn-danger" onClick={() => handleUpdateInterruption(index)}>
                 Modifier les dates
              </a>

            </li>
            
          ))}
        </ul>
      </div>


      </div>

      
    </div>
  );
}

export default Interruptions;
