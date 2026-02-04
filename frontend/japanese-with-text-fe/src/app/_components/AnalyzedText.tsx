'use client'

import { useSidebarStore } from "../_state/sidebarStore"
import { useIsMobile } from "../_utils/useIsMobile";

export default function AnalyzedText({ children }: { children: React.ReactNode }) {

	const { isOpen } = useSidebarStore();
	const isMobile = useIsMobile(600);

	return (
		<div className={isOpen && isMobile ? "analyzed-text hidden" : "analyzed-text"}>
			{children}
		</div >
	)
}
