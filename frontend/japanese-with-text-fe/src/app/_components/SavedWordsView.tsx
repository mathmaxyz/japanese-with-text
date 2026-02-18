'use client'
import "../_styles/savedWordView.css"
import { useSavedWordsStore } from "../_state/savedWordsStore"
import { useSidebarStore } from "../_state/sidebarStore"
import SavedWordDisplay from "./SavedWordDisplay";
import { useEffect } from "react";
import { useIsMobile } from "../_utils/useIsMobile";
import SideBarToggle from "./SideBarToggle";
import SavedWord from "../_types/savedWord";

export default function SavedWordsView({ }) {

	const { savedWords, removeWord } = useSavedWordsStore();
	const { isOpen, setIsOpen } = useSidebarStore();
	const isMobile = useIsMobile(600);

	useEffect(() => setIsOpen(!isMobile), [isMobile, setIsOpen])

	const removeWordHandler = (word: SavedWord) => {
		removeWord(word);
	}

	return (
		<div className={isOpen && isMobile ? "saved-words-wrapper sidebar-open-mobile" : "saved-words-wrapper"
		}>
			<div className={isOpen ? "saved-words-view" : "saved-words-collapsed"}>
				<div className={isOpen ? "saved-words-header" : "saved-words-header vertical-header"}>
					<SideBarToggle />
					<h3 className={isOpen ? "" : "vertical-text"}>Saved Words</h3>
				</div>
				{isOpen && (
					savedWords.map((w, index) => <SavedWordDisplay removeWordHandler={removeWordHandler} key={index} word={w} />)
				)
				}
			</div>
		</div >
	)
}
