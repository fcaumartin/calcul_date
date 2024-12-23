import React, { useEffect, useState } from 'react';
import moment from 'moment';
import frLocale from "moment/locale/fr";
import { jours_feries } from './lib'; // Liste des jours fériés
import 'bootstrap-icons/font/bootstrap-icons.css';

moment.locale('fr', {
    months : 'Janvier_Février_Mars_Avril_Mai_Juin_Juillet_Août_Septembre_Octobre_Novembre_Décembre'.split('_'),
    monthsShort : 'Janv._Févr._Mars_Avr._Mai_Juin_Juil._Août_Sept._Oct._Nov._Déc.'.split('_'),
    monthsParseExact : true,
    weekdays : 'dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi'.split('_'),
    weekdaysShort : 'dim._lun._mar._mer._jeu._ven._sam.'.split('_'),
    weekdaysMin : 'Di_Lu_Ma_Me_Je_Ve_Sa'.split('_'),
    weekdaysParseExact : true,
    longDateFormat : {
        LT : 'HH:mm',
        LTS : 'HH:mm:ss',
        L : 'DD/MM/YYYY',
        LL : 'D MMMM YYYY',
        LLL : 'D MMMM YYYY HH:mm',
        LLLL : 'dddd D MMMM YYYY HH:mm'
    },
    calendar : {
        sameDay : '[Aujourd’hui à] LT',
        nextDay : '[Demain à] LT',
        nextWeek : 'dddd [à] LT',
        lastDay : '[Hier à] LT',
        lastWeek : 'dddd [dernier à] LT',
        sameElse : 'L'
    },
    relativeTime : {
        future : 'dans %s',
        past : 'il y a %s',
        s : 'quelques secondes',
        m : 'une minute',
        mm : '%d minutes',
        h : 'une heure',
        hh : '%d heures',
        d : 'un jour',
        dd : '%d jours',
        M : 'un mois',
        MM : '%d mois',
        y : 'un an',
        yy : '%d ans'
    },
    dayOfMonthOrdinalParse : /\d{1,2}(er|e)/,
    ordinal : function (number) {
        return number + (number === 1 ? 'er' : 'e');
    },
    meridiemParse : /PD|MD/,
    isPM : function (input) {
        return input.charAt(0) === 'M';
    },
    // In case the meridiem units are not separated around 12, then implement
    // this function (look at locale/id.js for an example).
    // meridiemHour : function (hour, meridiem) {
    //     return /* 0-23 hour, given meridiem token and hour 1-12 */ ;
    // },
    meridiem : function (hours, minutes, isLower) {
        return hours < 12 ? 'PD' : 'MD';
    },
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // Used to determine first week of the year.
    }
});

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
      <div className='d-flex justify-content-center align-items-center px-5'>
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
      <div className="calendar-grid px-5">
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
