import { lookupText } from "../_api/text_process_service"
import DefinedWord from "../_types/definedWord";
import LookupResponse from "../_types/lookupResponse";
import Word from "./Word";
import TranslateButton from "./translateButton";

export default async function LookupParagraph({ chunkId, chunk, lookupData }: { chunkId: number, chunk: string, lookupData: LookupResponse }) {

	let data = lookupData;
	let definedWords: DefinedWord[] = [];
	if (data !== null && data.defined_words !== null) {
		definedWords = data.defined_words;
	} else {
		data = await lookupText(chunk);
		definedWords = data ? data.defined_words : [];
	}


	return (<div className="lookup-paragraph">
		{
			definedWords.map((word: DefinedWord, index: number) => (
				<Word key={index} definedWord={word}></Word>
			))
		}
		<TranslateButton chunkId={chunkId} chunk={chunk} />
	</div>)
}
