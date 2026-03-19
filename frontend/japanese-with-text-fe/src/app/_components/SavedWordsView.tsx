'use client'
import "../_styles/savedWordView.css"
import { useSavedWordsStore } from "../_state/savedWordsStore"
import { useSidebarStore } from "../_state/sidebarStore"
import SavedWordDisplay from "./SavedWordDisplay";
import { SetStateAction, useEffect, useState } from "react";
import { useIsMobile } from "../_utils/useIsMobile";
import SideBarToggle from "./SideBarToggle";
import SavedWord from "../_types/savedWord";
import { createAnkiDeck } from "../_api/anki_deck_service";

export default function SavedWordsView({ }) {

	const { savedWords, removeWord } = useSavedWordsStore();
	const { isOpen, setIsOpen } = useSidebarStore();
	const [blobUrl, setBlobUrl] = useState<null | string>(null);
	const isMobile = useIsMobile(600);

	useEffect(() => setIsOpen(!isMobile), [isMobile, setIsOpen])

	const removeWordHandler = (word: SavedWord) => {
		removeWord(word);
	}

	const handleGenerateDeck = async () => {
		const name = "temp_name"
		const url = await createAnkiDeck(savedWords, name);
		if (url) {
			setBlobUrl(url);
			console.log(blobUrl)
		}
	}

	const handleRevokeUrl = () => {
		setTimeout(() => {
			URL.revokeObjectURL(blobUrl!)
			setBlobUrl(null)
		}, 1000)
	}

	return (
		<div className={isOpen && isMobile ? "saved-words-wrapper sidebar-open-mobile" : "saved-words-wrapper"
		}>
			<div className={isOpen ? !isMobile ? "saved-words-view saved-words-open-desktop" : "saved-words-view" : "saved-words-collapsed"}>
				<div className={isOpen ? "saved-words-header" : "saved-words-header vertical-header"}>
					<SideBarToggle />
					<h3 className={isOpen ? "" : "vertical-text"}>Saved Words</h3>
				</div>
				{(isOpen && savedWords.length > 0) && (
					<div className="saved-words-content">
						<div className="saved-words-list">
							{savedWords.map((w, index) => <SavedWordDisplay removeWordHandler={removeWordHandler} key={index} word={w} />)}
						</div>
						{!blobUrl &&
							(<button onClick={handleGenerateDeck} className="generate-anki-button action-button">Make anki deck</button>)
						}
						{
							blobUrl && (
								<a onClick={handleRevokeUrl} className="generate-anki-button action-button" href={blobUrl} download="ankiDeck.apkg">Download</a>
							)
						}
					</div>
				)
				}
				{(isOpen && savedWords.length == 0) && (
					<div className="saved-words-cta-container">
						< p className="saved-words-cta">Save words here</p>
					</div>

				)
				}
			</div>
		</div >
	)
}
