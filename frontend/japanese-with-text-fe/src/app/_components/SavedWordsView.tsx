'use client'
import { useSavedWordsStore } from "../_state/savedWordsStore"
import SavedWordDisplay from "./SavedWordDisplay";

export default function SavedWordsView({ }) {

	const { savedWords } = useSavedWordsStore();

	return (
		<div className="saved-words-container">
			{
				savedWords.map((w, index) => <SavedWordDisplay key={index} word={w} />)
			}
		</div>
	)
}
