---
title: Atwa Studio
tagline: A Telegram bot that turns an employee's idea into a finished, voiced mascot video for $0.15.
status: Built, launching soon
date: 2026-10-27
stack: [Claude API (Haiku + Sonnet), Remotion, ElevenLabs, Telegram Bot API]
featured: true
order: 1
thumbnail: /cartridges/atwa-studio.svg
links: {}
---

## Problem
Al Saif Coffee Egypt has three employees and no video team. Short-form video is where coffee brands get
attention, but every video meant someone scripting, animating and recording a voice. I wanted the team to
make videos themselves, with no software to learn and nothing to install.

## What I built
Everything happens in a Telegram chat:
1. The employee starts the bot and picks one of its video ideas, or types their own.
2. The bot writes a script they can edit.
3. They confirm, and get back a finished motion video of the Al Saif mascot with a voice in Egyptian Arabic.
4. A week after the video is posted, the bot pulls its analytics and suggests what to change next time.

## The hard parts
- **Video quality.** Getting rendered videos to look like a brand would post them, not like a template.
- **Cost.** The first version cost $0.54 per video. I moved everything to Claude Haiku except the script,
  where the joke has to land, which still uses a stronger model. That brought it to $0.15, a 72% cut.

## Result
Ready for production. The first videos go out with Al Saif's next campaign; I'll post the numbers here
when they're in.

## What I learned
It's fine to pivot, again and again, as long as each change comes from something you learned. This project
went from a website idea to a Telegram bot, and from one expensive model to the cheapest one that was good enough.

Links: [TO ADD: GitHub repo once checked for keys] · [TO ADD: sample video or bot screenshot]
