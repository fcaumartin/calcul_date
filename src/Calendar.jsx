import React, { useEffect, useState } from 'react';
import moment from 'moment';
import 'moment/locale/fr'; // Importer les locales françaises
import { jours_feries } from './lib'; // Liste des jours fériés
import 'bootstrap-icons/font/bootstrap-icons.css';

moment.locale('fr'); // Configurer moment en français

const Calendar = () => {
  const [events, setEvents] = useState([]);
  const [currentYear, setCurrentYear] = useState(moment().year()); // Suivre l'année en cours

  // Fonction pour vérifier si une date est un jour férié
  const isHoliday = (date) => jours_feries.includes(date.format('YYYY-MM-DD'));
  
  // Générer les événements
  const generateEvents = () => {
    let generatedEvents = [];

    for (let month = 0; month < 12; month++) {
      const daysInMonth = moment({ year: currentYear, month }).daysInMonth();

      for (let day = 1; day <= daysInMonth; day++) {
        const date = moment({ year: currentYear, month, day });
        if (isHoliday(date)) {
          generatedEvents.push({
            title: 'Jour férié',
            date: date.format('YYYY-MM-DD'),
            backgroundColor: '#ffcccb',
          });
        } else if (date.day() === 0 || date.day() === 6) {
          generatedEvents.push({
            title: 'Weekend',
            date: date.format('YYYY-MM-DD'),
            backgroundColor: '#d3d3d3',
          });
        }
      }
    }

    setEvents(generatedEvents);
  };

  useEffect(() => {
    generateEvents();
  }, [currentYear]); // Regénère les événements à chaque changement d'année

  // Générer la structure des mois et jours en fonction des événements
  const calendarData = () => {
    const months = [];

    for (let month = 0; month < 12; month++) {
      const daysInMonth = moment({ year: currentYear, month }).daysInMonth();
      const days = [];

      for (let day = 1; day <= daysInMonth; day++) {
        const date = moment({ year: currentYear, month, day }).format(
          'YYYY-MM-DD'
        );
        const event = events.find((e) => e.date === date);

        days.push({
          day,
          isHoliday: event?.title === 'Jour férié',
          isWeekend: event?.title === 'Weekend',
        });
      }

      months.push({
        month: moment({ month }).format('MMMM'),
        days,
      });
    }

    return months;
  };

  // Gérer la modification de l'année via l'input
  const handleYearChange = (e) => {
    const value = e.target.value;

    // Vérifie que la valeur est un entier valide
    if (!isNaN(value) && value.length <= 4) {
      setCurrentYear(parseInt(value) || moment().year()); // Met à jour l'année ou réinitialise si l'input est vide
    }
  };

  return (
    <div>
      <div className='d-flex justify-content-center align-items-center'>
        <h1>Calendrier</h1>

        {/* Navigation par année */}
        <div className="input-group year-navigation">
          <button className="bi bi-chevron-left btn btn-outline-secondary" onClick={() => setCurrentYear((prev) => prev - 1)}></button>
          <input
            type="text"
            value={currentYear}
            onChange={handleYearChange}
            maxLength="4"
            pattern="\d{4}"
            title="Veuillez entrer une année valide (ex : 2023)"
          />
          <button className="bi bi-chevron-right btn btn-outline-secondary" onClick={() => setCurrentYear((prev) => prev + 1)}></button>
        </div>
      </div>
      <div className="calendar-grid">
        {/* Colonnes pour chaque mois */}
        {calendarData().map((monthData, index) => (
          <div key={index} className="month-column">
            <h3>{monthData.month}</h3>
            {monthData.days.map((dayData, idx) => (
              <div
                key={idx}
                className={`day-cell ${
                  dayData.isHoliday ? 'holiday' : ''
                } ${dayData.isWeekend ? 'weekend' : ''}`}
              >
                {dayData.day}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
