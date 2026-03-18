from custom_types import AnkiDeckRequest, MinedWord, Sense
import genanki
from pathlib import Path
#Implement creation of anki decks

model = genanki.Model(
    123456789,
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
    original_word_styles = "color: red"
    return f"""<div>
               <p>{prefix}</p><p style={original_word_styles}>{original_word}</p>
               <p>{suffix}</p>
               </div>
               """
def build_senses(senses: list[Sense]):
    sense_element_list: list[str] = []
    for i, sense in enumerate(senses):
        if sense.extra_info is None:
            sense_block = f"""
                        <li key={i}>
                            <p>{";".join(sense.definitions)}</p>
                            <p>Usage: {sense.extra_info}</p>
                        <li>
            """
        else:
            sense_block = f"""
                        <li key={i}>
                            <p>{";".join(sense.definitions)}</p>
                        <li>
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
    file_path = f"{Path.cwd()}/decks/{id}_{deck_request.name}.pkg"
    genanki.Package(deck).write_to_file(file_path)
    return file_path


