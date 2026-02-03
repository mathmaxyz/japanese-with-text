import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

interface SidebarStore {
	isOpen: boolean;
	getIsSaved: () => boolean;
	setIsSaved: (isOpen: boolean) => void;
}

export const useSidebarStore = create<SidebarStore>()(
	persist(
		(set, get) => ({
			isOpen: true,
			getIsSaved: () => get().isOpen,
			setIsSaved: (isOpen: boolean) => set({ isOpen: isOpen })
		}),
		{
			name: "saved-words",
		}
	)
)


