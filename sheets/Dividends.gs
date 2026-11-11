// Data: SmarterDividends, https://smarterdividends.com. Free API; attribution appreciated.
// Google Sheets > Extensions > Apps Script. Use =SD_DIVIDENDS(A2:A10).
function SD_DIVIDENDS(tickers) {
  const input = (Array.isArray(tickers) ? tickers.flat() : [tickers]).filter(Boolean);
  if (input.length > 20) throw new Error("Use at most 20 tickers per call and cache results.");
  return [["Ticker","Next ex-date","Annual dividend USD","Forward yield (fraction)","As of"], ...input.map(value => {
    const ticker = String(value).trim().toUpperCase();
    if (!/^[A-Z0-9.-]{1,10}$/.test(ticker)) throw new Error("Invalid ticker");
    const cache = CacheService.getScriptCache();
    const key = "sd:" + ticker;
    let body = cache.get(key);
    if (!body) {
      const response = UrlFetchApp.fetch("https://smarterdividends.com/api/v1/stocks/" + ticker, {muteHttpExceptions:true});
      if (response.getResponseCode() !== 200) throw new Error("API returned " + response.getResponseCode());
      body = response.getContentText(); cache.put(key, body, 21600);
    }
    const stock = JSON.parse(body);
    return [stock.symbol,stock.dividend.next_ex_date || "",stock.dividend.annual_amount,stock.dividend.forward_yield,stock.as_of];
  })];
}
