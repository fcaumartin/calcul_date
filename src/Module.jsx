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
        couleur: "#CF4A4A",
        duree: 37,
        // journeeEntiere: false,
        // position: 0,
    };

    // Ajouter le nouveau module
    addModule(newModule);
    console.log(`[handleAddModule] Nouveau module ajouté :`, newModule);

    // Replanifier après ajout
    const updatedModules = planification([...modules, newModule], dateDebut);
    updatedModules.forEach((module, i) => updateModule(i, module));
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

  const { interruptions } = useStore(); 

  const planification = (modules, start) => {
    let retard = 0
    modules.forEach((module, i) => {
      module.dateDebut = start;
      const result = lib.consume(start, module.duree, retard, interruptions);
      module.dateFin = result.dateFin;
      retard = result.retard
      start = result.dateFin;
      console.log("--------------------------------------------")
      console.log(module)
      console.log(result)
      console.log()
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
                  <option style={{ backgroundColor: "#CF4A4A"}} value="#CF4A4A">Rouge</option>
                  <option style={{ backgroundColor: "#63D471"}} value="#63D471">Vert</option>
                  <option style={{ backgroundColor: "#69C8FF"}} value="#69C8FF">Bleu</option>
                  <option style={{ backgroundColor: "#FFE373"}} value="#FFE373">Jaune</option>
                  <option style={{ backgroundColor: "#68F5D1"}} value="#68F5D1">Cyan</option>
                  <option style={{ backgroundColor: "#DEA3B2"}} value="#DEA3B2">Rose</option>
                  <option style={{ backgroundColor: "#E07D36"}} value="#E07D36">Orange</option>
                  <option style={{ backgroundColor: "#83487F"}} value="#83487F">Violet</option>
                  <option style={{ backgroundColor: "#693E39"}} value="#693E39">Marron</option>
                  <option style={{ backgroundColor: "#AAD65E"}} value="#AAD65E">Olive</option>
                  
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