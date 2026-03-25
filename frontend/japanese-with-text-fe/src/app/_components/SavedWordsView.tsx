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

export default function SavedWordsView({ name }: { name: string }) {

	const { savedWords, removeWord } = useSavedWordsStore();
	const { isOpen, setIsOpen } = useSidebarStore();
	const [blobUrl, setBlobUrl] = useState<null | string>(null);
	const [generationPathInitiated, setGenerationPathInitiated] = useState<boolean>(false);
	const [deckName, setDeckName] = useState<string>(name);
	const isMobile = useIsMobile(600);

	const getCurrentDate = () => {
		const date = new Date();

		return `${date.getUTCFullYear()}-${date.getUTCMonth()}-${date.getUTCDate()}`
	}

	useEffect(() => setIsOpen(!isMobile), [isMobile, setIsOpen])

	const removeWordHandler = (word: SavedWord) => {
		removeWord(word);
	}

	const handleGenerateDeck = async () => {
		const name = deckName;
		const url = await createAnkiDeck(savedWords, name);
		if (url) {
			setBlobUrl(url);
			console.log(blobUrl)
		}
	}

	const handleRevokeUrl = () => {
		setGenerationPathInitiated(false);
		setTimeout(() => {
			URL.revokeObjectURL(blobUrl!)
			setBlobUrl(null)
		}, 1000)
	}

	const handleDeckNameChange = (e: any) => {
		setDeckName(e.target.value);
	}

	//TODO: Add css for name choosing
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
						{(!blobUrl && !generationPathInitiated) &&
							(<button onClick={() => setGenerationPathInitiated(true)} className="generate-anki-button action-button">Make anki deck</button>)
						}
						{(!blobUrl && generationPathInitiated) &&
							(
								<div className="deck-name-chooser">
									<label className="deck-name-chooser-label">Choose deck name</label>
									<input className="deck-name-chooser-input" defaultValue={name} onChange={(e: any) => handleDeckNameChange(e)} />
									<button className="deck-name-chooser-button action-button" onClick={handleGenerateDeck}> Confirm</button>
								</div>
							)

						}
						{blobUrl && (
							<a onClick={handleRevokeUrl} className="generate-anki-button action-button" href={blobUrl} download={`dokumate_deck_${getCurrentDate()}`}>Download</a>
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
