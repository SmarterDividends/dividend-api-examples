# Dividend facts in Google Sheets

Data: SmarterDividends, free API. Attribution appreciated.

Paste this into a cell to fetch KO's profile as CSV:

```text
=IMPORTDATA("https://smarterdividends.com/api/v1/stocks/KO?format=csv")
```

For a list, paste `Dividends.gs` into Extensions > Apps Script, then use `=SD_DIVIDENDS(A2:A10)`. Format the forward-yield column as a percentage. The script caches each response for six hours and limits a call to 20 tickers. Google may ask you to authorize external requests when first running Apps Script.

Annual amount times shares is an estimate at the current indicated rate, not a promise of future income. Null dates mean no next date is available.

[Full API docs](https://smarterdividends.com/dividend-api?utm_source=github&utm_medium=referral&utm_campaign=sheets).
