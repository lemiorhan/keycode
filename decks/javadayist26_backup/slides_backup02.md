<beautify/>
<title> THE REBIRTH OF
<color fg="yellow">SOFTWARE CRAFTSMANSHIP</color>
IN AI ERA </title> 
Lemi Orhan Ergin
<color fg="gray">Co-Founder @ Craftgate</color> 

--- 
// this is a comment

<header color=cyan>The Inevitable Shift</header>

<p max-width=80 align=center>
Humans are still the bottleneck, but not for long. 
AI-generated code will <color fg="yellow">reach production without human touch.</color>

The real challenge is building systems where that becomes safe.
</p>

---

<header color=cyan>Code Is Not the Product</header>

<p max-width=72 align=center>
Code is not the thing we are trying to build. 
It is only <color fg="yellow">the current implementation</color> of the thing 
we actually care about.
</p>

---

<header color=cyan>The Real Asset</header>

<p max-width=72 align=left>
The code that we have is a liability, and
<color fg="yellow">the system is the asset</color> that we’re building.

<color fg="gray">— Chad Fowler, former CTO at Wunderlist</color>
</p>

<qr colors=white-on-transparent width=20%>https://www.youtube.com/watch?v=n3uEWZ1KT64</qr>

---

<header color=cyan>Replaceability by Design</header>
<p max-width=72 align=center>Software will be designed to be replaced, not maintained. The goal is not to preserve every implementation, but to preserve the system while continuously replacing its parts.</p>

---

<header color=cyan>Phoenix Architecture</header>
<p max-width=72 align=center>If we cannot understand the system, we cannot change it. That only works when each unit is small, bounded, and easy to replace, while the system still keeps a clear shape.</p>

---

<header color=cyan>Write-Only Code</header>
<p max-width=72 align=center>Phoenix Architecture pushes toward write-only code: code that exists to serve the system, not to be admired or preserved. Every part can change without replacing the system as a whole.</p>

---

<header color=cyan>Stability Through Selective Change</header>
<p max-width=72 align=center>Iterate aggressively at first, then lock what must remain stable. Move fast where change is useful, and slow down where continuity matters.</p>

---

<header color=cyan>Lock</header>
<p max-width=72 align=center>Lock means: no more improvisation here. This decision must be preserved. Parts of the spec can be locked through tests so the system evolves without drifting.</p>

---

<header color=cyan>The Real Problem</header>
<p max-width=72 align=center>In AI-assisted development, the hard problem is not just generating code. The real problem is preserving who made which decision, and why.</p>

---

<header color=cyan>Human Intent Must Stay Visible</header>
<p max-width=72 align=center>Human decisions should carry more authority than agent-made decisions. To make that possible, raw human intent must be broken into smaller, structured, traceable units.</p>

---

<header color=cyan>Clauses</header>
<p max-width=72 align=center>Chad Fowler’s answer is clauses: small, structured units of intent. Instead of vague requests, the system works with decisions that can be tracked, tested, and preserved.</p>

---

<header color=cyan>Canonicalizing Intent</header>
<p max-width=72 align=center>Canonicalizing intent means turning human intent into something clearer, stricter, and more traceable. “Make this screen feel simpler” becomes explicit design constraints the system can preserve and regenerate.</p>

---

<header color=cyan>The New Build Chain</header>
<p max-width=72 align=center>The old chain was source to compile to an artifact. The new chain becomes intent to clause to spec, test, and context to code and artifact.</p>

---

<header color=cyan>Provenance</header>
<p max-width=72 align=center>Provenance is the decision genealogy of the system. It tells you what came from whom, why it exists, and what must survive regeneration.</p>

---

<header color=cyan>Why Provenance Matters</header>
<p max-width=72 align=center>When regenerating a system, provenance tells you what to preserve. When deleting output, it tells you whether you are removing something important or just agent-generated noise.</p>

---

<header color=cyan>Shadow Specs</header>
<p max-width=72 align=center>A system is shaped not only by what you explicitly said, but also by what the model decided on your behalf. These unspoken decisions are shadow specs.</p>

---

<header color=cyan>Shadow Specs Are Real</header>
<p max-width=72 align=center>Shadow specs influence behavior, structure, and user experience even when no one formally wrote them down. They are not theoretical; they are already part of today’s reality.</p>

---

<header color=cyan>More Than Code Generation</header>
<p max-width=72 align=center>Regenerative software needs more than code generation. It also needs lock, stability, authorship, provenance, and visibility into shadow specs.</p>

---

<header color=cyan>What Makes Regenerative Software Possible</header>
<p max-width=72 align=center>Regenerative software becomes possible when intent can be traced into code and human decisions can be distinguished from agent decisions. The system must remember its decision history, not just its latest implementation.</p>

---

<header color=cyan>The New Center of Gravity</header>
<p max-width=72 align=center>The center of gravity in software is shifting away from code alone. It is moving toward intent, decision-making, constraints, evaluations, and regenerable structure.</p>

---

<header color=cyan>Shape Matters More Than Language</header>
<p max-width=72 align=center>What matters now is not just the programming language. What matters is the shape of the system: how parts interact, how intent is tracked, and how change is controlled.</p>

---

<header color=cyan>Spec vs. Judgment</header>
<p max-width=72 align=center>The future may depend less on perfect specs and more on agents that make good decisions. A strong developer is not a spec replay machine; a strong developer is a decision-maker.</p>

---

<header color=cyan>Rich Context Beats Rigid Specs</header>
<p max-width=72 align=center>The goal is not only to write specs, but to build enough context for correct trade-offs. A good agent is one that makes the right decisions inside that context.</p>

---

<header color=cyan>Context as System Memory</header>
<p max-width=72 align=center>The future may require more than specification. It may require a rich contextual layer that captures the system’s values, goals, constraints, and priorities.</p>

---

<header color=cyan>Personalized Software</header>
<p max-width=72 align=center>The next big opportunity may not be replacing every product from scratch. It may be adapting and extending the tools we already like.</p>

---

<header color=cyan>Data Becomes the Durable Core</header>
<p max-width=72 align=center>If one durable data model can support many interfaces, the essence of software shifts toward the data. Interfaces become easier to replace, personalize, and extend.</p>

---

<header color=cyan>Shared Data Models</header>
<p max-width=72 align=center>Shared data models could let new AI-generated applications plug into existing systems instead of rebuilding them from scratch. That opens the door to personalization without fragmentation.</p>

---

<header color=cyan>What Actually Persists</header>
<p max-width=72 align=center>Code may change, but system truths must remain. When an order is placed, inventory must update correctly regardless of how the code was regenerated.</p>

---

<header color=cyan>Failure Is Normal</header>
<p max-width=72 align=center>Failures are inevitable. The goal is not to prevent every failure, but to detect, understand, and recover from them quickly.</p>

---

<header color=cyan>The Durable Layer</header>
<p max-width=72 align=center>The lasting asset is no longer just code. It is the layer of correctness, performance expectations, observability, tests, and invariants around the code.</p>

---

<header color=cyan>Architecture Must Outlast the Model</header>
<p max-width=72 align=center>Build systems that produce trustworthy results no matter which model is plugged in. The architecture should still work when the model is weak and still improve when the model is strong.</p>

---

<header color=cyan>Agent-Proof Architecture</header>
<p max-width=72 align=center>The deeper goal is not model optimization alone. It is to design an architecture that remains reliable even as agents change underneath it.</p>

---

<header color=cyan>The Human Role Moves Up the Stack</header>
<p max-width=72 align=center>As agents write more software, humans move up one layer. Their role becomes shaping the context that guides the agents.</p>

---

<header color=cyan>The New Human Responsibility</header>
<p max-width=72 align=center>The human increasingly defines intent, values, priorities, constraints, operating principles, and the agent’s operator manual. That becomes the new high-leverage work.</p>

---

<header color=cyan>“Learn My Codebase” Is Not Enough</header>
<p max-width=72 align=center>A codebase is not a clean expression of intent. It often contains historical residue, bad habits, and outdated decisions you do not want copied forward.</p>

---

<header color=cyan>Context Must Be Designed</header>
<p max-width=72 align=center>Context cannot remain a passive snapshot extracted from history. It has to be actively developed, curated, and shaped.</p>

---

<header color=cyan>The Adoption Reality</header>
<p max-width=72 align=center>The real world is full of legacy systems. That is why adoption will be fast in greenfield environments and slow in established institutions.</p>

---

<header color=cyan>The Next Phase of Work</header>
<p max-width=72 align=center>The next phase will focus on capturing intent, separating spec from intent, locating where intent lives, mining it from real artifacts, and reconstructing legacy system logic.</p>

---

<header color=cyan>Strangler Fig Strategy</header>
<p max-width=72 align=center>Legacy systems will not be replaced in one dramatic rewrite. They will be surrounded, understood, and replaced piece by piece over time.</p>


---

<ascii-art>
 /\_/\\\\ 
( o.o ) 
 > ^ <
</ascii-art>

<p max-width=80 align=center>
slides of my talks 
<color fg="yellow">speakerdeck.com/lemiorhan</color>
</p>

<qr colors=white-on-transparent width=20%>https://speakerdeck.com/lemiorhan/</qr>

