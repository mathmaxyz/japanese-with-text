import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

interface SidebarStore {
	isOpen: boolean;
	getIsOpen: () => boolean;
	setIsOpen: (isOpen: boolean) => void;
}

export const useSidebarStore = create<SidebarStore>()(
	persist(
		(set, get) => ({
			isOpen: true,
			getIsOpen: () => get().isOpen,
			setIsOpen: (isOpen: boolean) => set({ isOpen: isOpen })
		}),
		{
			name: "saved-words",
		}
	)
)


