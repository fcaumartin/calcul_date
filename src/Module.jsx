import { useEffect } from "react";
import * as Icon from "react-bootstrap-icons";
import useStore from "./data";
import lib from "./lib";

function Module() {
  const {
    modules,
    dateDebut,
    nom,
    setDateDebut,
    setNom,
    addModule,
    updateModule,
    deleteModule,
  } = useStore();

  const handleAddModule = () => {
    const lastModule = modules[modules.length - 1];
    const newStart = lastModule ? lastModule.dateFin : dateDebut;

    const newModule = {
        nom: "",
        dateDebut: newStart,
        couleur: "#FF0000",
        duree: 37
    };

    const updatedModules = [...modules, newModule];
    addModule(newModule);
};


  const handleUpdateModule = (index, field, value) => {
        const updatedModule = { ...modules[index], [field]: value };
        
        if (field === "duree" || field === "dateDebut") {
            const updatedModules = [...modules];
            updatedModules[index] = updatedModule;
            const replanifiedModules = planification(updatedModules, dateDebut);
            replanifiedModules.forEach((module, i) => updateModule(i, module));
        } else {
            updateModule(index, updatedModule);
        }
    };


  const handleDeleteModule = (index) => {
    deleteModule(index);
  };

  const planification = (modules, start) => {
    modules.forEach((module, i) => {
      module.dateDebut = start;
      const result = lib.consume(start, module.duree);
      module.dateFin = result.dateFin;
      start = result.dateFin;
    });
    return modules;
  };

  useEffect(() => {
    if (dateDebut) {
      const updatedModules = planification([...modules], dateDebut);
      updatedModules.forEach((module, i) => updateModule(i, module));
    }
  }, [dateDebut]);

  return (
    <div>
      <div className="row">
        <div className="col-4">
          <div className="form-floating">
            <input
              type="date"
              className="form-control"
              id="floatingInput2"
              placeholder="Date de début"
              value={dateDebut}
              onChange={(e) => setDateDebut(e.target.value)}
            />
            <label htmlFor="floatingInput2">Date de début</label>
          </div>
        </div>
        <div className="col-4">
          <button className="btn btn-primary my-3 w-100" onClick={handleAddModule}>
            Ajouter un module
          </button>
        </div>
      </div>

      <div>
        <input
          placeholder="Nom de la formation"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
        />
        <h1>{nom}</h1>
      </div>

      <div>
        {modules.map((module, index) => (
          <div key={index} className="row module" style={{ backgroundColor: module.couleur }}>
            <div className="col-11">
              <div className="form-floating mb-2 mt-2">
                <input
                  type="text"
                  className="form-control"
                  name="nom"
                  id={`floatingInput1-${index}`}
                  placeholder="Nom"
                  value={module.nom}
                  onChange={(e) => handleUpdateModule(index, "nom", e.target.value)}
                />
                <label htmlFor={`floatingInput1-${index}`}>Nom</label>
              </div>
            </div>
            <div className="col-1 text-end align-self-center">
              <a className="btn btn-primary">
                <Icon.ArrowUp />
              </a>
            </div>
            <div className="col-3">
              <a className="btn btn-danger" onClick={() => handleDeleteModule(index)}>
                <Icon.Trash />
              </a>
              <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" role="switch" />
                <label className="form-check-label">Journée entière</label>
              </div>
            </div>
            <div className="col-3">
              <div className="form-floating">
                <input
                  type="date"
                  className="form-control"
                  value={module.dateFin}
                  onChange={(e) => handleUpdateModule(index, "dateFin", e.target.value)}
                />
                <label>Date de fin</label>
              </div>
            </div>
            <div className="col-3">
              <div className="form-floating mb-2">
                <input
                  type="number"
                  className="form-control"
                  value={module.duree}
                  onChange={(e) => handleUpdateModule(index, "duree", e.target.value)}
                />
                <label>Durée</label>
              </div>
            </div>
            <div className="col-2">
              <div className="form-floating mb-2">
                <select
                  className="form-control"
                  value={module.couleur}
                  onChange={(e) => handleUpdateModule(index, "couleur", e.target.value)}
                  >                            
                  <option style={{ backgroundColor: "#FF0000"}} value="#FF0000">Rouge</option>
                  <option style={{ backgroundColor: "#00FF00"}} value="#00FF00">Vert</option>
                  <option style={{ backgroundColor: "#0000FF"}} value="#0000FF">Bleu</option>
                  <option style={{ backgroundColor: "#FFFF00"}} value="#FFFF00">Jaune</option>
                  <option style={{ backgroundColor: "#00FFFF"}} value="#00FFFF">Cyan</option>
                  <option style={{ backgroundColor: "#FF00FF"}} value="#FF00FF">Rose</option>
                  <option style={{ backgroundColor: "#FF7F00"}} value="#FF7F00">Orange</option>
                  <option style={{ backgroundColor: "#7F00FF"}} value="#7F00FF">Violet</option>
                  <option style={{ backgroundColor: "#962805"}} value="#962805">Marron</option>
                  
              </select>
                <label>Couleur</label>
              </div>
            </div>
            <div className="col-1 text-end align-self-center">
              <a className="btn btn-primary">
                <Icon.ArrowDown />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Module;
