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
  const { interruptions } = useStore(); // Récupère les interruptions depuis le store
  const [months, setMonths] = useState([]);
  const [moduleLegends, setModuleLegends] = useState([]); // State pour les légendes des modules
  const [interruptionLegends, setInterruptionLegends] = useState([]); // State pour les legendes d'interruptions
  const scrollContainerRef = useRef(null);

  const isJourFerie = (dayDate) => {
    return jours_feries.some((jour) => moment(jour).isSame(dayDate, 'day')); // Vérifier si un jour est férié
  };

  const isWeekend = (dayDate) => {
    const dayOfWeek = dayDate.day(); // Renvoie le jour de la semaine (0 = dimanche, 6 = samedi)
    return dayOfWeek === 0 || dayOfWeek === 6; // Vérifier si c'est un samedi ou un dimanche
  };

  const isInterruption = (dayDate) => {
    return interruptions.some((interruption) => 
      dayDate.isBetween(moment(interruption.dateDebut), moment(interruption.dateFin), 'day', '[]')
    );
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

  useEffect(() => {
    if (interruptions.length > 0) {
      setInterruptionLegends([{ name: "Interruption", className: "interruption" }]); // Une seule légende
    } else {
      setInterruptionLegends([]); // Pas d'interruption, pas de légende
    }
  }, [interruptions]);
  
  

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
    const startOfMonth = date.clone().startOf("month");
    const endOfMonth = date.clone().endOf("month");
    const days = [];
  
    for (let day = 1; day <= endOfMonth.date(); day++) {
      const dayDate = date.clone().date(day);
  
      // Trouver les modules correspondant à ce jour
      const dayModules = modules.filter((module) => {
        const moduleStart = moment(module.dateDebut);
        const moduleEnd = moment(module.dateFin);
        return dayDate.isBetween(moduleStart, moduleEnd, "day", "[]"); // Vérifie si le jour est dans la plage
      });
  
      // Vérifier si le jour est dans une interruption
      const dayInterruption = interruptions.find((interruption) => {
        const interruptionStart = moment(interruption.dateDebut);
        const interruptionEnd = moment(interruption.dateFin);
        return dayDate.isBetween(interruptionStart, interruptionEnd, "day", "[]");
      });
  
      // Ajouter les propriétés pour chaque jour
      days.push({
        day,
        date: dayDate,
        weekday: dayDate.format("ddd"), // Jour de la semaine (abrégé)
        isFerie: isJourFerie(dayDate), // Vérifier si c'est un jour férié
        isWeekend: isWeekend(dayDate), // Vérifier si c'est un weekend
        isInterruption: isInterruption(dayDate), // Vérifier si c'est une interruption
        interruptionCouleur: dayInterruption?.couleur || null, // Ajouter la couleur de l'interruption si présente
        modules: dayModules, // Ajouter les modules associés à ce jour
        couleur: !isInterruption(dayDate) && dayModules.length > 0 ? dayModules[0].couleur : null,
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
                  {day.modules.length > 0 && !day.isWeekend && !day.isFerie && !day.isInterruption && (
                    <div className="module-tooltip">
                      {day.modules.map((module) => module.nom || 'Module').join(', ')}
                    </div>
                  )}

                  {/* Jour du mois */}
                  <div
                    className={`day-cell ${day.isFerie ? 'holiday' : ''} ${day.isWeekend ? 'weekend' : ''} ${day.isInterruption ? "interruption" : ""}`}
                    style={{
                      backgroundColor: day.isWeekend || day.isFerie
                      ? day.isWeekend  // Mettre une couleur par défaut pour weekend et jour férié
                      : day.isInterruption && day.interruptionCouleur
                      ? day.interruptionCouleur
                      : day.couleur,
                    }}
                  >
                    {day.day || ''}
                  </div>

                  {/* Nom du jour ou liste des modules */}
                  <div
                    className={`weekday-name ${day.isFerie ? 'holiday' : ''} ${day.isWeekend ? 'weekend' : ''} ${day.isInterruption ? 'interruption' : ''}`}
                    style={{
                      backgroundColor: day.isWeekend || day.isFerie
                      ? day.isWeekend  // Mettre une couleur par défaut pour weekend et jour férié
                      : day.isInterruption && day.interruptionCouleur
                      ? day.interruptionCouleur
                      : day.couleur,
                    }}
                  >
                    {!day.isWeekend && !day.isFerie && !day.isInterruption && day.modules.length > 0 ? (
                      // Afficher les noms des modules seulement si ce n'est pas un weekend ou un jour férié
                      <span className="modules-text text-truncate">
                        {day.modules.map((module, index) => module.nom).join(', ')}
                      </span>
                    ) : (
                      // Sinon afficher le nom du jour
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
    </div>
  );
};

export default Calendar;
