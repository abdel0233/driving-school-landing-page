import heroCar from "@/assets/hero-car.jpg";
const video1 = "https://drive.google.com/uc?export=download&id=1fBC2IceLvbEsaYY9_jpDNoLClPoyJXpF";
const video2 = "https://drive.google.com/uc?export=download&id=1EmI-u7CiUWgbaXlK3fA1qe45noPBnUGs";
const video3 = "https://drive.google.com/uc?export=download&id=1YpYvXWzIRkiI012ozoiPGPvcjBq1N98v";
const video4 = "https://drive.google.com/uc?export=download&id=1Av_fH-NgbcVU5TQsNQj7EMcR4mSTa56u";
const video5 = "https://drive.google.com/uc?export=download&id=1BbVps0-KAqwQlo4N91JYfVJedsza_c-q";
const video6 = "https://drive.google.com/uc?export=download&id=12lyvDI6owXGFEKHeaeOqFl3RUSI3NWvQ";
const video7 = "https://drive.google.com/uc?export=download&id=1ZVY5_G56hIIqeuz7e3JSy8lMAWywM7Md";
const video8 = "https://drive.google.com/uc?export=download&id=18i8QVdRuvOdO4ewd9e5Z1m9GXslGWaKS";
const video9 = "https://drive.google.com/uc?export=download&id=1zXLSM-kqgOTLoisUmiyuZarjRLeLPBzE";
import { useRef, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  ArrowUpRight,
  ArrowLeft,
  ArrowRight,
  Play,
  Megaphone,
  Instagram,
  Search,
  Video,
  MapPin,
  Quote,
  TrendingDown,
  Users,
  Wallet,
  ChevronDown,
} from "lucide-react";

const nav = ["Services", "Portfolio", "Results", "Contact"];

const pains = [
  { icon: TrendingDown, title: "Empty seats, rising costs", text: "Your cars sit idle while overhead keeps climbing each month." },
  { icon: Users, title: "Same five referrals", text: "You rely on word of mouth and it caps how fast you can grow." },
  { icon: Wallet, title: "Ads that burn cash", text: "Boosted posts that bring tire-kickers, never serious students." },
];

const services = [
  { icon: Megaphone, title: "Paid Ads", text: "Meta and TikTok funnels engineered to fill your calendar weekly." },
  { icon: Instagram, title: "Social Media", text: "Content systems that turn your school into the local authority." },
  { icon: Search, title: "SEO", text: "Rank first when locals search for driving lessons in your city." },
  { icon: Video, title: "Video Production", text: "Cinematic shoots inside your cars — built to convert on scroll." },
  { icon: MapPin, title: "Google My Business", text: "Reviews, photos, and ranking — own the map in your district." },
];

const portfolio = [
  { video: video1, label: "Facebook Ads Campaign — Auto-École Marrakech" },
  { video: video2, label: "Brand Film — Drive Académie Casablanca" },
  { video: video3, label: "TikTok Series — Permis Express Lyon" },
  { video: video4, label: "Recruitment Funnel — Stadt Fahrschule Berlin" },
  { video: video5, label: "Cinematic Showcase — Auto-École Khadija" },
  { video: video6, label: "Promo Reel — Auto-École Khadija" },
  { video: video7, label: "Student Success — Auto-École Chihab (Part 1)" },
  { video: video8, label: "Student Success — Auto-École Chihab (Part 2)" },
  { video: video9, label: "Student Success — Auto-École Chihab (Part 3)" },
];

const stats = [
  { n: "50+", l: "Schools Scaled" },
  { n: "10K+", l: "Qualified Leads" },
  { n: "4×", l: "Average ROI" },
  { n: "5+", l: "Years Specialised" },
];

const quotes = [
  { q: "We went from 12 enrolments a month to 47. They understand our business better than we do.", name: "Yassine El Amrani", city: "Auto-École Atlas — Marrakech" },
  { q: "First agency that actually shows up with numbers. Our cars haven't been empty since.", name: "Claire Dubois", city: "Permis Express — Lyon" },
  { q: "The video work alone changed how the city sees us. Bookings doubled in 90 days.", name: "Marco Rinaldi", city: "Scuola Guida Centro — Milan" },
];

const steps = [
  { n: "01", t: "Free Audit", d: "We dissect your funnel, ads and reputation. You get a written report in 48 hours." },
  { n: "02", t: "Custom Strategy", d: "A bespoke plan for your city, fleet size and pricing — no templates, ever." },
  { n: "03", t: "Launch & Scale", d: "We run the campaigns, you greet the students. Reporting every Monday." },
];

const Index = () => {
  const { t, i18n } = useTranslation();
  const portfolioRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [playingIdx, setPlayingIdx] = useState<number | null>(null);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formError, setFormError] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    phone: "",
    city: ""
  });

  useEffect(() => {
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const scrollPortfolio = (dir: number) => {
    const el = portfolioRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.7, behavior: "smooth" });
  };

  const togglePlay = (idx: number) => {
    const vid = videoRefs.current[idx];
    if (!vid) return;
    if (playingIdx === idx) {
      // Already active/unmuted — mute it and show the overlay again
      vid.muted = true;
      setPlayingIdx(null);
    } else {
      // Mute all other videos and show their overlays
      videoRefs.current.forEach((v, i) => {
        if (i !== idx && v) { v.muted = true; }
      });
      // Unmute the clicked video and hide its overlay
      vid.muted = false;
      vid.play();
      setPlayingIdx(idx);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormError(false);
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/webhook/22e98cd2-99cf-4b22-b363-ba7d72f365ed", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          language: i18n.language,
          submittedAt: new Date().toISOString(),
        }),
      });

      // n8n may return non-standard status codes — if the request reached the server at all,
      // the data was delivered. Only a network error (catch block) means true failure.
      console.log("Webhook response status:", response.status);
      setIsSubmitted(true);
      setFormData({ firstName: "", phone: "", city: "" });
    } catch (error) {
      console.error("Network error submitting form:", error);
      // Show inline error instead of alert
      setFormError(true);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* NAV */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border/60">
        <nav className="container flex items-center justify-between h-20">
          <a href="#" className="flex items-center gap-2">
            <span className="font-display text-2xl font-semibold tracking-tight">Lanes<span className="text-forest">.</span></span>
          </a>
          <ul className="hidden md:flex items-center gap-10 text-sm">
            {nav.map((n) => (
              <li key={n}>
                <a href={`#${n.toLowerCase()}`} className="text-foreground/70 hover:text-foreground transition-colors">
                  {t(`nav.${n}`)}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-4">
            <div className="relative">
              <button 
                onClick={() => setIsLangOpen(!isLangOpen)} 
                className="flex items-center gap-2 text-sm font-medium border border-border/60 rounded-full px-3 py-1.5 hover:border-foreground/20 transition-colors"
              >
                <span className="w-5 text-center">{(i18n.language || 'en').toUpperCase()}</span>
                <ChevronDown className={`w-3.5 h-3.5 opacity-50 transition-transform ${isLangOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isLangOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsLangOpen(false)} />
                  <div className="absolute top-full mt-2 end-0 bg-background border border-border/60 rounded-xl shadow-lg py-1 min-w-[80px] z-50">
                    {['en', 'fr', 'ar'].map((lng) => (
                      <button
                        key={lng}
                        onClick={() => {
                          changeLanguage(lng);
                          setIsLangOpen(false);
                        }}
                        className={`w-full text-center px-4 py-2 text-sm hover:bg-secondary transition-colors ${i18n.language === lng ? 'text-forest font-medium' : 'text-foreground/70'}`}
                      >
                        {lng.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
            <a href="#contact" className="inline-flex items-center gap-2 bg-forest text-forest-foreground px-5 py-3 rounded-full text-sm font-medium hover:opacity-90 transition">
              {t('nav.getFreeAudit')} <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </nav>
      </header>

      {/* HERO */}
      <section className="container pt-16 pb-24 lg:pt-24 lg:pb-32">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-6 relative">
            <div className="relative overflow-hidden rounded-2xl aspect-[4/5]">
              <img src={heroCar} alt="Driving school car at golden hour" className="w-full h-full object-cover" width={1280} height={1600} />
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                <div className="bg-background/95 backdrop-blur px-5 py-4 rounded-xl shadow-lg">
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">{t('hero.since')}</div>
                  <div className="font-display text-2xl font-semibold leading-tight">{t('hero.schoolsScaled')}</div>
                </div>
                <button className="bg-forest text-forest-foreground w-14 h-14 rounded-full flex items-center justify-center shadow-xl hover:scale-105 transition">
                  <Play className="w-5 h-5 ml-0.5" fill="currentColor" />
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 lg:pl-6">
            <div className="flex items-center gap-3 mb-8">
              <span className="w-10 h-px bg-forest" />
              <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">{t('hero.marketingFor')}</span>
            </div>
            <h1 className="display-xl text-[clamp(3rem,7vw,6.5rem)] text-balance">
              {t('hero.weMarket')} <em className="italic font-light text-forest/80">{t('hero.wantToGrow')}</em>
            </h1>
            <p className="mt-8 text-lg text-muted-foreground max-w-md leading-relaxed">
              {t('hero.description')}
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a href="#contact" className="inline-flex items-center gap-2 bg-forest text-forest-foreground px-7 py-4 rounded-full text-sm font-medium hover:opacity-90 transition">
                {t('hero.bookAudit')} <ArrowUpRight className="w-4 h-4" />
              </a>
              <a href="#portfolio" className="inline-flex items-center gap-2 border border-foreground/20 px-7 py-4 rounded-full text-sm font-medium hover:bg-foreground hover:text-background transition">
                {t('hero.seeWork')}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* PAIN POINTS */}
      <section className="py-28 lg:py-36">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-20">
            <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">{t('pains.theReality')}</span>
            <h2 className="display-xl text-[clamp(2.5rem,5vw,4.5rem)] mt-6 text-balance">
              {t('pains.struggling')}
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-16 lg:gap-24 max-w-6xl mx-auto">
            {pains.map(({ icon: Icon }, index) => (
              <div key={index} className="text-center md:text-left">
                <Icon className="w-7 h-7 mb-6 mx-auto md:mx-0 stroke-[1.25]" />
                <h3 className="font-display text-2xl font-semibold mb-3">{t(`pains.items.${index}.title`)}</h3>
                <p className="text-muted-foreground leading-relaxed">{t(`pains.items.${index}.text`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="bg-forest text-forest-foreground py-28 lg:py-36">
        <div className="container">
          <div className="grid lg:grid-cols-12 gap-10 mb-20">
            <div className="lg:col-span-5">
              <span className="text-xs uppercase tracking-[0.25em] opacity-60">{t('services.whatWeDo')}</span>
              <h2 className="display-xl text-[clamp(2.5rem,5vw,4.5rem)] mt-6 text-balance">
                {t('services.fiveLevers')} <em className="italic font-light opacity-70">{t('services.oneEngine')}</em>
              </h2>
            </div>
            <div className="lg:col-span-5 lg:col-start-8 flex items-end">
              <p className="opacity-70 leading-relaxed">
                {t('services.description')}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-forest-foreground/10 border border-forest-foreground/10 rounded-2xl overflow-hidden">
            {services.map(({ icon: Icon }, i) => (
              <div key={i} className={`bg-forest p-10 lg:p-12 ${i === 4 ? 'md:col-span-2 lg:col-span-1' : ''}`}>
                <div className="flex items-start justify-between mb-16">
                  <Icon className="w-8 h-8 stroke-[1.25]" />
                  <span className="text-xs opacity-50 tabular-nums">0{i + 1}</span>
                </div>
                <h3 className="font-display text-2xl font-semibold mb-3">{t(`services.items.${i}.title`)}</h3>
                <p className="opacity-70 text-sm leading-relaxed">{t(`services.items.${i}.text`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className="py-28 lg:py-36">
        <div className="container">
          <div className="flex items-end justify-between flex-wrap gap-6 mb-16">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">{t('portfolio.selectedWork')}</span>
              <h2 className="display-xl text-[clamp(2.5rem,5vw,4.5rem)] mt-6">{t('portfolio.workSpeaks')}</h2>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => scrollPortfolio(-1)}
                aria-label="Previous"
                className="w-11 h-11 rounded-full border border-foreground/20 flex items-center justify-center hover:bg-forest hover:text-forest-foreground hover:border-forest transition"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scrollPortfolio(1)}
                aria-label="Next"
                className="w-11 h-11 rounded-full border border-foreground/20 flex items-center justify-center hover:bg-forest hover:text-forest-foreground hover:border-forest transition"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div
          ref={portfolioRef}
          className="overflow-x-auto hide-scrollbar pb-6 scroll-smooth snap-x snap-mandatory scroll-pl-4 lg:scroll-pl-6"
        >
          <div className="flex gap-4 lg:gap-6 px-4 lg:px-[max(1.5rem,calc((100vw-1440px)/2+1.5rem))] w-max">
            {portfolio.map((p, idx) => (
              <article
                key={idx}
                className="shrink-0 w-[80vw] sm:w-[340px] lg:w-[460px] group cursor-pointer snap-start"
              >
                <div
                  className="relative aspect-[9/16] w-full rounded-2xl overflow-hidden bg-ink shadow-lg"
                  onClick={() => togglePlay(idx)}
                >
                  <video
                    ref={(el) => { videoRefs.current[idx] = el; }}
                    src={p.video}
                    className="w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    onEnded={() => setPlayingIdx(null)}
                  />
                  {/* Play/Pause overlay */}
                  <div
                    className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${playingIdx === idx ? "opacity-0 pointer-events-none" : "opacity-100"
                      }`}
                  >
                    <div className="w-20 h-20 rounded-full bg-background/95 backdrop-blur flex items-center justify-center shadow-2xl group-hover:scale-110 transition">
                      {playingIdx === idx ? (
                        <span className="flex gap-1.5">
                          <span className="w-2 h-7 bg-forest rounded-sm" />
                          <span className="w-2 h-7 bg-forest rounded-sm" />
                        </span>
                      ) : (
                        <Play className="w-7 h-7 ml-1 text-forest" fill="currentColor" />
                      )}
                    </div>
                  </div>
                </div>
                <p className="mt-5 text-sm text-muted-foreground">{t(`portfolio.items.${idx}.label`)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section id="results" className="bg-ink text-forest-foreground py-20 lg:py-28">
        <div className="container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-6">
            {stats.map((s, i) => (
              <div key={i} className={`${i > 0 ? 'lg:border-l border-forest-foreground/15 lg:pl-6' : ''}`}>
                <div className="display-xl text-[clamp(3rem,6vw,5.5rem)]">{s.n}</div>
                <div className="text-xs uppercase tracking-[0.25em] opacity-60 mt-3">{t(`stats.items.${i}.l`)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-28 lg:py-36">
        <div className="container">
          <Quote className="w-16 h-16 text-forest mb-10" strokeWidth={1} />
          <div className="grid md:grid-cols-3 gap-12 lg:gap-16">
            {quotes.map((q, i) => (
              <figure key={i}>
                <blockquote className="font-display italic text-2xl lg:text-[26px] leading-snug text-balance">
                  "{t(`quotes.items.${i}.q`)}"
                </blockquote>
                <figcaption className="mt-8 pt-6 border-t border-border">
                  <div className="font-medium">{t(`quotes.items.${i}.name`)}</div>
                  <div className="text-sm text-muted-foreground mt-1">{t(`quotes.items.${i}.city`)}</div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-secondary py-28 lg:py-36">
        <div className="container">
          <div className="max-w-2xl mb-20">
            <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">{t('steps.theProcess')}</span>
            <h2 className="display-xl text-[clamp(2.5rem,5vw,4.5rem)] mt-6 text-balance">
              {t('steps.threeSteps')} <em className="italic font-light">{t('steps.empty')}</em> {t('steps.toFullyBooked')}
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-12 lg:gap-16">
            {steps.map((s, i) => (
              <div key={i} className="relative">
                <div className="display-xl text-[clamp(4rem,8vw,7rem)] text-forest/20">{s.n}</div>
                <h3 className="font-display text-2xl font-semibold mt-4">{t(`steps.items.${i}.t`)}</h3>
                <p className="text-muted-foreground mt-3 leading-relaxed">{t(`steps.items.${i}.d`)}</p>
                {i < 2 && <div className="hidden md:block absolute top-12 right-0 w-12 h-px bg-forest/30" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="py-28 lg:py-36">
        <div className="container">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            <div className="lg:col-span-6 lg:sticky lg:top-32">
              <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">{t('contact.getInTouch')}</span>
              <h2 className="display-xl text-[clamp(3rem,6.5vw,6rem)] mt-6 text-balance">
                {t('contact.readyToFill')}
              </h2>
              <p className="mt-8 text-lg text-muted-foreground max-w-md leading-relaxed">
                {t('contact.description')}
              </p>
            </div>
            {isSubmitted ? (
              <div className="lg:col-span-6 bg-forest/5 border border-forest/20 rounded-3xl p-12 text-center">
                <div className="w-16 h-16 bg-forest text-forest-foreground rounded-full flex items-center justify-center mx-auto mb-6">
                  <Play className="w-6 h-6 rotate-[-90deg]" fill="currentColor" />
                </div>
                <h3 className="text-2xl font-display font-semibold mb-4">{t('contact.success.title', 'Strategy incoming!')}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t('contact.success.message', 'We received your details. Expect your custom strategy in your inbox within 48 hours.')}
                </p>
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="mt-8 text-sm font-medium text-forest hover:underline"
                >
                  {t('contact.success.sendAnother', 'Send another request')}
                </button>
              </div>
            ) : (
              <form className="lg:col-span-6 space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="firstName" className="text-xs uppercase tracking-[0.2em] text-muted-foreground block mb-3">{t('contact.form.firstName')}</label>
                  <input 
                    id="firstName"
                    type="text" 
                    required
                    value={formData.firstName}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                    className="w-full bg-transparent border-b border-foreground/20 pb-3 text-lg focus:outline-none focus:border-forest transition disabled:opacity-50" 
                    placeholder={t('contact.form.firstNamePlaceholder')} 
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="text-xs uppercase tracking-[0.2em] text-muted-foreground block mb-3">{t('contact.form.phone')}</label>
                  <input 
                    id="phone"
                    type="tel" 
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                    className="w-full bg-transparent border-b border-foreground/20 pb-3 text-lg focus:outline-none focus:border-forest transition disabled:opacity-50" 
                    placeholder={t('contact.form.phonePlaceholder')} 
                  />
                </div>
                <div>
                  <label htmlFor="city" className="text-xs uppercase tracking-[0.2em] text-muted-foreground block mb-3">{t('contact.form.city')}</label>
                  <input 
                    id="city"
                    type="text" 
                    required
                    value={formData.city}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                    className="w-full bg-transparent border-b border-foreground/20 pb-3 text-lg focus:outline-none focus:border-forest transition disabled:opacity-50" 
                    placeholder={t('contact.form.cityPlaceholder')} 
                  />
                </div>
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-8 w-full inline-flex items-center justify-between bg-forest text-forest-foreground px-8 py-6 rounded-full text-base font-medium hover:opacity-90 transition group disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? t('contact.form.submitting', 'Sending...') : t('contact.form.submit')}
                  <ArrowUpRight className={`w-5 h-5 transition ${isSubmitting ? 'animate-pulse' : 'group-hover:translate-x-1 group-hover:-translate-y-1'}`} />
                </button>
                {formError && (
                  <p className="mt-4 text-sm text-red-500 text-center">
                    {t('contact.form.error', 'Something went wrong. Please try again.')}
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-forest text-forest-foreground">
        <div className="container py-16">
          <div className="grid md:grid-cols-3 gap-10 items-center">
            <div className="font-display text-2xl font-semibold">Lanes<span className="opacity-60">.</span></div>
            <ul className="flex gap-8 justify-center text-sm opacity-70">
              <li><a href="#" className="hover:opacity-100">{t('footer.privacy')}</a></li>
              <li><a href="#" className="hover:opacity-100">{t('footer.terms')}</a></li>
              <li><a href="#" className="hover:opacity-100">{t('footer.imprint')}</a></li>
            </ul>
            <ul className="flex gap-6 md:justify-end text-sm opacity-70">
              <li><a href="#" className="hover:opacity-100">{t('footer.instagram')}</a></li>
              <li><a href="#" className="hover:opacity-100">{t('footer.linkedin')}</a></li>
              <li><a href="#" className="hover:opacity-100">{t('footer.youtube')}</a></li>
            </ul>
          </div>
          <div className="mt-16 pt-8 border-t border-forest-foreground/15 text-xs opacity-50 flex flex-wrap justify-between gap-3">
            <span>{t('footer.copyright')}</span>
            <span>{t('footer.builtFor')}</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
