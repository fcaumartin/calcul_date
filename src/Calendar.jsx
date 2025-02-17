import React, { useState, useEffect, useRef } from 'react';
import moment from 'moment';
import "moment/locale/fr";
import { jours_feries } from './lib'; // Liste des jours fériés
import 'bootstrap-icons/font/bootstrap-icons.css';
import useStore from './data'; // Import du store Zustand
import { useReactToPrint } from "react-to-print";

// Initialisation de Moment.js en français
moment.locale('fr', {
  months: 'Janvier_Février_Mars_Avril_Mai_Juin_Juillet_Août_Septembre_Octobre_Novembre_Décembre'.split('_'),
  weekdays: 'Dimanche_Lundi_Mardi_Mercredi_Jeudi_Vendredi_Samedi'.split('_'),
  weekdaysShort: 'Dim_Lun_Mar_Mer_Jeu_Ven_Sam'.split('_'),
});

const Calendar = () => {
  const { modules, interruptions } = useStore(); // Récupère les modules et interruptions depuis le store
  const [months, setMonths] = useState([]);
  const [moduleLegends, setModuleLegends] = useState([]);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    if (modules.length === 0) {
      setMonths(generateMonths(moment().startOf('month'), 8));
    } else {
      const minDate = moment.min(modules.map((mod) => moment(mod.dateDebut)));
      const maxDate = moment.max(modules.map((mod) => moment(mod.dateFin)));
      const monthStart = minDate.clone().startOf('month');
      const monthEnd = maxDate.clone().endOf('month');
      const count = monthEnd.diff(monthStart, 'months') + 1;
      setMonths(generateMonths(monthStart, count));
    }
  }, [modules]);

  useEffect(() => {
    setModuleLegends(modules.map((module) => ({ name: module.nom || 'Module', color: module.couleur })));
  }, [modules]);

  const generateMonths = (startDate, count) => {
    return Array.from({ length: count }, (_, i) => {
      const monthDate = startDate.clone().add(i, 'month');
      return { date: monthDate, days: generateMonthDays(monthDate) };
    });
  };

  const generateMonthDays = (date) => {
    return Array.from({ length: date.daysInMonth() }, (_, i) => {
      const dayDate = date.clone().date(i + 1);
      const dayModules = modules.filter((mod) => dayDate.isBetween(moment(mod.dateDebut), moment(mod.dateFin), 'day', '[]'));
      const dayInterruption = interruptions.find((int) => dayDate.isBetween(moment(int.dateDebut), moment(int.dateFin), 'day', '[]'));

      return {
        day: i + 1,
        date: dayDate,
        weekday: dayDate.format("ddd"), // Jour de la semaine (abrégé)
        isFerie: jours_feries.some((jour) => moment(jour).isSame(dayDate, 'day')),
        isWeekend: [0, 6].includes(dayDate.day()),
        isInterruption: !!dayInterruption,
        interruptionCouleur: dayInterruption?.couleur || null, // Ajouter la couleur de l'interruption si présente
        modules: dayModules, // Ajouter les modules associés à ce jour
        couleur: !dayInterruption && dayModules.length > 0 ? dayModules[0].couleur : null,
      };
    });
  };
  
  const handlePrint = () =>{
    window.print();
  };

  return (
    <div className='m-0'>
      {/* Légende du calendrier */}
      <div className="legend-container m-0 d-flex flex-wrap">
        <div className="legend-box p-2">
          <div className="color-box weekend"></div><span className="legend-text">Weekend</span>
        </div>
        <div className="legend-box p-2">
          <div className="color-box interruption"></div><span className='legend-text'>Interruptions</span>
        </div>
        <div className="legend-box p-2">
          <div className="color-box holiday"></div><span className="legend-text">Jour Férié</span>
        </div>
        {moduleLegends.map((module, idx) => (
          <div key={idx} className="legend-box p-2">
            <div className="color-box" style={{ backgroundColor: module.color }}></div>
            <span className="legend-text text-truncate">{module.name}</span>
          </div>
        ))}
      </div>

      <div className="calendar-container mt-3" ref={scrollContainerRef}>
        <div className="calendar-months d-flex">
          {months.map((month, idx) => (
            <div key={idx} className="month-column">
              <h5 className="month-header">{month.date.format('MMMM YYYY')}</h5>
              <div className="calendar-days">
                {month.days.map((day, idx) => (
                  <div key={idx} className="day-row d-flex">
                    <div className={`day-cell ${day.isFerie ? 'holiday' : ''} ${day.isWeekend ? 'weekend' : ''} ${day.isInterruption ? "interruption" : ""}`}
                      style={{ backgroundColor: day.isFerie || day.isWeekend ? '' : day.isInterruption ? day.interruptionCouleur : day.couleur }}>
                      {day.day}
                    </div>
                    <div className={`weekday-name ${day.isFerie ? 'holiday' : ''} ${day.isWeekend ? 'weekend' : ''} ${day.isInterruption ? 'interruption' : ''}`}
                      style={{ backgroundColor: day.isFerie || day.isWeekend ? '' : day.isInterruption ? day.interruptionCouleur : day.couleur }}>
                      {!day.isWeekend && !day.isFerie && !day.isInterruption && day.modules.length > 0 ? (
                        <span className="modules-text text-truncate">
                          {day.modules.map((mod) => mod.nom).join(', ')}
                        </span>
                      ) : (
                        <span className="day-text">{day.weekday}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className='d-flex justify-content-end mt-2 me-5' id='print-button'>
        <button className="btn btn-outline-secondary p-2" onClick={handlePrint}>
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-printer me-2" viewBox="0 0 16 16">
            <path d="M2.5 8a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1"/>
            <path d="M5 1a2 2 0 0 0-2 2v2H2a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1v1a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-1h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1V3a2 2 0 0 0-2-2zM4 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2H4zm1 5a2 2 0 0 0-2 2v1H2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v-1a2 2 0 0 0-2-2zm7 2v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1"/>
          </svg>
          Impression
        </button>
      </div>
    </div>
  );
};

export default Calendar;
