---
layout: post
title: "When the Vibes Are Off: Spilling the Tea"
tags: ["Tea App", "Data Leak", "Privacy", "Tech News", "Security"]
categories: ["Technology", "Privacy", "Security"]
---
I need to get this off my chest. I have been thinking a lot about the recent Tea "hack" and the speculation that is vibe coded. I would like to share my hot takes:



1. This wasn't a "hack". Someone found a publicly accessible Firebase bucket and pulled down the data. I think we need to come up with a word for when someone doesn't do anything unintended, but still exfiltrates data - which leads me to my next point.



2. There is no evidence that it was vibe coded. None. The app was made over 2 years ago, before vibe coding really took off. The only reason folks want to believe it was vibe coded is because it is popular to conflate "vibe coded" with "bad."



News flash, vibe coding is just efficient copy pasting from stack overflow - a practice nearly every developer does. How many times do we see copy pasted reference code in production?



Additionally, the "exploit" wasn't even in the code. A human being setting up the Firebase bucket had to *manually* set it to public.



When we let the press run around with "X app was hacked because it was vibe coded", it is a red herring that actually harms security. It explicitly doesn't address how this data was exposed.



And frankly, this is not getting the attention it deserves. Everyone who read the headline of the Tea app should have immediately checked that all their datastores are set to private... but I bet absolutely no one did that.



The impact of this attack is completely underrated - not just government identification being leaked, but I saw that the location of an undisclosed military base with an F35...



We spend all our time convincing the world that finding the next Spectre/Meltdown is improve the world... but is it?



The industry needs to be focused on improving security, not just pointing and laughing at what we think are "dumb" mistakes.



/rant