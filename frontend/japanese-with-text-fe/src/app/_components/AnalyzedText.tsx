'use client'

import { useSavedWordsStore } from "../_state/savedWordsStore";
import { useEffect } from "react";
import { useSidebarStore } from "../_state/sidebarStore"
import { useIsMobile } from "../_utils/useIsMobile";

export default function AnalyzedText({ id, children }: { id: string, children: React.ReactNode }) {

	const { isOpen } = useSidebarStore();
	const isMobile = useIsMobile(600);
	const { textId, setTextId, clearWords, updateActivity } = useSavedWordsStore();

	useEffect(() => {
		updateActivity();
		if (id != textId) {
			clearWords();
			setTextId(id);
		}
	}, [id, textId])

	return (
		<div className={isOpen && isMobile ? "analyzed-text hidden" : "analyzed-text"}>
			{children}
		</div >
	)
}
