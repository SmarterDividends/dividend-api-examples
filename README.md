# SmarterDividends API examples

Free U.S. dividend lookups with no API key. Contact: hello@smarterdividends.com.

```sh
curl --fail 'https://smarterdividends.com/api/v1/stocks/KO'
python3 python/portfolio.py KO:100 SCHD:100 JEPQ:100
python3 python/changes.py
node javascript/portfolio.mjs KO:100 SCHD:100 JEPQ:100
node javascript/changes.mjs
```

Python examples use the standard library. JavaScript requires Node 20 or later. See `sheets/` for IMPORTDATA and Apps Script.

The API allows 60 requests per minute per IP and supports browser CORS. Cache responses. `forward_yield`, `payout_ratio` and `pct_change` are fractions: 0.03 is 3%. A missing date or ratio is unknown, not zero. Stock `dividend.annual_amount` is an indicated annual amount; multiplying it by shares estimates income before tax. Distribution changes can include variable payouts. Prices and data are dated, not intraday quotes.

Other endpoints: `/api/v1/ex-dividend/YYYY-MM-DD` (includes exchange-calendar-aware `last_day_to_buy`) and `/api/v1/dividend-changes?week=YYYY-MM-DD`. Omit `week` for the latest seven days.

[API documentation](https://smarterdividends.com/dividend-api?utm_source=github&utm_medium=referral&utm_campaign=api-examples) · [Research tools](https://smarterdividends.com/tools?utm_source=github&utm_medium=referral&utm_campaign=api-examples)

Code: MIT. API data: use with attribution to SmarterDividends. Not investment advice.
