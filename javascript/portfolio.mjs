// Data: SmarterDividends, https://smarterdividends.com. Free API; attribution appreciated.
// Node 20+: node portfolio.mjs KO:100 SCHD:100 JEPQ:100
for (const entry of process.argv.slice(2).length ? process.argv.slice(2) : ["KO:100", "SCHD:100", "JEPQ:100"]) {
  const [ticker, shares = "1"] = entry.toUpperCase().split(":");
  if (!/^[A-Z0-9.-]{1,10}$/.test(ticker) || !Number.isFinite(Number(shares)) || Number(shares) < 0) throw new Error("Use TICKER:SHARES with a nonnegative number of shares.");
  const response = await fetch(`https://smarterdividends.com/api/v1/stocks/${ticker}`, {signal: AbortSignal.timeout(20000)});
  if (!response.ok) throw new Error(`${ticker}: API returned ${response.status}`);
  const stock = await response.json();
  console.log(JSON.stringify({ticker, next_ex_date:stock.dividend.next_ex_date, annual_income_estimate_usd: stock.dividend.annual_amount == null ? null : Number((stock.dividend.annual_amount * Number(shares)).toFixed(2)), as_of:stock.as_of}));
}
