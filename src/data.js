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


const useInterruptionsStore = create((set) => ({
  date_inter: [],

}))


export default useModuleStore
export {useInterruptionsStore}

