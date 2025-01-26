import React from 'react';

import { create } from 'zustand'
import { persist } from "zustand/middleware";

const useModuleStore = create(
  persist(
    (set) => ({
      modules: [],
      debut: "",
      nom: "",
      setDebut: (debut) => set({ debut }),
      setNom: (nom) => set({ nom }),
      addModule: (module) => set((state) => ({ modules: [...state.modules, module] })),
      updateModule: (index, updatedModule) =>
        set((state) => {
          const modules = [...state.modules];
          modules[index] = updatedModule;
          return { modules };
        }),
      deleteModule: (index) =>
        set((state) => {
          const modules = [...state.modules];
          modules.splice(index, 1);
          return { modules };
        }),
    }),
    {
      name: "module-storage",
    }
  )
);


const useInterruptionsStore = create(
  persist(
    (set) => ({
      date_inter: [],
      debut: "",
      fin: "",
      setDebut: (debut) => set({debut}),
      setFin: (fin) => set({fin}),
      addInterruption: (date_inter) => set((state) => ({date_inter: [...state.date_inter, date_inter] })),
      updateInterruption: (index, updatedInterruption) =>
        set((state) => {
          const Interruptions = [...state.Interruptions];
          Interruptions[index] = updatedInterruption;
          return { Interruptions };
        }),
    }),
    {
      name: "interruptions-storage",
    }
  ),
);


export default useModuleStore
export {useInterruptionsStore}

