from enum import Enum
from pydantic import BaseModel
from psycopg.rows import DictRow

class LookupRequest(BaseModel):
    text: str

class TranslateRequest(BaseModel):
    text_chunks: list[str]

class GrammarResponse(BaseModel):
    original_text: str
    translated_text: str
    explanation: str
    difficulty_level: str

class Sense(BaseModel):
    definitions: list[str]
    extra_info: str | None

class DictEntry(BaseModel): 
    word_kanji: list[str]
    word_kana: list[str]
    senses: list[Sense]


class DefinedWord(BaseModel):
    original_word: str
    dict_entries: list[DictEntry]
    sentence: str

class MinedWord(BaseModel):
    original_word: str
    entry: DictEntry
    sentence: str

class AnkiDeckRequest(BaseModel):
    mined_words: list[MinedWord]
    name: str

class LookupResponse(BaseModel):
    name: str
    defined_words: list[DefinedWord]
    
class LookupObject(BaseModel):
    kanji_rows: list[DictRow]
    kana_rows: list[DictRow]

class TranslateResponse(BaseModel):
    translated_text: list[str]
    
class Mode(Enum):
    KANJI = "kanji"
    KANA = "kana"

class Morph(BaseModel):
    word: str
    morphemes: list

class WordWithDictForm(BaseModel):
    conjugated: str
    dict_form: str

