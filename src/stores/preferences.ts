import { create } from "zustand";
import { persist } from "zustand/middleware";

type State = {
    autoplay: boolean;
    expandedModue?: string | null;
    modulesListCollapsed: boolean;
}

type Actions = {
    setAutoplay: (autoplay: boolean) => void;
    setExpandedModule: (expandedModule: string | undefined) => void;
    setModulesListCollapsed: (modulesListCollapsed: boolean) => void;
}

type Store = State & Actions;

export const usePreferencesStore = create<Store>()(
    persist((set) => ({
    autoplay: false,
    expandedModue: null,
    modulesListCollapsed: false,
    setAutoplay: (autoplay) => set({ autoplay }),
    setExpandedModule: (expandedModue) => set({ expandedModue }),
    setModulesListCollapsed: (modulesListCollapsed) => set({ modulesListCollapsed }),
    }), {
        name: "codelab:preferences",
    })
);