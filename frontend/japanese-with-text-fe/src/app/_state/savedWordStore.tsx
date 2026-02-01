import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SavedWordStore {
	savedWords: string[];
	addWord: (word: string) => void;
	removeWord: (word: string) => void;
	isWordSaved: (word: string) => boolean;
}

export const useSavedWordsStore = create(
	persist(
		(set, get) => ({
			savedWords: [],
			addWord: (word: string) => set((state: SavedWordStore) => ({
				savedWords: [...state.savedWords, word]
			})),
			removeWord: (word: string) => set((state: SavedWordStore) => ({
				savedWords: state.savedWords.filter((w: string) => w !== word)
			})),
			isWordSaved: (word: string) => get().savedWords.includes(word),
		}),
		{ name: "saved-words" }
	)
)

const { savedWords, addWord, removeWord }: SavedWordStore = useSavedWordsStore();
}
