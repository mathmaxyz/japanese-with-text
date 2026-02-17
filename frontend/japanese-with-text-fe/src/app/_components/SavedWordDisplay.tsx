import SavedWord from "../_types/savedWord";
import CloseButton from "./CloseButton";
import "../_styles/savedWordDisplay.css"

export default function SavedWordDisplay({ word, removeWordHandler }: { word: SavedWord, removeWordHandler: (word: SavedWord) => void }) {
	const wordKanji = word.entry.word_kanji.length > 0 ? word.entry.word_kanji : null;
	return (
		<div className="saved-word-container">
			<h2>{wordKanji ?? word.entry.word_kana}</h2>
			{wordKanji && <h3>({word.entry.word_kana})</h3>}
			<div className="remove-button-container">
				<CloseButton className="remove-saved-word-button" handleClick={() => removeWordHandler(word)} />
			</div>
		</div>
	)
}
