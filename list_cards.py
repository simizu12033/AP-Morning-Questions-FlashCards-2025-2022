import json
import re
from pathlib import Path

text = Path("outputs/data.js").read_text(encoding="utf-8")
data = json.loads(re.sub(r"^window\.AP_SOURCE_DATA = |;\s*$", "", text))
for c in data["cards"]:
    print(f"{c['id']} {c['exam']} 問{c['qno']:02d} | {c['topic']} | {c['category']} | {c['term']}")
