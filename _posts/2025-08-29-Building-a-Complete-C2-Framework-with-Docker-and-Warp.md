---
layout: post
title: "Building a Complete C2 Framework with Docker and Warp: An Evening of Productive Automation"
tags: ["AdaptixC2", "Docker", "Warp", "Security Research", "C2 Framework", "Containerization", "Automation"]
categories: ["Security Research", "Docker", "Productivity"]
---

# Building a Complete C2 Framework with Docker and Warp: An Evening of Productive Automation

Sometimes the best technical sessions happen when you least expect them. What started as a simple request to "set up AdaptixC2 in Docker containers" turned into a comprehensive evening of system architecture, automation, and the kind of productive flow that makes you remember why you love technology in the first place. And at the center of it all was [Warp terminal](https://www.warp.dev/), proving once again why it's become an indispensable part of my development toolkit.

## The Challenge: From Zero to Production-Ready C2 Framework

The goal seemed straightforward: clone the [AdaptixC2 framework](https://github.com/Adaptix-Framework/AdaptixC2), containerize it with Docker, and create a testable environment. But as anyone who's worked with complex security tools knows, "straightforward" rarely stays that way for long.

AdaptixC2 is an extensible post-exploitation and adversarial emulation framework designed for penetration testers. The server is written in Golang, the GUI client in C++ Qt, and it includes multiple "extender" plugins for different communication protocols (HTTP, SMB, TCP, etc.). Getting all these components working together in a containerized environment while maintaining security best practices? That's where things get interesting.

## Warp: The Secret Weapon for Complex Multi-Container Projects

Here's where Warp really shined. Instead of juggling multiple terminal windows, reference documentation, and half-remembered Docker commands, Warp's AI agent became my collaborative partner in architecting this entire setup.

### The Magic of Contextual Intelligence

What impressed me most wasn't just Warp's ability to generate Docker commands (though that was impressive), but its understanding of the broader context. When I mentioned wanting to separate the server and client into different containers, Warp immediately suggested:

- Multi-stage Docker builds for optimization
- Proper security isolation between components
- Volume mounting strategies for persistent data
- Network configuration for container communication
- SSL certificate generation for secure communications

The AI didn't just give me commands—it gave me architecture advice that I would typically have to research and plan manually.

### Rapid Iteration and Problem Solving

Every complex Docker project has those moments where something doesn't work as expected. During this session, we hit a few snags:

**The SSL Certificate Challenge**: The original AdaptixC2 SSL generation script was interactive, which doesn't work in automated Docker builds. Instead of spending time debugging, I described the issue to Warp, and within seconds it provided a non-interactive OpenSSL command with proper certificate parameters.

**Port Configuration Complexity**: Getting the C2 server accessible with proper port mappings while maintaining security took some iteration. Warp helped me craft the exact Docker run commands with the right port forwards, volume mounts, and network settings.

**Build Dependencies**: The Golang server and C++ client had different build requirements. Warp guided me through creating separate, optimized Dockerfiles for each component.

## The Complete Solution: What We Built

By the end of the session, we had created a comprehensive, production-ready setup:

### 🐳 **Docker Architecture**
- **Multi-stage Server Container**: Golang build stage + minimal runtime image
- **Client Container with VNC**: Qt GUI accessible via web browser
- **Docker Compose Orchestration**: Complete multi-container setup
- **Persistent Data Management**: Proper volume mounting for databases and logs

### 🚀 **Automation Scripts**
- `start-adaptix.bat` - One-click server startup
- `stop-adaptix.bat` - Clean shutdown
- `build-server.bat` - Container rebuild automation  
- `test-server.ps1` - Comprehensive connectivity testing

### 📚 **Documentation Suite**
- Complete technical documentation
- Security warnings and best practices
- Step-by-step testing guides
- Troubleshooting resources

### 🔒 **Security Considerations**
- Comprehensive `.gitignore` to prevent secret uploads
- Self-signed SSL certificates for testing
- Container isolation and network security
- Clear documentation of default credentials

## The GitHub Publication: Securing Open Source

One of the most satisfying parts of the evening was preparing the entire setup for publication on GitHub. This involved careful security review to ensure no secrets or sensitive information would be uploaded.

Warp helped me create a comprehensive `.gitignore` file that excluded:
- Production SSL certificates and keys
- Sensitive database files  
- Runtime logs and temporary files
- Personal configuration data

We also created a detailed `SECURITY.md` file documenting default credentials, security best practices, and legal/ethical usage guidelines.

The result? A complete, secure repository at [github.com/maxrenke/maxrenke_adaptixc2_test](https://github.com/maxrenke/maxrenke_adaptixc2_test) that others can use for legitimate security research and education.

## The Power of AI-Assisted Development

This project perfectly demonstrates why Warp has become such a crucial part of my development workflow. It wasn't just about executing commands faster—it was about having an intelligent collaborator that could:

- **Understand Complex Requirements**: Multi-container architecture, security considerations, and operational needs
- **Provide Contextual Solutions**: Not just commands, but architectural patterns and best practices
- **Handle Edge Cases**: SSL certificates, port conflicts, build dependencies
- **Maintain Security Focus**: Proper secret handling, container isolation, documentation

## Technical Highlights

### Docker Multi-Stage Builds
```dockerfile
FROM golang:1.24.4-bookworm AS builder
# Build stage with all development dependencies

FROM debian:bookworm-slim AS runtime  
# Minimal runtime with only necessary components
```

### Automated SSL Certificate Generation
```bash
openssl req -x509 -nodes -newkey rsa:2048 \
  -keyout server.rsa.key -out server.rsa.crt -days 3650 \
  -subj "/C=US/ST=State/L=City/O=AdaptixC2/OU=Security/CN=adaptix-server"
```

### Comprehensive Testing Framework
```powershell
# Port connectivity testing
@(4321, 8080, 4444) | ForEach-Object { 
    Test-NetConnection -ComputerName localhost -Port $_ 
}
```

## The Results: Production-Ready in One Evening

What typically would have taken days of research, trial-and-error, and documentation became an evening of productive flow. The final deliverables included:

- ✅ **Fully functional AdaptixC2 server** in Docker
- ✅ **Complete automation scripts** for management
- ✅ **Comprehensive documentation** and security guidelines  
- ✅ **Published GitHub repository** ready for community use
- ✅ **Testing framework** for validation and troubleshooting

## Why This Matters for Security Research

Having a containerized, well-documented C2 framework setup has implications beyond just this project:

**Education**: Security professionals can quickly spin up isolated testing environments
**Research**: Consistent, reproducible environments for C2 framework analysis  
**Development**: Safe sandboxes for developing new C2 detection techniques
**Training**: Hands-on learning environments for red team exercises

## The Warp Advantage

This session reinforced why Warp has become indispensable for complex technical projects:

1. **Contextual Intelligence**: Understanding not just commands, but architecture
2. **Rapid Iteration**: Quick problem-solving and solution refinement  
3. **Best Practices**: Built-in knowledge of security and operational concerns
4. **Documentation**: Helping create comprehensive guides and explanations
5. **Flow State**: Maintaining focus on the big picture while handling details

## What's Next?

The published repository is just the beginning. The containerized setup provides a foundation for:

- Custom extender development
- Protocol analysis and research
- Detection rule development
- Security training and education

## Conclusion

Sometimes the most satisfying technical sessions are the ones where everything just clicks. With Warp as a collaborative partner, what could have been a frustrating evening of Docker debugging became a productive architecture session that delivered a complete, secure, production-ready system.

The combination of intelligent assistance, contextual understanding, and rapid iteration capabilities makes Warp more than just a terminal—it's a force multiplier for complex technical work.

If you're working on multi-container projects, security research, or any complex technical setup, I highly recommend giving Warp a try. And if you're interested in C2 framework research, check out the [complete setup on GitHub](https://github.com/maxrenke/maxrenke_adaptixc2_test).

---

**Repository**: [github.com/maxrenke/maxrenke_adaptixc2_test](https://github.com/maxrenke/maxrenke_adaptixc2_test)  
**Tools Used**: [Warp Terminal](https://www.warp.dev/), Docker, AdaptixC2, PowerShell  
**Topics**: Security Research, Containerization, Automation, AI-Assisted Development
