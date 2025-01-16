


function Interruptions() {

    return(
        <div>
            <div>
                <h3>Choisissez une date et appuyez sur le boutton pour ajouter la date a la liste des dates d'interruptions.</h3>
            </div>


            <div className='row'>
                <div className='col-4'>
                    <div className="form-floating">
                        <input
                            type="date"
                            className="form-control"
                            id="floatingInput2"
                            placeholder="Date de début"


                        />
                        <label htmlFor="floatingInput2">Date d'interruption</label>
                    </div>

                    
                </div>
                <div className="col-4">
                        <button className="btn btn-primary my-3 w-100" >Ajouter la date</button>
                </div>
            </div>
        </div>
    )



}



export default Interruptions;