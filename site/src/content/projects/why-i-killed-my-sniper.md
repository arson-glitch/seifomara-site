---
title: Why I Killed My Sniper
tagline: I spent weeks building a 4,200-line trading bot, collected the data, found it had no edge, and shut it down.
status: Retired
date: 2026-07-08
stack: [Node.js, Solana, DexScreener, Helius, Claude API]
featured: true
order: 3
thumbnail: /cartridges/sniper.svg
links: {}
---

## The idea
On Solana, memecoins "migrate" from a launchpad to a real exchange pool once they reach a threshold. My bet
was that I could score each coin at the moment of migration and predict which ones would take off.

## What I built
- A Node.js bot (~4,200 lines) that watched migrations in real time.
- A two-pass scoring engine, with a Claude-based layer to review each coin before entry.
- A wallet copy-trading scanner on the side.
- A plan for a meta-agent to retune the scoring weights, which I held back until I had enough on-chain data.

## What the data said
- **The score didn't predict much.** Coins that scored high did not reliably outperform coins that scored low.
- **Influencer (KOL) buying was a negative signal.** Coins that well-known traders piled into did worse, not better.
- **My data source was misleading.** DexScreener undercounted buy activity compared with raw transaction data from Helius, so part of what I was scoring was wrong to begin with.
- **One thing held up:** selling in stages beat a single take-profit.

## Why I stopped
Looking only at a coin after migration, there was no edge to find. More features or a smarter model would
have meant fitting noise. The honest move was to stop.

[TO ADD: anything else that played a part]

## What I took into the next project
Test before you trust: decide in advance how you will know whether something works, and keep data back that
you never tune on. My Meteora bot was built around that from day one.
