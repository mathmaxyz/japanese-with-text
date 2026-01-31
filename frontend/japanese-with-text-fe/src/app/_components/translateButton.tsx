'use client'
import { useState, forwardRef } from 'react';
import { translateText } from "../_api/text_process_service";

const TranslateButton = forwardRef<HTMLButtonElement, {
	chunkId: number,
	chunk: string,
	onTranslationStart: () => void,
	onTranslationComplete: (translation: string) => void,
	showTranslation: boolean,
	translation: string
}>(({ chunkId, chunk, onTranslationStart, onTranslationComplete, showTranslation, translation }, ref) => {

	const [isTranslating, setIsTranslating] = useState<boolean>(false);

	const handleTranslate = async () => {
		if (!translation) {
			setIsTranslating(true);
			onTranslationStart();
			try {
				const translation = await translateText(chunk);
				onTranslationComplete(translation);
				setIsTranslating(false);

			} catch (error) {
				console.error("Translation failed:", error);
			}
		} else {
			onTranslationComplete(translation);
		}
	}

	return (
		<button ref={ref} className={isTranslating ? "translate-button loading" : "translate-button"} disabled={false} onClick={handleTranslate}>
			<svg className={showTranslation ? "translate-icon-invisible" : "translate-icon"} width="100%" height="100%" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
				<rect x="0" fill="none" width="20" height="20" />
				<>
					<path fill="var(--yellow)" d="M11 7H9.49c-.63 0-1.25.3-1.59.7L7 5H4.13l-2.39 7h1.69l.74-2H7v4H2c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2h7c1.1 0 2 .9 2 2v2zM6.51 9H4.49l1-2.93zM10 8h7c1.1 0 2 .9 2 2v7c0 1.1-.9 2-2 2h-7c-1.1 0-2-.9-2-2v-7c0-1.1.9-2 2-2zm7.25 5v-1.08h-3.17V9.75h-1.16v2.17H9.75V13h1.28c.11.85.56 1.85 1.28 2.62-.87.36-1.89.62-2.31.62-.01.02.22.97.2 1.46.84 0 2.21-.5 3.28-1.15 1.09.65 2.48 1.15 3.34 1.15-.02-.49.2-1.44.2-1.46-.43 0-1.49-.27-2.38-.63.7-.77 1.14-1.77 1.25-2.61h1.36zm-3.81 1.93c-.5-.46-.85-1.13-1.01-1.93h2.09c-.17.8-.51 1.47-1 1.93l-.04.03s-.03-.02-.04-.03z" />
				</>
			</svg>
			<svg className={showTranslation ? "translate-icon" : "translate-icon-invisible"} xmlns="http://www.w3.org/2000/svg" fill="var(--yellow)" width="90%" height="90%" viewBox="0 0 24 24"><path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z" /></svg>
		</button>
	);
});

export default TranslateButton;
