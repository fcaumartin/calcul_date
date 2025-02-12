import { useEffect } from "react";
import * as Icon from "react-bootstrap-icons";
import useStore from "./data";
import lib, { next, horaires } from "./lib";
import moment from "moment";


function Module() {
  const {
    modules,
    dateDebut,
    dateFin,
    nom,
    setDateDebut,
    setNom,
    addModule,
    updateModule,
    deleteModule,
  } = useStore();

  const colors = ["#CF4A4A", "#63D471", "#69C8FF", "#FFE373", "#68F5D1", "#DEA3B2", "#E07D36", "#83487F", "#693E39", "#AAD65E"];

  const handleAddModule = () => {
    const lastModule = modules[modules.length - 1];
    const newStart = lastModule ? lastModule.dateFin : dateDebut;

    let lastColorIndex = lastModule ? colors.indexOf(lastModule.couleur) : -1;
    let nextColor = colors[(lastColorIndex + 1) % colors.length];

    const newModule = {
        nom: "",
        dateDebut: newStart,
        couleur: nextColor,
        duree: 37,
        position: modules.length,
        journeeEntiere: false,
    };

    // Ajouter le nouveau module
    addModule(newModule);

    // Replanifier après ajout
    const updatedModules = planification([...modules, newModule], dateDebut);
    updatedModules.forEach((module, i) => updateModule(i, module));
  };


  const handleUpdateModule = (index, field, value) => {
        const updatedModule = { ...modules[index], [field]: value };

        if (field === "journeeEntiere") {
          updatedModule.duree = value ? 8 : modules[index].duree;
        }
        
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
    let retard = 0;
    let offset = 0; // initialement, aucune heure n'est consommée dans le jour de départ
    modules.forEach((module, i) => {
      // Définir la date de début pour le module actuel
      module.dateDebut = start;
      let duree = Number(module.duree);

      if (module.journeeEntiere) {
        duree = horaires.journeeComplete; // Utilise la durée d'une journée entière depuis ta config
      }

      const result = lib.consume(start, duree, retard, interruptions, offset);
      module.dateFin = result.dateFin;
      retard = result.retard;
      
      // Mise à jour du point de départ pour le module suivant :
      if (result.endedFullDay || module.journeeEntiere) {
        // Si le module a consommé entièrement le jour, le suivant commence le jour ouvré suivant
        const nextDay = next(moment(result.dateFin, "YYYY-MM-DD"), interruptions);
        start = nextDay.format("YYYY-MM-DD");
        offset = 0;
      } else {
        // Sinon, il reste une partie de la journée (avec un offset)
        start = result.dateFin;
        offset = result.offset;
      }
      
      console.log(
        `[Module ${i}] Nom: ${module.nom || "(non défini)"} | Date début: ${module.dateDebut} | Date fin: ${module.dateFin} | Retard: ${result.retard} | Offset: ${result.offset}`
      );
    });
    return modules;
  };
  

  useEffect(() => {
    if (dateDebut) {
      const updatedModules = planification([...modules], dateDebut);
      updatedModules.forEach((module, i) => updateModule(i, module));
    }
  }, [dateDebut]);

  const moveModule = (index, direction) => {
    if (
        (direction === "up" && index === 0) || 
        (direction === "down" && index === modules.length - 1)
    ) {
        return;
    }

    const newModules = [...modules];
    const targetIndex = direction === "up" ? index - 1 : index + 1;

    // Échanger les positions des modules
    [newModules[index], newModules[targetIndex]] = [newModules[targetIndex], newModules[index]];

    // Replanifier les modules après le déplacement
    const updatedModules = planification(newModules, dateDebut);
    updatedModules.forEach((module, i) => updateModule(i, module));
  };


  return (
    <div>
      <div className="row module p-3 my-3 bg-light d-flex justify-content-between">
        <div className="d-flex align-items-center col-10">
          <span>La formation <input className="mx-3" placeholder="Nom de la formation" value={nom} onChange={(e) => setNom(e.target.value)}/> se déroule du </span>
            <div className="form-floating mx-3">
              <input type="date" className="form-control" id="floatingInput2" placeholder="Date de début" value={dateDebut} onChange={(e) => setDateDebut(e.target.value)}/>
              <label htmlFor="floatingInput2">Date de début</label>
            </div>
            <span>au {new Date(dateFin).toLocaleDateString("fr-FR")}.</span>
        </div>
        <div className="col">
          <button className="btn btn-primary my-3 w-100" onClick={handleAddModule}>
            Ajouter un module
          </button>
        </div>
      </div> 

      <div>
        {modules.map((module, index) => (
          <div key={index} className="row module" style={{ backgroundColor: module.couleur }}>
            <div className="col-1 text-center align-self-center">
              <a className="btn btn-primary border border-dark" onClick={() => moveModule(index, "up")}>
                <Icon.ArrowUp />
              </a>
            </div>
            <div className="col-8">
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
            <div className="col-2">
              <div className="form-floating mb-2 mt-2">
                <input
                  type="date"
                  className="form-control"
                  value={module.dateDebut}
                  onChange={(e) => handleUpdateModule(index, "dateDebut", e.target.value)}
                  disabled
                />
                <label>Date de début</label>
              </div>
            </div>
            <div className="col-1 text-center align-self-center">
              <a className="btn btn-danger border border-dark" onClick={() => handleDeleteModule(index)}>
                <Icon.Trash />
              </a>
            </div>
            <div className="col-1 text-center align-self-center">
              <a className="btn btn-primary border border-dark" onClick={() => moveModule(index, "down")}>
                <Icon.ArrowDown />
              </a>
            </div>
            <div className="col-3 m-auto">
              <div className="form-check form-switch">
                <input 
                  type="checkbox" 
                  className="form-check-input" 
                  role="switch" 
                  checked={module.journeeEntiere} 
                  onChange={(e) => handleUpdateModule(index, "journeeEntiere", e.target.checked)}
                />
                <label className="form-check-label">Journée entière</label>
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
            <div className="col-2">
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
            <div className="col-1"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Module;