import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SavedWordsStore {
	savedWords: string[];
	addWord: (word: string) => void;
	removeWord: (word: string) => void;
	isWordSaved: (word: string) => boolean;
}

export const useSavedWordsStore = create<SavedWordsStore>()(
	persist(
		(set, get) => ({
			savedWords: [],
			addWord: (word: string) => set((state) => ({
				savedWords: [...state.savedWords, word]
			})),
			removeWord: (word: string) => set((state) => ({
				savedWords: state.savedWords.filter(w => w !== word)
			})),
			isWordSaved: (word: string) => get().savedWords.includes(word),
		}),
		{ name: "saved-words" }
	)
)

export const { savedWords, addWord, removeWord }: SavedWordsStore = useSavedWordsStore();
