import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import multiMonthPlugin from '@fullcalendar/multimonth'

import moment from 'moment';
import { jours_feries } from './lib';  // Assurez-vous que lib.js est bien importé

const Calendar = () => {
    const [page, setPage] = useState("calendrier");
    
  const [events, setEvents] = useState([]);

  // Fonction pour vérifier si une date est un jour férié
  const isHoliday = (date) => {
    return jours_feries.includes(date.format('YYYY-MM-DD'));
  };

  // Générer les événements pour FullCalendar
  const generateEvents = () => {
    let events = [];
    let currentDate = moment().startOf('year'); // Commence à partir de l'année en cours

    // Boucle à travers chaque mois de l'année
    for (let i = 0; i < 12; i++) {
      let monthStart = currentDate.clone().month(i).startOf('month');
      let monthEnd = currentDate.clone().month(i).endOf('month');

      // Pour chaque jour du mois
      for (let day = monthStart; day.isBefore(monthEnd, 'day'); day.add(1, 'day')) {
        if (isHoliday(day)) {
          events.push({
            title: 'Jour férié',
            date: day.format('YYYY-MM-DD'),
            backgroundColor: '#ffcccb',  // Couleur pour les jours fériés
          });
        } else if (day.day() === 0 || day.day() === 6) {  // Weekends (Samedi = 6, Dimanche = 0)
          events.push({
            title: 'Weekend',
            date: day.format('YYYY-MM-DD'),
            backgroundColor: '#d3d3d3',  // Couleur pour les weekends
          });
        }
      }
    }
    setEvents(events);
  };

  useEffect(() => {
    generateEvents();
  }, []);

  return (
    <div>
      <h1>Calendrier avec jours fériés et week-ends</h1>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin,multiMonthPlugin]}
        initialView="multiMonthYear"
        events={events}
        weekends={true}  // Afficher les week-ends
      />
    </div>
  );
};

export default Calendar;
