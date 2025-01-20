import { useState } from 'react';
import Module from './Module';
import Interruptions from './Interruptions';
import { FaHome, FaBook, FaCalendarAlt, FaCog } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import Calendar from './Calendar';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />}>
                <Route path="modules" element={<Module />} />
                <Route path="interruptions" element={<Interruptions />} />
                <Route path="calendrier" element={<Calendar />} />
            </Route>
        </Routes>
    </BrowserRouter>
);


function App() {
    return (
        
        <div className="container-fluid">
            <div className="row">
                

            </div>
        </div>
        
    );
}



export default App;
