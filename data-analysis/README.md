# Data Analysis

This folder contains instructions and notebooks for working with the data
collected by `data-collection-server`.

## Setup

Follow these instructions to go from a fresh clone of the repository (or just
this folder) to a running notebook.

### Environment

1. Set working directory to `data-analysis`

    ```bash
    $ pwd
    [your-local-path]/BeeperBus/data-analysis
    ```

1. Run the installation script with `bash scripts/install.sh`

    This will set up a (Python) virtual environment with `python -m venv` and
    install it in the `data-analysis/.venv` folder. The virtual environment can
    be activated (and should be activated each session) with
    `source .venv/bin/activate`.

1. Activate the virtual environment: `source .venv/bin/activate`.

### Data

The download process will probably change with time, but for now it is accessed
from the Sharepoint for the project. Download the zip file and unzip it in the
`data-analysis/data` directory (create the directory as needed). See the diagram
below for the directory structure.

```text
data-analysis
├── README.md
├── data
│   ├── arrivals_dump.json
│   └── vehicle_dump.json
└── requirements.txt
```

### Running Notebooks

1. Update packages with `bash scripts/update.sh`
1. Activate the virtual environment with `source .venv/bin/activate`.
1. Start Jupyter Notebook with `jupyter notebook`.
1. Navigate to the notebook to run in the browser tab that opens and run the
notebook from there.

## Development

### Adding or Removing Dependencies

Manage dependencies with the scripts in `scripts` and `pip`. If a new package is
needed, add it to `requirements-dev.txt` and run
`bash scripts/update-requirements.txt`. This script is used to reinstall the
virtual environment using the list of explicit dependencies and update
`requirements.txt` accordingly.

### Updating Packages

Simply run `bash scripts/update-requirements.sh` to reinstall packages from
scratch. `pip` will automatically figures out the latest compatible versions to
install. If a specific version is required, be sure to list that requirement in
`requirements-dev.txt`.
