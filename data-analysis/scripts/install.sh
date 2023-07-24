#!/bin/bash

# Virtual Environment
bash scripts/reinstall-venv.sh
source .venv/bin/activate

# Jupyter kernel
ipython kernel install --user --name=data-analysis

# Git
git config filter.strip-notebook-output-metadata.clean "jupyter nbconvert --ClearOutputPreprocessor.enabled=True --ClearMetadataPreprocessor.enabled=True --ClearMetadataPreprocessor.preserve_nb_metadata_mask kernelspec --ClearMetadataPreprocessor.preserve_nb_metadata_mask name --to=notebook --stdin --stdout --log-level=ERROR"
git config filter.strip-notebook-output-metadata.smudge "cat"