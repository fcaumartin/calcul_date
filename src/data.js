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

      // Méthode utilitaire pour recalculer la date de fin
      recalculateDateFin: () =>
        set((state) => {
          const latestModule = state.modules.reduce((latest, module) => {
            const moduleEnd = new Date(module.dateFin); // Convertir la date de fin du module en objet Date
            return !latest || moduleEnd > new Date(latest.dateFin) ? module : latest;
          }, null);

          return { dateFin: latestModule ? latestModule.dateFin : "" }; // Mettre à jour la date de fin
        }),

        addModule: (module) =>
          set((state) => {
            const updatedModules = [...state.modules, module];
            setTimeout(() => state.recalculateDateFin(), 0); // Appeler après mise à jour
            return { modules: updatedModules };
          }),
  
        updateModule: (index, updatedModule) =>
          set((state) => {
            const modules = [...state.modules];
            modules[index] = updatedModule;
            setTimeout(() => state.recalculateDateFin(), 0); // Appeler après mise à jour
            return { modules };
          }),
  
        deleteModule: (index) =>
          set((state) => {
            const modules = [...state.modules];
            modules.splice(index, 1);
            setTimeout(() => state.recalculateDateFin(), 0); // Appeler après suppression
            return { modules };
          }),



      addInterruption: (interruption) =>
        set((state) => ({
          interruptions: [...state.interruptions, interruption],
        })),

      updateInterruption: (index, updateInterruption) =>
        set((state) => {
          const interruptions = [...state.interruptions];
          interruptions[index] = updateInterruption;
          return { interruptions };
        }),

      deleteInterruption: (index) =>
        set((state) => {
          const interruptions = [...state.interruptions];
          interruptions.splice(index, 1);
          return { interruptions };
        }),
    }),
    {
      name: "storage",
    }
  )
);

export default  useStore; 

