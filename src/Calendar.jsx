import React, { useState, useEffect, useRef } from 'react';
import moment from 'moment';
import "moment/locale/fr";
import { jours_feries } from './lib'; // Liste des jours fériés
import 'bootstrap-icons/font/bootstrap-icons.css';

// Initialisation de Moment.js en français
moment.locale('fr', {
  months: 'Janvier_Février_Mars_Avril_Mai_Juin_Juillet_Août_Septembre_Octobre_Novembre_Décembre'.split('_'),
  weekdays: 'Dimanche_Lundi_Mardi_Mercredi_Jeudi_Vendredi_Samedi'.split('_'),
  weekdaysShort: 'Dim_Lun_Mar_Mer_Jeu_Ven_Sam'.split('_'),
});

const Calendar = () => {
  const [months, setMonths] = useState([]);
  const [tooltipVisible, setTooltipVisible] = useState(false); // Gestion de la visibilité du tooltip
  const scrollContainerRef = useRef(null);

  const isJourFerie = (dayDate) => {
    return jours_feries.some((jour) => moment(jour).isSame(dayDate, 'day')); // Vérifier si un jour est férié
  };

  const isWeekend = (dayDate) => {
    const dayOfWeek = dayDate.day(); // Renvoie le jour de la semaine (0 = dimanche, 6 = samedi)
    return dayOfWeek === 0 || dayOfWeek === 6; // Vérifier si c'est un samedi ou un dimanche
  };

  // Initialiser les mois visibles
  // /! A MODIFIER LORS DE L'AJOUT DES MODULES POUR COMMENCER AU DEBUT DE LA FORMATION !\
  useEffect(() => {
    const initialMonths = generateMonths(moment().subtract(1, 'month'), 8);
    setMonths(initialMonths);
  }, []);

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

  // Générer les jours d'un mois
  const generateMonthDays = (date) => {
    const startOfMonth = date.clone().startOf('month');
    const endOfMonth = date.clone().endOf('month');
    const days = [];

    for (let day = 1; day <= endOfMonth.date(); day++) {
      const dayDate = date.clone().date(day);
      days.push({
        day,
        date: dayDate,
        weekday: dayDate.format('ddd'), // Jour de la semaine (abrégé)
        isFerie: isJourFerie(dayDate), // Vérifier si c'est un jour férié
        isWeekend: isWeekend(dayDate), // Vérifier si c'est un weekend
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
    <div>

      <div
        className="calendar-container"
        ref={scrollContainerRef}
        onScroll={handleScroll}
      >
      {/* Ajout d'un "i" pour afficher un tooltip avec la légende */}
      <div
        className="info-tooltip"
        onMouseEnter={() => setTooltipVisible(true)}
        onMouseLeave={() => setTooltipVisible(false)}
      >
        <i
          className="bi bi-info-circle"
        />

        {/* Tooltip visible si l'utilisateur survole l'icône */}
        {tooltipVisible && (
          <div className="tooltip-content">
            <div><div className="color-box today" ></div><span>Aujourd'hui</span></div>
            <div><div className="color-box weekend" ></div><span>Weekend</span></div>
            <div><div className="color-box holiday" ></div><span>Jour Férié</span></div>
          </div>
        )}
      </div>
        {/* Liste des mois */}
        <div className="calendar-months d-flex">
          {months.map((month, idx) => (
            <div key={idx} className="month-column">
              {/* En-tête du mois */}
              <h5 className="month-header">{month.date.format('MMMM YYYY')}</h5>

              {/* Jours du mois */}
              <div className="calendar-days">
                {month.days.map((day, idx) => (
                  <div key={idx} className="day-row d-flex">
                    {/* Jour du mois */}
                    <div
                      className={`day-cell ${day.date?.isSame(moment(), 'day') ? 'today' : ''} ${day.isFerie ? 'holiday' : ''} ${day.isWeekend ? 'weekend' : ''}`}
                    >
                      {day.day || ''}
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
