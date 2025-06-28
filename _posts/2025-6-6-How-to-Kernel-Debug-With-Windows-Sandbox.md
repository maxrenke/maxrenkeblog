---
layout: post
title: "How to Kernel Debug With Windows Sandbox"
---

Windows Sandbox is a great tool if you want to play around with a lightweight VM with minimal setup – but did you know you can also use it to do kernel debugging?  
<br/>Sandbox is more powerful than you might think if you utilize the command line utility cmdiag. This utility allows you to set up a number of useful configurations and options when starting the sandbox. However, today we will be focused on setting up debugging. Using a sample kernel driver from Microsoft.

You can [install](https://learn.microsoft.com/en-us/windows/security/application-security/application-isolation/windows-sandbox/windows-sandbox-install#installation) Windows Sandbox via **'Turn Windows Features on or off’** or:

```Enable-WindowsOptionalFeature -FeatureName "Containers-DisposableClientVM" -All -Online```

You can [install](https://learn.microsoft.com/en-us/windows-hardware/drivers/debugger/) WinDBG via direct download, the MS store, or winget:

```winget install Microsoft.WinDbg```

To set up Windows Sandbox for debugging, we need to follow the [undocumented](https://stackoverflow.com/questions/62827157/can-the-windows-sandbox-feature-be-used-for-driver-testing) feature of cmdiag:

```cmdiag debug -on -net -hostip 10.0.0.88``` <br/>
```Debugging successfully enabled. Connection string: -k net:port=50000,key=cl.ea.rt.ext -v```

Note: This is supposed to work with localhost, but I needed to use my machines local IP to work.

And to set up the debugger, we’re just going to start it from the command line. The connection string should be all you need to set up your debugger the way you like.

```windbg.exe -k net:port=50000,key=cl.ea.rt.ext -v```

Now, simply start Windows Sandbox!

Wohoo! The debugger is hooked in.  

[![Debugger hooked in!](/assets/images/2025-6-6-1.png)](/assets/images/2025-6-6-1.png)

Now, you can just copy the files you want into the Sandbox, and start testing! In my case, I used the [Windows Kernel Driver sample collection](https://learn.microsoft.com/en-us/windows-hardware/drivers/kernel/sample-kernel-mode-drivers), which has a user mode application nonpnpapp.exe and a driver nonpnp.sys. Fortunately, the application loads the driver itself, so no other deployment is necessary

[![Copy files](/assets/images/2025-6-6-2.png)](/assets/images/2025-6-6-2.png)

Now, some of this may seem tedious, having to manually copy files over – but I have good news! This is all scriptable, because you can just use cmdiag to copy files into the VM _and_ execute commands within the VM. Therefore, one could create a script to do all this at once – set up debugging, start windbg, start the sandbox, copy files into the sandbox, and execute the script(s) copied over to the VM.

Example script, do not use:

[![Script](/assets/images/2025-6-6-4.png)](/assets/images/2025-6-6-4.png)

**Warning**: Windows Sandbox shares files with the host, so when you break into the sandbox or the Sandbox crashes, you may notice some peculiar behavior on the host. I have not done much to understand why this is the case, so **try this at your own ris**k!

I want to be able to test vulnerable kernel drivers and what better way to test this end to end than to create my own driver with a heap overflow! I will have another writeup in the future on creating a kernel driver, deploying it, and debugging it.

[![Heap overflow](/assets/images/2025-6-6-5.png)](/assets/images/2025-6-6-5.png)

For now, behold a glorious kernel crash in Windows Sandbox, caught by WinDBG!  

[![Crash!](/assets/images/2025-6-6-3.png)](/assets/images/2025-6-6-3.png)

Next steps are to play around more with kernel debugging, making my own example. Ultimately I want to make a simplified driver that I can interact with and ultimately point a fuzzer at. I will intentionally implement vulnerabilities in this example to then prove to myself that I can debug them.
