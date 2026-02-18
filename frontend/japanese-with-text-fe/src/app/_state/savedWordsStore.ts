import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import SavedWord from "../_types/savedWord";
import DictEntry from "../_types/dictEntry";

interface SavedWordsStore {
	savedWords: SavedWord[];
	textId: string | null;
	addWord: (savedWord: SavedWord) => void;
	removeWord: (savedWord: SavedWord) => void;
	clearWords: () => void;
	setTextId: (id: string) => void;
	isWordSaved: (entry: DictEntry) => boolean;
}

export const useSavedWordsStore = create<SavedWordsStore>()(
	devtools(persist(
		(set, get) => ({
			savedWords: [],
			textId: null,
			addWord: (savedWord: SavedWord) => set((state) => ({
				savedWords: [...state.savedWords, savedWord],
			})),
			removeWord: (savedWord: SavedWord) => set((state) => ({
				savedWords: state.savedWords.filter(w => (JSON.stringify(w.entry) !== JSON.stringify(savedWord.entry))),
			})),
			clearWords: () => set(() => ({
				savedWords: []
			})),
			setTextId: (id: string) => set(() => ({
				textId: id
			})),
			isWordSaved: (entry: DictEntry) => {
				return get().savedWords.filter(w => {
					return JSON.stringify(w.entry) === JSON.stringify(entry)
				}).length > 0;
			},
		}),
		{
			name: "saved-words"
		}
	))
)


