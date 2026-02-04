'use client'
import "../_styles/savedWordView.css"
import { useSavedWordsStore } from "../_state/savedWordsStore"
import { useSidebarStore } from "../_state/sidebarStore"
import SavedWordDisplay from "./SavedWordDisplay";
import { useEffect } from "react";
import { useIsMobile } from "../_utils/useIsMobile";
import SideBarToggle from "./SideBarToggle";

export default function SavedWordsView({ }) {

	const { savedWords } = useSavedWordsStore();
	const { isOpen, setIsOpen } = useSidebarStore();
	const isMobile = useIsMobile(600);

	useEffect(() => setIsOpen(!isMobile), [isMobile, setIsOpen])

	return (
		<div className="saved-words-wrapper">
			<div className="saved-words-view">
				<div className={isOpen ? "saved-words-header" : "saved-words-header vertical-header"}>
					<SideBarToggle />
					<h3 className={isOpen ? "" : "vertical-text"}>Saved Words</h3>
				</div>
				{isOpen && (
					savedWords.map((w, index) => <SavedWordDisplay key={index} word={w} />)
				)
				}
			</div>
		</div>
	)
}
