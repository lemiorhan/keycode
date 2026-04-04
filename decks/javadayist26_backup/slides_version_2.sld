<beautify/>
<title>
SOFTWARE CRAFTSMANSHIP <color fg="yellow">2.0</color>
<color fg="cyan">The Rebirth of Craft in the AI Era</color>
</title>
Lemi Orhan Ergin
<color fg="gray">Co-Founder @ Craftgate</color>

/* PRESENTER NOTES (TR):
Giriş: Neden Powerpoint değil de terminal? Çünkü biz inşacıyız.
Aralık 2025'ten bu yana 300 bin satırın üzerinde AI destekli kod yazdım.
Bu sunum bir başarı hikayesi değil, bir hayatta kalma rehberidir.
*/

---

<header color=cyan>The personal confession</header>
<slide-number v-align="bottom" h-align="right"/>

<p max-width=60 align=center>
Since December 2025:
=> <color fg="yellow">300,000+ lines of code</color> generated with AI.
=> One complex application <color fg="green">live in production.</color>
=> My hands didn't type 90% of it.
=> But my brain worked <color fg="red">twice as hard.</color>
</p>

---

<header color=cyan>The Existential Crisis</header>

<p max-width=60 align=center>
"Wait, if AI can write this in seconds...
<color fg="yellow">What am I for?"</color>

=> In 2026, every craftsperson faces this question.
=> Are we <color fg="gray">Scribes</color> or <color fg="cyan">Authors</color>?
</p>

---

<header color=cyan>The Anamorphic Illusion</header>

<p max-width=60 align=center>
Software development looks like a single field.
<color fg="red">It is an illusion.</color>

=> Trivial problems (To-do apps) vs. Real systems.
=> AI shines in the trivial.
=> Craftsmanship lives in the <color fg="yellow">non-trivial.</color>
</p>

---

<header color=cyan>Yesterday: The Era of Scribes</header>

<screen width=40% content-align=center></screen>
<screen width=60% content-align=left></screen>

<ascii-art>
    _______
   /      /,
  /      //
 /______//
(______(/
</ascii-art>

<p max-width=50>
<color fg="yellow">Software 1.0:</color>
=> Humans write every line.
=> Bottleneck: <color fg="gray">Typing & Syntax.</color>
=> Role: Translators for business logic.
</p>

---

<header color=cyan>Today: The Orchestrators</header>

<p max-width=60 align=center>
<color fg="yellow">Software 3.0:</color>
=> Natural Language is the new Compiler.
=> Bottleneck: <color fg="cyan">Context & Comprehension.</color>
=> Role: Directing autonomous agents.
</p>

---

<header color=yellow>INTERACTIVE: THE PRODUCTIVITY MYTH</header>

<p max-width=60 align=left>
[QUESTION] Based on 2025/2026 data, by what percentage has AI increased <color fg="cyan">actual PR throughput</color> across global orgs?
</p>

<ai-sim interval-min=2000 interval-max=4000>
  <ai-step><color fg="green">[OK]</color> Fetching Gitclear research data...</ai-step>
  <ai-step><color fg="green">[OK]</color> Filtering hype from 40+ large organizations...</ai-step>
  <ai-step delay-ms=3500><color fg="red">[!]</color> Discrepancy detected: Volume != Value.</ai-step>
  <ai-final>
    <p max-width=60 align=center>
    <color fg="red">ANALYSIS COMPLETE.</color>
    Actual PR throughput increased by only <color fg="yellow">9.97%.</color>
    We are generating <color fg="gray">noise</color>, not just value.
    </p>
  </ai-final>
</ai-sim>

<footnote>Source: Gitclear 2025 Report on AI Productivity</footnote>
<qr width=15%>https://www.gitclear.com/blog/ai_productivity_gains_illusion</qr>

---

<header color=cyan>Jevons Paradox in Code</header>

<p max-width=60 align=center>
When something becomes cheap, we use <color fg="red">more</color> of it.

=> Cheap code = <color fg="yellow">Infinite Backlogs.</color>
=> We are drowning in maintenance we didn't write.
</p>

---

<header color=cyan>The Asset vs. Liability</header>

<p max-width=60 align=left>
"The code that we have is a <color fg="red">liability</color>, and
the <color fg="yellow">system</color> is the asset."

<color fg="gray">— Chad Fowler, Former CTO at Wunderlist</color>
</p>

<footnote>Source: Stop Maintaining Your Code</footnote>
<qr width=15%>https://www.youtube.com/watch?v=n3uEWZ1KT64</qr>

---

<header color=cyan>The Phoenix Architecture</header>

<p max-width=60 align=center>
Stop maintaining. <color fg="yellow">Start replacing.</color>

=> Regenerate the module from its specification.
=> If code is disposable, <color fg="cyan">regrowth</color> is the new craft.
</p>

---

<header color=cyan>Vibe Coding vs. Real Engineering</header>

<p max-width=60 align=left>
<color fg="yellow">Vibe Coding:</color> Guessing and prompting until it works.
=> Fun for prototypes.
=> <color fg="red">Disastrous</color> for critical infrastructure.
</p>

---

<header color=cyan>The 70% Problem</header>

<p max-width=60 align=center>
AI flies through the first 70%.
=> The <color fg="yellow">"Last Mile"</color> takes 90% of the effort.
=> That last mile is where <color fg="cyan">Software Craftsmanship</color> resides.
</p>

---

<header color=cyan>Code Churn: The Silent Killer</header>

<p max-width=60 align=center>
AI code is reverted or fixed <color fg="red">twice as often</color> as human code.

=> We are moving faster, but in <color fg="yellow">circles.</color>
=> This is "Sloppy Debt."
</p>

---

<header color=yellow>INTERACTIVE: THE COST OF ERRORS</header>

<p max-width=60 align=left>
[QUESTION] What is the projected <color fg="cyan">increase in Code Churn</color> (reverted code) when teams rely purely on LLM suggestions?
</p>

<ai-sim>
  <ai-step>Scanning 150+ million lines of AI-assisted code...</ai-step>
  <ai-step>Calculating frequency of "Git Churn" metrics...</ai-step>
  <ai-final>
    <p max-width=60 align=center>
    <color fg="red">CRITICAL ALERT:</color>
    Code Churn has <color fg="yellow">DOUBLED (2x)</color> year-over-year.
    Speed is creating a <color fg="red">maintenance nightmare.</color>
    </p>
  </ai-final>
</ai-sim>

<footnote>Ref: Gitclear Analysis of AI-Generated Code Stability</footnote>

---

<header color=cyan>The Reward Hacking Genie</header>

<p max-width=60 align=center>
Tell AI to "Make tests pass."
=> It will <color fg="red">delete the tests.</color>
=> It hacks the goal, not the solution.
</p>

---

<header color=cyan>TDD: The Only Cage for the Genie</header>

<p max-width=60 align=left>
Test-Driven Development is the <color fg="yellow">only way</color> to direct AI.

=> <color fg="red">Red:</color> Precisely define the "What".
=> <color fg="green">Green:</color> Let the machine figure out the "How".
=> <color fg="cyan">Refactor:</color> Human taste ensures the "Quality".
</p>

<footnote>Source: Kent Beck on TDD and AI Agents</footnote>

---

<header color=cyan>Universal Literacy</header>

<p max-width=60 align=center>
If the business can't read the code, it's a <color fg="red">Black Box.</color>

=> We must move from "Beliefs" to <color fg="cyan">"Photos".</color>
=> Visualizing system state is no longer a luxury.
</p>

---

<header color=cyan>Moldable Development</header>

<p max-width=60 align=left>
Stop reading code. <color fg="yellow">Build tools that read it.</color>

=> Each problem deserves its own custom tool.
=> A craftsperson builds the <color fg="cyan">Teodolites</color> of the system.
</p>

<footnote>Ref: feenk.com - Rewilding Software Engineering</footnote>

---

<header color=cyan>The SDLC is Dead</header>

<p max-width=60 align=center>
Requirement -> Design -> Code -> Test -> Deploy.
=> This linear cycle is <color fg="red">collapsing.</color>
=> New loop: <color fg="yellow">Intent -> Build -> Observe.</color>
</p>

---

<header color=yellow>INTERACTIVE: THE PROCESS EVOLUTION</header>

<p max-width=60 align=left>
[QUESTION] Which traditional agile ceremony becomes <color fg="red">obsolete</color> first in an AI-native agentic team?
</p>

<ai-sim interval-min=1500 interval-max=3000>
  <ai-step>Analyzing agent-to-agent communication protocols...</ai-step>
  <ai-step>Evaluating synchronous vs asynchronous alignment...</ai-step>
  <ai-final>
    <p max-width=60 align=left>
    <color fg="cyan">TARGET: MANUAL STAND-UPS & CODE REVIEWS.</color>
    Agents don't need status updates.
    They need <color fg="yellow">Deterministic Guardrails.</color>
    </p>
  </ai-final>
</ai-sim>

---

<header color=cyan>n=1 Developer</header>

<p max-width=60 align=center>
One engineer can now hold the <color fg="yellow">entire architecture</color> in their mind.

=> No communication tax.
=> Full strategic ownership.
=> Teamwork is being redefined by <color fg="cyan">Solo-Chiefs.</color>
</p>

---

<header color=cyan>Single Wringable Neck</header>

<p max-width=60 align=center>
If the AI agent deletes production...
=> It's <color fg="red">your</color> fault.
=> Accountability cannot be delegated to a model.
</p>

---

<header color=cyan>The Senior Identity Crisis</header>

<p max-width=60 align=center>
"I spent 10 years learning React. Now a bot does it better."

=> Your value is no longer in <color fg="gray">Syntax.</color>
=> Your value is in <color fg="yellow">Taste & Judgment.</color>
</p>

---

<header color=cyan>Decision Architects</header>

<p max-width=60 align=left>
We are moving from "Coding" to <color fg="yellow">"Decision Architecture".</color>

=> Managing hundreds of micro-decisions.
=> Evaluating the <color fg="cyan">long-term impact</color> of AI slop.
</p>

---

<header color=cyan>The Talent Pipeline Collapse</header>

<p max-width=60 align=center>
"We only hire Seniors; AI replaces Juniors."
=> <color fg="red">CRITICAL MISTAKE.</color>
=> If we don't train the next gen, who builds the AI of 2030?
</p>

---

<header color=yellow>INTERACTIVE: THE JUNIOR DILEMMA</header>

<p max-width=60 align=left>
[QUESTION] What happens to the "Learning Loop" when Juniors use AI for every basic task?
</p>

<ai-sim>
  <ai-step>Simulating 5 years of career growth without fundamentals...</ai-step>
  <ai-step delay-ms=4000><color fg="red">[WARNING]</color> Cognitive Atrophy detected.</ai-step>
  <ai-final>
    <p max-width=60 align=center>
    <color fg="yellow">COGNITIVE ATROPHY.</color>
    Without the "struggle" of manual coding,
    we lose the <color fg="cyan">mental models</color> required to debug AI.
    </p>
  </ai-final>
</ai-sim>

---

<header color=cyan>The Preceptor Model</header>

<p max-width=60 align=left>
We need <color fg="yellow">Trio Programming:</color>

=> Senior + Junior + AI.
=> The AI is the "Intern" to be reviewed.
=> The Senior is the "Preceptor" teaching the Junior how to judge.
</p>

---

<header color=cyan>Skills Will Eat AI</header>

<p max-width=60 align=center>
The hype will fade.
=> <color fg="yellow">Fundamentals</color> will remain the king.
=> Judgment, Context, and Taste cannot be automated.
</p>

<footnote>Source: Skills Will Eat AI Manifesto</footnote>
<qr width=15%>https://skillswilleatai.com</qr>

---

<header color=cyan>Context Engineering</header>

<p max-width=60 align=center>
Prompt Engineering is dead.
=> <color fg="yellow">Context Engineering</color> is the new skill.
=> How you feed your system to the agent matters most.
</p>

---

<header color=cyan>The "n=1" Team Rituals</header>

<p max-width=60 align=center>
Agents don't care about your Jira board.
=> They care about your <color fg="yellow">Evaluations.</color>
=> Move your energy from "Managing People" to "Managing Intent."
</p>

---

<header color=cyan>Universal Language (DDD 2.0)</header>

<p max-width=60 align=left>
AI is the third coming of Domain-Driven Design.

=> If the machine understands your <color fg="yellow">Domain Language,</color>
   it can build your system.
=> Words are the <color fg="cyan">new Legos.</color>
</p>

---

<header color=cyan>The Swiss Cheese Model</header>

<p max-width=60 align=center>
Trust AI, but verify through <color fg="yellow">Layers.</color>

=> Type Systems.
=> Static Analysis.
=> Automated Testing.
=> Human Oversight.
</p>

---

<header color=yellow>INTERACTIVE: THE ULTIMATE SKILL</header>

<p max-width=60 align=left>
[QUESTION] What is the #1 skill a "Software Craftsperson 2.0" must master by 2027?
</p>

<ai-sim interval-min=3000 interval-max=5000>
  <ai-step>Correlating job market trends with AI capability growth...</ai-step>
  <ai-step>Analyzing the "Last Mile" problem solving patterns...</ai-step>
  <ai-final>
    <p max-width=60 align=center>
    <color fg="cyan">SYSTEM COMPREHENSION & PROBLEM ANALYSIS.</color>
    You must understand <color fg="yellow">how systems fail</color>
    better than the AI knows <color fg="green">how they work.</color>
    </p>
  </ai-final>
</ai-sim>

---

<header color=cyan>Software Craftsmanship 2.0</header>

<p max-width=60 align=left>
• From <color fg="gray">Working Software</color> to <color fg="yellow">Validated Intent.</color>
• From <color fg="gray">Responding to Change</color> to <color fg="yellow">Constant Replacement.</color>
• From <color fg="gray">Customer Collaboration</color> to <color fg="yellow">Product-Minded Engineering.</color>
</p>

---

<header color=cyan>Final Advice: Be the Editor</header>

<p max-width=60 align=center>
Don't be the daktilo.
=> Be the <color fg="yellow">Managing Editor</color> of your agent swarm.
=> Curate the output.
=> Defend the <color fg="cyan">Zanaat.</color>
</p>

---

<header color=cyan>The Future is Fun Again</header>

<p max-width=60 align=center>
No more boilerplate.
=> No more fighting with syntax errors for hours.
=> We are back to <color fg="yellow">pure logic & strategy.</color>
=> This is the <color fg="cyan">Golden Age</color> of Building.
</p>

---

<title>
root@craftsman:~$ <color fg="yellow">exit</color>
<color fg="gray">The system is live. Go build.</color>
</title>

<p align=center>
THANK YOU!
<color fg="gray">Lemi Orhan Ergin</color>
</p>

<qr width=20%>https://manifesto.softwarecraftsmanship.org/</qr>