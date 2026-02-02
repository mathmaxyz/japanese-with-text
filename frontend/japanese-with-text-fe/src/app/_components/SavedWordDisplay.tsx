import SavedWord from "../_types/savedWord";

export default function SavedWordDisplay({ word }: { word: SavedWord }) {

	return (
		<div className="saved-word-container">
			<h2>{JSON.stringify(word)}</h2>
		</div>
	)
}
