'use client'
import { useState, useRef, useEffect } from "react";
import DefinedWord from "../_types/definedWord";
import Word from "./Word";
import TranslateButton from "./translateButton";

export default function LookupParagraphContent({
	chunkId,
	chunk,
	definedWords
}: {
	chunkId: number,
	chunk: string,
	definedWords: DefinedWord[]
}) {
	const [translation, setTranslation] = useState<string | null>(null);
	const [showTranslation, setShowTranslation] = useState<boolean>(false);
	const buttonRef = useRef<HTMLButtonElement>(null);
	const [arrowLeft, setArrowLeft] = useState<number>(0);

	useEffect(() => {
		if (buttonRef.current && showTranslation) {
			const rect = buttonRef.current.getBoundingClientRect();
			const parentRect = buttonRef.current.offsetParent?.getBoundingClientRect();
			const calculatedLeft = rect.left - (parentRect?.left || 0) + rect.width / 2;
			setArrowLeft(calculatedLeft);
		}
	}, [showTranslation]);

	const handleTranslationFetched = (translatedText: string) => {
		setTranslation(translatedText);
		setShowTranslation(!showTranslation);
	};

	return (
		<div className="lookup-paragraph">
			{definedWords.map((word: DefinedWord, index: number) => (
				<Word key={index} definedWord={word}></Word>
			))}
			<TranslateButton
				ref={buttonRef}
				chunkId={chunkId}
				chunk={chunk}
				onTranslationComplete={handleTranslationFetched}
				showTranslation={showTranslation}
				translation={translation}
			/>
			{(translation && showTranslation) && (
				<div
					className="translation-result"
					style={{ '--arrow-left': `${arrowLeft}px` } as React.CSSProperties}
				>
					{translation}
				</div>
			)}
		</div>
	);
}
