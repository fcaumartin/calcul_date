import React from 'react';

import { create } from 'zustand'

const useFormationStore = create((set) => ({
  date_debut: 0,
  date_fin: 0,
  nom: "",
  setDateDebut: () => set((new_date) => ({ date_debut: new_date })),
}))


export {useFormationStore}