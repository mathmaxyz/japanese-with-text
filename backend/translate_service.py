import ctranslate2
from custom_types import TranslateResponse
import logging
from transformers import AutoModelForSeq2SeqLM, AutoTokenizer, BitsAndBytesConfig

logging.basicConfig(format="%(asctime)s %(levelname)s %(message)s", level=logging.DEBUG)
log = logging.getLogger(__name__)

src_lang = "jpn_Jpan"
tgt_lang = "eng_Latn"

#TODO: Decide on how many inter threads would be required in production

tokenizer = AutoTokenizer.from_pretrained("facebook/nllb-200-distilled-600M")
translator = ctranslate2.Translator("nllb-ct2", device="cuda", compute_type="int8", inter_threads=4);

def translate_text(text_chunks: list[str]) -> TranslateResponse | None:
    tokenizer.src_lang = "jpn_Jpan"
    target_lang_token = tokenizer.convert_ids_to_tokens(
        tokenizer.convert_tokens_to_ids(tgt_lang)
    )
    results = []
    for text in text_chunks:
        source = tokenizer.convert_ids_to_tokens(tokenizer.encode(text)) 
        output = translator.translate_batch(
            [source], 
            target_prefix=[[target_lang_token]],
            max_decoding_length=1000
        )
        target = output[0].hypotheses[0]
        translation = tokenizer.decode(tokenizer.convert_tokens_to_ids(target), skip_special_tokens=True)
        results.append(translation)
    return TranslateResponse(translated_text=results)
