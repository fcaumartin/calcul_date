import useStore from './data';


function Interruptions() {

const {
    interruptions,
    debut,
    fin,
    setDebut,
    setFin,
    addInterruption,
} = useStore();


const handleAddInterruption = () => {



    const newInterruption = {
        debut,
        fin,
    };


    addInterruption(newInterruption);
};



    const date_inter = useStore((state)=>state.date_inter);

    return(
        <div>
            <div>
                <h3>Choisissez une date et appuyez sur le boutton pour ajouter la date a la liste des dates d'interruptions.</h3>
            </div>


            <div className='row'>
                    <div className="form-floating col-5">
                        <input
                            type="date"
                            className="form-control"
                            id="floatingInput1"
                            placeholder="Date de début"
                            value={debut}
                            onChange={(e) => setDebut(e.target.value)}

                        />
                        <label htmlFor="floatingInput1"> Date de début d'interruption</label>
                    </div>
                    <div className="form-floating col-5">
                        <input
                            type="date"
                            className="form-control"
                            id="floatingInput2"
                            placeholder="Date de début"
                            value={fin}
                            onChange={(e) => setFin(e.target.value)}
                        />
                        <label htmlFor="floatingInput2"> Date de fin d'interruption</label>
                    </div>

                    

                
            </div>
            <div className="col-4">
                    <button className="btn btn-primary my-3 w-100" onClick={handleAddInterruption}>Ajouter la(les) date(s)</button>
                </div>

            <div>
            {interruptions.map((interruption, index) => (
                <li key={index}>
                    {interruption.debut} - {interruption.fin} 
                </li>
            ))}
            </div>
        </div>
    )



}



export default Interruptions;