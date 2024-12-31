Deno.serve({
  handler: async (req) => {
    const url = new URL(req.url)
    const symbol = url.searchParams.get("query") || "TSLA"
    const now = new Date()
    // 1 month ago
    const period1 = Math.floor(
      new Date(now.setMonth(now.getMonth() - 1)).getTime() / 1000,
    )
    const period2 = Math.floor(now.getTime() / 1000)

    const reqUrl =
      `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?period1=${period1}&period2=${period2}&interval=1d`
    const result = await fetch(reqUrl)
    console.log(reqUrl)
    const json = await result.json();
    console.log(json)

    return new Response(JSON.stringify(json), {
      headers: { "Content-Type": "application/json" },
    })
  },
})
