import { create } from "zustand";

type Store = {
   open: boolean;
   setOpen: (open?: boolean) => void;
   openModal: () => void;
   closeModal: () => void;
};

const useUtils = create<Store>()((set) => ({
   open: false,
   setOpen: (open?: boolean) =>
      set((state) => ({
         open: open !== undefined ? open : !state.open,
      })),
   openModal: () => set({ open: true }),
   closeModal: () => set({ open: false }),
}));

export { useUtils };
