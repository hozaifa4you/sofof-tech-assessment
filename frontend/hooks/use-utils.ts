import { create } from "zustand";

type Store = {
   open: boolean;
   openSidebar: boolean;
   setOpen: (open?: boolean) => void;
   openModal: () => void;
   closeModal: () => void;
   setSidebar: () => void;
};

const useUtils = create<Store>()((set) => ({
   open: false,
   openSidebar: false,
   setOpen: (open?: boolean) =>
      set((state) => ({
         open: open !== undefined ? open : !state.open,
      })),
   openModal: () => set({ open: true }),
   closeModal: () => set({ open: false }),
   setSidebar: () => set((state) => ({ openSidebar: !state.openSidebar })),
}));

export { useUtils };
