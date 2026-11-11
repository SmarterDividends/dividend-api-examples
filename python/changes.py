# Data: SmarterDividends, https://smarterdividends.com. Free API; attribution appreciated.
"""python3 changes.py [YYYY-MM-DD]; percentages in the API are fractions."""
import json
import sys
import urllib.request
from datetime import date

suffix = "?week=" + date.fromisoformat(sys.argv[1]).isoformat() if len(sys.argv) > 1 else ""
with urllib.request.urlopen("https://smarterdividends.com/api/v1/dividend-changes" + suffix, timeout=20) as response:
    result = json.load(response)
print("Period:", result["period"])
for row in result["changes"]:
    if row["kind"] in ("increase", "cut"):
        print(row["symbol"], row["kind"], f'{row["pct_change"] * 100:+.2f}%', row["ex_date"])
print("Distribution changes may include variable payouts. Not investment advice.")
