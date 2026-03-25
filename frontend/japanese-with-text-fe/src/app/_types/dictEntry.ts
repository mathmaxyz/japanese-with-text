import Sense from "./sense";

export default interface DictEntry {
	word_kanji: string[];
	word_kana: string[];
	senses: Sense[];
}
