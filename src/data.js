import React from 'react';

import { create } from "zustand";
import { persist } from "zustand/middleware";

const useStore = create(
  persist(
    (set) => ({
      nom: "formation_test",
      dateDebut: "",
      dateFin: "",
      modules: [],
      interruptions: [],
      setDateDebut: (dateDebut) => set({ dateDebut }),
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

export default  useStore; 

