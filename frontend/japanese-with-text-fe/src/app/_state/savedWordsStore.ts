import { create } from "zustand";
import { persist } from "zustand/middleware";

const ONE_HOUR = 60 * 60 * 1000;

interface SavedWordsStore {
	savedWords: string[];
	lastActivity: number;
	addWord: (word: string) => void;
	removeWord: (word: string) => void;
	isWordSaved: (word: string) => boolean;
}

export const useSavedWordsStore = create<SavedWordsStore>()(
	persist(
		(set, get) => ({
			savedWords: [],
			lastActivity: Date.now(),
			addWord: (word: string) => set((state) => ({
				savedWords: [...state.savedWords, word]
			})),
			removeWord: (word: string) => set((state) => ({
				savedWords: state.savedWords.filter(w => w !== word)
			})),
			isWordSaved: (word: string) => get().savedWords.includes(word),
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
	)
)

