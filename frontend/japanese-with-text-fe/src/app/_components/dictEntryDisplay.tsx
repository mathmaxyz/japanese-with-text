import DictEntry from "../_types/dictEntry";
import SaveWordButton from "./SaveWordButton";

export default function DictEntryDisplay({ entry }: { entry: DictEntry }) {
	const wordKanji: string[] | null = entry.word_kanji.length > 0 ? entry.word_kanji : null;
	const wordKana: string[] | null = entry.word_kana.length > 0 ? entry.word_kana : null;
	const senses = entry.senses;

	return (
		<div className="entry-content">
			<h2 className="key-word">{wordKanji !== null ? wordKanji : entry.word_kana}</h2>
			<SaveWordButton entry={entry} />
			<h3 className="reading">Reading: {wordKana}</h3>
			<ol className="sense-list">
				{senses.map((sense, index) => (
					<li key={index} className="sense-list-item">
						<p className="definition">{sense.definitions.join("; ")}</p>
						{sense.extra_info && <p className="extra-info">Usage: {sense.extra_info}</p>}
					</li>
				))
				}
			</ol>
		</div>
	)
}

