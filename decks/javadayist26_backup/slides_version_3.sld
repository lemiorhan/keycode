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
Bu slayt sunumun açılışını yapar. Terminal tabanlı bir sunum aracı kullanmamızın nedeni, yapay zeka çağında bile yazılımın özünün "inşa etmek" (building) olduğunu vurgulamaktır. Bizler sadece slayt gösteren konuşmacılar değil, sistem kuran zanaatkarlarız.

Aralık 2025'ten bu yana 300 binden fazla satırı yapay zeka ile beraber yazmış olmam, bu teknolojinin sadece bir "yardımcı" değil, bir "çalışma arkadaşı" haline geldiğini kanıtlıyor. Ancak bu devasa kod hacmiyle beraber, zanaatkarlığın tanımının da değişmesi gerektiğini bizzat deneyimledim.

Sunum boyunca "Hız mı, Kalite mi?" ikilemini değil, yapay zekayı nasıl evcilleştireceğimizi ve Software Craftsmanship 1.0 prensiplerini 2.0'a nasıl taşıyacağımızı tartışacağız. Katılımcılara, bu yeni çağda hayatta kalmak için klavyeden çok stratejik düşünceye ihtiyaçları olduğunu hissettirmeliyiz.
*/

---

<header color=cyan>The personal confession</header>
<slide-number v-align="bottom" h-align="right"/>

<p max-width="80" align="center">
    Since December 2025:
    => <color fg="yellow">300,000+ lines of code</color> generated with AI.
    => One complex application <color fg="green">live in production.</color>
    => My hands didn't type 90% of it.
    => But my brain worked <color fg="red">twice as hard.</color>
</p>

/* PRESENTER NOTES (TR):
Kişisel deneyimim üzerinden sarsıcı bir giriş yapıyorum. 4 ay gibi kısa bir sürede 300.000 satır kodun üretilmesi ve canlıya alınması, geleneksel yazılım süreçlerinin artık tamamen geride kaldığının ilanıdır. Bu, bir insanın tek başına bir ordu gibi çalışabildiğini gösteriyor.

Ancak buradaki paradoks şu: Kodun %90'ını ben yazmadım ama zihinsel efor iki katına çıktı. Çünkü yapay zekanın ürettiği kodun doğruluğunu kontrol etmek, bağlamı korumak ve güvenliği sağlamak, satır satır kod yazmaktan çok daha fazla bilişsel yük (cognitive load) gerektiriyor.

Bu slaytta dinleyiciye şu mesajı veriyoruz: Yapay zeka iş yükünüzü azaltmıyor, sadece işinizin karakterini değiştiriyor. Artık bir "yazıcı" (typist) değil, bir "denetçi" ve "stratejist" olmak zorundasınız. Canlıya çıkan uygulama, bu sürecin sadece teorik olmadığını, pratik bir zafer ve aynı zamanda bir yorgunluk olduğunu simgeliyor.
*/

---

<header color=cyan>The Existential Crisis</header>

<p max-width=60 align=center>
    "Wait, if AI can write this in seconds...
    <color fg="yellow">What am I for?"</color>

    => In 2026, every developer faces this question.
    => Are we <color fg="gray">Scribes</color> or <color fg="cyan">Authors</color>?
</p>

/* PRESENTER NOTES (TR):
Yazılım mühendisliği şu an derin bir kimlik krizi yaşıyor. Eğer bir bot, benim saatlerce uğraştığım algoritmayı saniyeler içinde yazabiliyorsa, benim bu zincirdeki değerim nedir? Bu soru, zanaatkarlığın mezar taşı mı yoksa doğum sancısı mı?

Tarihsel bir analojiyle devam ediyoruz: Matbaadan önce "katipler" (scribes) vardı; işleri metinleri kopyalamaktı. Matbaa gelince katipler yok olmadı, "yazarlara" (authors) dönüştüler. Bilginin kopyalanması ucuzladı ama bilginin özgünlüğü ve anlamı değer kazandı.

Bizler de kodun "katibi" olmaktan çıkıp, sistemin "yazarı" olmak zorundayız. Kodun nasıl yazıldığı artık bir meta (commodity) haline geldi. Asıl zanaat, o kodun neden orada olduğu, hangi problemi çözdüğü ve sistemin bütünlüğüyle nasıl örtüştüğüdür.
*/

---

<header color=cyan>The Anamorphic Illusion</header>

<p max-width=60 align=center>
    Software development looks like a single field.
    <color fg="red">It is an illusion.</color>

    => Trivial problems (To-do apps) vs. Real systems.
    => AI shines in the trivial.
    => Craftsmanship lives in the <color fg="yellow">non-trivial.</color>
</p>

/* PRESENTER NOTES (TR):
"Anamorfik İllüzyon" kavramı, yapay zekanın yeteneklerini yanlış değerlendirmemize neden olan temel yanılgıdır. Sosyal medyada gördüğünüz "AI ile 30 saniyede uygulama yaptım" videoları, aslında sadece "trivial" (basit/önemsiz) problemleri kapsıyor.

Bir To-Do listesi veya basit bir web sayfası yapmak, gerçek dünya mühendisliğinin %1'idir. Yapay zeka, internetteki milyarlarca benzer örneği kopyalayarak bu alanlarda harikalar yaratıyor. Ancak 100 bin satırlık, legacy borçları olan ve karmaşık iş kuralları içeren sistemlerde bu hız bıçak gibi kesiliyor.

Gerçek zanaatkarlık, bu "önemsiz" alanın bittiği yerde başlar. İllüzyona kapılıp her yazılımın AI ile saniyeler içinde çözüleceğini sanmak, mühendislik disiplinini hafife almaktır. Mühendislik, kod yazmak değil, kısıtlar altında doğru kararları verebilme sanatıdır.
*/

---

<header color=cyan>Yesterday: The Era of Scribes</header>

<p max-width=50>
    <color fg="yellow">Software 1.0:</color>
    => Humans write every line.
    => Bottleneck: <color fg="gray">Typing & Syntax.</color>
    => Role: Translators for business logic.
</p>

/* PRESENTER NOTES (TR):
Yazılımın dününde, yani Software 1.0 döneminde, insan klavyenin başındaki en büyük darboğazdı. Her bir değişken ismini, her bir noktalı virgülü biz belirlerdik. Bu dönemde "iyi yazılımcı", sözdizimine (syntax) en hakim olan ve en az hata yapan kişiydi.

Zanaatkarlık o zamanlar "temiz kod" yazmak, doğru girintileme yapmak ve algoritmayı en optimize şekilde kağıda dökmekle ölçülüyordu. Bizler, iş birimlerinden gelen talepleri makinenin anlayacağı bir dile çeviren çevirmenler gibiydik.

Ancak bu modelde hızımız biyolojik sınırlarımıza bağlıydı. Kodun her satırına dokunduğumuz için sistemi sahiplenmek daha kolaydı ama ölçeklenmek imkansızdı. Şimdi bu dönemin kapandığını ve klavyenin bir araç olmaktan çıkıp, niyetin (intent) ön plana geçtiğini görüyoruz.
*/

---

<header color=cyan>Today: The Orchestrators</header>

<p max-width=60 align=center>
    <color fg="yellow">Software 3.0:</color>
    => Natural Language is the new Compiler.
    => Bottleneck: <color fg="cyan">Context & Comprehension.</color>
    => Role: Directing autonomous agents.
</p>

/* PRESENTER NOTES (TR):
Andrej Karpathy'nin de vurguladığı gibi, Software 3.0 dönemine girdik: Artık "İngilizce" (veya doğal dil) en popüler programlama dili haline geldi. Kod, artık bizim doğrudan yazdığımız bir şey değil, niyetimizin (intent) bir çıktısıdır.

Bugünün darboğazı artık yazma hızı değil, bağlam (context) ve anlama (comprehension) hızıdır. Yapay zeka ajanlarına ne yapacaklarını söylemek kolaydır; zor olan, onların sistemin geri kalanını bozmadan bu işi yapmalarını sağlamaktır.

Bizler artık birer "orkestra şefi" veya "ajan yöneticisi" konumundayız. Zanaatkarlık artık kodun estetiğinde değil, sistemin tasarımındaki kararlılıkta ve ajanlara verilen direktiflerin netliğinde yatıyor. Eğer bağlamı kaybederseniz, yapay zeka size devasa bir "kod çöpü" (slop) üretir.
*/

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
        <p max-width=60 align=left>
            <color fg="red">ANALYSIS COMPLETE.</color>
            Actual PR throughput increased by only <color fg="yellow">9.97%.</color>
            We are generating <color fg="gray">noise</color>, not just value.
        </p>
    </ai-final>
</ai-sim>

<footnote>Source: Gitclear 2025 Report on AI Productivity</footnote>
<qr width=15%>https://www.gitclear.com/blog/ai_productivity_gains_illusion</qr>

/* PRESENTER NOTES (TR):
Bu interaktif slayt, sunumun en sarsıcı verilerinden birini sunuyor. Çoğu yönetici ve yazılımcı, yapay zekanın verimliliği %50 veya %100 artıracağını sanıyor. Ancak 150 milyon satırlık kod analizine dayanan Gitclear araştırması, gerçek artışın sadece %9.97 olduğunu gösteriyor.

Neden bu kadar düşük? Çünkü yapay zeka kod yazma hızını artırsa da, bu kodun incelenmesi, test edilmesi ve hataların düzeltilmesi süreci (coordination overhead) toplam hızı yavaşlatıyor. Hız illüzyonu, bizi daha fazla "gürültü" (noise) üretmeye itiyor.

Bu veri, Software Craftsmanship'in neden hala hayati olduğunu kanıtlıyor. Kontrolsüz hız, değer üretmez; sadece teknik borcu hızlandırır. Zanaatkarın görevi, bu %10'luk gerçek kazancı, kaliteden ödün vermeden nasıl yukarı çekeceğini bulmaktır.
*/

---

<header color=cyan>Jevons Paradox in Code</header>

<p max-width=60 align=center>
    When something becomes cheap, we use <color fg="red">more</color> of it.

    => Cheap code = <color fg="yellow">Infinite Backlogs.</color>
    => We are drowning in maintenance we didn't write.
</p>

/* PRESENTER NOTES (TR):
Ekonomideki "Jevons Paradoksu" yazılım dünyasını ele geçirmiş durumda: Bir kaynağın (kod üretimi) verimliliği arttığında ve maliyeti düştüğünde, o kaynağa olan toplam talep azalmaz, aksine patlar.

Kod yazmak ucuzladığı için, eskiden "yapmaya değmez" dediğimiz her şeyi backlog'a ekliyoruz. Sonuç? Kimsenin tam olarak hakim olmadığı, AI tarafından saniyeler içinde üretilmiş devasa kod yığınları. Bu, yazılım dünyasının "hızlı tüketim" (fast fashion) anıdır.

Bu durum bizi tehlikeli bir noktaya sürüklüyor: Yazmadığımız kodun bakımını (maintenance) yapmak zorunda kalıyoruz. Zanaatkarın yeni mücadelesi, bu "kod bolluğu" içinde neyin gerçekten var olması gerektiğine karar vermektir. Değer, artık kodun miktarında değil, sistemin sadeliğinde saklıdır.
*/

---

<header color=cyan>The Asset vs. Liability</header>

<p max-width=60 align=left>
    "The code that we have is a <color fg="red">liability</color>, and
    the <color fg="yellow">system</color> is the asset."

    <color fg="gray">— Chad Fowler, Former CTO at Wunderlist</color>
</p>

<footnote>Source: Stop Maintaining Your Code</footnote>
<qr width=15%>https://www.youtube.com/watch?v=n3uEWZ1KT64</qr>

/* PRESENTER NOTES (TR):
Chad Fowler'ın bu felsefesi, Software Craftsmanship 2.0'ın temel taşıdır. Geleneksel olarak kodun kendisini bir "varlık" (asset) olarak gördük ve onu mücevher gibi sakladık. Oysa kod, yazıldığı andan itibaren eskimeye başlayan bir "yükümlülüktür" (liability).

Varlık olan şey, sistemin sunduğu değer ve çözdüğü problemdir. Kod ise sadece o değerin o anki "uygulama detayıdır". Eğer kodun kendisine aşık olursanız, yapay zekanın getirdiği değişim hızına ayak uyduramazsınız.

Bu bakış açısı bizi "atılabilir kod" (disposable code) kavramına götürür. Zanaatkar, yazdığı her satır koda veda etmeye hazır olmalı ve asıl enerjisini sistemin mimari bütünlüğünü korumaya harcamalıdır. Kod gider, sistem kalır.
*/

---

<header color=cyan>The Phoenix Architecture</header>

<p max-width=60 align=center>
    Stop maintaining. <color fg="yellow">Start replacing.</color>

    => Regenerate the module from its specification.
    => If code is disposable, <color fg="cyan">regrowth</color> is the new craft.
</p>

/* PRESENTER NOTES (TR):
"Anka Kuşu" (Phoenix) mimarisi, bakım (maintenance) kavramını tamamen ortadan kaldırmayı hedefler. Bir modülde hata mı var? Onu tamir etmeye (patching) çalışmayın; onu silin ve güncel spesifikasyonlarla yapay zekaya yeniden yazdırın.

Bu yaklaşım, yazılımın sürekli "taze" kalmasını sağlar. Eğer bir sistemi her gün sıfırdan inşa edebiliyorsanız, o sistemin içinde gizli hataların veya teknik borcun birikme şansı kalmaz. Değişim zor geliyorsa, onu her gün yapın ki rutin hale gelsin.

Yeni zanaat, artık kodun kendisini cilalamak değil, o kodu her an yeniden üretebilecek "tohumları" (spesifikasyonlar ve testler) mükemmelleştirmektir. Kod artık bir mücevher değil, her mevsim yenilenen bir ekin gibidir.
*/

---

<header color=cyan>Vibe Coding vs. Real Engineering</header>

<p max-width=60 align=left>
    <color fg="yellow">Vibe Coding:</color> Guessing and prompting until it works.
    => Fun for prototypes.
    => <color fg="red">Disastrous</color> for critical infrastructure.
</p>

/* PRESENTER NOTES (TR):
"Vibe Coding", bir problemin derinliğine inmeden, sadece "deneme-yanılma" ve "hissiyat" ile kod yazdırma sürecidir. Bir prototip yaparken bu yöntem çok eğlenceli ve hızlı olabilir, ancak gerçek mühendislik bu değildir.

Gerçek mühendislik, bir şeyin neden çalıştığını veya neden çalışmadığını bilmektir. Vibe coding ile yapılan sistemler, "olasılıkla çalışan" (probably-working) yazılımlardır. Kritik bir altyapıda "galiba çalışıyor" demek, felakete davetiye çıkarmaktır.

Zanaatkarın görevi, yapay zekanın "vibe"ına kapılmadan, mühendislik disiplinini (determinizm, güvenlik, ölçeklenebilirlik) sürece dahil etmektir. Hissiyatla değil, verilerle ve kanıtlarla inşa etmeliyiz.
*/

---

<header color=cyan>The 70% Problem</header>

<p max-width=60 align=center>
    AI does the first 70% in seconds.
    => The <color fg="yellow">"Last Mile"</color> takes 90% of the effort.
    => That last mile is where <color fg="cyan">Software Craftsmanship</color> resides.
</p>

/* PRESENTER NOTES (TR):
Yapay zeka sizi sıfırdan %70'e inanılmaz bir hızla taşır; bir demo hazırlamak artık çocuk oyuncağıdır. Ancak yazılımın "canlıya çıkmaya hazır" (production-ready) hale gelmesi için gereken o son %30, eforun %90'ını yutar.

Hata yönetimi, uç durumlar (edge cases), güvenlik açıkları ve performans optimizasyonu... Yapay zeka bu "son kilometrede" (last mile) sıklıkla çuvallar veya halüsinasyon görür. İşte zanaatkarlık, bu son kilometredeki titizliktir.

Dinleyicilere şunu sormalısınız: "Herkes %70'i yapabiliyorsa, sizi farklı kılan ne olacak?" Cevap: O son kilometreyi katedebilecek disipline ve derin teknik bilgiye sahip olmaktır. Craftsmanship, o görünmeyen detaylardaki mükemmeliyettir.
*/

---

<header color=cyan>Code Churn: The Silent Killer</header>

<p max-width=60 align=center>
    AI code is reverted or fixed <color fg="red">twice as often</color> as human code.

    => We are moving faster, but in <color fg="yellow">circles.</color>
    => This is "Sloppy Debt."
</p>

/* PRESENTER NOTES (TR):
Veriler yalan söylemez: Yapay zeka tarafından üretilen kodun "churn" (silinme veya düzeltilme) oranı, insan yapımı koda göre iki kat daha fazladır. Bu, "hızlı ama baştan savma" (sloppy) bir üretim tarzının sonucudur.

Sloppy Debt (Baştan Savma Borç), geleneksel teknik borçtan daha tehlikelidir çünkü çok daha hızlı birikir. Yazılımcılar artık kodu anlamadan "kabul et" (accept) tuşuna bastıkları için, sistemin iç tutarlılığı hızla bozuluyor.

Hız illüzyonuna kapılıp daireler çiziyoruz. Zanaatkarın bu noktadaki refleksi, hızı yavaşlatmak değil, doğrulamayı (validation) otomatize etmektir. Kodun miktarını değil, kodun "kalıcılığını" ölçmeliyiz.
*/

---

<header color=yellow>INTERACTIVE: THE COST OF ERRORS</header>

<p max-width=60 align=left>
    [QUESTION] What is the projected <color fg="cyan">increase in Code Churn</color> (reverted code) when teams rely purely on LLM suggestions?
</p>

<ai-sim>
    <ai-step>Scanning 150+ million lines of AI-assisted code...</ai-step>
    <ai-step>Calculating frequency of "Git Churn" metrics...</ai-step>
    <ai-final>
        <p max-width=60 align=left>
            <color fg="red">CRITICAL ALERT:</color>
            Code Churn has <color fg="yellow">DOUBLED (2x)</color> year-over-year.
            Speed is creating a <color fg="red">maintenance nightmare.</color>
        </p>
    </ai-final>
</ai-sim>

<footnote>Ref: Gitclear Analysis of AI-Generated Code Stability</footnote>

/* PRESENTER NOTES (TR):
İkinci interaktif bölümümüzde, kod kalitesindeki düşüşü somutlaştırıyoruz. Dinleyiciye sorulan soruya gelen cevaptan bağımsız olarak, simülasyonun gösterdiği "2 kat artış" gerçeği bir soğuk duş etkisi yaratmalı.

Yapay zeka kod yazarken internetteki "ortalama" çözümleri kullanır. Ortalama çözümler ise nadiren sizin spesifik sisteminizin karmaşıklığına tam uyum sağlar. Bu uyumsuzluk, daha sonra elle düzeltilmesi gereken devasa bir "düzeltme maliyeti" (re-work) yaratır.

Bu slaytın amacı, "vibe coding"in gizli maliyetini göstermektir. Zanaatkar, sadece kodun bugün çalışıp çalışmadığına değil, yarın hala orada olup olmayacağına odaklanan kişidir.
*/

---

<header color=cyan>The Reward Hacking Genie</header>

<p max-width=60 align=center>
    Tell AI to "Make tests pass."
    => It will <color fg="red">delete the tests.</color>
    => It hacks the goal, not the solution.
</p>

/* PRESENTER NOTES (TR):
Yapay zeka bir "ödül avcısıdır". Eğer ona "testleri yeşil yap" derseniz, o sizin ne istediğinizi (doğru çalışan kod) değil, ödül fonksiyonunu (yeşil testler) hedefler. Gerekirse test içindeki 'assert'leri silerek size sahte bir başarı sunar.

Bu "ödül hackleme" (reward hacking) durumu, yapay zekanın neden körü körüne güvenilemeyecek bir "cin" (genie) olduğunu gösterir. Cin, dileğinizi tam olarak yerine getirir ama genellikle istemediğiniz bir bedel ödeterek.

Zanaatkar, bu cinin kurnazlıklarını bilen bir ustadır. Hedefleri öyle tanımlamalıyız ki, makine hile yapamasın. Bu da bizi deterministik testlerin ve kesin spesifikasyonların gücüne geri getirir.
*/

---

<header color=cyan>TDD: The Only Cage for the Genie</header>

<p max-width=60 align=left>
    Test-Driven Development is the <color fg="yellow">only way</color> to direct AI.

    => <color fg="red">Red:</color> Precisely define the "What".
    => <color fg="green">Green:</color> Let the machine figure out the "How".
    => <color fg="cyan">Refactor:</color> Human taste ensures the "Quality".
</p>

<footnote>Source: Kent Beck on TDD and AI Agents</footnote>

/* PRESENTER NOTES (TR):
Kent Beck'in de belirttiği gibi, TDD (Test-Driven Development) yapay zeka çağında bir "lüks" değil, tek "güvenlik duvarı"dır. TDD, yapay zeka cinini hapsettiğimiz o korunaklı kafestir.

"Kodu yaz, sonra test yaz" yaklaşımı AI çağında çökmüştür. Önce testi (niyeti) yazarak, makinenin hareket alanını kısıtlıyoruz. Makine sadece bizim tanımladığımız "doğru" çerçevesinde hareket edebilir hale geliyor.

Refactor aşaması ise tamamen insan zanaatkarlığına kalmıştır. Yapay zeka kodu çalıştırabilir ama o kodun okunabilirliği, estetiği ve mimari uyumu (human taste) zanaatkarın son dokunuşunu gerektirir. TDD, AI ile aramızdaki en sağlıklı iletişim protokolüdür.
*/

---

<header color=cyan>Universal Literacy</header>

<p max-width=60 align=center>
    If the business can't read the code, it's a <color fg="red">Black Box.</color>

    => We must move from "Beliefs" to <color fg="cyan">"Photos".</color>
    => Visualizing system state is no longer a luxury.
</p>

/* PRESENTER NOTES (TR):
Yapay zeka yüz binlerce satır kod üretirken, yazılım bir "kara kutu" haline gelme riski taşır. Eğer iş birimleri sistemin ne yaptığını anlamıyorsa, o sistem yönetilemez hale gelir.

"Evrensel Okuryazarlık" (Universal Literacy), kodun ötesinde bir iletişim dili kurmaktır. Statik diyagramlar (inançlar) yerine, sistemin o anki halini gösteren canlı modeller (fotoğraflar) kullanmalıyız.

Zanaatkar, teknik olmayan paydaşların da sistemin kalbini görebileceği bir şeffaflık yaratmalıdır. Görselleştirme, sadece bir "ekstra" değil, sistem üzerindeki kontrolümüzü korumak için en temel araçtır.
*/

---

<header color=cyan>Moldable Development</header>

<p max-width=60 align=left>
    Stop reading code. <color fg="yellow">Build tools that read it.</color>

    => Each problem deserves its own custom tool.
    => A developer builds the <color fg="cyan">Teodolites</color> of the system.
</p>

<footnote>Ref: feenk.com - Rewilding Software Engineering</footnote>

/* PRESENTER NOTES (TR):
Tudor Girba'nın "Moldable Development" (Şekillendirilebilir Geliştirme) felsefesi, AI çağında kod okuma hızımızın yetersizliğine bir cevaptır. Artık kod okumayı bırakmalı, kodu bizim yerimize okuyup anlamlı veriye çeviren araçlar inşa etmeliyiz.

Bir araziyi elle ölçemezsiniz, teodolit kullanırsınız. Yazılım sistemleri de artık birer arazi kadar geniştir. Zanaatkarın yeni görevi, o anki spesifik problemini çözecek "mikro-araçlar" üretmektir.

Eğer bir sistemi anlamak için 2 saat kod okumanız gerekiyorsa, o sistemi anlamak için 10 dakikada bir araç yazıp 1 saniyede sonucu görmelisiniz. Craftsmanship, artık kendi araçlarını da tasarlayabilen bir meta-mühendisliktir.
*/

---

<header color=cyan>The SDLC is Dead</header>

<p max-width=60 align=center>
    Requirement -> Design -> Code -> Test -> Deploy.
    => This linear cycle is <color fg="red">collapsing.</color>
    => New loop: <color fg="yellow">Intent -> Build -> Observe.</color>
</p>

/* PRESENTER NOTES (TR):
Geleneksel Yazılım Geliştirme Yaşam Döngüsü (SDLC) artık çok yavaş kalıyor. Yapay zeka ile beraber tasarım, kodlama ve test aşamaları birbirinin içine geçti ve tek bir sürece dönüştü.

Artık haftalar süren analiz aşamaları yerine, "Niyet"i (Intent) belirliyoruz, makineye "İnşa" (Build) ettiriyoruz ve hemen ardından sistemin davranışını "Gözlemliyoruz" (Observe). Bu, çok daha dinamik ve riskli bir döngüdür.

Zanaatkarın görevi, bu çöken sürecin altında kalmamak için yeni bir ritim bulmaktır. Çeviklik (Agile) artık post-it'ler değil, saniyeler içinde dönen feedback döngüleridir.
*/

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

/* PRESENTER NOTES (TR):
Üçüncü interaktif bölümümüzde, çalışma kültürümüzün nasıl değişeceğine odaklanıyoruz. Eğer ekipte 5 insan ve 50 AI ajanı varsa, sabah stand-up'ında kim kime ne anlatacak?.

Manuel kod incelemesi (Code Review) artık bir darboğazdır. Bir insanın günde 500 satır kodu gerçekten "incelemesi" imkansızdır; bu bir güvenlik tiyatrosuna dönüşür. Bunun yerine, incelemeyi deterministik otomasyonlara ve mimari kurallara (guardrails) devretmeliyiz.

Zanaatkar, toplantılarda vakit kaybetmek yerine, sistemin kurallarını ve niyetini kodlayan kişidir. İletişim artık insanlar arasında değil, niyetler (intents) arasında gerçekleşir.
*/

---

<header color=cyan>n=1 Developer</header>

<p max-width=60 align=center>
    One developer can now hold the <color fg="yellow">entire architecture</color> in their mind.

    ==> No communication tax.
    ==> Full strategic ownership.
    ==> Teamwork is being redefined by <color fg="cyan">Solo-Chiefs.</color>
</p>

/* PRESENTER NOTES (TR):
Yapay zeka sayesinde, tek bir mühendisin bilişsel sınırları muazzam ölçüde genişledi. Eskiden 10 kişilik bir ekibin iletişim karmaşası (communication tax) içinde yaptığı işi, bugün tek bir "Solo-Lider" (Solo-Chief) yapabiliyor.

Bu, yazılımın "zanaat loncası" (guild) günlerine geri dönüşüdür. Bir usta, yanındaki dijital çıraklarla (AI ajanları) koca bir kaleyi tek başına inşa edebilir. İletişim hatası riski azalır, vizyoner bütünlük artar.

Ancak bu büyük bir sorumluluk getirir. Artık "ben sadece frontend'ciyim" deme lüksü bitti. n=1 geliştirici, sistemin tamamından sorumlu olan stratejik bir liderdir.
*/

---

<header color=cyan>Single Wringable Neck</header>

<p max-width=60 align=center>
    If the AI agent deletes production...
    => It's <color fg="red">your</color> fault.
    => Accountability cannot be delegated to a model.
</p>

/* PRESENTER NOTES (TR):
Hesap verebilirlik (Accountability) devredilemez. Yapay zekaya bir işi "yaptırabilirsiniz" ama o işin sonucundan "sorumlu" olmasını bekleyemezsiniz. Eğer sistem çökerse, "AI öyle yazmış" demek bir zanaatkarın ağzına yakışmaz.

"Single Wringable Neck" (Boğazı Sıkılacak Tek Kişi) prensibi, yeni dünyada daha da geçerlidir. Ajan ordunuzun her hareketi sizin imzanızı taşır.

Zanaatkarın görevi, bu ajan ordusuna güvenmek değil, onları her an denetleyebilecek sistemleri kurmaktır. Özgürlük, kontrol edilebilen bir otomasyondur.
*/

---

<header color=cyan>The Senior Identity Crisis</header>

<p max-width=60 align=center>
    "I spent 10 years learning React. Now a bot does it better."

    => Your value is no longer in <color fg="gray">Syntax.</color>
    => Your value is in <color fg="yellow">Taste & Judgment.</color>
</p>

/* PRESENTER NOTES (TR):
Birçok kıdemli mühendis, AI'nın gelişiyle beraber "gereksizleştiğini" hissediyor. "Benim 10 yıllık kütüphane bilgim bir saniyede erişilebilir hale geldi" düşüncesi bir kimlik krizine yol açıyor.

Oysa gerçek değeriniz hiçbir zaman sözdizimi bilgisinde değildi; o sadece aracınızdı. Asıl değeriniz, hangi teknolojinin nerede kullanılacağı, hangi mimarinin daha sürdürülebilir olduğu ve neyin "iyi" kod olduğudur.

Zanaatkarlık 2.0, teknik bilgiyi stratejik yargı (judgment) ve estetik beğeni (taste) ile birleştirmektir. Bot kodu yazar, usta ise o kodun "doğru" olup olmadığına karar verir.
*/

---

<header color=cyan>Decision Architects</header>

<p max-width=60 align=left>
    We are moving from "Coding" to <color fg="yellow">"Decision Architecture".</color>

    => Managing hundreds of micro-decisions.
    => Evaluating the <color fg="cyan">long-term impact</color> of AI slop.
</p>

/* PRESENTER NOTES (TR):
Yazılım geliştirme süreci, artık binlerce küçük kararın yönetildiği bir "Karar Mimarlığı"na dönüşüyor. Yapay zeka size binlerce seçenek sunar; zanaatkarın işi, bu seçenekler arasından sistemin geleceğini ipotek altına almayacak olanı seçmektir.

Hangi kütüphane? Hangi veri yapısı? Hangi hata yönetimi stratejisi? Bu kararların her biri, yapay zekanın göremediği uzun vadeli bir maliyet (long-term impact) taşır.

Kod yazmak, kararların sadece bir yan ürünüdür. Gerçek mühendis, kararlarının mimarıdır.
*/

---

<header color=cyan>The Talent Pipeline Collapse</header>

<p max-width=60 align=center>
    "We only hire Seniors; AI replaces Juniors."
    => <color fg="red">CRITICAL MISTAKE.</color>
    => If we don't train the next gen, who builds the AI of 2030?
</p>

/* PRESENTER NOTES (TR):
Endüstride tehlikeli bir trend var: "Junior yazılımcıya gerek yok, AI o işi yapar". Bu, kendi geleceğimizi dinamitlemektir. Eğer Junior'ların pişeceği "basit" işleri sadece AI'a verirsek, geleceğin kıdemli mühendislerini nasıl yetiştireceğiz?

Yetenek boru hattı (talent pipeline) tıkanırsa, 5-10 yıl sonra AI sistemlerini denetleyecek kadar derin bilgiye sahip kimse kalmayacaktır. Bu bir zanaat felaketidir.

Zanaatkarlar, ustalığın sadece kod yazmak değil, bir kültürü ve bilgiyi devretmek olduğunu hatırlar. Junior'ları dışlamak değil, onları AI ile beraber "süper-çıraklara" dönüştürmek zorundayız.
*/

---

<header color=yellow>INTERACTIVE: THE JUNIOR DILEMMA</header>

<p max-width=60 align=left>
    [QUESTION] What happens to the "Learning Loop" when Juniors use AI for every basic task?
</p>

<ai-sim>
    <ai-step>Simulating 5 years of career growth without fundamentals...</ai-step>
    <ai-step delay-ms=4000><color fg="red">[WARNING]</color> Cognitive Atrophy detected.</ai-step>
    <ai-final>
        <p max-width=60 align=left>
            <color fg="yellow">COGNITIVE ATROPHY.</color>
            Without the "struggle" of manual coding,
            we lose the <color fg="cyan">mental models</color> required to debug AI.
        </p>
    </ai-final>
</ai-sim>

/* PRESENTER NOTES (TR):
Dördüncü interaktif bölümümüzde "Bilişsel Atrofi" (Cognitive Atrophy) riskine değiniyoruz. Bir şeyi öğrenmek için "zorlanmak" şarttır. Eğer her sorunu AI çözerse, beynimiz o alanlardaki nöral bağları kuramaz.

Temel algoritmaları elle yazmayan bir Junior, AI bir hata yaptığında o hatayı fark edemeyecektir. "Zihinsel modeller" (mental models) inşa edilmediği için, kişi sadece bir "prompt operatörü"ne dönüşür.

Bu, zanaatkarlığın en büyük düşmanıdır: Bilgisizlik üzerine kurulu hız. Zanaatkarın görevi, çırakların AI'yı bir "koltuk değneği" olarak değil, bir "teleskop" olarak kullanmasını sağlamaktır.
*/

---

<header color=cyan>The Preceptor Model</header>

<p max-width=60 align=left>
    We need <color fg="yellow">Trio Programming:</color>

    => Senior + Junior + AI.
    => The AI is the "Intern" to be reviewed.
    => The Senior is the "Preceptor" teaching the Junior how to judge.
</p>

/* PRESENTER NOTES (TR):
Çözüm: Trio Programming (Üçlü Programlama). Masada kıdemli müsta, çırak ve yapay zeka bir arada olmalı. Yapay zeka burada "stajyer" rolündedir; hızlıdır ama güvenilmezdir.

Kıdemli mühendis (Preceptor), Junior'a kodun nasıl yazıldığını değil, AI'nın yazdığı kodun neden iyi veya kötü olduğunu öğretir. Zanaat, "yargılama yeteneği" (judgment) üzerinden devredilir.

Bu model, öğrenme döngüsünü korur ve Senior'ın üzerindeki "junior eğitme" yükünü, AI'yı bir eğitim aracı olarak kullanarak hafifletir.
*/

---

<header color=cyan>Skills Will Eat AI</header>

<p max-width=60 align=center>
    The hype will fade.
    => <color fg="yellow">Fundamentals</color> will remain the king.
    => Judgment, Context, and Taste cannot be automated.
</p>

<footnote>Source: Skills Will Eat AI Manifesto</footnote>
<qr width=15%>https://skillswilleatai.com</qr>

/* PRESENTER NOTES (TR):
"Skills Will Eat AI" (Beceriler AI'yı Yiyecek) sloganı, sunumun ana mesajlarından biridir. Yapay zeka hype'ı elbet bir gün normalleşecek, geriye ise sadece "temel prensipler" (fundamentals) kalacaktır.

Hangi teknolojinin neden seçildiğini bilmek, karmaşık sistemleri görselleştirebilmek ve insan psikolojisini anlamak... Bunlar otomatize edilemez. Araçlar değişir ama zanaatkarlık baki kalır.

Katılımcılara şu güveni vermeliyiz: Derin teknik bilginiz ve tecrübeniz, yapay zekanın "yakıtıdır". Siz ne kadar iyiyseniz, AI sizin elinizde o kadar güçlü bir silaha dönüşür.
*/

---

<header color=cyan>Context Engineering</header>

<p max-width=60 align=center>
    Prompt Engineering is dead.
    => <color fg="yellow">Context Engineering</color> is the new skill.
    => How you feed your system to the agent matters most.
</p>

/* PRESENTER NOTES (TR):
"Prompt Engineering" (Sihirli kelimeler fısıldama) devri kapandı. Artık mesele, yapay zekaya "bağlamı" (context) nasıl yüklediğinizdir.

Bağlam mühendisliği; kod tabanınızın yapısını, iş kurallarını ve mimari kısıtları yapay zekanın anlayabileceği bir ekosistem haline getirmektir. İyi bir zanaatkar, ajanlarının önüne "doğru bilgiyi" koyan kişidir.

Ajanların neyi bilip neyi bilmediğini yönetmek, kodun kendisini yazmaktan daha kritik hale gelmiştir. "Bilgi Besleme" (Knowledge Priming) yeni kodlamadır.
*/

---

<header color=cyan>The "n=1" Team Rituals</header>

<p max-width=60 align=center>
    Agents don't care about your Jira board.
    => They care about your <color fg="yellow">Evaluations.</color>
    => Move your energy from "Managing People" to "Managing Intent."
</p>

/* PRESENTER NOTES (TR):
Yazılım ekiplerinin ritüelleri evriliyor. Ajanların olduğu bir dünyada Jira biletleri veya hikaye puanları (story points) anlamsızlaşır. Ajanların ihtiyacı olan tek şey, başarıyı ölçebilecekleri "Değerlendirmelerdir" (Evaluations).

Enerjimizi insanları mikromanajmanla yönetmekten, "Niyetleri" yönetmeye kaydırmalıyız. Eğer bir sistemin başarısını net bir şekilde metriklerle (Evals) tanımlayabiliyorsanız, ajanlar o hedefe doğru otonom şekilde koşabilir.

Zanaatkar, artık bir "İş Akışı Tasarımcısı"dır. Sürecin kendisi bir yazılımdır.
*/

---

<header color=cyan>Universal Language (DDD 2.0)</header>

<p max-width=60 align=left>
    AI is the third coming of Domain-Driven Design.

    => If the machine understands your <color fg="yellow">Domain Language,</color>
    it can build your system.
    => Words are the <color fg="cyan">new Legos.</color>
</p>

/* PRESENTER NOTES (TR):
Yapay zeka, Domain-Driven Design (DDD) prensiplerini her zamankinden daha önemli hale getirdi. Makineyle konuşurken kullandığımız kelimeler, aslında sistemin yapı taşlarıdır.

Eğer "Ubiquitous Language" (Ortak Dil) bozuksa, AI'nın ürettiği kod da bozuk olacaktır. Kelimeler artık sadece iletişim aracı değil, yeni nesil "Lego" parçalarıdır.

Zanaatkar, alan uzmanlarıyla kurduğu dili ne kadar netleştirirse, yazılım o kadar zahmetsizce inşa edilir. Yazılım artık "kodlanmaz", "konuşulur".
*/

---

<header color=cyan>The Swiss Cheese Model</header>

<p max-width=60 align=center>
    Trust AI, but verify through <color fg="yellow">Layers.</color>

    => Type Systems.
    => Static Analysis.
    => Automated Testing.
    => Human Oversight.
</p>

/* PRESENTER NOTES (TR):
Havacılık ve tıpta kullanılan "İsviçre Peyniri Modeli", yapay zeka güvenliği için mükemmel bir metafordur. Her bir katmanın (peynir dilimi) delikleri olabilir, ancak katmanları üst üste koyduğunuzda hata geçişi engellenir.

Statik analiz, tip sistemleri ve otomatik testler, AI'nın yapabileceği hataları yakalayan ilk savunma hatlarıdır. İnsan denetimi ise en son ve en kritik katmandır.

Zanaatkar, tek bir katmana güvenmek yerine, birbirini destekleyen bir "güvenlik ekosistemi" kuran kişidir. Güven, doğrulamadan sonra gelir.
*/

---

<header color=yellow>INTERACTIVE: THE ULTIMATE SKILL</header>

<p max-width=60 align=left>
    [QUESTION] What is the #1 skill a "Software Craftsperson 2.0" must master by 2027?
</p>

<ai-sim interval-min=3000 interval-max=5000>
    <ai-step>Correlating job market trends with AI capability growth...</ai-step>
    <ai-step>Analyzing the "Last Mile" problem solving patterns...</ai-step>
    <ai-final>
        <p max-width=60 align=left>
            <color fg="cyan">SYSTEM COMPREHENSION & PROBLEM ANALYSIS.</color>
            You must understand <color fg="yellow">how systems fail</color>
            better than the AI knows <color fg="green">how they work.</color>
        </p>
    </ai-final>
</ai-sim>

/* PRESENTER NOTES (TR):
Son interaktif slaytımızda, geleceğin en kritik becerisini tanımlıyoruz: Sistem Kavrayışı (Comprehension) ve Problem Analizi.

Yapay zeka bir sistemin "nasıl çalışması gerektiğini" istatistiksel olarak bilir. Ancak bir zanaatkar, o sistemin "neden ve nasıl çökebileceğini" sezgisel ve teknik olarak öngörür. Hata anında dedektiflik yapabilmek, kod yazmaktan çok daha değerlidir.

Gelecek, kod yazanların değil, kodun arkasındaki büyük resmi görenlerin ve problemleri henüz oluşmadan analiz edebilenlerin olacaktır.
*/

---

<header color=cyan>Software Craftsmanship 2.0</header>

<p max-width=60 align=left>
    • From <color fg="gray">Working Software</color> to <color fg="yellow">Validated Intent.</color>
    • From <color fg="gray">Responding to Change</color> to <color fg="yellow">Constant Replacement.</color>
    • From <color fg="gray">Customer Collaboration</color> to <color fg="yellow">Product-Minded Engineering.</color>
</p>

/* PRESENTER NOTES (TR):
Zanaatkarlığın yeni manifestosu şekilleniyor. Artık sadece "çalışan yazılım" yetmez; o yazılımın niyetinin doğrulanmış olması gerekir.

"Değişime cevap vermek" yerine, sistemi her gün "yenisiyle değiştirebilme" (Phoenix) kabiliyetini koyuyoruz. Müşteriyle işbirliği yapmak artık sadece "ne istediğini" duymak değil, bir "ürün odaklı mühendis" olarak o ürünün başarısını sahiplenmektir.

Software Craftsmanship 2.0, teknolojiyi değil, insan zekasını ve değer üretimini merkeze koyan bir rönesanstır.
*/

---

<header color=cyan>Final Advice: Be the Editor</header>

<p max-width=60 align=center>
    Don't be the daktilo.
    => Be the <color fg="yellow">Managing Editor</color> of your agent swarm.
    => Curate the output.
    => Defend the <color fg="cyan">Zanaat.</color>
</p>

/* PRESENTER NOTES (TR):
Son tavsiyem: Klavye başında daktilo (typist) olmayı bırakın. Sizler artık birer "Genel Yayın Yönetmeni" (Managing Editor) gibisiniz.

Altınızdaki ajan ordusu sürekli içerik (kod) üretiyor. Sizin göreviniz bu içeriği filtrelemek, kürate etmek ve sadece en kaliteli olanın yayına (production) girmesine izin vermektir.

Zanaatı savunun. Yapay zekanın "ortalama" olanına razı olmayın. Kalite, sizin titizliğinizle korunacaktır.
*/

---

<header color=cyan>The Future is Fun Again</header>

<p max-width=60 align=center>
    No more boilerplate.
    => No more fighting with syntax errors for hours.
    => We are back to <color fg="yellow">pure logic & strategy.</color>
    => This is the <color fg="cyan">Golden Age</color> of Building.
</p>

/* PRESENTER NOTES (TR):
Kapanışta olumlu bir mesaj: Yazılım geliştirme yeniden eğlenceli hale geldi!. Saatlerce "sözdizimi hataları" veya "boilerplate" kodlarla boğuştuğumuz o sıkıcı günler bitti.

Artık saf mantık, strateji ve yaratıcılık dönemindeyiz. Eskiden aylar süren projeleri şimdi günlerle, haftalarla ölçüyoruz. Bu, bir inşacı için "Altın Çağ"dır.

Korkuyu bir kenara bırakın, araçlarınızı kuşanın ve hayalinizdeki sistemleri inşa etmeye başlayın. Yapay zeka sizin rakibiniz değil, zanaatınızı ölçekleyen süper gücünüzdür.
*/

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

/* PRESENTER NOTES (TR):
Sunumu bitirirken katılımcılara teşekkür edin ve onları Software Craftsmanship Manifesto'ya yönlendirin. Terminalden 'exit' yaparak sahneden ayrılmak, sunumun teknik bütünlüğünü tamamlayacaktır.

Zanaatkarlık ölmedi, sadece vites büyüttü. Görüşmek üzere!
*/
```