import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import SavedWord from "../_types/savedWord";
import DictEntry from "../_types/dictEntry";

const ONE_HOUR = 60 * 60 * 1000;

interface SavedWordsStore {
	savedWords: SavedWord[];
	textId: string | null;
	lastActivity: number;
	addWord: (savedWord: SavedWord) => void;
	removeWord: (savedWord: SavedWord) => void;
	clearWords: () => void;
	setTextId: (id: string) => void;
	isWordSaved: (entry: DictEntry) => boolean;
}

//TODO: Add clearWords action to ensure that the menu is clear when a new text is analyzed

export const useSavedWordsStore = create<SavedWordsStore>()(
	devtools(persist(
		(set, get) => ({
			savedWords: [],
			lastActivity: Date.now(),
			textId: null,
			addWord: (savedWord: SavedWord) => set((state) => ({
				savedWords: [...state.savedWords, savedWord],
				lastActivity: Date.now()
			})),
			removeWord: (savedWord: SavedWord) => set((state) => ({
				savedWords: state.savedWords.filter(w => (JSON.stringify(w.entry) !== JSON.stringify(savedWord.entry))),
				lastActivity: Date.now()
			})),
			clearWords: () => set(() => ({
				savedWords: []
			})),
			setTextId: (id: string) => set(() => ({
				textId: id
			})),
			updateActivity: () => set(() => ({
				lastActivity: Date.now()
			})),
			isWordSaved: (entry: DictEntry) => {
				return get().savedWords.filter(w => {
					return JSON.stringify(w.entry) === JSON.stringify(entry)
				}).length > 0;
			},
		}),
		{
			name: "saved-words",
			onRehydrateStorage: () => (state) => {
				if (state && Date.now() - state.lastActivity > ONE_HOUR) {
					useSavedWordsStore.setState({
						savedWords: [],
						lastActivity: Date.now()
					})
				}
			}
		}
	))
)


