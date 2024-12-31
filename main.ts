import yahooFinance from "yahoo-finance2"

Deno.serve({
  handler: async (req) => {
    const url = new URL(req.url)
    const query = url.searchParams.get("query") || "TSLA"
    const queryOptions = {
      period1:
        new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString()
          .split("T")[0],
      period2: new Date().toISOString().split("T")[0],
    }

    const result = await yahooFinance.historical(query, queryOptions)
    return new Response(JSON.stringify(result), {
      headers: { "Content-Type": "application/json" },
    })
  },
})
