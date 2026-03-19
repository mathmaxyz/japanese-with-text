from custom_types import AnkiDeckRequest, MinedWord, Sense
import genanki
from pathlib import Path
#Implement creation of anki decks

model = genanki.Model(
    123456789,
    "Japanese learning",
    fields=[
        {"name" : "sentence"},
        {"name" : "entry"}
    ],
    templates=[
        {
            "name" : "Recall-card",
            "qfmt" : "{{sentence}}",
            "afmt" : "{{FrontSide}}<hr id='answer'>{{entry}}"
        }
    ]
)

def build_sentence(original_word: str, sentence: str) -> str:
    index = sentence.find(original_word);
    prefix = sentence[:index]
    suffix = sentence[index + len(original_word):]
    return f"""<div>
               <p>{prefix}<span style="color: red">{original_word}</span>
               {suffix}</p>
               </div>
               """
def build_senses(senses: list[Sense]):
    sense_element_list: list[str] = []
    for i, sense in enumerate(senses):
        if sense.extra_info is not None:
            sense_block = f"""
                        <li key={i}>
                            <p>{";".join(sense.definitions)}</p>
                            <p>Usage: {sense.extra_info}</p>
                        </li>
            """
        else:
            sense_block = f"""
                        <li key={i}>
                            <p>{";".join(sense.definitions)}</p>
                        </li>
            """
        sense_element_list.append(sense_block)

    senses_block = f"<ol>{" ".join(sense_element_list)}</ol>"
    return senses_block


def build_entry(entry_word: list[str], senses: list[Sense], readings: list[str] | None):
    reading_block = f"<h3>{";".join(readings)}</h3>" if readings is not None else ""
    senses_block = build_senses(senses)
    back_side = f"""
                <h2>{";".join(entry_word)}</h2>
                {reading_block}
                <br>
                {senses_block}
    """
    return back_side

def create_anki_card(minedWord: MinedWord):
    sentence = build_sentence(minedWord.original_word, minedWord.sentence)
    entry_word = minedWord.entry.word_kanji if minedWord.entry.word_kanji else minedWord.entry.word_kana
    readings = minedWord.entry.word_kana if minedWord.entry.word_kanji else None
    entry = build_entry(entry_word, minedWord.entry.senses, readings)
    note = genanki.Note(model=model, fields = [sentence, entry])
    return note

def create_anki_pkg(id: int, deck_request: AnkiDeckRequest):
    deck = genanki.Deck(id, deck_request.name)
    for minedWord in deck_request.mined_words:
        note = create_anki_card(minedWord)
        deck.add_note(note)
    decks_dir = Path.cwd() / "decks"
    decks_dir.mkdir(exist_ok=True)
    file_path = str(decks_dir / f"{id}_{deck_request.name}.pkg")
    genanki.Package(deck).write_to_file(file_path)
    return file_path


