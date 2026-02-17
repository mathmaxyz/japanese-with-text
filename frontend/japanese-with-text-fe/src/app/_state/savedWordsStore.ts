import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import SavedWord from "../_types/savedWord";
import DictEntry from "../_types/dictEntry";

const ONE_HOUR = 60 * 60 * 1000;

interface SavedWordsStore {
	savedWords: SavedWord[];
	lastActivity: number;
	addWord: (savedWord: SavedWord) => void;
	removeWord: (savedWord: SavedWord) => void;
	isWordSaved: (entry: DictEntry) => boolean;
}

//TODO: Add clearWords action to ensure that the menu is clear when a new text is analyzed

export const useSavedWordsStore = create<SavedWordsStore>()(
	devtools(persist(
		(set, get) => ({
			savedWords: [],
			lastActivity: Date.now(),
			addWord: (savedWord: SavedWord) => set((state) => ({
				savedWords: [...state.savedWords, savedWord]
			})),
			removeWord: (savedWord: SavedWord) => set((state) => ({
				savedWords: state.savedWords.filter(w => (JSON.stringify(w.entry) !== JSON.stringify(savedWord.entry)))
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
				if (state && state.lastActivity - Date.now() > ONE_HOUR) {
					useSavedWordsStore.setState({
						savedWords: [],
						lastActivity: Date.now()
					})
				}
			}
		}
	))
)


