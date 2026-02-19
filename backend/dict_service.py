import dict_repository
from psycopg.rows import DictRow
from pydantic import BaseModel
from custom_types import Morph, Sense, DictEntry, DefinedWord, LookupResponse, WordWithDictForm

def initialise_pool() -> None:
    dict_repository.create_dict_connection_pool()

def close_pool() -> None:
    dict_repository.cleanup_dict_connection_pool()

def rejoin_verbs_and_auxiliaries(morphemes) -> list[Morph]:
    """Rejoin verb stems with their auxiliaries for practical dictionary lookup"""
    result = []
    i = 0
    while i < len(morphemes):
        current = morphemes[i]
        pos = current.part_of_speech()[0]
        # If it's a verb, collect all following auxiliaries
        if pos in ('動詞', '形容詞'):  # verb or adjective
            current_morphs = [current]
            combined = [current.surface()]
            j = i + 1
            # Keep collecting auxiliaries and auxiliary verbs
            while j < len(morphemes):
                next_morph = morphemes[j]
                current_morphs.append(next_morph)
                next_pos = next_morph.part_of_speech()[0]
                pos = next_morph.part_of_speech()[0]
                if next_pos in ('助動詞', '接尾辞'):  # auxiliary verb, suffix
                    combined.append(next_morph.surface())
                    j += 1
                else:
                    break
            result.append(Morph(word=''.join(combined), morphemes=current_morphs))
            i = j
        else:
            result.append(Morph(word=current.surface(), morphemes=[current]))
            i += 1
    return result

def get_dictionary_forms(morphs: list[Morph]) -> list[WordWithDictForm]:
    words_with_dict_form = []
    for morph in morphs:
        dict_form = morph.morphemes[0].dictionary_form()
        words_with_dict_form.append(
            WordWithDictForm(
                conjugated=morph.word,
                dict_form=dict_form
            )
        )
    return words_with_dict_form

def get_lookup_response(morphemes) -> LookupResponse:
    morphs = rejoin_verbs_and_auxiliaries(morphemes)
    words_with_dict_form = get_dictionary_forms(morphs)
    dict_rows_list: list[list[DictRow]] = dict_repository.get_dict_entries_for_text([m.dict_form for m in words_with_dict_form])
    if(len(dict_rows_list) <=0):
        return LookupResponse(defined_words=[])
    entry_ids = [[e["id"] for e in word] for word in dict_rows_list]
    sense_rows_list: list[dict[int,list[DictRow]]] = dict_repository.get_senses_by_entry_ids(entry_ids)
    translated_words: list[DefinedWord] = []
    for row_list, sense_row_dict, m in zip(dict_rows_list, sense_rows_list, words_with_dict_form):
        if(len(row_list) <= 0):
            translated_words.append(
                DefinedWord(
                    original_word=m.conjugated,
                    dict_entries=[]
                )
            )
            continue
        dict_entries: list[DictEntry] = []
        for row in row_list:
            sense_list: list[Sense] = []
            senses_for_entry = sense_row_dict[row["id"]]
            for s in senses_for_entry:
                sense = Sense(
                    definitions=s["definitions"],
                    extra_info=s["extra_info"]
                )
                sense_list.append(sense)
            de = DictEntry(
                word_kanji=row["word_kanji"],
                word_kana=row["word_kana"],
                senses=sense_list
            )
            dict_entries.append(de)
        tw = DefinedWord(
            original_word=m.conjugated,
            dict_entries=dict_entries
        )
        translated_words.append(tw)
    return LookupResponse(
        defined_words=translated_words
    )
