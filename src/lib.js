import moment from "moment"

const horaires = [ 7.75, 7.75, 7.75, 7.75, 4 ]
// const horaires = [ 7, 7, 7, 7, 7 ]

const consume = (dateDebut, duree, retard = 0, interruptions = []) => {

    duree -= Math.abs(retard)
  
    let m = moment(dateDebut, "YYYY-MM-DD")
    m = jour_ouvre(m, interruptions)
  
    while (duree>0) {
      let jj = m.format("DD/MM/YYYY")
      let day_of_week = m.format("d")-1
      const heures_du_jour = horaires[day_of_week]
      duree -= heures_du_jour
  
      if (duree>0) m = next(m, interruptions)
    }
    console.log(`[consume] Fin prévue : ${m.format("YYYY-MM-DD")}, Retard : ${Math.abs(duree)}`);
  
    return {
      dateFin: m.format("YYYY-MM-DD"),
      retard: Math.abs(duree)
    }
  }
  
  const jour_ouvre = (d, interruptions) => {
    let dow = d.format("d")

    // Vérification si la date actuelle est un jour férié ou un jour d'interruption
    while (
      dow == 0 || // Week-end
      dow == 6 || // Week-end
      jours_feries.includes(d.format("YYYY-MM-DD")) || // Jour férié
      interruptions.some(interruption =>
        moment(d.format("YYYY-MM-DD")).isBetween(interruption.dateDebut, interruption.dateFin, null, '[]') // Date d'interruption
      )
    ) {
      d.add(1, 'days')
      dow = d.format("d")
    }
    return d;
  }
  
  const next = (d, interruptions) => {
    let dow;
    do {
      d.add(1, 'days')
      dow = d.format("d")
    } while (
      dow == 0 || // Dimanche
      dow == 6 || // Samedi
      jours_feries.includes(d.format("YYYY-MM-DD")) || // Jour férié
      interruptions.some(interruption =>
        moment(d.format("YYYY-MM-DD")).isBetween(interruption.dateDebut, interruption.dateFin, null, '[]') // Date d'interruption
      )
    )
    console.log('Liste des interruptions :', interruptions)
    return d;
  }

const jours_feries = [
    "2028-01-01",
    "2028-04-17",
    "2028-05-01",
    "2028-05-08",
    "2028-05-25",
    "2028-06-05",
    "2028-07-14",
    "2028-08-15",
    "2028-11-01",
    "2028-11-11",
    "2028-12-25",
    "2027-01-01",
    "2027-03-29",
    "2027-05-01",
    "2027-05-06",
    "2027-05-08",
    "2027-05-17",
    "2027-07-14",
    "2027-08-15",
    "2027-11-01",
    "2027-11-11",
    "2027-12-25",
    "2026-01-01",
    "2026-04-06",
    "2026-05-01",
    "2026-05-08",
    "2026-05-14",
    "2026-05-25",
    "2026-07-14",
    "2026-08-15",
    "2026-11-01",
    "2026-11-11",
    "2026-12-25",
    "2025-01-01",
    "2025-04-21",
    "2025-05-01",
    "2025-05-08",
    "2025-05-29",
    "2025-06-09",
    "2025-07-14",
    "2025-08-15",
    "2025-11-01",
    "2025-11-11",
    "2025-12-25",
    "2024-01-01",
    "2024-04-01",
    "2024-05-01",
    "2024-05-08",
    "2024-05-09",
    "2024-05-20",
    "2024-07-14",
    "2024-08-15",
    "2024-11-01",
    "2024-11-11",
    "2024-12-25",
    "2023-01-01",
    "2023-04-10",
    "2023-05-01",
    "2023-05-08",
    "2023-05-18",
    "2023-05-29",
    "2023-07-14",
    "2023-08-15",
    "2023-11-01",
    "2023-11-11",
    "2023-12-25","2023-12-26","2023-12-27","2023-12-28","2023-12-29",
    "2022-01-01",
    "2022-04-18",
    "2022-05-01",
    "2022-05-08",
    "2022-05-26",
    "2022-06-06",
    "2022-07-14",
    "2022-08-15",
    "2022-11-01",
    "2022-11-11",
    "2022-12-25",
    "2021-01-01",
    "2021-04-05",
    "2021-05-01",
    "2021-05-08",
    "2021-05-13",
    "2021-05-24",
    "2021-07-14",
    "2021-08-15",
    "2021-11-01",
    "2021-11-11",
    "2021-12-25"
]

export { consume, jours_feries };  // Exporter les deux éléments
export default {consume};