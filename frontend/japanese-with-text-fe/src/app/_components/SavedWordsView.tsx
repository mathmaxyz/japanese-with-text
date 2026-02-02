'use client'
import "../_styles/savedWordView.css"
import { useSavedWordsStore } from "../_state/savedWordsStore"
import SavedWordDisplay from "./SavedWordDisplay";

export default function SavedWordsView({ }) {

	const { savedWords } = useSavedWordsStore();

	return (
		<div className="saved-words-view">
			<div className="saved-words-header">
				<h3>Saved Words</h3>
			</div>
			{
				savedWords.map((w, index) => <SavedWordDisplay key={index} word={w} />)
			}
		</div>
	)
}
