---
title: Meteora LP Bot
tagline: A paper-trading research system that tests liquidity strategies on Solana before any real money goes in.
status: In progress
date: 2026-10-09
stack: [TypeScript, Node 22 (SQLite recorder), Meteora DLMM SDK, DexScreener / RugCheck / Birdeye APIs, "~22,000 lines"]
featured: true
order: 2
thumbnail: /cartridges/meteora-lp.svg
links:
  github: https://github.com/arson-glitch/meteora-lp-bot
---

## Problem
Providing liquidity on Meteora's DLMM pools earns trading fees, but the right range and shape depend on the
coin. Most advice is guesswork. After my sniper failed, I wanted to find out with data which strategy works
for which kind of coin, and to keep anything unproven away from real money.

## What I built
- **Scanner:** pulls live pools from Meteora's API, adds price data from DexScreener, and ranks them by volume, fee yield, volatility and age.
- **Rug checks:** fails tokens with freeze authority, too few holders or thin liquidity, and fails closed if the check itself errors.
- **Coin classifier:** sorts every pool into six types: stable, bluechip, fresh memecoin, high-volatility trending, established mid-cap and older memecoin.
- **Strategy tournament:** replays a 108-cell grid of strategies on historical data, then paper-trades them forward on live prices.
- **Guardrails against fooling myself:** about 30% of coins are held out and never used to rank strategies; a strategy is promoted only if it beats costs on a time split and on the holdout; promoted strategies are frozen with a hash so they can't be quietly tweaked.
- **Risk limits:** position size, open-position count and a daily loss cap. Live trading exists but stays locked behind explicit gates.

## Result
Nothing has earned real money yet, by design. The paper books show large gains, but most of them come from one
or two coins and from a generous fee model. Under a stricter model that only credits fees from the active
price bin, the same books are negative. Across 30,003 backtest trials on 126 pools, no strategy has passed
the promotion gate, mostly because a single coin dominates its results.

## What I learned
[TO ADD]
