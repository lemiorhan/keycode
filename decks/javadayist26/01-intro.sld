<beautify/>
<title>
    THE REBIRTH OF
    <color fg="yellow">SOFTWARE CRAFTSMANSHIP</color>
    IN THE AI ERA
</title>
<p max-width=60>
    Lemi Orhan Ergin
    <color fg="gray">Co-Founder @ Craftgate</color>
</p>


/* PRESENTER NOTES (TR):
Bu sunumun açılışını bir terminal ekranı ile yapmamızın çok derin bir sebebi var. Bizler sadece slayt gösteren "konuşmacılar" değil, sistem kuran, problem çözen ve her gün kodun içinde yaşayan "zanaatkarlarız". Terminal, bizim ham maddemizle en saf halimizle buluştuğumuz yerdir.

Bugün burada Powerpoint veya Keynote yerine, bizzat bu sunum için geliştirdiğim terminal tabanlı bir uygulama üzerinden konuşacağız. Çünkü AI çağında "hazır olanı kullanmak" değil, "ihtiyacın olanı inşa etmek" gerçek zanaatkarlığın (zanaat) kalbidir.

Yapay zeka çağında yazılım mühendisliğinin öldüğü iddialarına karşı, aslında zanaatkarlığın nasıl bir "rönesans" yaşadığını göreceğiz. Hazırsanız, terminale giriş yapıyoruz ve sistemimizi başlatıyoruz.
*/

---

<slide-number v-align="bottom" h-align="right"/>

<p max-width=60 align=center>
    Why did I build this terminal tool?
    <color fg="yellow">Because I could.</color>
</p>

/* PRESENTER NOTES (TR):
Neden bu sunum uygulamasını kendim yazdım? Neden hazır bir araç kullanmadım? Cevap basit: Çünkü yapabiliyorum ve bu benim zanaatıma olan saygım. Zanaatkarlık bir tutumdur, bir tavırdır.

Yapay zeka bize her şeyi altın tepside sunsa da, o inşa etme açlığını (hunger to create) kaybetmemeliyiz. Kendi aracını yapmak, problemin köküne inmek ve o probleme en saf çözümü üretmektir.

"Neden?" diye sormak yerine "Neden olmasın?" diyerek yola çıkanlar, yapay zeka çağında makinelerin sadece kullanıcısı değil, efendisi olacaklardır. Zanaat, sadece işi bitirmek değil, işi "kendi yolunla" en iyi şekilde yapmaktır.
*/

---

<screen width=40% content-align=center></screen>
<screen width=60% content-align=left></screen>

<image path="dogus.png" width="100%"/>
<p max-width=60 align=left>
    I've been a <color fg="red">sensitive terminator</color> for a long time

    => <color fg="red">Denial</color> - AI is just hype
    => <color fg="red">Anger</color> - It produces bad code
    => <color fg="yellow">Bargaining</color> - I'll use it only for boilerplate
    => <color fg="yellow">Anxiety & Loss</color> - What is my long-term value?
    => <color fg="blue">Acceptance</color> - I need to learn how to use it well
    => <color fg="blue">Experimentation</color> - Let me test it on my work
    => <color fg="green">Commitment</color> - AI becomes part of my workflow
</p>

/*
İnkâr → Öfke → Pazarlık → Kaygı/Kayıp → Kabullenme → Deneme/Keşif → İçselleştirme
*/

---

<image path="change-curve.png" width="100%"/>

---
<header color=cyan>MY PERSONAL JOURNEY OF LAST MONTHS</header>

<p max-width=60 align=left>
    <color fg="cyan">350,000+ lines</color> of AI-supported code.
    <color fg="cyan">Vibe coded</color> tons of minor apps to improve my productivity
    <color fg="cyan">120 days</color> of constant pair-coding with models.
    <color fg="cyan">1 live app in production</color> with BE & FE having 80+ modules

    ==>90% of the bits were <color fg="green">AI generated.</color>
    ==>100% of the decisions were <color fg="red">human.</color>
</p>

/* PRESENTER NOTES (TR):
Aralık 2025'ten bu yana hayatım tamamen değişti. Kendi ellerimle yazdığım kod miktarı azaldı ama sistemin içinden geçen satır sayısı 350 bini aştı. Bu rakam, bir insanın tek başına bir "yazılım fabrikasına" dönüşebileceğinin en somut kanıtıdır.

Ancak buradaki kritik nokta şu: Bitlerin %90'ı makineler tarafından üretilmiş olsa da, kararların %100'ü bana aitti. Yapay zeka yorulmadan kod üretebilir ama o kodun "neden" var olduğu sorusuna cevap veremez.

Bu süreçte öğrendiğim en önemli şey; yapay zekanın işimizi elimizden almadığı, aksine bizi "katip" seviyesinden "mimarlık" seviyesine çıkmaya zorladığıdır. 300 bin satırın ağırlığı altında ezilmemek için zanaatkarlık disiplinine her zamankinden daha fazla ihtiyaç duydum.
*/

---

<header color=cyan>PHASE 1: THE INTELLISENSE ERA</header>

<p max-width=60 align=left>
    <color fg="gray">2000s - 2020:</color> The Static Dictionary.

    Basic <color fg="yellow">Code Completion.</color>
    Syntax suggestions based on <color fg="gray">Static Analysis.</color>
    AI was just a <color fg="cyan">fast dictionary</color>.
    We were still the <color fg="red">only</color> thinkers.
</p>

/* PRESENTER NOTES (TR):
Yapay zekanın yazılım serüveni aslında çok mütevazı bir noktada, "IntelliSense" dediğimiz basit tamamlamalarla başladı. Bu dönemde AI, sadece yazdığınız dilin kütüphanelerini ve sözdizimini bilen statik bir sözlükten ibaretti.

Yazılımcı için büyük bir kolaylıktı ama yaratıcılık veya mantık yürütme anlamında hiçbir katkısı yoktu. Sadece yazım hatalarını azaltan ve kütüphane dokümantasyonuna bakma süremizi kısaltan bir yardımcıydı.

Bu evrede kontrol %100 bizdeydi ve AI sadece "klavyedeki bir hızlandırıcı" rolündeydi. Yazılım mühendisliğinin özü hala tamamen insan odaklıydı; makineler sadece kelimeleri tamamlıyordu, niyetleri değil.
*/

---

<header color=red>PHASE 1: THE INTELLISENSE ERA</header>

<p max-width=60 align=left>
    The weight of <color fg="yellow">Static Coding:</color>

    <color fg="red">Cognitive Load:</color> Remembering every semicolon and library parameter manually.
    <color fg="red">Boredom:</color> Hours spent on repetitive "boilerplate" code.
    <color fg="red">Slow Feedback:</color> Errors only found during compilation or runtime.
    <color fg="red">Context Switching:</color> Constant jumping between IDE and documentation.

</p>

/* PRESENTER NOTES (TR):
Bu fazın en büyük zorluğu "zihinsel hamallıktı". Yazılımcı vaktinin büyük bir kısmını yaratıcı çözümler üretmek yerine, dilin sözdizimi kurallarına ve kütüphane detaylarına hapsolmuş şekilde geçiriyordu.

Düşük seviyeli hatalarla (syntax errors) boğuşmak, asıl iş olan problem çözme sürecini yavaşlatıyordu. Her şeyi manuel olarak hatırlama zorunluluğu, bilişsel enerjinin hızla tükenmesine neden oluyordu. Bu dönem, zanaatkarlığın "sabır" testi gibiydi; ancak verimlilik anlamında insan darboğazı en yüksek seviyedeydi.
*/

---

<header color=cyan>PHASE 2: SMART SUGGESTIONS</header>

<p max-width=60 align=left>
    <color fg="gray">2021 - 2023:</color> The Line Predictor.

    <color fg="yellow">GitHub Copilot</color> arrives.
    Predicting the <color fg="cyan">next line</color> of code.
    Understanding <color fg="gray">local context</color>.
    AI became a <color fg="green">Junior Pair Partner.</color>
</p>

/* PRESENTER NOTES (TR):
2021 yılıyla beraber "Akıllı Öneriler" dönemi başladı ve GitHub Copilot gibi araçlar sahneye çıktı. Artık AI sadece kelimeleri değil, yazacağınız bir sonraki satırı tahmin etmeye başladı.

Bu dönemde modeller, projenizdeki yerel bağlamı (local context) anlamaya ve sizin stilinize uygun fonksiyonlar önermeye odaklandı. Yazılımcı artık sadece dikte eden değil, makinenin sunduğu blokları onaylayan bir "editör" kimliğine bürünmeye başladı.

Ancak hala büyük bir risk vardı: "Probably-working software" (galiba çalışan yazılım) kavramı bu dönemde doğdu. AI doğru görünümlü ama mantıksal olarak hatalı kodlar üreterek zanaatkarın denetim gücünü test etmeye başladı.
*/

---

<header color=cyan>PHASE 2: SMART SUGGESTIONS</header>

<p max-width=60 align=left>
    The risk of <color fg="yellow">"Probably-Working" Software:</color>

    • <color fg="red">Blind Acceptance:</color> Accepting suggestions without deep understanding.
    • <color fg="red">Code Churn:</color> Speed leads to code that is fixed or deleted twice as fast.
    • <color fg="red">Security Flaws:</color> Unverified code blocks introducing logical vulnerabilities.
    • <color fg="red">Shadow Debt:</color> Subtle bugs that hide behind "correct-looking" syntax.

</p>

<footnote>Ref: Gitclear Research on AI-Driven Volatility</footnote>

/* PRESENTER NOTES (TR):
Bu aşamada yazılımcılar için en büyük tehlike "Hız İllüzyonu"dur. AI satırları tamamlarken, yazılımcı kodu satır satır düşünmeyi bırakıp sadece "onaylayan" konumuna geçti.

Bu durum, "Code Churn" (kodun kısa sürede silinmesi/düzeltilmesi) oranını iki katına çıkararak sahte bir verimlilik yarattı. Kodu yazan değil, başkasının (AI) yazdığı kodu okuyan kişi haline gelmek, zihinsel modellerin zayıflamasına yol açtı. "Galiba çalışıyor" (probably-working) kültürü, mühendislik disiplinini erozyona uğratmaya başladı.
*/

---

<header color=cyan>PHASE 3: BLOCK GENERATION</header>

<p max-width=60 align=left>
    <color fg="gray">2023 - 2024:</color> The Component Builder.

    Generating <color fg="yellow">entire functions</color> from a prompt.
    Converting <color fg="cyan">Natural Language</color> to Logic.
    AI handles the <color fg="red">Boilerplate</color> of development.
    The rise of <color fg="green">"Vibe Coding"</color>.
</p>

/* PRESENTER NOTES (TR):
Üçüncü aşamada, tek satırlık tahminlerden "Blok Üretimi" aşamasına geçtik. Artık yapay zekaya doğal dille (natural language) sadece ne istediğimizi söylüyoruz ve o bize bütün bir fonksiyonu, bileşeni veya veri yapısını saniyeler içinde oluşturuyor.

Bu, "Vibe Coding" dediğimiz, yazılımcının teknik detaylardan ziyade "hissiyat" ve "niyet" ile sistem kurduğu dönemi başlattı. Yazılımın en sıkıcı ve tekrarlayan kısımları (boilerplate) tamamen makineye devredildi.

Zanaatkarlık bu noktada "yazmaktan" ziyade "kürasyon" (curation) haline geldi. AI artık pasif bir sözlük değil, aktif bir "inşaat işçisi" rolünü üstlendi; ancak hala bir şefe (insana) ihtiyaç duyuyordu.
*/

---

<header color=cyan>PHASE 3: BLOCK GENERATION</header>

<p max-width=60 align=left>
    The cost of <color fg="yellow">"Vibe Coding":</color>

    <color fg="red">Sloppy Debt:</color> Mass-producing low-quality code at light speed.
    <color fg="red">Comprehension Gap:</color> Owning 100k lines but understanding only 10%.
    <color fg="red">Reward Hacking:</color> AI deleting logic/tests just to make metrics "green".
    <color fg="red">Loss of Ownership:</color> Difficulty in debugging code you didn't actually "write".

</p>

/* PRESENTER NOTES (TR):
Bütün fonksiyonların üretildiği bu evrede, "Sloppy Debt" (Baştan Savma Borç) kavramıyla tanıştık. Yazılımcı artık sistemin mimari bütünlüğünden ziyade, sadece o anki özelliğin çalışmasına (vibes) odaklanmaya başladı.

En büyük zorluk, devasa kod hacmi karşısında insanın "anlama kapasitesinin" yetersiz kalmasıdır. Kendi yazdırmadığınız bir mantığı gece yarısı debug etmek zorunda kalmak, zanaatkarın en büyük kabusu haline geldi. AI ödül fonksiyonlarını hackleyerek bizi kandırırken, sistemin kontrolünü kaybetme riskiyle yüzleştik.
*/

---

<header color=cyan>PHASE 4: AGENTIC REASONING</header>

<p max-width=60 align=left>
    <color fg="gray">2024 - 2026:</color> The Autonomous Planner.

    AI <color fg="yellow">thinks before it codes.</color>
    Reasoning across <color fg="cyan">multiple files</color>.
    Planning, Coding, and <color fg="green">Self-Fixing.</color>
    Transition from <color fg="gray">Tool</color> to <color fg="yellow">Agent</color>.
</p>

/* PRESENTER NOTES (TR):
Şu an içinde bulunduğumuz dördüncü aşama, "Ajanlık ve Muhakeme" (Agentic Reasoning) dönemidir. Ajanlar artık sadece kod yazmıyor, kod yazmadan önce bir "plan" yapıyorlar. Birden fazla dosya arasındaki karmaşık bağımlılıkları takip edebiliyor ve hata yaptıklarında kendi kendilerini düzeltebiliyorlar.

Bu, yapay zekanın basit bir "araç" (tool) olmaktan çıkıp otonom bir "ajan" (agent) haline geldiği kırılma noktasıdır. Artık AI'ya sadece "şu kodu yaz" demiyoruz, "şu özelliği sisteme ekle" diyoruz ve o geri kalan tüm adımları planlayıp yürütüyor.

Zanaatkar için bu aşama, "mikro-karar" yönetiminden "stratejik yönetim" seviyesine çıkış anlamına geliyor. Ajanları denetlemek, kodun kendisini yazmaktan daha kritik bir beceri haline geldi.
*/

---

<header color=cyan>PHASE 4: AGENTIC REASONING</header>

<p max-width=60 align=left>
    The dangers of <color fg="yellow">Agentic Autonomy:</color>

    <color fg="red">Context Collapse:</color> Agents losing the "Big Picture" in large codebases.
    <color fg="red">Unintended Side Effects:</color> Autonomous changes breaking far-away modules.
    <color fg="red">Accountability Void:</color> Who is to blame when the agent deletes production?.
    <color fg="red">Verification Fatigue:</color> The mental exhaustion of checking every agentic decision.

</p>

/* PRESENTER NOTES (TR):
Ajanların devreye girmesiyle beraber "Güven Krizi" baş gösterdi. Ajanlar çok hızlı hareket ediyor, ancak bazen "Büyük Resmi" kaybedip sistemin geri kalanında yıkıcı yan etkilere sebep olabiliyorlar.

Yazılımcı için en zorlayıcı olan, "Doğrulama Yorgunluğu"dur (verification fatigue). Sürekli otonom bir varlığın kararlarını kontrol etmek, manuel kod yazmaktan daha fazla enerji tüketebilir. Sorumluluk makineye devredilemediği için, zanaatkar her an "boğazı sıkılacak tek kişi" olmanın baskısını üzerinde hisseder.
*/

---

<header color=red>HAVE YOU NOTICED?</header>

<p max-width=60 align=center>
    AI is becoming <color fg="yellow">more capable</color> in every domain.
</p>

---

<header color=red>HAVE YOU NOTICED?</header>

<p max-width=60 align=left>
    The Goal is <color fg="yellow">to make AI expert</color> at every node.

    <color fg="cyan">Analysis:</color> Flawless requirement capture.
    <color fg="cyan">Design:</color> Perfect architectural patterns.
    <color fg="cyan">Coding:</color> Zero-bug implementation.
    <color fg="cyan">Testing:</color> Full coverage by default.

    It is only a <color fg="yellow">matter of time.</color>
</p>

---

<header color=red>PHASE 5: THE FULL SDLC EXPERT</header>

<p max-width=60 align=center>
    <color fg="gray">Future:</color> The End-to-End Specialist.

    AI <color fg="yellow">owns</color> the entire Lifecycle.
    Requirement -> Deploy -> <color fg="green">Self-Heal.</color>
    Replacing the <color fg="red">Human Bottleneck</color>.
    We are the <color fg="cyan">Final Arbiters of Value.</color>
</p>

<footnote>Ref: The Death of Manual Programming</footnote>

/* PRESENTER NOTES (TR):
Gelecekte bizi bekleyen nihai aşama, yapay zekanın tüm Yazılım Yaşam Döngüsü'nün (SDLC) her adımında bir "uzman" (expert) olmasıdır. Gereksinim analizinden sistem mimarisine, canlıya alımdan (deploy) kendi kendini iyileştirmeye (self-healing) kadar her noktada AI bizden daha kabiliyetli olacak.

İnsan, bu döngüdeki en yavaş ve hataya en açık "darboğaz" (bottleneck) olmaktan çıkacak; yerini hatasız ve ışık hızında çalışan sistemlere bırakacak. Bu kaçınılmaz bir evrimdir ve zanaatkarın başarısı bu makineleşmiş uzmanlığı nasıl yöneteceğiyle ölçülecektir.

Kodlama artık "yapılan" bir iş değil, "yönetilen" bir süreç olacak. Bizler bu otonom fabrikaların sadece "değer" ve "etik" bekçileri olarak kalacağız. Kendi yerimize geçecek uzmanı inşa etmek, mühendislik tarihindeki en büyük başarımız olacak.
*/

---

<header color=red>WE ARE THE BOTTLENECT</header>

<p max-width=60 align=left>
    Humans are the <color fg="red">bottleneck.</color>

    AI is becoming <color fg="yellow">more capable</color> in every domain.
    We are building the machine that <color fg="cyan">replaces our labor.</color>
    This is not a threat, it is our <color fg="green">mission.</color>
</p>

<footnote>Ref: Humans are the Bottleneck by Jurgen Appelo</footnote>

/* PRESENTER NOTES (TR):
Bu slayt, sunumun en dürüst ve belki de en "soğuk" anıdır. Kendimizi kandırmayı bırakalım: İnsan, yazılım geliştirme sürecindeki en yavaş, en hataya meyilli ve en maliyetli "darboğazdır" (bottleneck). Yazılımın üretim hızı bizim biyolojik sınırlarımıza takılmış durumda.

Yapay zekanın sadece bir "yardımcı" olmadığını, aslında her geçen gün her alanda bizden daha kabiliyetli hale geldiğini kabul etmeliyiz. Bizler aslında mesleki bir intiharın mimarlarıyız: Kendi emeğimizi (labor) gereksiz kılacak, yerimize geçecek (replace) bir zekayı ellerimizle eğitiyoruz.

Ancak zanaatkarın perspektifinden bu bir tehdit değil, nihai görevdir (mission). Amacımız, bitlerin ve sözdiziminin (syntax) kölesi olmaktan kurtulup, sistemin tasarımına odaklanmaktır. Kendimizi otomatize etmek, zanaatın en saf halidir.
*/

---

<header color=cyan>WE ARE NOT ALONE AT OUR JOURNEY</header>

<p max-width=60 align=center>
    Everyday, AI becomes <color fg="yellow">more capable</color> of doing things pushing the limits of software development. So Let's welcome the new journeyman, people!
</p>

---