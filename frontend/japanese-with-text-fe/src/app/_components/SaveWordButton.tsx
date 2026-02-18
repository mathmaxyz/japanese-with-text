'use client'

import { useSavedWordsStore } from "../_state/savedWordsStore"
import DictEntry from "../_types/dictEntry";
import SavedWord from "../_types/savedWord";

export default function SaveWordButton({ entry }: { entry: DictEntry }) {

	const { addWord, removeWord, isWordSaved } = useSavedWordsStore();

	const savedWord: SavedWord = { entry: entry, sentence: "" };

	let saved = isWordSaved(savedWord.entry);


	const handleClick = () => {
		if (saved) {
			removeWord(savedWord);
		} else {
			addWord(savedWord);
		}
	};

	return (
		<div>
			{!saved && (
				<button className="save-word-button add-word-button" onClick={handleClick}>
					<svg className="save-icon" fill="var(--white)" version="1.1" id="floppy" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
						viewBox="0 0 290 290" xmlSpace="preserve" width="15px" height="15px">
						<g>
							<path d="M287.602,53.599l-51.2-51.2C234.862,0.863,232.777,0,230.602,0H8.199C3.668,0,0,3.668,0,8.199v273.602
	C0,286.332,3.668,290,8.199,290h273.602c4.531,0,8.199-3.668,8.199-8.199V59.397C290,57.221,289.135,55.138,287.602,53.599z
	 M38.456,34.678c0-3.262,2.651-5.916,5.917-5.916h160.975c3.27,0,5.918,2.654,5.918,5.916v78.323c0,3.269-2.647,5.915-5.918,5.915
	H44.373c-3.266,0-5.917-2.646-5.917-5.915V34.678z M251.544,247.513c0,4.03-3.27,7.298-7.296,7.298H45.752
	c-4.026,0-7.296-3.268-7.296-7.298V150.94c0-4.028,3.27-7.295,7.296-7.295h198.496c4.026,0,7.296,3.267,7.296,7.295V247.513z"/>
							<rect x="173.564" y="39.039" width="24.588" height="69.604" />
							<rect x="59.489" y="174.643" width="171.021" height="8.195" />
							<rect x="59.489" y="215.62" width="171.021" height="8.195" />
						</g>
					</svg>
					Save
				</button>
			)}
			{saved && (
				<button className="save-word-button remove-word-button" onClick={handleClick}>
					<svg className="check-icon" fill="var(--shadow-blue)" width="20px" height="20px" viewBox="0 0 24 24" id="check-mark" data-name="Flat Line" xmlns="http://www.w3.org/2000/svg">
						<polyline id="primary" points="21 5 12 14 8 10" style={{ fill: 'none', stroke: 'var(--shadow-blue)', strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: 2 }}></polyline>
						<path id="primary-2" data-name="primary" d="M20.94,11A8.26,8.26,0,0,1,21,12a9,9,0,1,1-9-9,8.83,8.83,0,0,1,4,1" style={{ fill: 'none', stroke: 'var(--shadow-blue)', strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: 2 }}></path>
					</svg>
					Saved
				</button>
			)}
		</div>
	)
}
