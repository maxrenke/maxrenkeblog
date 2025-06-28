---
layout: post
title: "Home Lab Adventures (Part 1)"
---

Inspired by a long desire to set up a home lab and not burden my glorious gaming machine with the burden of hosting a linux server, I decided to finally pull the trigger and purchase the [Zimablade](https://shop.zimaspace.com/products/zimablade-single-board-server-for-cyber-native) after hearing great things about the Zimaboard over the years.

[![Zimablade on my desk with a lot of snacks](/assets/images/20250623_183414304_iOS.jpg)](/assets/images/20250623_183414304_iOS.jpg)

I have a really simple setup, with a 5 port managed switch from netgear underneath. I will eventually want to upgrade this to a 2.5Gbps switch, as I'm losing out on network speed to my main PC, but this is just a proof of concept.

Right now I am going to run everything off the Zimablade, but I want to be able to expand to additional hardawre if needed.

I chose the Zimablade so I could get started right away instead of having to flash install an entire OS. This was a great choice, but I'm going to recreate this entire setup with a custom OS install in the future.

## Step 1 - Tailscale

I've always wanted to set up [Tailscale](https://www.tailscale.com) for my home network, but never had a reason to. With Tailscale configured on my devices and the server, I should be able to access my home network from anywhere. Before tailscale I'd have to setup my own VPN and that would be a pain, but now I just need to enable Tailscale, authenticate, and my devices can see each other.

### Setup Instructions

Tailscale is really set and forget. Tailscale has instructions [here](https://tailscale.com/kb/1347/installation).

What next?

## Step 2 - Pi-Hole

I run copious amounts of ad blockers on my browswer, but I always wanted to try [Pi-Hole](https://pi-hole.net/) on my network to see if I could block ads on my mobile device, or other devices.

This required a fun trick of making sure I can use PiHole on my devices without much effort. Luckily, PiHole runs in a docker container and maps its network interface to the host, so I just have to point the device I want to use PiHole on to the IP address of my Zimablade! This took a bit of trial and error, but I eventually got it working.

[![local dns](/assets/images/localdns.png)](/assets/images/localdns.png)

The only trick is that I needed to add a local DNS record of the Zimablade's IP (10.0.0.249) so that the PiHole can look up DNS records on itself.

This does mean I have a failure point on all my devices using Tailscale if PiHole is ever unavailable ... but I will solve that in the future.

## Step 3 - More Fun!

[![Here's Where the Fun Begins](/assets/images/hereswherethefunbegins.png)](/assets/images/hereswherethefunbegins.png)

Now, what else can I do? Well, anything really! I intend on using and abusing Docker as much as I can to spin up vulnerable web services and a Kali Linux instance to go at it. I've basically spent the last week trying different Docker things. Turns out I'm now proficient in using the Docker CLI, which is a nice bonus!

### Jellyfin > Plex

I got a recommendation to try [Jellyfin](https://jellyfin.org/) and wow, it is WAY better than plex!

### Sneak Peak

Here are all the containers I'm trying out. Notice anything interesting? Please reach and and tell me what else to try!

[![my containers](/assets/images/mycontainers.png)](/assets/images/mycontainers.png)