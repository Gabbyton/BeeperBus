# Logs

All log messages are stored in `combined.log`. Only errors are stored in
`error.log`. Use the `load_logs.py` script to load the logs into a Pandas data
frame.

```python
import pandas as pd
import load_logs

combined_frame, errors_frame = load_logs.load_logs()
```
