import React, { useState, useEffect, useRef } from 'react';
import moment from 'moment';
import "moment/locale/fr";
import { jours_feries } from './lib'; // Liste des jours fériés
import 'bootstrap-icons/font/bootstrap-icons.css';
import useStore from './data'; // Import du store Zustand

// Initialisation de Moment.js en français
moment.locale('fr', {
  months: 'Janvier_Février_Mars_Avril_Mai_Juin_Juillet_Août_Septembre_Octobre_Novembre_Décembre'.split('_'),
  weekdays: 'Dimanche_Lundi_Mardi_Mercredi_Jeudi_Vendredi_Samedi'.split('_'),
  weekdaysShort: 'Dim_Lun_Mar_Mer_Jeu_Ven_Sam'.split('_'),
});

const Calendar = () => {
  const { modules } = useStore(); // Récupère les modules depuis le store
  const [months, setMonths] = useState([]);
  const [moduleLegends, setModuleLegends] = useState([]); // Nouveau state pour les légendes des modules
  const scrollContainerRef = useRef(null);

  const isJourFerie = (dayDate) => {
    return jours_feries.some((jour) => moment(jour).isSame(dayDate, 'day')); // Vérifier si un jour est férié
  };

  const isWeekend = (dayDate) => {
    const dayOfWeek = dayDate.day(); // Renvoie le jour de la semaine (0 = dimanche, 6 = samedi)
    return dayOfWeek === 0 || dayOfWeek === 6; // Vérifier si c'est un samedi ou un dimanche
  };

  useEffect(() => {
    if (modules.length === 0) {
      // Aucun module, afficher les 8 mois à partir du mois en cours
      const initialMonths = generateMonths(moment().startOf('month'), 8);
      setMonths(initialMonths);
    } else {
      // Modules présents, trouver les bornes de début et de fin
      const minDate = moment.min(modules.map((mod) => moment(mod.dateDebut)));
      const maxDate = moment.max(modules.map((mod) => moment(mod.dateFin)));
      const monthStart = minDate.clone().startOf('month');
      const monthEnd = maxDate.clone().endOf('month');
      const count = monthEnd.diff(monthStart, 'months') + 1; // Nombre total de mois à afficher
  
      const moduleMonths = generateMonths(monthStart, count);
      setMonths(moduleMonths);
    }
  }, [modules]);
  

    // Mettre à jour la légende des modules
    useEffect(() => {
      const legend = modules.map((module) => ({
        name: module.nom || 'Module',
        color: module.couleur,
      }));
      setModuleLegends(legend);
    }, [modules]);

  // Générer les mois à afficher
  const generateMonths = (startDate, count) => {
    const generated = [];
    for (let i = 0; i < count; i++) {
      const monthDate = startDate.clone().add(i, 'month');
      generated.push({
        date: monthDate,
        days: generateMonthDays(monthDate),
      });
    }
    return generated;
  };

  const generateMonthDays = (date) => {
    const startOfMonth = date.clone().startOf('month');
    const endOfMonth = date.clone().endOf('month');
    const days = [];
  
    for (let day = 1; day <= endOfMonth.date(); day++) {
      const dayDate = date.clone().date(day);
  
      // Trouver les modules correspondant à ce jour
      const dayModules = modules.filter((module) => {
        const moduleStart = moment(module.dateDebut);
        const moduleEnd = moment(module.dateFin);
        return dayDate.isBetween(moduleStart, moduleEnd, 'day', '[]'); // Vérifie si le jour est dans la plage
      });
  
      // Ajouter les propriétés pour chaque jour
      days.push({
        day,
        date: dayDate,
        weekday: dayDate.format('ddd'), // Jour de la semaine (abrégé)
        isFerie: isJourFerie(dayDate), // Vérifier si c'est un jour férié
        isWeekend: isWeekend(dayDate), // Vérifier si c'est un weekend
        modules: dayModules, // Ajouter les modules associés à ce jour
        couleur: dayModules.length > 0 ? dayModules[0].couleur : null, // Couleur des modules si applicable
      });
    }
    return days;
  };

  // Ajouter des mois précédents ou suivants
  const addMonths = (direction) => {
    const firstMonth = months[0].date.clone();
    const lastMonth = months[months.length - 1].date.clone();

    if (direction === 'prev') {
      const newMonths = generateMonths(firstMonth.clone().subtract(3, 'month'), 3);
      setMonths([...newMonths, ...months]);
    } else if (direction === 'next') {
      const newMonths = generateMonths(lastMonth.clone().add(1, 'month'), 3);
      setMonths([...months, ...newMonths]);
    }
  };

  // Détecter le scroll horizontal
  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (container.scrollLeft === 0) {
      addMonths('prev');
    } else if (container.scrollWidth - container.scrollLeft === container.clientWidth) {
      addMonths('next');
    }
  };

  return (
    <div className='m-0'>
      {/* Légende en bas du calendrier */}
      <div className="legend-container m-0">
        <div className="legend-box">
          <div className="color-box today"></div><span className="legend-text">Aujourd'hui</span>
        </div>
        <div className="legend-box">
          <div className="color-box weekend"></div><span className="legend-text">Weekend</span>
        </div>
        <div className="legend-box">
          <div className="color-box holiday"></div><span className="legend-text">Jour Férié</span>
        </div>
          {moduleLegends.map((module, idx) => (
            <div key={idx} className="legend-box">
              <div className="color-box" style={{ backgroundColor: module.color }}></div>
              <span className="legend-text">{module.name}</span>
            </div>
          ))}
      </div>
      <div className="calendar-container mt-3" ref={scrollContainerRef} onScroll={handleScroll}>
        <div className="calendar-months d-flex">
          {months.map((month, idx) => (
            <div key={idx} className="month-column">
              <h5 className="month-header">{month.date.format('MMMM YYYY')}</h5>
              <div className="calendar-days">

              {month.days.map((day, idx) => (
                <div key={idx} className="day-row d-flex">
                  {day.modules.length > 0 && !day.isWeekend && !day.isFerie && (
                    <div className="module-tooltip">
                      {day.modules.map((module) => module.nom || 'Module').join(', ')}
                    </div>
                  )}

                  {/* Jour du mois */}
                  <div
                    className={`day-cell ${day.date?.isSame(moment(), 'day') ? 'today' : ''} ${day.isFerie ? 'holiday' : ''} ${day.isWeekend ? 'weekend' : ''}`}
                    style={{backgroundColor: !day.isFerie && !day.isWeekend && day.couleur ? day.couleur : undefined,}}
                  >
                    {day.day || ''}
                  </div>

                  {/* Liste des modules */}
                  <div className="modules-list">
                    {day.modules.map((module, index) => (
                      <div key={index} className="module-item" style={{ color: module.couleur }}>
                      </div>
                    ))}
                  </div>

                  {/* Nom du jour */}
                  <div
                    className={`weekday-name ${day.date?.isSame(moment(), 'day') ? 'today' : ''} ${day.isFerie ? 'holiday' : ''} ${day.isWeekend ? 'weekend' : ''}`}
                  >
                    {day.day ? day.weekday : ''}
                  </div>
                </div>
              ))}

              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
