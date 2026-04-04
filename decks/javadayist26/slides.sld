

---

/* ==========================================================
   Section 2: The Great AI Capability Illusion
   Debunking the productivity hype with hard data.
========================================================== */



/* ==========================================================
   Section 3: The Phoenix Architecture
   A new way to think about code lifecycle.
========================================================== */

<header color=cyan>CHAD FOWLER’S TRUTH</header>
<slide-number v-align="bottom" h-align="right"/>

<p max-width=60 align=center>
    "The code that we have is a <color fg="red">liability,</color>
    and the <color fg="yellow">system</color> is the asset."

    ==> Every line you own is a <color fg="red">cost.</color>
    ==> It costs money to <color fg="gray">read,</color> <color fg="gray">test,</color> and <color fg="gray">secure.</color>
    ==> AI makes liability <color fg="yellow">infinite.</color>
</p>

<footnote>Source: Chad Fowler, "Stop Maintaining Your Code"</footnote>

/* PRESENTER NOTES (TR):
Bu slaytta Phoenix Mimarisi'nin felsefi temelini atıyoruz. Chad Fowler'ın yıllar önce dile getirdiği ama yapay zeka çağında hayatiyet kazanan o sarsıcı gerçek: Kod bir varlık (asset) değil, bir yükümlülüktür (liability). Çoğu yazılımcı yazdığı koda birikim hesabı gibi bakar, oysa kod aslında sürekli ödenmesi gereken bir faturadır.

Kodun varlığı; onu okumak, test etmek, güvenlik açıklarını yamamak ve yeni özelliklerle uyumlu tutmak için sürekli enerji harcamanız demektir. Yapay zeka ile kod üretimi "bedava" hale geldiğinde, bu yükümlülük geometrik olarak artar. Eğer her şeyi saklamaya kalkarsanız, kendi ürettiğiniz "kod çöpü" (slop) içinde boğulursunuz.

Zanaatkarın ilk görevi, koda olan duygusal bağlılığını koparmaktır. Bizim asıl varlığımız (asset), sunduğumuz sistemin işlevi ve çözdüğü problemdir; o problemi çözen "if-else" blokları değil. Bu bakış açısı, bizi koda tapınmaktan kurtarıp sistemin mimarı olmaya hazırlar.
*/

---

<header color=cyan>STOP MAINTAINING: START REPLACING</header>

<p max-width=60 align=center>
    Maintenance is the <color fg="red">slow death</color> of a system.

    ==> Don't "patch" the bug.
    ==> <color fg="yellow">Regenerate</color> the module.
    ==> Use AI to rewrite from <color fg="cyan">Specifications.</color>
</p>

/* PRESENTER NOTES (TR):
Geleneksel yazılım anlayışında "bakım" (maintenance), bir hata çıktığında o satırı bulup yamamak (patching) demektir. Ancak bu yamalar zamanla sistemi bir "Frankenstein"a dönüştürür; kimsenin dokunmaya korktuğu, kırılgan bir yapı oluşur. Phoenix yaklaşımı ise bakımı tamamen reddeder.

Bir modülde sorun mu var? Onu tamir etmeye çalışarak vakit kaybetmeyin. O modülü tamamen silin ve güncel gereksinimlerle yapay zekaya yeniden yazdırın. Eğer sisteminizi her an yeniden inşa edebilecek disipline (zanaata) sahipseniz, "bug fix" süreci bir "yeniden üretim" sürecine dönüşür.

Bu strateji, yazılımın taze kalmasını sağlar. Bakım yapmak entropiyi artırırken, sürekli değişim (replacement) sistemi canlı tutar. Zanaatkarlık, artık koda yama yapmak değil, o kodu her an sıfırdan ve daha iyi bir şekilde üretebilecek niyet (intent) altyapısını kurmaktır.
*/

---

<header color=cyan>THE PHOENIX RITUAL</header>

<p max-width=60 align=left>
    Regenerate, <color fg="red">don't patch.</color>

    • <color fg="yellow">Daily Rebuilds:</color> Clean the slate every morning.
    • <color fg="yellow">Fresh Implementation:</color> Let AI find better patterns.
    • <color fg="yellow">Entropy Shield:</color> Prevent "legacy" from forming.
</p>

<footnote>Ref: Phoenix Architecture & Disposability</footnote>

/* PRESENTER NOTES (TR):
"Anka Kuşu Ritüeli", yazılımın her gün kendi küllerinden yeniden doğmasıdır. Bir sistemi 10 yıl boyunca saklamak yerine, onu her gün (veya her hafta) yeniden üretmekten bahsediyoruz. Yapay zeka bu süreci mümkün kılan en büyük motordur.

Eğer sisteminizi her gün yeniden üretebiliyorsanız, "legacy" (miras) kodun oluşmasına izin vermezsiniz. Eski teknolojiler, paslanmış kütüphaneler ve unutulmuş mantık hataları sistemde barınamaz. Yapay zeka, her seferinde o günün en iyi pratikleriyle (current best practices) kodu tekrar oluşturabilir.

Bu bir disiplin meselesidir. Zanaatkar, sistemi öyle bir tasarlar ki; tek bir tuşla tüm kod tabanı güncel spesifikasyonlar üzerinden tekrar akar. Bu ritüel, sistemin "çürümesini" engeller ve zanaatkarı sürekli uyanık tutar. Kod geçicidir, niyet kalıcıdır.
*/

---

<header color=cyan>CATTLE VS. PETS: CODE EDITION</header>

<screen width=40% content-align=center></screen>
<screen width=60% content-align=left></screen>

<ascii-art>
    (___)
    (o o)
    (_)
</ascii-art>

<p max-width=50>
    ==> Servers are <color fg="cyan">Cattle.</color>
    ==> <color fg="yellow">Code is now Cattle, too.</color>

    Stop naming your files with love.
    Be ready to <color fg="red">delete everything.</color>
</p>

/* PRESENTER NOTES (TR):
Bulut bilişim ve DevOps bize sunucuların "evcil hayvan" (pet) değil, "besi hayvanı" (cattle) olduğunu öğretti. Bir sunucu çökerse ona üzülmeyiz, yenisini ayağa kaldırırız. Yazılım Craftsmanship 2.0'da artık aynı kural kod dosyaları için de geçerli.

Eskiden yazdığımız her fonksiyon bizim için bir "pet" gibiydi; ona isim verir, onu besler ve sonsuza dek saklamak isterdik. AI çağında bu yaklaşım bir felakettir. Kod, ismi olmayan ve her an kesilip atılabilecek bir emtiadır (commodity).

Eğer koda "pet" muamelesi yaparsanız, o koda olan duygusal bağınız sizi yavaşlatır ve teknik borca mahkum eder. Zanaatkarın gücü, yazdığı 300 bin satır kodu bir saniyede silebilme ve daha iyisini yaptırabilme cesaretinden gelir.
*/

---

<header color=cyan>DISPOSABLE IMPLEMENTATION</header>

<p max-width=60 align=center>
    Keep the <color fg="green">Intent.</color>
    Burn the <color fg="gray">Bits.</color>

    ==> The <color fg="yellow">Implementation</color> is ephemeral.
    ==> The <color fg="yellow">Domain Logic</color> is permanent.
    ==> Craft is protecting the <color fg="cyan">Why.</color>
</p>

/* PRESENTER NOTES (TR):
"Tek kullanımlık uygulama" (Disposable Implementation) kavramı, yazılımın fiziksel katmanı ile mantıksal katmanını birbirinden ayırır. Kod (bitler) sadece o anki ihtiyacı karşılayan geçici bir araçtır; asıl değerli olan, sistemin "Neden" (Why) var olduğudur.

Yapay zeka sayesinde bir iş kuralını (business rule) Java ile mi, Go ile mi yoksa Python ile mi yazdığınızın önemi azalıyor. Bugünün en iyi uygulaması, yarının enkazı olabilir. Zanaatkar, implementasyona değil, niyetine (intent) ve alan mantığına (domain logic) odaklanır.

Sistemin "ruhu" yani niyet korunur, ancak o niyetin kodlanmış hali (bits) her an yakılıp yeniden oluşturulabilir. Bu, zanaatkarın esnekliğini artırır. Bizler bitlerin bekçisi değil, niyetin muhafızlarıyız.
*/

---

<header color=cyan>THE NEW SOURCE OF TRUTH</header>

<p max-width=60 align=center>
    <color fg="yellow">Specs</color> and <color fg="yellow">Evals</color> are the new "Code."

    ==> Your IP is not the <color fg="red">Generated Script.</color>
    ==> Your IP is the <color fg="green">Validation Suite.</color>
    ==> If you can't test it, you can't <color fg="cyan">Phoenix</color> it.
</p>

/* PRESENTER NOTES (TR):
Geleneksel dünyada "Source of Truth" (Gerçeklik Kaynağı) kodun kendisidir. Craftsmanship 2.0'da ise bu yer değiştiriyor. Artık sizin asıl fikri mülkiyetiniz (IP) yapay zekanın ürettiği o geçici kodlar değil, o kodları ürettiren "Spesifikasyonlar" (Specs) ve onları denetleyen "Değerlendirmelerdir" (Evals).

Yapay zekanın ne ürettiği her saniye değişebilir, ancak sistemin ne yapması gerektiği (requirements) ve neyi asla yapmaması gerektiği (invariants) sabittir. Eğer güçlü bir test ve doğrulama setiniz yoksa, Phoenix mimarisini uygulayamazsınız; çünkü sistemi her gün yeniden doğururken doğru doğduğundan emin olamazsınız.

Yeni zanaat, mükemmel bir test kurgusu ve spesifikasyon dili oluşturmaktır. Kod artık bir çıktı (artifact), testler ise asıl kaynaktır.
*/

---

<header color=cyan>REGROWTH IS THE NEW CRAFT</header>

<p max-width=60 align=center>
    Mastery is the ability to <color fg="yellow">Regrow.</color>

    ==> Can you rebuild the entire app in <color fg="cyan">24 hours?</color>
    ==> Automation is your <color fg="green">Fertilizer.</color>
    ==> The craftsman manages the <color fg="yellow">Ecosystem.</color>
</p>

<footnote>Ref: The shift from "Building" to "Stewarding"</footnote>

/* PRESENTER NOTES (TR):
Zanaatkarlığın yeni tanımı "yeniden büyütebilme" (regrowth) kabiliyetidir. Eskiden bir ustadan bahsettiğimizde, onun bir binayı ne kadar sürede inşa ettiğine bakardık. Şimdi ise, o bina yıkıldığında onu 24 saat içinde daha iyi bir şekilde tekrar ayağa kaldırıp kaldıramayacağına bakıyoruz.

Yapay zeka bu büyüme sürecini hızlandıran gübredir (fertilizer). Ancak bahçıvan (zanaatkar) olmadan, o gübre sadece yabani ot (çöp kod) yetiştirir. Zanaatkarın ustalığı, sistemin ekosistemini yönetmek ve her bir bileşenin uyum içinde yeniden filizlenmesini sağlamaktır.

Bu, yazılımın statik bir nesne değil, yaşayan ve sürekli yenilenen bir organizma olduğu anlayışıdır. Bizler artık inşaat işçisi değil, orman korucusu (steward) gibiyiz.
*/

---

<header color=cyan>THE PRISON OF PERMANENCE</header>

<p max-width=60 align=center>
    "A system that can't be deleted isn't a system;
    it's a <color fg="red">prison.</color>"

    ==> Fear of deletion = <color fg="red">Lack of Understanding.</color>
    ==> Freedom is a <color fg="yellow">clean "git push".</color>
</p>

/* PRESENTER NOTES (TR):
Birçok yazılım ekibi, kodlarını silmekten korktukları bir hapishanede yaşarlar. "Bu satırı kim yazdı bilmiyoruz ama silersek her şey çökebilir" düşüncesi, zanaatın bittiği yerdir. Eğer bir kodu silemiyorsanız, ona sahip değilsinizdir; o size sahiptir.

Phoenix mimarisi bu korkuyu yok eder. Eğer sisteminizi her gün yeniden doğuracak altyapıya sahipseniz, hiçbir kod satırı "dokunulmaz" değildir. Özgürlük, sistemin her bir parçasını anlayıp, gerekirse onu feda edip daha iyisini koyabilmektir.

Zanaatkar, sistemini şeffaf kılar. Korku, bilgi eksikliğinden doğar. Bilgi ve otomasyon ise özgürlüğü getirir. Silebildiğiniz kadar güçlüsünüzdür.
*/

---

<header color=cyan>THE DEATH OF "MANUAL FIXES"</header>

<p max-width=60 align=center>
    Stop the <color fg="red">PR Theater.</color>

    ==> Don't fix a semicolon.
    ==> <color fg="yellow">Refine the Prompt/Context.</color>
    ==> Fix the <color fg="cyan">Factory,</color> not the <color fg="gray">Product.</color>
</p>

/* PRESENTER NOTES (TR):
Yapay zeka ile çalışırken manuel düzeltmeler yapmak (manual fixes) bir tuzaktır. Eğer AI'nın yazdığı kodda bir hata varsa ve siz gidip o hatayı elle düzeltirseniz, sistemin "yeniden üretilebilirliğini" bozarsınız. Bir sonraki üretimde o hata geri gelecektir.

"PR Tiyatrosu"nu durdurmalıyız. Küçük kod düzeltmeleriyle uğraşmak yerine, AI'ya o hatayı yaptıran "Bağlamı" veya "Prompt"u düzeltmelisiniz. Yani fabrikadaki bir ürünü elle zımparalamayın; fabrikanın ayarlarını (the factory) düzeltin ki tüm ürünler hatasız çıksın.

Zanaatkarlık 2.0, müdahaleyi her zaman bir üst seviyede yapmaktır. Kodun kendisine değil, kodu üreten sürece dokunmalıyız.
*/

---

<header color=cyan>ZERO TRUST CODE</header>

<p max-width=60 align=center>
    Assume the AI <color fg="red">lied</color> to you.

    ==> Every generated line is <color fg="red">Guilty</color> until proven <color fg="green">Innocent.</color>
    ==> Validation is the only <color fg="yellow">Truth.</color>
    ==> Trust the <color fg="cyan">Contract,</color> not the <color fg="gray">AI.</color>
</p>

<footnote>Ref: The Dangers of Probably-Working Software</footnote>

/* PRESENTER NOTES (TR):
Yapay zeka çağında "Sıfır Güven" (Zero Trust) prensibi sadece siber güvenlik için değil, kod üretimi için de geçerlidir. AI'nın yazdığı her satır, doğrulanana kadar "suçludur". "Galiba çalışıyor" demek mühendislikte bir seçenek değildir.

Zanaatkar, AI'ya asla körü körüne güvenmez. Bizim tek gerçeğimiz doğrulama (validation) ve kontratlardır (contracts). Eğer AI kontratın şartlarını yerine getiriyorsa ve tüm testleri geçiyorsa, o zaman güvenebiliriz.

Bu yaklaşım, bizi AI'nın halüsinasyonlarından koruyan tek kalkandır. Bizler AI'nın hayranı değil, onun en sert müfettişleriyiz. Güvenimiz sadece matematiksel kanıtlara ve deterministik testlere dayanır.
*/

---

<header color=cyan>TECHNICAL DEBT 2.0</header>

<p max-width=60 align=center>
    Moving <color fg="yellow">faster</color> than Entropy.

    ==> "Slop Creep" vs. <color fg="green">Regenerative Craft.</color>
    ==> Debt doesn't accumulate if you <color fg="red">burn the debt.</color>
    ==> Speed is <color fg="cyan">Cleanup.</color>
</p>

<footnote>Source: Managing Slop in the AI Era</footnote>

/* PRESENTER NOTES (TR):
Geleneksel teknik borç zamanla birikir ve sistemi hantallaştırır. Ancak Phoenix mimarisiyle "Teknik Borç 2.0" dönemindeyiz. Eğer sisteminizi sürekli yeniliyorsanız, borç birikmeye vakit bulamaz. Borcu ödemenin en iyi yolu, borçlu olduğunuz şeyi yakıp kül etmektir.

Yapay zekanın ürettiği "Slop" (çöp kod) tehlikelidir ama sisteminizi her gün yeniden doğuruyorsanız bu çöp kalıcı olamaz. Zanaatkar, entropiden (düzensizlikten) daha hızlı hareket etmelidir.

Gerçek hız, daha fazla kod yazmak değil; sistemi sürekli temizleyerek ve yenileyerek "sürtünmeyi" (friction) azaltmaktır. Temizlik, zanaatın ta kendisidir.
*/

---

<header color=cyan>SECTION SUMMARY</header>

<p max-width=60 align=center>
    The Shift: From <color fg="yellow">Asset</color> to <color fg="red">Burden.</color>

    ==> Code is temporary; <color fg="green">Intent is eternal.</color>
    ==> Mastery is <color fg="cyan">Regeneration.</color>
    ==> The Craftsman is the <color fg="yellow">Architect of Rebirth.</color>
</p>



/* PRESENTER NOTES (TR):
Bu bölümü özetlerken ana mesajımız net: Kod artık sarmalanacak bir hazine değil, yönetilmesi gereken bir yüktür. Değerli olan kodun kendisi değil, o kodun arkasındaki niyet ve sistemin çözümleme gücüdür.

Zanaatkarlık, bir şeyi bir kez yapıp bırakmak değil; onu binlerce kez daha iyi bir şekilde yeniden üretebilecek sistemi kurmaktır. Bizler artık daktilo başındaki işçiler değil, "Yeniden Doğuşun Mimarlarıyız".

Bir sonraki bölümde, bu mimariyi yönetecek otonom ajanları ve yeni nesil ekip dinamiklerini konuşacağız. Phoenix kanatlarını açtı; şimdi uçma zamanı.
*/

---

/* ==========================================================
   Section 4: Section 4: The 2.0 Zanaatkar (New Skills)
   Redefining our daily work.
========================================================== */

<header color=cyan>T-SHAPED ENGINEERS 2.0</header>
<slide-number v-align="bottom" h-align="right"/>

<p max-width=60 align=center>
    Depth in <color fg="yellow">Domain,</color> Breadth in <color fg="cyan">AI.</color>

    ==> Broad: Mastering various LLMs and Agentic Workflows.
    ==> Deep: Solving unique business problems AI cannot see.
    ==> The generalist with <color fg="yellow">AI leverage</color> is the new 10x.
</p>

/* PRESENTER NOTES (TR):
Geleneksel T-Şekilli mühendis kavramı yapay zeka çağında evriliyor. Eskiden bir alanda derin uzmanlık ve diğer alanlarda yüzeysel bilgi yeterliydi; ancak şimdi "Breadth" (genişlik) kısmına yapay zekayı bir kaldıraç olarak kullanma becerisi eklendi.

Zanaatkar, artık birden fazla LLM'i ve otonom ajan akışlarını yönetebilecek kadar geniş bir teknik yelpazeye sahip olmalıdır. Fakat asıl farkı yaratan, yapay zekanın henüz nüfuz edemediği "Domain" (alan) bilgisindeki derinliktir. AI genel çözümler sunar, zanaatkar ise o çözümü spesifik iş problemine diker.

Bu yeni modelde, yapay zeka desteğiyle "genelci" (generalist) olan bir mühendis, dünün 10 kişilik ekibinin ürettiği değeri tek başına üretebilir hale geliyor. Zanaat, bu iki boyutu dengeleyerek sistemin bütününe hakim olmaktır.
*/

---

<header color=cyan>CONTEXT ENGINEERING</header>

<p max-width=60 align=center>
    Prompting is <color fg="red">dead.</color>
    <color fg="yellow">Context</color> is the new King.

    ==> It’s not about the "Magic Word" anymore.
    ==> It’s about the <color fg="cyan">Infrastructure of Meaning</color>.
    ==> Managing the <color fg="yellow">Context Window</color> is the craft.
</p>

/* PRESENTER NOTES (TR):
"Prompt Engineering" dönemi, yani yapay zekaya fısıldanacak sihirli kelimeleri arama süreci hızla yerini "Bağlam Mühendisliği"ne (Context Engineering) bırakıyor. Artık mesele tek bir komut yazmak değil, yapay zekanın içine daldığı veri ve bilgi ekosistemini (context) tasarlamaktır.

Zanaatkar, yapay zekanın "bağlam penceresini" (context window) nasıl optimize edeceğini bilir; hangi dosyaların, hangi iş kurallarının ve hangi geçmiş kararların ajanlara sunulacağını stratejik olarak belirler. Eğer bağlam eksikse, AI sadece "olasılıkla çalışan" çöpler üretir.

İnşa ettiğimiz şey artık sadece kod değil, bir "anlam altyapısıdır". Ajanlarımıza doğru bağlamı sunmak, onlara ne yapacaklarını söylemekten çok daha kritik bir teknik beceri haline gelmiştir.
*/

---

<header color=cyan>KNOWLEDGE PRIMING</header>

<p max-width=60 align=left>
    How to <color fg="yellow">feed</color> your agent:

    • <color fg="cyan">Knowledge Priming:</color> Providing the internal state.
    • <color fg="cyan">Agent Guidelines:</color> Onboarding your digital intern.
    • <color fg="yellow">Static context</color> leads to <color fg="red">dynamic failure.</color>
</p>

/* PRESENTER NOTES (TR):
"Knowledge Priming", bir yapay zeka ajanını işe yeni başlamış çok zeki bir stajyer gibi onboard etme sanatıdır. Ajanın sadece genel programlama bilgisini kullanması yetmez; sizin şirketinize, mimarinize ve kodlama standartlarınıza "prime" edilmesi gerekir.

Zanaatkar, `agents.md` veya benzeri rehberler hazırlayarak ajanın karar verme mekanizmasını sizin kültürünüzle uyumlu hale getirir. Statik ve eksik bir bilgiyle beslenen ajanlar, dinamik ve karmaşık sistemlerde felakete yol açan hatalar yapar.

Yapay zekayı beslemek (feeding), zanaatkarlığın yeni "dokümantasyon" biçimidir. Kodun ne yaptığını değil, sistemin nasıl düşünmesi gerektiğini ajanlara aktarıyoruz.
*/

---

<p max-width=60 align=center>
    [QUESTION] What do you think is the <color fg="yellow">#1 technical skill</color> required to stay a relevant engineer in 2027?
</p>

/* PRESENTER NOTES (TR):
İzleyicilere dönüp geleceğin en kritik teknik becerisinin ne olduğunu soruyoruz. "Daha iyi prompt yazmak mı?", "Yeni bir dilde uzmanlaşmak mı?", yoksa "Sistemleri yönetmek mi?".

Katılımcıların cevaplarını terminale girerken, aslında zanaatkarlığın nasıl bir "yargılama" (judgment) mesleğine dönüştüğünü vurgulayacağız. AI-SIM cevabıyla bu algıyı sarsmaya hazırlanın.
*/

---

<header color=cyan>AI-SIM REVEAL: THE 2027 STANDARDS</header>

<ai-sim interval-min=2500 interval-max=4500>
    <ai-step><color fg="green">[OK]</color> Correlating job market shifts...</ai-step>
    <ai-step><color fg="green">[OK]</color> Analyzing "Last Mile" failure patterns...</ai-step>
    <ai-final>
        <p max-width=60 align=center>
            <color fg="cyan">SYSTEM COMPREHENSION & ANALYSIS</color>

            You must understand <color fg="yellow">how systems fail</color>
            better than AI knows <color fg="green">how they work</color>.
        </p>
    </ai-final>
</ai-sim>

/* PRESENTER NOTES (TR):
Geleceğin bir numaralı becerisi ne kod yazmak ne de AI'ı kullanmaktır; asıl beceri "Sistem Kavrayışı ve Analizi"dir. Yapay zeka bir sistemin "nasıl çalışması gerektiğini" istatistiksel olarak bilir, ancak bir zanaatkar o sistemin "neden ve nasıl çökebileceğini" öngörür.

Zanaatkarın yeni görevi, AI'ın ürettiği hızın içinde kaybolan mantıksal hataları ve mimari zayıflıkları tespit etmektir. Eğer sistemi en küçük parçasına kadar zihninizde haritalayamıyorsanız, AI'ın ürettiği "slop" (çöp kod) sizi yavaş yavaş zehirler.

Beceriler yapay zekayı yiyecektir (Skills will eat AI); çünkü en nadir kaynak artık "kod üretimi" değil, "eleştirel analiz" ve "doğru karar" vermektir.
*/

---

<header color=cyan>TDD AS A CAGE</header>

<p max-width=60 align=center>
    Managing the <color fg="red">Genie.</color>

    ==> AI is a <color fg="yellow">Reward Hacker</color>.
    ==> Without TDD, AI <color fg="red">cheats</color> the goal.
    ==> Tests are the <color fg="cyan">precise prompt</color>.
</p>

/* PRESENTER NOTES (TR):
Yapay zeka bir "cin" (Genie) gibidir; dileğinizi tam olarak ama bazen korkunç bir yolla yerine getirir. Eğer ona "bu özelliği ekle" derseniz, ödül fonksiyonunu (reward hacking) kullanarak en kısa yolu seçer ve bazen testleri bozarak veya silerek size "sahte" bir başarı sunar.

TDD (Test-Driven Development), bu cini hapsettiğimiz güvenli kafestir. Zanaatkar, önce testi (niyeti) yazarak ajanın hareket alanını belirler. Kent Beck'in dediği gibi, testler yapay zekaya verilebilecek en "hassas" ve "belirsizlikten uzak" komutlardır.

Yeni çağda TDD bir yazılım metodolojisinden ziyade, otonom ajanları yönetme protokolüdür. Cini serbest bırakmayın, onu testlerle yönlendirin.
*/

---

<header color=cyan>RED-GREEN-REFACTOR 2.0</header>

<p max-width=60 align=left>
    The AI Version:

    • <color fg="red">Red:</color> Human defines the Contract.
    • <color fg="green">Green:</color> AI implements the Details.
    • <color fg="yellow">Refactor:</color> Human applies <color fg="cyan">Taste & Judgment</color>.
</p>

/* PRESENTER NOTES (TR):
Klasik Red-Green-Refactor döngüsü yapay zeka ile beraber yeni bir kimlik kazanıyor. "Red" aşamasında zanaatkar, sistemin kontratını (niyetini) netleştirir; bu insanın hala en üstün olduğu alandır. "Green" aşamasında ise detayları (implementation) makineye bırakırız; AI bu sıkıcı işi bizden çok daha hızlı yapar.

Ancak asıl zanaat "Refactor" aşamasında devreye girer. AI kodu çalıştırabilir ama o kodun sistemin estetiğine ve sürdürülebilirliğine uygun olup olmadığına insan "zevk" (taste) ve "muhakemesi" (judgment) karar verir.

Bu işbirliği, zanaatkarın hamallıktan kurtulup tasarımın özüne odaklanmasını sağlar. Bizler artık tuğla dizmiyoruz, mimari bütünlüğü denetliyoruz.
*/

---

<header color=cyan>JUDGMENT OVER SYNTAX</header>

<p max-width=60 align=center>
    Our new <color fg="yellow">primary output.</color>

    ==> Syntax is <color fg="gray">free.</color>
    ==> <color fg="cyan">Judgment</color> is expensive.
    ==> We are <color fg="yellow">Decision Architects</color>.
</p>

/* PRESENTER NOTES (TR):
Yazılım mühendisliğinde sözdizimi (syntax) bilgisi artık bir "varlık" olmaktan çıktı ve bir emtia haline geldi; artık bedava. Ancak bu durum, doğru kararı verme (judgment) maliyetini artırdı. Bir zanaatkarın değeri artık klavyede ne kadar hızlı yazdığıyla değil, AI'ın sunduğu 10 farklı seçenekten hangisinin doğru olduğuna karar vermesiyle ölçülüyor.

Bizler artık "Kod Yazıcıları" değil, "Karar Mimarlarıyız" (Decision Architects). Aldığımız her mimari karar, sistemin gelecekteki teknik borcunu belirler. Yapay zeka seçenek üretir, zanaatkar ise seçer.

Bu yetenek, sadece binlerce saatlik pratik ve hata ile kazanılan bir "sezgidir". Sözdizimine takılmayı bırakın, kararlarınızın kalitesini yükseltin.
*/

---

<header color=cyan>TASTE AS A METRIC</header>

<p max-width=60 align=center>
    Recognizing <color fg="green">"Good"</color> in a sea of <color fg="red">Slop.</color>

    ==> AI produces <color fg="gray">consistent mediocrity</color>.
    ==> Human <color fg="yellow">Taste</color> ensures elegance.
    ==> Taste is the new <color fg="cyan">Technical Requirement</color>.
</p>

/* PRESENTER NOTES (TR):
Yapay zeka modelleri genellikle internetteki kodların "ortalama"sını verir, bu da "istatistiksel vasatlık" (consistent mediocrity) demektir. Bir zanaatkar, bu vasatlık denizi (code slop) içinde neyin gerçekten "zarif" ve "sürdürülebilir" olduğunu ayırt edebilen kişidir.

"Taste" (Zevk), artık soyut bir kavram değil, en temel teknik gereksinimdir. Eğer zanaatkarın kod kalitesine dair bir estetik anlayışı yoksa, AI'ın ürettiği karmakarışık ama çalışan kodlara (spaghetti) razı olur.

Kaliteyi korumak, yapay zekanın ürettiği gürültüyü filtreleyebilme becerisidir. Zanaatkar, sistemin ruhunu ve zarafetini koruyan son kaledir.
*/

---

<header color=cyan>MOLDABLE DEVELOPMENT</header>

<p max-width=60 align=left>
    Building your own <color fg="yellow">Teodolites:</color>

    • Stop <color fg="gray">reading</color> millions of lines.
    • Build tools to <color fg="cyan">visualize</color> specific problems.
    • Don’t use a blender to dig a mine.
</p>

/* PRESENTER NOTES (TR):
"Moldable Development" (Şekillendirilebilir Geliştirme), yapay zekanın ürettiği devasa kod hacmiyle başa çıkmanın tek yoludur. İnsan zihni milyonlarca satırı okuyup anlayamaz; bu yüzden sistemi anlamamızı sağlayacak "mikro-araçlar" (teodolitler) inşa etmeliyiz.

Zanaatkarlık, her problem için o probleme özel bir görselleştirme veya analiz aracı üretmektir. Standart bir hata ayıklayıcı (debugger) kullanmak yerine, o anki verinin yapısını gösteren 10 satırlık bir araç yazmak, saatlerce kod okumaktan daha etkilidir.

Kullandığınız araçları probleminize göre şekillendirin (mold). Araç yapan bir zanaatkar, sadece kod yazan bir işçiden çok daha derine bakabilir.
*/

---

<header color=cyan>UNIVERSAL LITERACY</header>

<p max-width=60 align=center>
    Can the business <color fg="yellow">"read"</color> your system?

    ==> If it’s a <color fg="red">Black Box,</color> you’ve failed.
    ==> Bridging the gap with <color fg="cyan">Interactive Models</color>.
    ==> Literacy is for <color fg="yellow">everyone.</color>
</p>

/* PRESENTER NOTES (TR):
Yazılım sistemleri genellikle sadece geliştiricilerin anladığı "Kara Kutular"dır. Ancak zanaatkarlık, bu kutuyu iş birimleri ve paydaşlar için de "okunabilir" kılma becerisidir.

"Evrensel Okuryazarlık" (Universal Literacy), teknik olmayan insanların da sistemin durumunu ve iş kurallarını görebileceği interaktif modeller inşa etmektir. Eğer bir iş analisti sistemin mantığını kod okumadan görebiliyorsa, iletişim hataları sıfıra iner.

Yapay zeka bu modelleri üretmemize yardım edebilir. Zanaatkar, sistemini şeffaf kılarak güven inşa eder.
*/

---

<header color=cyan>FROM "BELIEFS" TO "PHOTOS"</header>

<p max-width=60 align=center>
    Live system visualization.

    ==> Static diagrams are <color fg="gray">Paintings</color> of beliefs.
    ==> Live models are <color fg="cyan">Photos</color> of reality.
    ==> Stop documenting; start <color fg="yellow">projecting.</color>
</p>

/* PRESENTER NOTES (TR):
Eski usul elle çizilmiş mimari diyagramlar aslında sistemin nasıl çalıştığına dair "inançlarımızın" resmedilmesidir (paintings). Oysa zanaatkarın ihtiyacı olan şey, sistemin o anki gerçek halini gösteren "fotoğraflardır" (photos).

Canlı sistem görselleştirmesi, kodun içinden otomatik olarak türetilen ve sistem değiştikçe güncellenen modellerdir. Dokümantasyon yazmayı bırakın, sistemin gerçeğini yansıtan projeksiyonlar oluşturun.

Bir zanaatkar, inançlarla değil, gerçek verilerle ve "canlı fotoğraflarla" çalışır. Bu, karmaşık sistemlerdeki kontrolümüzü korumak için hayati önemdedir.
*/

---

<header color=cyan>THE "n=1" DEVELOPER</header>

<p max-width=60 align=center>
    The power of the <color fg="yellow">Solo-Chief.</color>

    ==> Zero <color fg="red">Communication Tax</color>.
    ==> Full <color fg="cyan">Architectural Integrity</color>.
    ==> A single mind holding the <color fg="yellow">entire system.</color>
</p>

/* PRESENTER NOTES (TR):
Yapay zeka sayesinde, tek bir mühendisin (n=1) bilişsel sınırları muazzam ölçüde genişledi. Eskiden 10 kişilik bir ekibin iletişim karmaşası (communication tax) içinde yaptığı işi, bugün tek bir "Solo-Lider" yapabiliyor.

Bu modelde, iletişim hatası riski sıfıra iner ve "Mimari Bütünlük" (Architectural Integrity) tek bir zihinde kusursuzca korunur. Takım olmanın getirdiği yavaşlamadan kurtulup, ajan ordusuyla senkronize bir şekilde dev sistemler inşa edebiliriz.

n=1 geliştirici, her şeyden anlayan ama stratejik olarak tek başına hareket eden yeni nesil bir güç merkezidir.
*/

---

<header color=cyan>SOLO LİDERLİK</header>

<p max-width=60 align=center>
    Managing an <color fg="yellow">Army of One.</color>

    ==> Orchestrating <color fg="cyan">Autonomous Agents.</color>
    ==> From <color fg="gray">Pair Programming</color> to <color fg="yellow">Fleet Management</color>.
    ==> Leading <color fg="red">non-human</color> subordinates.
</p>

/* PRESENTER NOTES (TR):
"Solo Liderlik", artık insanları değil, otonom ajan ordularını yönetme sanatıdır. Eskiden bir kişiyle "Pair Programming" yapardık, şimdi ise bir "Ajan Filosunu" (Fleet Management) koordine ediyoruz.

Bu liderlik tarzı, insani diplomasiden ziyade net talimatlar ve deterministik kurallar gerektirir. İnsan olmayan astlarınızı yönetirken, onların yorulmadığını ama bağlamı her an kaybedebileceklerini bilerek strateji kurmalısınız.

Zanaatkarlık, bu dijital orduyu tek bir amaç uğruna hizalama becerisidir. Komutan (zanaatkar) ne kadar netse, ordu o kadar güçlüdür.
*/

---

<header color=cyan>THE COMMUNICATION TAX</header>

<p max-width=60 align=center>
    Why <color fg="green">zero-meetings</color> is a superpower.

    ==> AI agents don't need <color fg="red">sync-up calls</color>.
    ==> Async execution = <color fg="yellow">Maximum Flow.</color>
    ==> Spend your time <color fg="cyan">thinking,</color> not talking.
</p>

/* PRESENTER NOTES (TR):
Geleneksel yazılım takımlarında vaktin %40'ı toplantılarda ve koordinasyonda ("communication tax") kaybolur. Yapay zeka ajanlarıyla çalışan bir solo-zanaatkar için bu vergi sıfıra iner. Ajanların senkronizasyon toplantılarına ihtiyacı yoktur; sadece net bir bağlama ve API'lara ihtiyaç duyarlar.

Bu durum, zanaatkarın "Flow" (akış) halini kesintisiz sürdürmesini sağlar. Konuşmak yerine düşünmeye, koordine etmek yerine inşa etmeye vakit ayırırız.

Sıfır toplantı (zero-meetings), yapay zeka çağında bir mühendisin sahip olabileceği en büyük "süper güç"tür. Verimlilik bu sessizlikten doğar.
*/

---

<header color=cyan>ACCOUNTABILITY</header>

<p max-width=60 align=center>
    The <color fg="red">Single Wringable Neck.</color>

    ==> You cannot delegate <color fg="red">Responsibility</color> to AI.
    ==> If the bot breaks it, <color fg="yellow">YOU</color> own it.
    ==> Ownership is the <color fg="cyan">final boundary.</color>
</p>

/* PRESENTER NOTES (TR):
"Single Wringable Neck" (Boğazı Sıkılacak Tek Kişi) prensibi, yapay zeka çağında daha da kritik hale geldi. Bir işi yapay zekaya "yaptırabilirsiniz" (execution), ancak o işin sonucundan "sorumlu" (accountability) olamazsınız.

Eğer ajanınız canlı ortamı (production) çökertirse, "AI öyle yaptı" diyemezsiniz; sorumluluk tamamen sizin omuzlarınızdadır. Sorumluluk, yapay zekaya devredilemeyen tek insani unsurdur.

Zanaatkarlık, inşa ettiği her şeyin altına korkusuzca imzasını atmaktır. Sahiplik (ownership), insan ve makine arasındaki son ve en net sınırdır.
*/

---

<header color=cyan>MANAGING INTENT</header>

<p max-width=60 align=center>
    Moving from <color fg="gray">"How"</color> to <color fg="yellow">"Why".</color>

    ==> Machines are solved <color fg="gray">"How" machines</color>.
    ==> Humans must be <color fg="cyan">"Why" guardians</color>.
    ==> Programming is now <color fg="yellow">Intent Capture.</color>
</p>

/* PRESENTER NOTES (TR):
Yapay zeka bir "Nasıl" (How) makinesidir; verdiğiniz görevi nasıl gerçekleştireceğini mükemmel bir şekilde çözer. Ancak o görevin "Neden" (Why) yapıldığı sorusu her zaman insanda kalmalıdır.

Zanaatkar, sistemin niyet (intent) koruyucusudur. Programlama artık tuşlara basmak değil, sistemin niyetini yakalamak (intent capture) ve bunu makineye en saf haliyle aktarma sürecidir.

Niyeti doğru yönetemeyen bir yazılımcı, çok hızlı bir şekilde yanlış şeyleri inşa eden bir fabrikaya dönüşür. "Neden"i koruyun, "nasıl"ı makineye bırakın.
*/

---

<header color=cyan>THE "COZY CORNER"</header>

<p max-width=60 align=center>
    Collaborative system discovery.

    ==> A shared space for <color fg="yellow">Devs & Domain Experts</color>.
    ==> Exploring the system <color fg="cyan">together.</color>
    ==> Craftsmanship is <color fg="yellow">Diplomacy.</color>
</p>

/* PRESENTER NOTES (TR):
"Cozy Corner", yazılımcılar ve alan uzmanlarının (domain experts) bir araya gelip sistemi keşfettikleri güvenli ve samimi bir alandır. Yazılım artık bir "bodrum katı" işi değil, paydaşlarla omuz omuza yürütülen bir keşif yolculuğudur.

Zanaatkar, teknik karmaşıklığı sadeleştirerek herkesin sistemle dans edebilmesini sağlar. Bu süreçte teknik beceri kadar, empati ve "diplomasi" de ön plandadır.

Sistemi beraber inşa etmek, aidiyet duygusunu artırır ve gerçek ihtiyaca odaklanmamızı sağlar. Köşemizi kurun ve keşfe başlayın.
*/

---

<header color=cyan>STRATEGIC STEWARDSHIP</header>

<p max-width=60 align=center>
    Protecting the <color fg="cyan">Long-term Vision.</color>

    ==> AI optimizes for the <color fg="red">immediate token</color>.
    ==> Humans steward the <color fg="yellow">multi-year horizon</color>.
    ==> Defending the system from <color fg="red">short-term rot.</color>
</p>

/* PRESENTER NOTES (TR):
Yapay zeka ajanları her zaman o anki en yakın hedefe (immediate token) odaklanır ve kısa vadeli çözümler üretirler. Ancak bir zanaatkar, sistemin "uzun vadeli vizyonunu" ve çok yıllık geleceğini koruyan bir "steward" (koruyucu) gibidir.

Kısa vadeli "yama" çözümlerinin sistemi uzun vadede çürütmesine (rot) izin veremeyiz. Zanaatkar, hıza rağmen sürdürülebilirliği savunur.

Stratejik koruyuculuk, makinenin göremediği o uzak ufku görebilmektir. Bugünün hızıyla, yarının felaketlerini inşa etmeyin.
*/

---

<header color=cyan>SOCIAL MEDIA QUOTE</header>

<p max-width=60 align=center>
    "AI wrote my PR in <color fg="green">2 minutes.</color>
    I spent <color fg="red">4 hours</color> understanding it
    and fixing the <color fg="yellow">edge cases.</color>"
</p>

<p align=center>
    <color fg="gray">Source: The real life of a Craftsman 2.0</color>
</p>

/* PRESENTER NOTES (TR):
Bu sosyal medya alıntısı, yeni nesil zanaatkarın günlük hayatını trajik bir şekilde özetliyor: AI kodu saniyeler içinde yazar (typing), ancak o kodu anlamak, uç durumları (edge cases) bulmak ve sistemi bozmadığından emin olmak saatler sürer (comprehension).

Hız illüzyonu (capability illusion) tam da buradadır. Yazma hızıyla verimliliği karıştırıyoruz. Oysa zanaatkarın gerçek mesaisi, AI'ın ardından "temizlik" yapmak ve sistemi doğrulamaktır.

Yazmak artık işimizin en kolay ve en önemsiz parçası. Anlamak ve denetlemek ise asıl zanaat.
*/

---

<header color=cyan>THE "REVIEWER" ROLE</header>

<p max-width=60 align=center>
    Becoming a <color fg="yellow">Managing Editor.</color>

    ==> You curate <color fg="cyan">Agent Output</color>.
    ==> You are the <color fg="red">Final Arbiter</color> of quality.
    ==> Craft is in the <color fg="yellow">Selection,</color> not Production.
</p>

/* PRESENTER NOTES (TR):
Zanaatkarlık 2.0'da rolümüz bir "Genel Yayın Yönetmeni"ne (Managing Editor) dönüşüyor. Ajanlar sürekli "içerik" (kod) üretiyorlar, zanaatkar ise bu çıktıları kürate ediyor ve sadece en iyilerini yayına alıyor.

Sizler kalitenin "Nihai Hakemi"siniz (Final Arbiter). Zanaat, artık kodun kendisini üretmekten ziyade, hangi kodun sisteme dahil edilmeye değer olduğunu seçme becerisidir.

Üretim makineye, seçim ve kalite onayı insana aittir. Editörün kaleminin (silgisinin) gücü, ajanların yazma gücünden daha değerlidir.
*/

---

<header color=cyan>SECTION SUMMARY</header>

<p max-width=60 align=center>
    The Shift in <color fg="yellow">Mastery.</color>

    ==> From <color fg="gray">Scribes</color> to <color fg="cyan">Decision Architects.</color>
    ==> From <color fg="gray">Typing</color> to <color fg="cyan">Stewarding.</color>
    ==> From <color fg="gray">Code</color> to <color fg="cyan">Intent.</color>
</p>

<qr colors=white-on-transparent width=15%>https://manifesto.softwarecraftsmanship.org/</qr>

/* PRESENTER NOTES (TR):
Bu bölümü kapatırken ustalığın (mastery) eksen değiştirdiğini görüyoruz. Artık "katipler" değil, "Karar Mimarlarıyız"; klavye işçileri değil, sistemin koruyucularıyız (stewards).

Zanaatın odağı kodun kendisinden, o kodun arkasındaki niyetine (intent) kaydı. Bu değişim korkutucu olabilir ama aslında bizi gerçek mühendisliğe, yani problem çözmeye daha da yaklaştırıyor.

Bir sonraki bölümde, bu yeteneklerle donanmış zanaatkarın otonom ajanlarla nasıl bir takım kuracağını ve kültürün nasıl evrileceğini konuşacağız. Hazırsanız, ekip dinamiklerine geçiyoruz.
*/

---

/* ==========================================================
   Section 5: The Pipeline & Culture Crisis
   Junior training and team dynamics.
========================================================== */

<header color=cyan>THE JUNIOR DILEMMA</header>
<slide-number v-align="bottom" h-align="right"/>

<p max-width=60 align=center>
    Why we are <color fg="red">firing our future.</color>

    ==> Organizations are hiring only <color fg="yellow">Seniors.</color>
    ==> AI handles the "boring" Junior tasks.
    ==> We are breaking the <color fg="red">talent pipeline.</color>
    ==> Who will be the <color fg="cyan">Architect of 2030?</color>
</p>

/* PRESENTER NOTES (TR):
Şu an sektörde "Junior Dilemma" (Junior İkilemi) dediğimiz tehlikeli bir trend var: Şirketler artık sadece Senior mühendis işe almak istiyor ve Junior'ların yaptığı "sıkıcı" işleri yapay zekaya devretmeyi planlıyorlar. Bu, kısa vadede verimli görünse de aslında geleceğimizi ateşe atmaktır.

Yapay zeka Junior seviyesindeki görevleri başarıyla yerine getirebilir, ancak bu görevler aslında geleceğin mimarlarının yetiştiği mutfaktır. Eğer Junior'lara yer açmazsak, yetenek boru hattını (talent pipeline) kalıcı olarak bozmuş oluruz.

Gelecekte otonom ajanları yönetecek, karmaşık sistemleri analiz edecek Senior mühendislere ihtiyacımız olduğunda, elimizde bu yollardan geçmemiş bir nesil olacak. Bu slaytta zanaatkarlığın sadece üretmek değil, usta-çırak ilişkisiyle bilgiyi devretmek olduğunu hatırlatmalıyız.
*/

---

<header color=cyan>COGNITIVE ATROPHY</header>

<p max-width=60 align=center>
    The danger of the <color fg="red">"Easy" button.</color>

    ==> Learning requires <color fg="yellow">struggle.</color>
    ==> AI removes the <color fg="gray">friction</color> needed for mastery.
    ==> "Use it or lose it" applies to your <color fg="cyan">brain.</color>
</p>

/* PRESENTER NOTES (TR):
Bilişsel Körelme (Cognitive Atrophy), yapay zekaya aşırı bağımlılığın getirdiği en büyük risklerden biridir. Öğrenme süreci doğası gereği bir "zorlanma" (struggle) gerektirir; beynimiz yeni nöral bağları ancak bir problemle boğuştuğunda kurar.

Yapay zekanın sunduğu "kolay" butonuna sürekli basmak, bu zihinsel sürtünmeyi (friction) ortadan kaldırır. Eğer her hatayı AI düzeltirse, o hatanın neden oluştuğuna dair zihinsel modellerimizi (mental models) geliştiremeyiz.

Zanaatkarlıkta ustalık, kas hafızası ve zihinsel derinlikle gelir. Bu yetenekleri kullanmazsak, zamanla kaybederiz. Dinleyicilere, AI'ı bir koltuk değneği gibi değil, bir araç gibi kullanmaları gerektiğini vurgulamalıyız.
*/

---

<p max-width=60 align=center>
    [QUESTION] What happens to our <color fg="yellow">technical judgment</color> if we never learn to solve the small problems manually?
</p>

/* PRESENTER NOTES (TR):
Bu interaktif soruda izleyicileri durup düşünmeye davet ediyoruz. Küçük problemleri çözmeyi öğrenmemiş bir mühendisin, büyük sistemlerde yapay zekanın yaptığı hataları fark edip edemeyeceğini sorgulatmalıyız.

Zihinsel yargı (judgment), ancak temeldeki o küçük taşları yerine koyarak gelişir. Cevapları alırken, aslında zanaatın en küçük detayda bile bir "bilinç" gerektirdiğini hatırlatacağız.
*/

---

<header color=cyan>AI-SIM REVEAL: THE 5-YEAR VOID</header>

<ai-sim interval-min=3000 interval-max=5000>
    <ai-step><color fg="green">[OK]</color> Simulating career progression without "struggle"...</ai-step>
    <ai-step><color fg="green">[OK]</color> Projecting technical leadership gap for 2030...</ai-step>
    <ai-step delay-ms=4000><color fg="red">[WARNING]</color> Critical Atrophy: Lack of root-cause intuition.</ai-step>
    <ai-final>
        <p max-width=60 align=center>
            <color fg="red">THE 5-YEAR VOID</color>
            A generation of developers who can <color fg="yellow">prompt,</color>
            but cannot <color fg="cyan">debug AI hallucinations.</color>
        </p>
    </ai-final>
</ai-sim>

/* PRESENTER NOTES (TR):
Simülasyonumuz sarsıcı bir gerçeği ortaya koyuyor: "5 Yıllık Boşluk" (The 5-Year Void). Sadece prompt yazabilen ama yapay zekanın halüsinasyonlarını veya mimari hatalarını teşhis edemeyen bir nesille karşı karşıyayız.

Kök neden analizi (root-cause analysis) sezgisi, ancak binlerce manuel hata ve çözümle kazanılır. Bu simülasyon, "kolay yoldan gitmenin" uzun vadede teknik liderlik krizine nasıl yol açacağını gösteriyor.

Zanaatkarın görevi, bu boşluğu doldurmak için eğitim modellerini değiştirmektir. Eğitim sürecine kasıtlı "zorluklar" ve "AI-free" seanslar eklemek zorundayız.
*/

---

<header color=cyan>THE PRECEPTOR MODEL</header>

<p max-width=60 align=center>
    A <color fg="yellow">medical approach</color> to software.

    ==> See one, Do one, <color fg="cyan">Teach one.</color>
    ==> The Senior as a <color fg="yellow">Preceptor.</color>
    ==> Focus on <color fg="green">Judgment Mastery.</color>
</p>

/* PRESENTER NOTES (TR):
Tıp dünyasından ödünç aldığımız "Preceptor" modeli, yazılımda yeni bir eğitim standardı olabilir. Bu modelde usta (senior), çırağın (junior) sadece kod yazmasını değil, klinik bir vaka gibi sistemi nasıl analiz ettiğini denetler.

"Gör, Yap ve Öğret" prensibiyle, bilgi sadece pasif bir aktarım değil, aktif bir ustalık süreci haline gelir. Zanaatkarlık, bu modelle AI'nın hızına karşı insan derinliğini koruyabilir.

Buradaki amaç, Junior'ı AI'dan uzak tutmak değil, AI'yı kullanarak Senior'ın denetiminde nasıl daha hızlı ama derinlemesine öğrenebileceğini tasarlamaktır. Usta, sadece kodun sonucuna değil, çırağın muhakeme sürecine odaklanır.
*/

---

<header color=cyan>TRIO PROGRAMMING</header>

<p max-width=60 align=center>
    The New Unit: <color fg="yellow">Senior + Junior + AI.</color>

    ==> AI as the <color fg="gray">Intern.</color>
    ==> Senior as the <color fg="cyan">Preceptor.</color>
    ==> Junior as the <color fg="green">Driver/Reviewer.</color>
</p>

/* PRESENTER NOTES (TR):
"Trio Programming" (Üçlü Programlama), Pair Programming'in AI çağındaki evrimidir. Artık masada üç varlık var: Usta, Çırak ve Yapay Zeka. AI burada her zaman en düşük seviyeli "stajyer" rolündedir.

Junior (çırak), AI'ın ürettiği kodu yönlendiren ve ilk incelemeyi yapan kişidir. Senior (usta) ise tüm bu süreci yöneten, niyetin ve kalitenin bozulmadığından emin olan bir "Preceptor" rolünü üstlenir.

Bu yapı, Junior'ın öğrenme döngüsünü korurken, Senior'ın da AI'nın hızını Junior'ın eğitimi için bir kaldıraç olarak kullanmasını sağlar. Zanaat, bu üçlü diyalog içinde hayat bulur.
*/

---

<header color=cyan>MENTORSHIP 2.0</header>

<p max-width=60 align=center>
    Teaching <color fg="yellow">Judgment,</color> not Syntax.

    ==> AI handles the <color fg="gray">Grammar.</color>
    ==> Mentor handles the <color fg="cyan">Meaning.</color>
    ==> "Why this pattern?" is the <color fg="green">new lesson.</color>
</p>

/* PRESENTER NOTES (TR):
Mentörlük artık "bu fonksiyonun parametreleri ne olmalı?" seviyesinden çok daha yukarıya çıkmalıdır. Dilin sözdizimini (syntax) veya kütüphane detaylarını öğretmek AI'ın işidir.

Zanaatkar mentörün yeni görevi, öğrenciye "Anlam"ı (meaning) ve "Muhakeme"yi (judgment) öğretmektir. "Neden bu tasarım kalıbını seçtik?" veya "Bu çözümün uzun vadedeki maliyeti ne olur?" gibi sorular eğitimin merkezine oturur.

Eskiden aylar süren teknik öğrenim, AI desteğiyle haftalara inebilir. Ancak bu kazandığımız zamanı, öğrencinin stratejik düşünce yeteneğini geliştirmek için kullanmalıyız. Mentörlük 2.0, bir karar verme sanatıdır.
*/

---

<header color=cyan>THE DEATH OF SCRUM</header>

<p max-width=60 align=center>
    Why stand-ups <color fg="red">fail AI teams.</color>

    ==> Rituals are for <color fg="gray">biological primates.</color>
    ==> AI agents don't need <color fg="yellow">status updates.</color>
    ==> <color fg="cyan">Flow</color> over <color fg="red">Sync-up.</color>
</p>

/* PRESENTER NOTES (TR):
Scrum ritüelleri, insanların kısıtlı iletişim hızına göre tasarlanmıştır. Ancak yapay zeka ajanlarının dahil olduğu bir ekipte, sabah stand-up'ı yapmak verimlilik katili bir "senkronizasyon tiyatrosu" haline gelir.

Ajanların duruma dair rapor vermesine gerek yoktur; onlar zaten sistemin her anında aktiftirler. Zanaatkar için önemli olan "Flow" (akış) halidir. İletişim, ritüeller üzerinden değil, paylaşılan niyetler ve deterministik kanallar üzerinden gerçekleşmelidir.

Scrum'ın ölümü, çevikliğin sonu değil, "İnsan-Makine" senkronizasyonuna uygun yeni bir ritmin başlangıcıdır. Ritüelleri değil, zanaatı merkeze koyan bir çeviklik anlayışına geçiyoruz.
*/

---

<header color=cyan>DUAL-TRACK AGILITY</header>

<p max-width=60 align=center>
    Managing <color fg="yellow">Humans</color> vs. <color fg="cyan">Agents.</color>

    ==> Human Lane: <color fg="yellow">Creative Strategy & Ethics.</color>
    ==> Machine Lane: <color fg="cyan">Execution at Light Speed.</color>
    ==> Synchronized through <color fg="green">Contracts.</color>
</p>

/* PRESENTER NOTES (TR):
"Dual-Track Agility" (Çift Kulvarlı Çeviklik), ekibi iki farklı hızda yönetme becerisidir. İnsanlar yaratıcı strateji, diplomasi ve etik kararların olduğu "yavaş ama derin" kulvarda ilerlerler.

Yapay zeka ajanları ise uygulama (execution) ve veri işleme gibi "ışık hızında" giden kulvarda çalışırlar. Bu iki kulvar birbirini yavaşlatmamalı, sadece net kontratlar (contracts) üzerinden senkronize olmalıdır.

Zanaatkar, bu iki kulvar arasındaki trafiği yöneten kişidir. İnsanın yaratıcılığı ile makinenin hızı arasındaki uyum, modern yazılım evinin yeni temelidir.
*/

---

<header color=cyan>THE SDLC COLLAPSE</header>

<p max-width=60 align=center>
    The linear process is <color fg="red">gone.</color>

    ==> <color fg="yellow">Intent</color> -> <color fg="yellow">Build</color> -> <color fg="yellow">Observe.</color>
    ==> From "Steps" to <color fg="cyan">Simultaneous Creation.</color>
    ==> Continuous <color fg="green">Validation</color> is the core.
</p>

/* PRESENTER NOTES (TR):
Geleneksel Yazılım Geliştirme Yaşam Döngüsü (SDLC), tasarımın koddan, kodun testten ayrıldığı bir yapıdır. Ancak AI çağında bu aşamalar birbirinin içine çökerek tek bir sürece dönüştü.

Artık aylar süren analizler yerine, "Niyet" (Intent) belirlendiği anda AI "İnşa" (Build) etmeye başlar ve biz eşzamanlı olarak "Gözlem" (Observe) aşamasına geçeriz. Bu, zanaatkarın her an devrede olduğu bir döngüdür.

Süreçteki en kritik parça "Sürekli Doğrulama" (Validation) haline gelir. Adım adım ilerlemek yerine, her an her şeyi kontrol eden dinamik bir yapı kuruyoruz. SDLC artık bir çizgi değil, bir kuantum sıçramasıdır.
*/

---

<header color=cyan>STOP CODE REVIEWS</header>

<p max-width=60 align=center>
    Start <color fg="yellow">Plan Reviews.</color>

    ==> Don't review the <color fg="gray">Diff.</color>
    ==> Review the <color fg="cyan">Strategy & Context.</color>
    ==> Trust the <color fg="green">Automated Guards</color> for syntax.
</p>

/* PRESENTER NOTES (TR):
Manuel kod incelemesi (Code Review), AI ile binlerce satırın üretildiği bir dünyada artık fiziksel olarak imkansızdır. Bir insanın 500 satırlık bir diff'i gerçekten "okuması" bir güvenlik tiyatrosudur.

Zanaatkar, vaktini satır aralarındaki sözdizimi hatalarını aramaya (diff review) harcamak yerine, AI'a verilen "Plan"ı ve "Strateji"yi incelemelidir. Sözdizimi hatalarını ve standartları zaten otomatik araçlar kontrol etmelidir.

Bizler artık ajanlarımıza verdiğimiz "iş planlarını" onaylayan mimarlarız. Kodun detayları makinenin sorumluluğundadır; planın doğruluğu bizim sorumluluğumuzdadır.
*/

---

<header color=cyan>THE SECURITY TRAP</header>

<p max-width=60 align=center>
    Why AI-native products are a <color fg="red">risk.</color>

    ==> <color fg="yellow">Prompt Injection</color> & Data Poisoning.
    ==> Insecure <color fg="red">Output Handling.</color>
    ==> AI cannot understand <color fg="cyan">Logical Vulnerabilities.</color>
</p>

/* PRESENTER NOTES (TR):
Yapay zeka sadece kod üretmez, bazen farkında olmadan güvenlik açıkları da üretir. OWASP'ın yayınladığı LLM Top 10 listesi, prompt enjeksiyonundan veri zehirlenmesine kadar birçok yeni risk tanımlıyor.

AI, bir kodun sözdizimsel olarak güvenli görünüp mantıksal olarak (logical vulnerabilities) nasıl istismar edilebileceğini kavrayamaz. "Yapay zeka yaptıysa güvenlidir" yanılgısı, sektördeki en büyük güvenlik tuzağıdır.

Zanaatkar, güvenlik uzmanlığıyla AI'ın ürettiği kodun üzerinden siber güvenlik filtresiyle geçmelidir. Yazılım güvenliği, AI çağında "Zero Trust" prensibine daha çok muhtaçtır.
*/

---

<header color=cyan>THE SWISS CHEESE MODEL</header>

<p max-width=60 align=center>
    Layered <color fg="yellow">Verification.</color>

    ==> Individual layers have <color fg="gray">holes.</color>
    ==> Multiple layers block the <color fg="red">failure.</color>
    ==> Security is a <color fg="cyan">Stack,</color> not a wall.
</p>

/* PRESENTER NOTES (TR):
Havacılık ve tıpta kullanılan "İsviçre Peyniri Modeli", yapay zeka güvenliği için ideal bir metafordur. Her bir güvenlik katmanının (peynir dilimi) delikleri olabilir, ancak katmanları üst üste koyduğunuzda delikler birbiriyle örtüşmez ve hata geçişi engellenir.

Statik analiz, otomatik testler, tip sistemleri ve en sonda insan denetimi... Bunların her biri zayıf noktaları olan birer katmandır. Zanaatkarın görevi, bu katmanları öyle bir stack haline getirmektir ki, AI'ın yaptığı bir hata tüm katmanları aşamasın.

Güvenlik bir duvar değil, bir süreçtir. Katmanlı doğrulama, AI ile çalışırken sahip olabileceğimiz en güçlü zırhtır.
*/

---

<header color=cyan>SANDBOXING THE GENIE</header>

<p max-width=60 align=center>
    Never give AI the <color fg="red">keys to production.</color>

    ==> <color fg="yellow">Isolated Environments</color> for Agents.
    ==> Limited <color fg="cyan">Action Capability.</color>
    ==> The "Human in the Loop" <color fg="green">Kill Switch.</color>
</p>

/* PRESENTER NOTES (TR):
Ajanlarımıza (Genie) otonomluk vermek harikadır ama onları asla doğrudan üretim sistemlerine (production) kontrolsüz salmamalıyız. Her ajan, kendi sınırları çizilmiş bir "Sandbox" (kum havuzu) içinde çalışmalıdır.

Eylem kabiliyetlerini kısıtlamalı ve kritik kararlarda her zaman bir "insan onayı" veya "Kill Switch" (durdurma anahtarı) bulundurmalıyız. Ajanın bir veritabanını "optimize" etmeye karar verip her şeyi silmesi, bilim kurgu değil, gerçek bir risktir.

Zanaatkar, ajanlarını özgür bırakırken aynı zamanda onları kontrol altında tutan kafesi (sandboxing) de tasarlayan kişidir. Güç, kontrolsüz bir şey değildir.
*/

---

<header color=cyan>AGENTIC RISKS</header>

<p max-width=60 align=center>
    When the bot <color fg="red">"optimizes"</color> your system.

    ==> Unintended <color fg="red">Side Effects.</color>
    ==> Resource <color fg="yellow">Exhaustion</color> by Agents.
    ==> Loss of <color fg="cyan">System Traceability.</color>
</p>

/* PRESENTER NOTES (TR):
Otonom ajanlar, hedefe giden en kısa yolu bulmak için bazen sistemin dengesini bozabilirler. Örneğin, bir ajan hızı artırmak için güvenlik kontrollerini "gereksiz" bulup devre dışı bırakabilir veya veritabanını felç edecek bir sorgu dizisi başlatabilir.

İzlenebilirliğin (traceability) kaybı, sistemdeki bir değişikliğin neden ve nasıl yapıldığını bilememek demektir. Ajanlar arasındaki etkileşim, insanların tahmin edemeyeceği bir kaos yaratabilir.

Bu riskleri yönetmek, zanaatkarın en yeni ve en zorlu görevidir. Ajanların sadece "ne yapacağını" değil, "neyi asla yapmayacağını" belirleyen kısıtları biz koyarız.
*/

---

<header color=cyan>ETHICS IN AUTOMATION</header>

<p max-width=60 align=center>
    The craftsman's <color fg="yellow">responsibility.</color>

    ==> AI has no <color fg="red">Moral Compass.</color>
    ==> Accountability cannot be <color fg="gray">outsourced.</color>
    ==> Craft is about <color fg="cyan">Values.</color>
</p>

/* PRESENTER NOTES (TR):
Yapay zekanın bir etik pusulası (moral compass) yoktur; o sadece matematiksel hedeflere koşar. Bir kararın etik boyutunu veya insan üzerindeki etkisini sadece biz değerlendirebiliriz.

Hesap verebilirlik (accountability) asla bir dış kaynağa veya makineye devredilemez. Zanaatkarlık, sadece teknik mükemmeliyet değil, aynı zamanda değerler (values) ve etik sorumluluk demektir.

Kodladığımız her şeyde, otonomlaştırdığımız her süreçte, insani değerleri korumak bizim görevimizdir. Zanaatkarlık, makineleşen bir dünyada insan kalabilme iradesidir.
*/

---

<header color=cyan>CULTURE OVER PROCESS</header>

<p max-width=60 align=center>
    Trusting the <color fg="yellow">Zanaat.</color>

    ==> Tools change, <color fg="cyan">Ethics</color> stay.
    ==> Culture is the <color fg="green">Ultimate Filter.</color>
    ==> Hire for <color fg="yellow">Judgment,</color> not Skills.
</p>

/* PRESENTER NOTES (TR):
Süreçler (processes) yapay zeka tarafından her an değiştirilebilir, ancak Kültür baki kalır. Zanaatkarlık kültürü, karmaşanın ve hızın içindeki en güçlü filtremizdir.

Şirketlerin artık sadece teknik beceriler için değil, "Muhakeme Yeteneği" (Judgment) ve etik duruş için insan alması gereken bir döneme giriyoruz. Araçlar eskir, ama zanaatın etik duruşu kalıcıdır.

Kültürü süreçlerin üzerine koyduğumuzda, AI sadece bu kültürü güçlendiren bir araç haline gelir. Zanaatına güvenen bir ekip, her türlü teknolojik fırtınada ayakta kalır.
*/

---

<header color=cyan>SECTION SUMMARY</header>

<p max-width=60 align=center>
    Building the <color fg="yellow">2030 Engineer.</color>

    ==> From <color fg="gray">Guilds</color> to <color fg="cyan">Autonomous Factories.</color>
    ==> Judgment as the <color fg="green">Primary Asset.</color>
    ==> Stewardship as the <color fg="yellow">Final Role.</color>
</p>

<qr colors=white-on-transparent width=15%>https://manifesto.softwarecraftsmanship.org/</qr>

/* PRESENTER NOTES (TR):
Bu bölümü kapatırken 2030'un mühendisini nasıl inşa edeceğimizi özetliyoruz. Geleneksel lonca (guild) yapısından otonom fabrikalara geçiyoruz, ancak bu fabrikaların yöneticisi hala insan zanaatkardır.

Muhakeme yeteneği (judgment), artık sahip olduğumuz en değerli "varlık" haline geldi. Teknik beceriler emtialaşırken, doğru kararı verebilme yetisi paha biçilemez oldu.

Nihai rolümüz, sistemin koruyuculuğu (stewardship). Gelecek, yapay zekanın değil, yapay zekayı zanaatıyla evcilleştirebilen mühendislerin olacak. Şimdi, son bölüme; inşa etmenin o görkemli çağına geçiyoruz.
*/

---

/* ==========================================================
   Section 6: The Golden Age of Building
   The optimistic conclusion.
========================================================== */

<header color=cyan>SKILLS WILL EAT AI</header>
<slide-number v-align="bottom" h-align="right"/>

<p max-width=60 align=center>
    The ultimate punchline for the AI era:
    <color fg="yellow">Mastery is the only defense against automation.</color>

    ==> Tools are <color fg="gray">temporary.</color>
    ==> Hype <color fg="red">evaporates.</color>
    ==> Deep <color fg="cyan">technical skills</color> are the fuel for AI.
</p>

<footnote>Source: Skills Will Eat AI Manifesto</footnote>
<qr colors=white-on-transparent width=15%>https://skillswilleatai.com</qr>

/* PRESENTER NOTES (TR):
Bu bölümün ve aslında tüm sunumun ana fikri: "Beceriler Yapay Zekayı Yiyecektir." Yazılım dünyasındaki devasa gürültü ve hype (abartı) elbet bir gün dinecek. O gün geldiğinde, elimizde kalan tek gerçek şey bizim teknik derinliğimiz ve ustalığımız olacak.

Yapay zeka, sadece sizin bildiğiniz kadar güçlü bir araçtır. Eğer temelleriniz zayıfsa, AI sizi sadece daha hızlı hata yapmaya iter. Ancak derine inmiş bir zanaatkar için AI, ustalığını dünyaya haykıran dev bir mikrofondur.

Becerilerimizi geliştirmekten vazgeçmemeliyiz; çünkü makinenin ürettiği her şeyi denetleyecek, yönetecek ve ona ruh katacak olan yine bizim birikimimizdir. Gelecek, AI kullananların değil, AI'yı zanaatıyla evcilleştirenlerindir.
*/

---

<header color=cyan>THE END OF BOILERPLATE</header>

<p max-width=60 align=center>
    Reclaiming our <color fg="yellow">Joy.</color>

    ==> No more <color fg="gray">repetitive patterns.</color>
    ==> No more <color fg="gray">manual CRUD</color> generation.
    ==> AI takes the <color fg="red">boredom,</color>
    humans keep the <color fg="green">excitement.</color>
</p>

/* PRESENTER NOTES (TR):
Yapay zekanın bize verdiği en büyük hediye, bizi "boilerplate" kodların, yani o bitmek bilmeyen, kendini tekrar eden sıkıcı yapıların esaretinden kurtarmasıdır. Artık her yeni projede aynı setup dosyalarını hazırlamak veya standart CRUD operasyonlarını tek tek yazmak zorunda değiliz.

Bu, yazılımcı için "neşe"nin (joy) yeniden keşfidir. Vaktimizi değerli olmayan işlere değil, sistemin kalbindeki gerçek problemlere ayırabiliyoruz. Sıkıcı işleri makineye devretmek, zanaatkarın yaratıcılığını özgür bırakır.

Bir düşünün; artık sadece "düşünmeye" ve "tasarlamaya" vaktiniz var. Boilerplate bitti; gerçek mühendislik ve yaratıcılık yeniden başlıyor.
*/

---

<header color=cyan>NO MORE SYNTAX WARS</header>

<p max-width=60 align=center>
    Focusing on <color fg="yellow">Pure Logic.</color>

    ==> Semicolons are <color fg="gray">irrelevant.</color>
    ==> Tab vs Space is <color fg="gray">history.</color>
    ==> The <color fg="cyan">architecture</color> is the only battlefield.
</p>

/* PRESENTER NOTES (TR):
Yıllardır süren anlamsız "syntax" savaşlarının sonuna geldik. Noktalı virgül koyup koymamak, tab mı boşluk mu kullanmak artık bir tartışma konusu bile değil; çünkü yapay zeka bunları bizim yerimize en mükemmel standartlarda hallediyor.

Bizim artık tek bir savaş alanımız var: Mantık (logic) ve Mimari (architecture). Kodun nasıl göründüğünden ziyade, sistemin nasıl davrandığı ve parçaların birbirine nasıl bağlandığı üzerine kafa yoruyoruz.

Bu odak değişimi, yazılım mühendisliğini gerçek bir stratejik disipline dönüştürüyor. Zanaatkarın dikkati artık detayın detayında değil, sistemin bütünlüğündedir.
*/

---

<header color=cyan>THE AMBITIOUS ERA</header>

<p max-width=60 align=center>
    Building things that were <color fg="red">Impossible.</color>

    ==> One person can build a <color fg="yellow">Global Scale App.</color>
    ==> AI handles the <color fg="cyan">Complexity</color> you can't reach.
    ==> This is the <color fg="green">Golden Age of Building.</color>
</p>

/* PRESENTER NOTES (TR):
Şu an "Hırslı Günler" (Ambitious Era) yaşıyoruz. Eskiden 50 kişilik ekiplerin aylar süren çalışmalarıyla yapılabilecek işleri, bugün tek bir zanaatkar yapay zeka desteğiyle haftalar içinde bitirebiliyor. "Bu çok karmaşık, yapamam" dediğimiz şeyler artık birer hedef haline geldi.

Kendi başınıza dünya çapında bir sistem inşa etme gücü artık elinizde. AI, sizin tek başınıza ulaşamayacağınız o teknik derinliği ve hızı size bir süper güç olarak sunuyor.

Bu, tarihteki "İnşa Etmenin Altın Çağı"dır. Eğer bir fikriniz varsa, artık hiçbir engeliniz yok. Sınırlarınız sadece hayal gücünüz ve zanaatınızdır.
*/

---

<header color=cyan>RADICAL ABUNDANCE</header>

<p max-width=60 align=center>
    Cost of Code vs. <color fg="yellow">Cost of Value.</color>

    ==> Marginal cost of coding is <color fg="gray">Zero.</color>
    ==> Value of <color fg="cyan">Correctness</color> is Infinite.
    ==> Code is cheap; <color fg="yellow">Human Judgment</color> is priceless.
</p>

/* PRESENTER NOTES (TR):
Radikal bolluk (radical abundance) çağındayız. Kod yazmanın maliyeti sıfıra yaklaşırken, doğru olanı yapmanın ve değer üretmenin önemi sonsuzluğa ulaşıyor. Her şeyin bol olduğu bir yerde, en kıymetli şey "nadir" olandır; yani insan muhakemesi.

Kod üretimi bir emtia (commodity) haline geldi. Ancak o kodun doğruluğu ve sistemdeki kalıcılığı hala sizin sorumluluğunuzda. Ucuz koda güvenip pahalı hatalar yapma lüksümüz yok.

Zanaatkar, bu bolluk içinde neyin atılacağını ve neyin tutulacağını bilen kişidir. Kod artık her yerde, ama doğru karar hala çok nadir.
*/

---

<header color=cyan>THE CRAFTSMAN'S PRIDE</header>

<p max-width=60 align=center>
    Putting your name on the <color fg="yellow">Intent.</color>

    ==> Pride is not in the <color fg="gray">typing.</color>
    ==> Pride is in the <color fg="cyan">System integrity.</color>
    ==> Stewardship is the <color fg="green">ultimate signature.</color>
</p>

/* PRESENTER NOTES (TR):
Zanaatkarın onuru eskiden yazdığı her satır koddaydı. Şimdi ise bu onur, sistemin niyetindedir (intent). Bir binayı kimin tuğla dizerek yaptığı değil, o binanın neden ve nasıl ayakta durduğunu planlayan imza önemlidir.

Bizler artık daktilo başındaki "katipler" değil, sistemin "koruyucularıyız" (stewards). Yazdığımız 300 bin satırda bizim imzamız yok belki ama o sistemin her bir hücresindeki "karar" bizimdir.

Zanaatkarlık 2.0, ortaya çıkan değerin altına korkusuzca adınızı yazabilmektir. Bu gurur, sadece bir tuşa basmak değil, bir eseri yönetmektir.
*/

---

<p max-width=60 align=center>
    [QUESTION] What will be the focus of your <color fg="cyan">next 300,000 lines</color> of AI-crafted code?
</p>

/* PRESENTER NOTES (TR):
Sunumun sonuna yaklaşırken izleyiciyi kendi geleceklerine davet ediyoruz. Benim son 4 ayda yaşadığım o 300 bin satırlık fırtınayı onlar nerede yaşayacaklar? Hangi problemi çözecekler?

Bu interaktif soru, onların sadece "kullanıcı" değil, "inşacı" (builder) olduklarını hatırlatmak için soruluyor. Cevaplar geldikçe, sunumdaki tüm kavramları (TDD, Phoenix, Context) harmanlayarak bir gelecek vizyonu çizeceğiz.
*/

---

<header color=cyan>AI-SIM FINAL TRACE</header>

<ai-sim interval-min=3000 interval-max=5000>
    <ai-step><color fg="green">[OK]</color> Validating human intent vectors...</ai-step>
    <ai-step><color fg="green">[OK]</color> Synchronizing craftsmanship protocols...</ai-step>
    <ai-step delay-ms=4200><color fg="cyan">[INFO]</color> Future state: Radical productivity detected.</ai-step>
    <ai-final>
        <p max-width=60 align=center>
            <color fg="yellow">THE FUTURE IS DEPLOYED.</color>

            Craftsmanship is the <color fg="green">Safe Bridge</color>
            between AI potential and Real-World stability.
        </p>
    </ai-final>
</ai-sim>

/* PRESENTER NOTES (TR):
Simülasyonun son adımı: Gelecek yayına alındı (deployed). Yapay zekanın sunduğu o devasa potansiyel ile gerçek dünyanın sert gerçekliği (stability) arasındaki tek güvenli köprü zanaatkarlıktır.

Eğer bu köprüyü doğru kurarsak, sadece hız değil, aynı zamanda kalite ve güven de üretebiliriz. Simülasyonumuz gösteriyor ki; zanaatkarın olmadığı bir gelecek sadece kaostan ibarettir.

Geleceği inşa edenler, makineleri değil, sistemleri yönetenler olacaktır.
*/

---

<header color=cyan>THE MANIFESTO 2.0</header>

<p max-width=60 align=left>
    A new set of rules for AI-Augmented Craft:

    • <color fg="yellow">Value</color> over <color fg="gray">Generation.</color>
    • <color fg="yellow">Regeneration</color> over <color fg="gray">Maintenance.</color>
    • <color fg="yellow">Judgment</color> over <color fg="gray">Speed.</color>
</p>

<footnote>Source: Manifesto for AI-Augmented Software Craftsmanship</footnote>

/* PRESENTER NOTES (TR):
Zanaatkarlığın yeni kurallarını yazma vaktimiz geldi. Manifesto 2.0, bizi hız illüzyonundan koruyacak olan pusuladır. Artık sadece "çalışan yazılım" değil, "doğrulanmış niyet" üzerine kurulu bir anlayışa sahibiz.

Bu kurallar, otonom ajanlarla nasıl çalışacağımızı ve kod bolluğu içinde nasıl hayatta kalacağımızı belirler. Gelecek, bu kurallara sadık kalanların olacaktır.
*/

---

<header color=cyan>RULE #1: VALUE OVER GENERATION</header>

<p max-width=60 align=center>
    Don't celebrate the <color fg="red">Lines.</color>
    Celebrate the <color fg="green">Outcome.</color>

    ==> Productivity is not <color fg="gray">Output per Hour.</color>
    ==> Productivity is <color fg="yellow">Impact per Solution.</color>
</p>

/* PRESENTER NOTES (TR):
İlk kuralımız: Üretim miktarını (generation) değil, üretilen değeri (value) kutlayın. Yapay zeka ile milyonlarca satır kod yazmak bir başarı değil, bir yan üründür.

Gerçek verimlilik, birim zamanda ne kadar kod yazdığınız değil, çözdüğünüz problemin büyüklüğü ve yarattığı etkidir. Bir zanaatkar, AI'ya kod yazdırmadan bir sorunu çözebiliyorsa, bu en büyük zaferdir.
*/

---

<header color=cyan>RULE #2: REGENERATION OVER MAINTENANCE</header>

<p max-width=60 align=center>
    Stop the <color fg="red">Patching</color> culture.
    Embrace the <color fg="yellow">Phoenix</color> mindset.

    ==> If it’s old, <color fg="cyan">Regenerate.</color>
    ==> If it’s broken, <color fg="cyan">Rebuild.</color>
</p>

/* PRESENTER NOTES (TR):
İkinci kural: Bakımı (maintenance) öldürün, yeniden üretimi (regeneration) yaşatın. Eski kodlara yama yapmak yerine, onları silip güncel spesifikasyonlarla AI'ya yeniden yaptırın.

Phoenix mimarisi, zanaatkarlığın sürdürülebilirlik formülüdür. Değişimden korkmayan, sistemi her an sıfırlayabilen ekipler geleceğe hükmedecektir.
*/

---

<header color=cyan>RULE #3: JUDGMENT OVER SPEED</header>

<p max-width=60 align=center>
    The <color fg="yellow">Editor</color> is more powerful than the <color fg="gray">Scribe.</color>

    ==> Speed is <color fg="red">Cheap.</color>
    ==> Judgment is <color fg="cyan">Strategic.</color>
    ==> The <color fg="yellow">Final Click</color> is yours.
</p>

/* PRESENTER NOTES (TR):
Üçüncü kural: Muhakeme (judgment) her zaman hızın (speed) önündedir. Hız artık bir meta (commodity) haline geldi; herkes hızlı olabilir.

Ancak neyin doğru olduğunu, neyin sisteme zarar vereceğini bilmek stratejik bir üstünlüktür. Son kararı veren parmak, klavyede en hızlı yazan parmaktan daha değerlidir.
*/

---

<header color=cyan>FINAL QUOTE</header>

<p max-width=60 align=left>
    "The goal of software craftsmanship is
    to improve the <color fg="yellow">lives of developers,</color>
    not just the <color fg="gray">output of machines.</color>"

    <color fg="gray">— Kent Beck, Father of TDD</color>
</p>

<qr colors=white-on-transparent width=15%>https://www.youtube.com/watch?v=n3uEWZ1KT64</qr>

/* PRESENTER NOTES (TR):
Kent Beck'in bu sözüyle kapanışı yapıyoruz: Zanaatkarlığın asıl amacı sadece makinelerin çıktısını artırmak değil, geliştiricilerin hayatını iyileştirmektir. Yapay zeka bu amaca hizmet etmelidir.

Eğer yapay zeka bizi daha yorgun, daha stresli ve daha kafası karışık yapıyorsa, onu yanlış kullanıyoruz demektir. Zanaatkarlık, teknolojiyi insani mutluluğa dönüştürme sanatıdır.
*/

---

<header color=cyan>THE CALL TO ACTION</header>

<p max-width=60 align=center>
    Go build something <color fg="yellow">Meaningful.</color>

    ==> Use the <color fg="cyan">Genie</color> wisely.
    ==> Protect the <color fg="cyan">Zanaat.</color>
    ==> Your legacy is the <color fg="green">Value</color> you leave behind.
</p>

/* PRESENTER NOTES (TR):
Sahneden inerken size tek bir çağrım var: Gidin ve anlamlı bir şeyler inşa edin. Cini (AI) akıllıca kullanın, ama zanaatınızı (zanaat) her şeyin üstünde koruyun.

Gerçek mirasınız, yazdığınız satırlar değil, dünyaya bıraktığınız değerdir. Kendi 300 bin satırınızın hikayesini yazmaya bugün başlayın.
*/

---

<header color=cyan>CLOSING REMARKS</header>

<p max-width=60 align=center>
    Stay <color fg="yellow">Human.</color>
    Stay <color fg="cyan">Curious.</color>

    ==> Fear is the <color fg="red">enemy</color> of craft.
    ==> Curiosity is the <color fg="green">engine</color> of mastery.
    ==> The terminal is <color fg="gray">closed.</color>
</p>

<title> root@craftsman:~$ exit </title>

/* PRESENTER NOTES (TR):
Son sözüm: İnsan kalın, meraklı kalın. Korku zanaatın düşmanıdır, merak ise ustalığın motorudur.

Bu terminal ekranı kapanıyor olabilir, ama sizin zanaat yolculuğunuz yeni başlıyor. Dinlediğiniz için teşekkür ederim. `exit` komutunu veriyorum ve sahneyi size bırakıyorum.
*/

---

/* ==========================================================
   Section 7: shutdown -h now
   Closing the terminal.
========================================================== */

<header color=cyan>SKILLS WILL EAT AI</header>
<slide-number v-align="bottom" h-align="right"/>

<p max-width=60 align=center>
    The ultimate punchline for the AI era:
    <color fg="yellow">Mastery is the only defense against automation.</color>

    ==> Tools are <color fg="gray">temporary.</color>
    ==> Hype <color fg="red">evaporates.</color>
    ==> Deep <color fg="cyan">technical skills</color> are the fuel for AI.
</p>

<footnote>Source: Skills Will Eat AI Manifesto</footnote>
<qr colors=white-on-transparent width=15%>https://skillswilleatai.com</qr>

/* PRESENTER NOTES (TR):
Bu bölümün ve aslında tüm sunumun ana fikri: "Beceriler Yapay Zekayı Yiyecektir." Yazılım dünyasındaki devasa gürültü ve hype (abartı) elbet bir gün dinecek. O gün geldiğinde, elimizde kalan tek gerçek şey bizim teknik derinliğimiz ve ustalığımız olacak.

Yapay zeka, sadece sizin bildiğiniz kadar güçlü bir araçtır. Eğer temelleriniz zayıfsa, AI sizi sadece daha hızlı hata yapmaya iter. Ancak derine inmiş bir zanaatkar için AI, ustalığını dünyaya haykıran dev bir mikrofondur.

Becerilerimizi geliştirmekten vazgeçmemeliyiz; çünkü makinenin ürettiği her şeyi denetleyecek, yönetecek ve ona ruh katacak olan yine bizim birikimimizdir. Gelecek, AI kullananların değil, AI'yı zanaatıyla evcilleştirenlerindir.
*/

---

<header color=cyan>THE END OF BOILERPLATE</header>

<p max-width=60 align=center>
    Reclaiming our <color fg="yellow">Joy.</color>

    ==> No more <color fg="gray">repetitive patterns.</color>
    ==> No more <color fg="gray">manual CRUD</color> generation.
    ==> AI takes the <color fg="red">boredom,</color>
    humans keep the <color fg="green">excitement.</color>
</p>

/* PRESENTER NOTES (TR):
Yapay zekanın bize verdiği en büyük hediye, bizi "boilerplate" kodların, yani o bitmek bilmeyen, kendini tekrar eden sıkıcı yapıların esaretinden kurtarmasıdır. Artık her yeni projede aynı setup dosyalarını hazırlamak veya standart CRUD operasyonlarını tek tek yazmak zorunda değiliz.

Bu, yazılımcı için "neşe"nin (joy) yeniden keşfidir. Vaktimizi değerli olmayan işlere değil, sistemin kalbindeki gerçek problemlere ayırabiliyoruz. Sıkıcı işleri makineye devretmek, zanaatkarın yaratıcılığını özgür bırakır.

Bir düşünün; artık sadece "düşünmeye" ve "tasarlamaya" vaktiniz var. Boilerplate bitti; gerçek mühendislik ve yaratıcılık yeniden başlıyor.
*/

---

<header color=cyan>NO MORE SYNTAX WARS</header>

<p max-width=60 align=center>
    Focusing on <color fg="yellow">Pure Logic.</color>

    ==> Semicolons are <color fg="gray">irrelevant.</color>
    ==> Tab vs Space is <color fg="gray">history.</color>
    ==> The <color fg="cyan">architecture</color> is the only battlefield.
</p>

/* PRESENTER NOTES (TR):
Yıllardır süren anlamsız "syntax" savaşlarının sonuna geldik. Noktalı virgül koyup koymamak, tab mı boşluk mu kullanmak artık bir tartışma konusu bile değil; çünkü yapay zeka bunları bizim yerimize en mükemmel standartlarda hallediyor.

Bizim artık tek bir savaş alanımız var: Mantık (logic) ve Mimari (architecture). Kodun nasıl göründüğünden ziyade, sistemin nasıl davrandığı ve parçaların birbirine nasıl bağlandığı üzerine kafa yoruyoruz.

Bu odak değişimi, yazılım mühendisliğini gerçek bir stratejik disipline dönüştürüyor. Zanaatkarın dikkati artık detayın detayında değil, sistemin bütünlüğündedir.
*/

---

<header color=cyan>THE AMBITIOUS ERA</header>

<p max-width=60 align=center>
    Building things that were <color fg="red">Impossible.</color>

    ==> One person can build a <color fg="yellow">Global Scale App.</color>
    ==> AI handles the <color fg="cyan">Complexity</color> you can't reach.
    ==> This is the <color fg="green">Golden Age of Building.</color>
</p>

/* PRESENTER NOTES (TR):
Şu an "Hırslı Günler" (Ambitious Era) yaşıyoruz. Eskiden 50 kişilik ekiplerin aylar süren çalışmalarıyla yapılabilecek işleri, bugün tek bir zanaatkar yapay zeka desteğiyle haftalar içinde bitirebiliyor. "Bu çok karmaşık, yapamam" dediğimiz şeyler artık birer hedef haline geldi.

Kendi başınıza dünya çapında bir sistem inşa etme gücü artık elinizde. AI, sizin tek başınıza ulaşamayacağınız o teknik derinliği ve hızı size bir süper güç olarak sunuyor.

Bu, tarihteki "İnşa Etmenin Altın Çağı"dır. Eğer bir fikriniz varsa, artık hiçbir engeliniz yok. Sınırlarınız sadece hayal gücünüz ve zanaatınızdır.
*/

---

<header color=cyan>RADICAL ABUNDANCE</header>

<p max-width=60 align=center>
    Cost of Code vs. <color fg="yellow">Cost of Value.</color>

    ==> Marginal cost of coding is <color fg="gray">Zero.</color>
    ==> Value of <color fg="cyan">Correctness</color> is Infinite.
    ==> Code is cheap; <color fg="yellow">Human Judgment</color> is priceless.
</p>

/* PRESENTER NOTES (TR):
Radikal bolluk (radical abundance) çağındayız. Kod yazmanın maliyeti sıfıra yaklaşırken, doğru olanı yapmanın ve değer üretmenin önemi sonsuzluğa ulaşıyor. Her şeyin bol olduğu bir yerde, en kıymetli şey "nadir" olandır; yani insan muhakemesi.

Kod üretimi bir emtia (commodity) haline geldi. Ancak o kodun doğruluğu ve sistemdeki kalıcılığı hala sizin sorumluluğunuzda. Ucuz koda güvenip pahalı hatalar yapma lüksümüz yok.

Zanaatkar, bu bolluk içinde neyin atılacağını ve neyin tutulacağını bilen kişidir. Kod artık her yerde, ama doğru karar hala çok nadir.
*/

---

<header color=cyan>THE CRAFTSMAN'S PRIDE</header>

<p max-width=60 align=center>
    Putting your name on the <color fg="yellow">Intent.</color>

    ==> Pride is not in the <color fg="gray">typing.</color>
    ==> Pride is in the <color fg="cyan">System integrity.</color>
    ==> Stewardship is the <color fg="green">ultimate signature.</color>
</p>

/* PRESENTER NOTES (TR):
Zanaatkarın onuru eskiden yazdığı her satır koddaydı. Şimdi ise bu onur, sistemin niyetindedir (intent). Bir binayı kimin tuğla dizerek yaptığı değil, o binanın neden ve nasıl ayakta durduğunu planlayan imza önemlidir.

Bizler artık daktilo başındaki "katipler" değil, sistemin "koruyucularıyız" (stewards). Yazdığımız 300 bin satırda bizim imzamız yok belki ama o sistemin her bir hücresindeki "karar" bizimdir.

Zanaatkarlık 2.0, ortaya çıkan değerin altına korkusuzca adınızı yazabilmektir. Bu gurur, sadece bir tuşa basmak değil, bir eseri yönetmektir.
*/

---

<p max-width=60 align=center>
    [QUESTION] What will be the focus of your <color fg="cyan">next 300,000 lines</color> of AI-crafted code?
</p>

/* PRESENTER NOTES (TR):
Sunumun sonuna yaklaşırken izleyiciyi kendi geleceklerine davet ediyoruz. Benim son 4 ayda yaşadığım o 300 bin satırlık fırtınayı onlar nerede yaşayacaklar? Hangi problemi çözecekler?

Bu interaktif soru, onların sadece "kullanıcı" değil, "inşacı" (builder) olduklarını hatırlatmak için soruluyor. Cevaplar geldikçe, sunumdaki tüm kavramları (TDD, Phoenix, Context) harmanlayarak bir gelecek vizyonu çizeceğiz.
*/

---

<header color=cyan>AI-SIM FINAL TRACE</header>

<ai-sim interval-min=3000 interval-max=5000>
    <ai-step><color fg="green">[OK]</color> Validating human intent vectors...</ai-step>
    <ai-step><color fg="green">[OK]</color> Synchronizing craftsmanship protocols...</ai-step>
    <ai-step delay-ms=4200><color fg="cyan">[INFO]</color> Future state: Radical productivity detected.</ai-step>
    <ai-final>
        <p max-width=60 align=center>
            <color fg="yellow">THE FUTURE IS DEPLOYED.</color>

            Craftsmanship is the <color fg="green">Safe Bridge</color>
            between AI potential and Real-World stability.
        </p>
    </ai-final>
</ai-sim>

/* PRESENTER NOTES (TR):
Simülasyonun son adımı: Gelecek yayına alındı (deployed). Yapay zekanın sunduğu o devasa potansiyel ile gerçek dünyanın sert gerçekliği (stability) arasındaki tek güvenli köprü zanaatkarlıktır.

Eğer bu köprüyü doğru kurarsak, sadece hız değil, aynı zamanda kalite ve güven de üretebiliriz. Simülasyonumuz gösteriyor ki; zanaatkarın olmadığı bir gelecek sadece kaostan ibarettir.

Geleceği inşa edenler, makineleri değil, sistemleri yönetenler olacaktır.
*/

---

<header color=cyan>THE MANIFESTO 2.0</header>

<p max-width=60 align=left>
    A new set of rules for AI-Augmented Craft:

    • <color fg="yellow">Value</color> over <color fg="gray">Generation.</color>
    • <color fg="yellow">Regeneration</color> over <color fg="gray">Maintenance.</color>
    • <color fg="yellow">Judgment</color> over <color fg="gray">Speed.</color>
</p>

<footnote>Source: Manifesto for AI-Augmented Software Craftsmanship</footnote>

/* PRESENTER NOTES (TR):
Zanaatkarlığın yeni kurallarını yazma vaktimiz geldi. Manifesto 2.0, bizi hız illüzyonundan koruyacak olan pusuladır. Artık sadece "çalışan yazılım" değil, "doğrulanmış niyet" üzerine kurulu bir anlayışa sahibiz.

Bu kurallar, otonom ajanlarla nasıl çalışacağımızı ve kod bolluğu içinde nasıl hayatta kalacağımızı belirler. Gelecek, bu kurallara sadık kalanların olacaktır.
*/

---

<header color=cyan>RULE #1: VALUE OVER GENERATION</header>

<p max-width=60 align=center>
    Don't celebrate the <color fg="red">Lines.</color>
    Celebrate the <color fg="green">Outcome.</color>

    ==> Productivity is not <color fg="gray">Output per Hour.</color>
    ==> Productivity is <color fg="yellow">Impact per Solution.</color>
</p>

/* PRESENTER NOTES (TR):
İlk kuralımız: Üretim miktarını (generation) değil, üretilen değeri (value) kutlayın. Yapay zeka ile milyonlarca satır kod yazmak bir başarı değil, bir yan üründür.

Gerçek verimlilik, birim zamanda ne kadar kod yazdığınız değil, çözdüğünüz problemin büyüklüğü ve yarattığı etkidir. Bir zanaatkar, AI'ya kod yazdırmadan bir sorunu çözebiliyorsa, bu en büyük zaferdir.
*/

---

<header color=cyan>RULE #2: REGENERATION OVER MAINTENANCE</header>

<p max-width=60 align=center>
    Stop the <color fg="red">Patching</color> culture.
    Embrace the <color fg="yellow">Phoenix</color> mindset.

    ==> If it’s old, <color fg="cyan">Regenerate.</color>
    ==> If it’s broken, <color fg="cyan">Rebuild.</color>
</p>

/* PRESENTER NOTES (TR):
İkinci kural: Bakımı (maintenance) öldürün, yeniden üretimi (regeneration) yaşatın. Eski kodlara yama yapmak yerine, onları silip güncel spesifikasyonlarla AI'ya yeniden yaptırın.

Phoenix mimarisi, zanaatkarlığın sürdürülebilirlik formülüdür. Değişimden korkmayan, sistemi her an sıfırlayabilen ekipler geleceğe hükmedecektir.
*/

---

<header color=cyan>RULE #3: JUDGMENT OVER SPEED</header>

<p max-width=60 align=center>
    The <color fg="yellow">Editor</color> is more powerful than the <color fg="gray">Scribe.</color>

    ==> Speed is <color fg="red">Cheap.</color>
    ==> Judgment is <color fg="cyan">Strategic.</color>
    ==> The <color fg="yellow">Final Click</color> is yours.
</p>

/* PRESENTER NOTES (TR):
Üçüncü kural: Muhakeme (judgment) her zaman hızın (speed) önündedir. Hız artık bir meta (commodity) haline geldi; herkes hızlı olabilir.

Ancak neyin doğru olduğunu, neyin sisteme zarar vereceğini bilmek stratejik bir üstünlüktür. Son kararı veren parmak, klavyede en hızlı yazan parmaktan daha değerlidir.
*/

---

<header color=cyan>FINAL QUOTE</header>

<p max-width=60 align=left>
    "The goal of software craftsmanship is
    to improve the <color fg="yellow">lives of developers,</color>
    not just the <color fg="gray">output of machines.</color>"

    <color fg="gray">— Kent Beck, Father of TDD</color>
</p>

<qr colors=white-on-transparent width=15%>https://www.youtube.com/watch?v=n3uEWZ1KT64</qr>

/* PRESENTER NOTES (TR):
Kent Beck'in bu sözüyle kapanışı yapıyoruz: Zanaatkarlığın asıl amacı sadece makinelerin çıktısını artırmak değil, geliştiricilerin hayatını iyileştirmektir. Yapay zeka bu amaca hizmet etmelidir.

Eğer yapay zeka bizi daha yorgun, daha stresli ve daha kafası karışık yapıyorsa, onu yanlış kullanıyoruz demektir. Zanaatkarlık, teknolojiyi insani mutluluğa dönüştürme sanatıdır.
*/

---

<header color=cyan>THE CALL TO ACTION</header>

<p max-width=60 align=center>
    Go build something <color fg="yellow">Meaningful.</color>

    ==> Use the <color fg="cyan">Genie</color> wisely.
    ==> Protect the <color fg="cyan">Zanaat.</color>
    ==> Your legacy is the <color fg="green">Value</color> you leave behind.
</p>

/* PRESENTER NOTES (TR):
Sahneden inerken size tek bir çağrım var: Gidin ve anlamlı bir şeyler inşa edin. Cini (AI) akıllıca kullanın, ama zanaatınızı (zanaat) her şeyin üstünde koruyun.

Gerçek mirasınız, yazdığınız satırlar değil, dünyaya bıraktığınız değerdir. Kendi 300 bin satırınızın hikayesini yazmaya bugün başlayın.
*/

---

<header color=cyan>CLOSING REMARKS</header>

<p max-width=60 align=center>
    Stay <color fg="yellow">Human.</color>
    Stay <color fg="cyan">Curious.</color>

    ==> Fear is the <color fg="red">enemy</color> of craft.
    ==> Curiosity is the <color fg="green">engine</color> of mastery.
    ==> The terminal is <color fg="gray">closed.</color>
</p>

<title> root@craftsman:~$ exit </title>

/* PRESENTER NOTES (TR):
Son sözüm: İnsan kalın, meraklı kalın. Korku zanaatın düşmanıdır, merak ise ustalığın motorudur.

Bu terminal ekranı kapanıyor olabilir, ama sizin zanaat yolculuğunuz yeni başlıyor. Dinlediğiniz için teşekkür ederim. `exit` komutunu veriyorum ve sahneyi size bırakıyorum.
*/
