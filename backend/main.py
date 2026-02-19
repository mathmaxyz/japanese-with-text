from dotenv import load_dotenv
load_dotenv()
from contextlib import asynccontextmanager
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import openai
from sudachipy import tokenizer
from sudachipy import dictionary
from custom_types import LookupRequest, Mode, LookupResponse, GrammarResponse, TranslateRequest, TranslateResponse
import dict_service
import translate_service
# Load environment variables

sudict = dictionary.Dictionary()

@asynccontextmanager
async def lifespan(app: FastAPI):
    dict_service.initialise_pool()
    yield
    dict_service.close_pool()

# Initialize FastAPI app
app = FastAPI(title="Language Learning API", version="1.0.0", lifespan=lifespan)

# Configure CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models for request/response
# API Routes
@app.get("/")
async def root():
    return {"message": "Language Learning API is running!"}

@app.post("/lookup-text", response_model=LookupResponse)
def lookup_text(request: LookupRequest):
    mode = tokenizer.Tokenizer.SplitMode.C
    sutokenizer = sudict.create(mode=mode)
    text = request.text
    morphemes = sutokenizer.tokenize(text);
    return dict_service.get_lookup_response(morphemes)

@app.post("/translate-text", response_model=TranslateResponse)
def translate(request: TranslateRequest):
    text_chunks = request.text_chunks
    translate_result = translate_service.translate_text(text_chunks)
    if not translate_result:
        raise HTTPException(status_code=500, detail="Translator unavailable")
    return translate_result

@app.get("/health")
async def health_check():
    return {"status": "healthy", "framework": "FastAPI"}

