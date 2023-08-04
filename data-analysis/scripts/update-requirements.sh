#!/bin/bash

rm -r .venv
python3.10 -m venv .venv
source .venv/bin/activate
pip install --upgrade pip
pip install -r requirements-dev.txt
pip freeze > requirements.txt
bash scripts/update.sh