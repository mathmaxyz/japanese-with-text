import SavedWord from "../_types/savedWord";

export default function SavedWordDisplay({ word }: { word: SavedWord }) {
	const wordKanji = word.entry.word_kanji.length > 0 ? word.entry.word_kanji : null;
	return (
		<div className="saved-word-container">
			<h2>{wordKanji ?? word.entry.word_kana}</h2>
			{wordKanji && <h3>({word.entry.word_kana})</h3>}
			<p>{word.entry.senses[0].definitions[0]}...</p>
		</div>
	)
}
