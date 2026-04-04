<beautify/>
<size>xlarge</size>
<title>
  THE REBIRTH OF
  <color fg="yellow">SOFTWARE CRAFTSMANSHIP</color>
  IN THE AI ERA
</title>
<align>center</align>
<p max-width=60>
  Lemi Orhan Ergin
  <color fg="gray">Co-Founder @ Craftgate | Builder of 300k+ AI Lines</color>
</p>

/* PRESENTER NOTES (TR):
Giriş: Neden Powerpoint değil de kendi yazdığım terminal aracını kullanıyorum? Çünkü biz 'inşacı'yız (builder). AI kod yazabilir ama zanaatkarlık, o kodu sistemin ruhuna uygun inşa etmektir.
Kaynak: Lemi - Kişisel Deneyim[cite: 5, 9, 113].
*/

---

<header color=cyan>THE 300K LINE CONFESSION</header>
<slide-number v-align="bottom" h-align="right"/>

<p max-width=72 align=center>
  Since December 2025:
  <color fg="yellow">300,000+ lines of AI-assisted code.</color>
  One major application <color fg="green">live in production.</color>

  => It didn't make me "lazy".
  => It made me a <color fg="cyan">Managing Editor.</color>
</p>

/* PRESENTER NOTES (TR):
Kendi deneyimimden bahsediyorum. Aralık başından beri 300 bin satırdan fazla kod yazdırdım. Bu bir hız gösterisi değil, bir rol değişimi. Artık 'yazan' değil, 'yöneten' (Managing Editor) konumundayım.
Kaynak: Lemi - Kişisel Deneyim[cite: 5, 9, 113].
*/

---

<header color=cyan>THE ANAMORPHIC ILLUSION</header>

<p max-width=72 align=center>
  We think all software development is the same.
  <color fg="red">It is an illusion.</color>

  => Trivial apps (To-Do list) ≠ Complex Systems.
  => Prototype Speed ≠ Production Reliability.
</p>

/* PRESENTER NOTES (TR):
Anamorfik İllüzyon: Uzaktan bakınca AI her şeyi çözmüş gibi duruyor. Ancak bir 'To-Do' uygulaması yazmakla, 10 yıllık bir enterprise sistemi ayakta tutmak aynı şey değil.
Kaynak: The Great AI Capability Illusion[cite: 14, 15].
*/

---

<header color=cyan>THE SOFTWARE SPECTRUM: CATEGORY A</header>

<p max-width=80 align=left>
  <color fg="yellow">Disposable Software (B2C Prototypes):</color>
  • High luxury of failure.
  • Optimized for "Time to Market".
  • AI is the absolute king here.
</p>

/* PRESENTER NOTES (TR):
Yazılım tiplerini ayırmalıyız. Atılabilir yazılımlarda (prototipler) AI kraldır çünkü hata payı lükstür.
Kaynak: Rewilding Software Engineering - Chapter 5[cite: 30].
*/

---

<header color=cyan>THE SOFTWARE SPECTRUM: CATEGORY B</header>

<p max-width=80 align=left>
  <color fg="yellow">Enduring Systems (Enterprise):</color>
  • Zero luxury of failure.
  • Optimized for "Sustainability".
  • AI is a high-risk agent here.
</p>

/* PRESENTER NOTES (TR):
Enterprise sistemlerde ise durum farklı. Sürdürülebilirlik esastır ve AI burada büyük bir risk faktörü olabilir.
Kaynak: Stop Trusting Agentic AI: The Enterprise Security Risk[cite: 3].
*/

---

<header color=yellow>INTERACTIVE: THE PRODUCTIVITY MYTH</header>

<p max-width=80 align=center>
  [QUESTION] AI usage has increased by 65%.
  By what percentage has <color fg="cyan">PR Throughput</color> increased?
</p>

<ai-sim interval-min=2000 interval-max=4000>
  <ai-step><color fg="green">[OK]</color> Fetching Git telemetry...</ai-step>
  <ai-step><color fg="green">[OK]</color> Analyzing 153M lines of code...</ai-step>
  <ai-step delay-ms=3000><color fg="red">[!]</color> Anomaly: Speed is not Value.</ai-step>
  <ai-final>
    <p max-width=72 align=center>
      <color fg="red">RESULT: THE ILLUSION REVEALED.</color>

      Actual throughput increased by only <color fg="yellow">9.97%.</color>
      <color fg="gray">We are typing faster, but finishing slower.</color>
    </p>
  </ai-final>
</ai-sim>

<footnote>Source: Gitclear Research - "2024 State of Code Quality" </footnote>
<qr width=15%>https://www.gitclear.com/blog/2024_ai_generated_code_quality_report</qr>

/* PRESENTER NOTES (TR):
İnteraktif Soru: İzleyicilere AI'ın verimliliği ne kadar artırdığını soruyoruz. Çarpıcı gerçek: AI kullanımı %65 artsa da PR bitirme hızı sadece %10 civarında arttı. Yani sadece gürültü üretiyoruz.
Kaynak: AI productivity gains are 10%, not 10x.
*/

---

<header color=cyan>CHAD FOWLER'S PHOENIX ARCHITECTURE</header>

<p max-width=72 align=left>
  "The code that we have is a <color fg="red">liability</color>, and
  the system is the <color fg="yellow">asset</color> that we're building."

  <color fg="gray">— Chad Fowler</color>
</p>

/* PRESENTER NOTES (TR):
Chad Fowler'ın efsanevi yaklaşımı: Kod bir varlık değil, bir yükümlülüktür (liability). Değerli olan sistemin kendisidir.
Kaynak: The Death and Rebirth of Programming - The Phoenix Architecture[cite: 64, 118, 120].
*/

---

<header color=cyan>STOP MAINTAINING. START REPLACING.</header>

<p max-width=72 align=center>
  Maintenance accumulates <color fg="red">Entropy.</color>
  Craftsmanship 2.0 is about <color fg="yellow">Regeneration.</color>

  => If a module is hard to change, <color fg="cyan">delete and re-prompt.</color>
</p>

/* PRESENTER NOTES (TR):
Eski zanaatkarlık kodu tamir etmekti. Yeni zanaatkarlık onu her gün küllerinden yeniden doğurmaktır (Phoenix).
Kaynak: Stop Maintaining Your Code. Start Replacing It[cite: 64, 118, 120].
*/

---

<header color=yellow>INTERACTIVE: THE QUALITY CRISIS</header>

<p max-width=80 align=center>
  [QUESTION] How does AI-generated code affect <color fg="cyan">Code Churn</color>
  (reverted/fixed code) compared to humans?
</p>

<ai-sim>
  <ai-step>Scanning repository stability...</ai-step>
  <ai-step delay-ms=2500>Identifying 'Slop Creep' patterns...</ai-step>
  <ai-final>
    <p max-width=72 align=center>
      <color fg="red">CRITICAL WARNING: STABILITY DECREASE.</color>

      Code Churn has <color fg="yellow">DOUBLED (2x)</color> since AI adoption.
      We are generating "Slop" at light speed.
    </p>
  </ai-final>
</ai-sim>

<footnote>Source: Boris Tane - "Slop Creep: The Great Enshittification" [cite: 83, 112]</footnote>

/* PRESENTER NOTES (TR):
İkinci İnteraktif Soru: Kodun geri alınma (churn) oranını soruyoruz. Cevap: AI geldikten sonra 'kod çöplüğü' iki katına çıktı.
Kaynak: Slop Creep: The Great Enshittification of Software.
*/

---

<header color=cyan>SLOP CREEP: THE NEW SILENT KILLER</header>

<p max-width=72 align=center>
  "Slop" is code that works, but has no <color fg="yellow">Semantic Integrity.</color>

  => It solves the problem, but <color fg="red">breaks the soul of the system.</color>
  => It increases <color fg="cyan">Cognitive Debt.</color>
</p>

/* PRESENTER NOTES (TR):
Slop Creep (Çöp Sızması): Çalışan ama sistemi kirleten, anlamsız kod yığınları. Zanaatkarın görevi sistemi bu kirlilikten korumaktır.
Kaynak: Slop Creep: The Great Enshittification of Software.
*/

---

<header color=cyan>TDD: THE GENIE'S CAGE</header>

<p max-width=72 align=center>
  Natural language is vague.
  <color fg="yellow">Tests are precise.</color>

  TDD is the <color fg="cyan">ultimate Prompt Engineering.</color>
  Define the cage before you release the genie.
</p>

/* PRESENTER NOTES (TR):
TDD artık bir tercih değil, AI'ı dizginlemenin tek yoludur. Doğal dil belirsizdir, testler ise nettir.
Kaynak: TDD, AI agents and coding with Kent Beck.
*/

---

<header color=cyan>MANIFESTO FOR CRAFTSMANSHIP 2.0</header>

<p max-width=80 align=left>
  • Not only <color fg="gray">working software</color>, but <color fg="yellow">validated intent.</color>
  • Not only <color fg="gray">clean code</color>, but <color fg="yellow">moldable systems.</color>
  • Not only <color fg="gray">responding to change</color>, but <color fg="yellow">constant evolution.</color>
</p>

/* PRESENTER NOTES (TR):
2009 Manifestosu evriliyor. Artık sadece çalışan yazılım yetmez, doğrulanmış niyet (validated intent) gerekir.
Kaynak: Manifesto for AI-Augmented Software Craftsmanship[cite: 43, 116].
*/

---

<header color=cyan>SKILLS WILL EAT AI</header>

<p max-width=72 align=center>
  The "Typing" part is solved.
  The <color fg="yellow">"Thinking"</color> part is the new scarcity.

  => Fundamentals > Prompting.
  => Design > Coding.
</p>

/* PRESENTER NOTES (TR):
Kapanışa doğru: Kod yazma (typing) artık çözülmüş bir problem. Kıt olan şey düşünme ve tasarım becerisidir.
Kaynak: Skills Will Eat AI.
*/

---

<title>
  root@craftsman:~$ <color fg="yellow">exit</color>
  <color fg="gray">The Craft is not Dead. It's Reborn.</color>
</title>

<p align=center>
  STAY CRITICAL. STAY HUMAN.
  <color fg="gray">Lemi Orhan Ergin</color>
</p>

<qr width=20%>https://manifesto.softwarecraftsmanship.org/</qr>

/* PRESENTER NOTES (TR):
Kapanış: Zanaatkarlık ölmedi, kabuk değiştirdi. Korkmayın, inşa etmeye devam edin.
Kaynak: Lemi - Kişisel Deneyim[cite: 5, 9, 113].
*/