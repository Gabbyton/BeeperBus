"""Placeholder docstring"""

import json
from typing import Any

import pandas as pd

def load_logs() -> tuple[list[Any], list[Any]]:
    """Placeholder docstring"""
    with open("combined.log", "r", encoding="utf-8") as file:
        combined_text = file.readlines()
    combined = [json.loads(line) for line in combined_text]
    with open("errors.log", "r", encoding="utf-8") as file:
        errors_text = file.readlines()
    errors = [json.loads(line) for line in errors_text]
    combined_frame = pd.DataFrame(combined)
    errors_frame = pd.DataFrame(errors)
    return combined_frame, errors_frame

if __name__ == "__main__":
    pass
