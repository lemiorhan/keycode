<beautify/>
<title> THE REBIRTH OF
<color fg="yellow">SOFTWARE CRAFTSMANSHIP</color>
IN AI ERA </title> 
Lemi Orhan Ergin
<color fg="gray">Co-Founder @ Craftgate</color> 

---

<p max-width=72 align=left>
At this step: Human is the bottleneck, it will soon be eliminated
AI-generated code will be deployed to production without human touch, that is inevitable
The challenge is to build systems where this is safe enough to do

the code is not actually the thing we’re trying to build. It’s just the implementation of the thing we’re trying to build.

“The code that we have is a liability, and the system is the asset that we’re building.”
— Chad Fowler, Phoenix Architecture

Software will be designed to be replaced rather than maintained

Phoenix Architecture - Chat Fowler
* Write-only code
* if we cannot understand the system, we cannot change it
* the unit is small and bounded enough that you can trivially understand what it’s supposed to do
* the entire architecture is about constantly replacing every piece of the system without replacing the system as a whole.
* radical microservices mindset: components can be implemented in any language or framework, but the system still has a clear shape.

iterate heavily at first, then gradually lock down the layers that should remain stable, and move faster only where change makes sense.
This is the purpose of lock: you can lock parts of the spec through tests.

In AI-assisted software development, the hard problem is not just producing code. The real problem is not losing track of which decision was made by whom, and why.

Lock: No more free improvisation here. This decision must be preserved.
Human decisions should be treated as more authoritative than agent-made decisions.

break raw human intent into smaller, more structured units called clauses - Chat Fowler

Canonicalizing intent:
Converting what a human said into a clearer, more standard, more traceable form.
Make this screen feel simpler -> Primary action visible above the fold, Maximum three major actions, Secondary controls collapsed

from: source → compile → artifact
to: intent → clause → spec / test / context → code / artifact

Provenance: the decision genealogy of the system
When you regenerate a part of the system, you need to know what must be preserved.
If I delete this, will I break something important, or is this just a byproduct the agent created?

Shadow specs:
It is also made of the things you never said, but the model decided on your behalf.
They shape behavior, structure, and product experience.

Regenerative software requires more than code generation
To build software with AI, generating code is not enough. You also need to know:
* Lock: which decisions must remain fixed
* Stabiity: which things must not drift randomly
* authorship / provenance: which decisions were made by humans and which were invented by agents,
* shadow specs: and which system decisions were never explicitly written down but now exist anyway.
</p>

If we can connect intent to code in a traceable way, and if we can distinguish human decisions from agent decisions, then regenerative software becomes possible.

In AI-generated systems, what matters more and more is not just the code itself, but the family tree of decisions behind it.

The center of gravity in software is shifting
It is no longer just code. It is increasingly about:
* intent,
* decision-making,
* constraints,
* evaluations,
* regenerable structure
That is why the shape of the system matters more than the implementation language.


What matters more — a perfect spec, or an agent that can make good decisions
A strong developer is not a machine that replays formal specs. A strong developer is a decision-maker.
not just writing specs, but building systems with enough context to make correct trade-offs.
A good agent is one that can make the right decisions inside that context.
The future may require not just a specification, but a rich contextual layer that represents the system’s values, constraints, and goals.

The next big opportunity may not be replacing every product from scratch. It may be customizing the tools we already like.
If the same durable data model can support multiple interfaces, then the essence of software moves into the data, while interfaces become more replaceable and more personal.
Shared data models could allow new AI-generated apps to plug into existing systems rather than rebuilding them from scratch.

Code may change. But truths like “When an order is placed, inventory must be updated in this way” should persist.

Failures are ineviable
Do not obsess only over preventing all failures. Instead, optimize for detecting and resolving failures quickly.
the lasting asset is no longer the code itself, but the truth conditions around it: correctness, performance expectations, observability, and tests.

build a system that produces trustworthy results no matter what kind of model is plugged in
a system that still works if the model is weak, and still benefits if the model is brilliant
design an architecture that yields reliable outcomes even as agents change underneath it.

human role moves up one level: building the context that guides the agents
The human is no longer only the person who writes code. The human increasingly defines:
* intent,
* values,
* priorities,
* constraints,
* operating principles,
* the agent’s operator manual.

“Learn my codebase” is not enough.
the codebase itself often contains historical residue, bad habits, and outdated decisions.
context cannot remain a passive snapshot extracted from history. It must become something actively developed, curated, and shaped.

the real world is full of legacy systems:
The real work over the next phase will likely include:
* capturing intent,
* separating spec from intent,
* identifying where intent comes from,
* mining intent from email, source control, and project systems,
* reconstructing the intent behind legacy systems,
* and then gradually peeling those systems apart.
That is where the strangler fig pattern becomes relevant: not replacing an old system in one dramatic move, but surrounding it and replacing it piece by piece over time.



---

Questions?
