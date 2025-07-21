---
layout: post
title: "ytdlpllm: A Natural Language YouTube Downloader"
tags: ["ytdlpllm", "YouTube", "Downloader", "AI", "Natural Language", "Self-hosting"]
categories: ["AI", "Self-hosting", "Tools"]
---

## Introduction

I'm excited to introduce **ytdlpllm**, a tool I created to make downloading YouTube videos as easy as chatting with an AI. With ytdlpllm, you can use natural language commands to fetch videos, playlists, or even just audio—no complicated command-line flags required.

## What is ytdlpllm?

ytdlpllm is a self-hosted web app that leverages large language models (LLMs) to interpret your requests. Instead of memorizing options or URLs, you simply tell the app what you want, like:

> "Download this video in the best quality: https://www.youtube.com/watch?v=dQw4w9WgXcQ"

The app figures out the rest, using [yt-dlp](https://github.com/yt-dlp/yt-dlp) under the hood for the actual downloading.

## Key Features

- **Natural Language Interface:** Just type what you want to download.
- **Self-Hosted:** Run it on your own machine or server for privacy and control.
- **Flexible Output:** Download videos, playlists, or extract audio.
- **LLM-Powered:** Uses an LLM to parse your intent and generate the correct yt-dlp command.
- **Web UI:** Simple, clean interface accessible from your browser.

## How It Works

1. **Enter your request** in plain English.
2. The app uses an LLM to convert your request into a yt-dlp command.
3. yt-dlp downloads the content.
4. You get a download link right in your browser.

## Getting Started

See more at the [GitHub repository](https://github.com/maxrenke/ytdlpllm).

### Clone the Repository

```bash
git clone https://github.com/m-ren/ytdlpllm.git
cd ytdlpllm
```

### Install the Dependencies

```bash
pip install .
```

### Usage

To use **ytdlpllm**, simply run the command followed by your instructions in quotes:

```bash
ytdlpllm "Download this video in the best quality: https://www.youtube.com/watch?v=dQw4w9WgXcQ"
```

## Why I Built This

I wanted a YouTube downloader that anyone could use without learning command-line options or scripts. By combining the power of LLMs with yt-dlp, ytdlpllm makes video downloading accessible and intuitive.

## Try It Out

Check out the project on [GitHub](https://github.com/maxrenke/ytdlpllm) for more details, and feel free to contribute or open issues!

---
*Created by [Max Renke](https://github.com/maxrenke)*