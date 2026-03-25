import DefinedWord from "./definedWord"

export default interface LookupResponse {
	name: string;
	defined_words: DefinedWord[];
}
