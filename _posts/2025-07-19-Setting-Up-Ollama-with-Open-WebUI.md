---
layout: post
title: "Setting Up Ollama with Open WebUI: A Cross-Platform Docker Adventure"
tags: ["Ollama", "Open WebUI", "Docker", "WSL2", "Self-hosting", "AI"]
categories: ["AI", "Self-hosting", "Networking"]
---

I've been diving deep into the world of self-hosting AI models, and I'm excited to share a particularly interesting setup I've been working on. This guide will walk you through how to run Ollama on a powerful Windows machine with WSL2, and connect it to a beautiful Open WebUI running in Docker on a separate Linux server. It's a bit of a journey, but the result is a powerful, flexible, and secure AI setup.

## Overview

Here's the big picture: we're going to set up a distributed AI infrastructure where:

-   **Ollama** runs on a Windows machine with WSL2 (perfect for a machine with a beefy GPU).
-   **Open WebUI** runs in a Docker container on a Linux server (in my case, CasaOS).
-   The two are on the same local network.

## Network Topology

I'm a visual person, so here's a diagram of what we're building. It shows how the traffic flows from Open WebUI, through Docker, across the local network, through the Windows firewall, via port forwarding, and finally to Ollama running in WSL2.

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│                         Network Topology                          │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   ┌─────────────────────┐           ┌─────────────────────┐   │
│   │     MARENKE-AMD     │           │       CasaOS        │   │
│   │   (Windows + WSL)   │           │    (Linux Server)   │   │
│   │                     │           │                     │   │
│   │ ┌─────────────────┐ │           │ ┌─────────────────┐ │   │
│   │ │      WSL2       │ │           │ │      Docker     │ │   │
│   │ │                 │ │           │ │                 │ │   │
│   │ │   ┌─────────┐   │ │           │ │ ┌─────────────┐ │ │   │
│   │ │   │ Ollama  │   │ │           │ │ │ Open WebUI  │ │ │   │
│   │ │   │ :11434  │   │ │           │ │ │   :3000     │ │ │   │
│   │ │   └─────────┘   │ │           │ │ └─────────────┘ │ │   │
│   │ │                 │ │           │ │                 │ │   │
│   │ │ IP: 172.21.183.24 │           │ │                 │ │   │
│   │ └─────────────────┘ │           │ └─────────────────┘ │   │
│   │          │          │           │                     │   │
│   │     ┌────▼────┐     │           │                     │   │
│   │     │ Windows │     │           │                     │   │
│   │     │ Port    │     │           │                     │   │
│   │     │ Forward │     │           │                     │   │
│   │     │ :11434  │     │           │                     │   │
│   │     └─────────┘     │           │                     │   │
│   │                     │           │                     │   │
│   │ Local: 10.0.0.88    │           │ Local: 10.0.0.249   │   │
│   └─────────────────────┘           └─────────────────────┘   │
│                                                                 │
│                      Connection Flow:                           │
│   Open WebUI ─────────────────────────► Ollama                  │
│              http://10.0.0.88:11434/v1                     │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Prerequisites

Before we get started, you'll need:

-   A Windows machine with WSL2 installed.
-   A Linux server (I'm using CasaOS) with Docker installed.
-   Administrative access to the Windows machine.

## Step 1: Set Up Ollama on Windows WSL2

First, let's get Ollama running in your WSL2 instance.

### Install Ollama in WSL2

In your WSL2 terminal, run the following command:

```bash
curl -fsSL https://ollama.com/install.sh | sh
```

### Configure Ollama for Network Access

By default, Ollama only listens on `localhost`. We need to configure it to accept connections from other machines on the network.

```bash
# Set environment variable for all interfaces
export OLLAMA_HOST=0.0.0.0:11434

# Make it permanent
echo "export OLLAMA_HOST=0.0.0.0:11434" >> ~/.bashrc
source ~/.bashrc

# Start Ollama
ollama serve
```

### Download Some Models

Let's grab a few models to play with.

```bash
# Download popular models
ollama pull llama3.1:latest
ollama pull deepseek-r1:latest
ollama pull codellama:latest

# Verify installation
ollama list
```

## Step 2: Configure Windows Firewall and Port Forwarding

Now, we need to poke a hole in the Windows firewall and forward the Ollama port from your Windows host to your WSL2 instance.

### Create Firewall Rule

Open PowerShell as an Administrator and run this command:

```powershell
# Allow Ollama through Windows Firewall
New-NetFirewallRule -DisplayName "Ollama" -Direction Inbound -Protocol TCP -LocalPort 11434 -Action Allow
```

### Set Up Port Forwarding

Next, we'll forward port `11434` from your Windows host to your WSL2 instance.

```powershell
# Get WSL2 IP (note: this may change on reboot)
wsl hostname -I

# Set up port forwarding (replace with your WSL2 IP)
netsh interface portproxy add v4tov4 listenport=11434 listenaddress=0.0.0.0 connectport=11434 connectaddress=172.21.183.24

# Verify the rule was created
netsh interface portproxy show v4tov4
```

### Test the Setup

Let's make sure everything is working so far.

```bash
# Test from Windows
curl http://localhost:11434/api/tags

# Test from another machine on your local network
curl http://10.0.0.88:11434/api/tags
```

## Step 3: Deploy Open WebUI on CasaOS

Now, let's head over to your Linux server and get Open WebUI running in a Docker container.

### Create Docker Compose File

Create a `docker-compose.yml` file on your CasaOS server with the following content. Make sure to replace `your-secret-key-here` with a real secret.

```yaml
version: '3.8'

services:
  open-webui:
    image: ghcr.io/open-webui/open-webui:main
    container_name: open-webui
    ports:
      - "3000:8080"
    environment:
      - OLLAMA_BASE_URL=http://10.0.0.88:11434
      - WEBUI_SECRET_KEY=your-secret-key-here
    volumes:
      - open-webui:/app/backend/data
    restart: unless-stopped

volumes:
  open-webui:
```

### Deploy the Container

Now, let's deploy the container.

```bash
# Navigate to your compose file directory
cd /path/to/your/compose/file

# Deploy Open WebUI
docker compose up -d

# Check if it's running
docker compose ps
```

## Step 4: Configure Open WebUI

We're almost there! The last step is to configure Open WebUI to connect to our Ollama instance.

### Access the Web Interface

Navigate to `http://10.0.0.249:3000` (or your CasaOS IP) in your browser.

### Configure Ollama Connection

1.  **Create an account** on your first visit.
2.  Go to **Settings** → **Connections**.
3.  Set the **OpenAI API Configuration**:
    *   **Base URL**: `http://10.0.0.88:11434/v1`
    *   **API Key**: `ollama` (this can be anything, as Ollama doesn't require authentication by default).
4.  **Save** and **Test Connection**.

### Select Your Model

Your available models should now appear in the model dropdown. Select one and start chatting!

## Step 5: Verification and Testing

Let's run a few final tests to make sure everything is working as expected.

```bash
# Test Ollama API directly
curl http://10.0.0.88:11434/api/tags

# Test OpenAI-compatible endpoint
curl http://10.0.0.88:11434/v1/models

# Test from the CasaOS container
docker exec open-webui curl http://10.0.0.88:11434/v1/models
```

## Troubleshooting

If you run into any issues, here are a few things to check.

### Common Issues

*   **Connection Timeouts:**
    *   Verify your firewall rules are active.
    *   Check your port forwarding configuration.
    *   Ensure Ollama is bound to `0.0.0.0:11434`.
*   **Models Not Loading:**
    *   Confirm your models are installed with `ollama list`.
    *   Check for available disk space in WSL2.
*   **Performance Issues:**
    *   Monitor GPU/CPU usage during inference.
    *   Consider using faster quantization levels (e.g., `Q4_K_M` vs `Q4_0`).
    *   Ensure you have enough RAM for the model size.

### Useful Commands

```powershell
# Reset port forwarding
netsh interface portproxy reset

# Restart WSL2
wsl --shutdown

# Check WSL2 IP
wsl hostname -I

# View firewall rules
Get-NetFirewallRule -DisplayName "Ollama"
```

## Security Considerations

*   **No public exposure**: Your services remain on your private network.
*   **Firewall rules**: Only the necessary ports are opened.
*   **Container isolation**: Open WebUI runs in an isolated Docker container.

## Conclusion

This setup provides a robust and scalable AI infrastructure that separates the compute-heavy work (Ollama on Windows) from the user interface (Open WebUI on Linux). By keeping everything on your local network, you ensure that communication between the services is private and secure, all while maintaining flexibility and performance.

This configuration is particularly useful for:

-   Teams with mixed Windows/Linux environments.
-   Scenarios requiring GPU acceleration on a Windows machine.
-   Distributed AI workloads across multiple machines.
-   Development environments with container orchestration.

Happy hacking!
