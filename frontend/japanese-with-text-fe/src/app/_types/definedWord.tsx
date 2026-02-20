import DictEntry from "./dictEntry";

export default interface DefinedWord {
	original_word: string;
	dict_entries: DictEntry[];
	sentence: string;
}
