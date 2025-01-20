import React from 'react';

import { create } from 'zustand'

const useFormationStore = create((set) => ({
  date_debut: 0,
  date_fin: 0,
  nom: "",
  setDateDebut: () => set((new_date) => ({ date_debut: new_date })),
  setDateFin: () => set((new_date) => ({ date_fin: new_date })),
  setNom: () => set((nom) => ({nom})),
}))

const useInterruptionsStore = create((set) => ({
  date_inter: [],

}))


export {useFormationStore}
export {useInterruptionsStore}

