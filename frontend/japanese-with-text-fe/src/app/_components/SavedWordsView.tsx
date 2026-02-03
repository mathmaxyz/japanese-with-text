'use client'
import "../_styles/savedWordView.css"
import { useSavedWordsStore } from "../_state/savedWordsStore"
import SavedWordDisplay from "./SavedWordDisplay";
import { useState, useEffect } from "react";
import { useIsMobile } from "../_utils/useIsMobile";
import SideBarToggle from "./SideBarToggle";

export default function SavedWordsView({ }) {

	const { savedWords } = useSavedWordsStore();
	const isMobile = useIsMobile(600);
	const [isOpen, setIsOpen] = useState<boolean>(!isMobile);

	useEffect(() => setIsOpen(!isMobile), [isMobile])

	return (
		<div className="saved-words-view">
			<div className={isOpen ? "saved-words-header" : "saved-words-header vertical-header"}>
				<SideBarToggle isSidebarOpen={isOpen} setIsSidebarOpen={setIsOpen} />
				<h3 className={isOpen ? "" : "vertical-text"}>Saved Words</h3>
			</div>
			{isOpen && (
				savedWords.map((w, index) => <SavedWordDisplay key={index} word={w} />)
			)
			}
		</div>
	)
}
