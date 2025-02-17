import React, { useState } from "react";
import useStore from "./data";
import * as Icon from "react-bootstrap-icons";

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
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
  
    // Verifier si l'interruption existe déjà
    const exists = interruptions.some(
      (interruption) =>
        interruption.dateDebut === dateDebutI && interruption.dateFin === dateFinI
    );
  
    if (exists) {
      alert("Cette interruption existe déjà.");
      return;
    }
  
    addInterruption(newInterruption);
    setDateDebutI("");
    setDateFinI("");
  };

  const handleUpdateInterruption = (index) => {
    const updatedInterruption = {
      ...interruptions[index],
      dateDebut: dateDebutI || interruptions[index].dateDebut,
      dateFin: dateFinI || interruptions[index].dateFin, 
    };
  
    updateInterruption(index, updatedInterruption);
    setDateDebutI("");
    setDateFinI("");
  };
  

  const handleDeleteInterruption = (index) => {
    deleteInterruption(index);
  };



  const [show, setShow] = useState(false);
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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

              <a className="btn btn-primary" onClick={handleShow}>
                Modifier les dates
              </a>            
              <a className="btn btn-danger" onClick={() => handleDeleteInterruption(index)}>
                <Icon.Trash />
              </a>

              <div>
                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Modification des dates</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    
                    
                  <div key={index} className="row">
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
                    <div>{interruption.dateDebut} - {interruption.dateFin}</div>
                  </div>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Close
                    </Button>
                    <Button variant="primary" onClick={() => handleUpdateInterruption(index)}>
                      Save Changes
                    </Button>
                  </Modal.Footer>
                </Modal>
              </div>

              
                
              


            </li>
            
          ))}
        </ul>
      </div>


      </div>


    </div>

    
  );
}

export default Interruptions;
