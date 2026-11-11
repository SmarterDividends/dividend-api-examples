# Data: SmarterDividends, https://smarterdividends.com. Free API; attribution appreciated.
"""python3 portfolio.py KO SCHD JEPQ; add TICKER:SHARES to estimate annual income."""
import json
import sys
import urllib.error
import urllib.request

for entry in sys.argv[1:] or ["KO:100", "SCHD:100", "JEPQ:100"]:
    ticker, _, shares = entry.upper().partition(":")
    request = urllib.request.Request(f"https://smarterdividends.com/api/v1/stocks/{ticker}", headers={"User-Agent": "SmarterDividends-examples/1.0"})
    try:
        with urllib.request.urlopen(request, timeout=20) as response:
            stock = json.load(response)
        dividend = stock["dividend"]
        amount = dividend["annual_amount"]
        income = None if amount is None else round(amount * float(shares or 1), 2)
        print(json.dumps({"ticker": ticker, "next_ex_date": dividend["next_ex_date"], "annual_income_estimate_usd": income, "as_of": stock["as_of"]}))
    except (urllib.error.URLError, ValueError, KeyError) as error:
        print(f"{ticker}: {error}", file=sys.stderr)
        sys.exit(1)
