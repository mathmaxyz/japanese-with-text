'use client'
import { useState } from "react";
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
	const [isTranslating, setIsTranslating] = useState<boolean>(false);
	const [showTranslation, setShowTranslation] = useState<boolean>(false);

	const handleTranslationFetched = (translatedText: string) => {
		setTranslation(translatedText);
		setIsTranslating(false);
		setShowTranslation(!showTranslation);
	};

	const handleTranslationStart = () => {
		setIsTranslating(true);
	};

	return (
		<div className="lookup-paragraph">
			{definedWords.map((word: DefinedWord, index: number) => (
				<Word key={index} definedWord={word}></Word>
			))}
			<TranslateButton
				chunkId={chunkId}
				chunk={chunk}
				onTranslationStart={handleTranslationStart}
				onTranslationComplete={handleTranslationFetched}
				translation={translation}

			/>
			{isTranslating && (
				<div className="translation-loading">
					Translating...
				</div>
			)}
			{(translation && showTranslation) && (
				<div className="translation-result">
					{translation}
				</div>
			)}
		</div>
	);
}
