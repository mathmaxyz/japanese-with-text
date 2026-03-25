import DictEntry from "./dictEntry";

export default interface SavedWord {
	original_word: string;
	entry: DictEntry;
	sentence: string;
}
