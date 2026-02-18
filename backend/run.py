#!/usr/bin/env python3
"""
Development server runner for the Language Learning API
"""
import uvicorn
from pathlib import Path
import os
import sys

if __name__ == "__main__":

    p = Path("./nllb-ct2")
    if not os.path.exists(p):
        os.system("ct2-transformers-converter --model facebook/nllb-200-distilled-600M --output_dir nllb-ct2")

    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,  # Auto-reload on code changes
        log_level="info"
    )

