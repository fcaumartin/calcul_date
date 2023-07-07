import { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap';
import lib from './lib'
import Module from './Module';

function App() {

    const [modules , setModules ] = useState([]);

    const handle = (evt) => {
        // console.log(evt);
        setModules([...modules, "654"])
    };
    
    useEffect( () => {
        lib.consume();
        
    }, []);


    return (
        <>
            <Button onClick={handle}>Clique</Button>
            {
                modules.map( (module, index) =>
                    <Module key={index}/>
                )
            }
        </>
    )
}

export default App
