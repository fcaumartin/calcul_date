import React from 'react';

import { create } from 'zustand'
import { persist } from "zustand/middleware";

const useStore = create(
  persist(
    (set) => ({
      modules: [],
      interruptions: [],
      debut: "",
      fin: "",
      nom: "",


      setDebut: (debut) => set({ debut }),
      setFin: (fin) => set({ fin }),
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

        addInterruption: (interruption) => set((state) => ({interruptions: [...state.interruptions, interruption] })),
        updateInterruption: (index, updatedInterruption) =>
          set((state) => {
            const interruptions = [...state.interruptions];
            interruptions[index] = updatedInterruption;
            return { interruptions };
          }),


    }),
    {
      name: "module-storage",
    }
  )
);



export default useStore


