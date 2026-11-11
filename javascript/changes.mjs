// Data: SmarterDividends, https://smarterdividends.com. Free API; attribution appreciated.
const week = process.argv[2];
if (week && !/^\d{4}-\d{2}-\d{2}$/.test(week)) throw new Error("Use YYYY-MM-DD.");
const response = await fetch(`https://smarterdividends.com/api/v1/dividend-changes${week ? `?week=${week}` : ""}`, {signal:AbortSignal.timeout(20000)});
if (!response.ok) throw new Error(`API returned ${response.status}`);
const data = await response.json();
console.log(data.period);
for (const row of data.changes.filter(r => ["increase","cut"].includes(r.kind))) console.log(row.symbol, row.kind, `${(row.pct_change*100).toFixed(2)}%`, row.ex_date);
console.log("Distribution changes may include variable payouts. Not investment advice.");
