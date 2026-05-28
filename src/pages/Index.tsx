import heroCar from "@/assets/hero-car.jpg";
import logo from "@/assets/logo.png";
import logoIcon from "@/assets/logo icon.png";
import footerLogo from "@/assets/footer logo.png";
const video1 = "https://res.cloudinary.com/dkjsjwzvl/video/upload/v1778254324/project-1-1_3MHAbghf_kruq3c.mp4";
const video2 = "https://res.cloudinary.com/dkjsjwzvl/video/upload/v1778254345/project-2_ZY1ECD30_awtpcc.mp4";
const video3 = "https://res.cloudinary.com/dkjsjwzvl/video/upload/v1778254333/project-3-1_DECoIJf2_ijd5r9.mp4";
const video4 = "https://res.cloudinary.com/dkjsjwzvl/video/upload/v1778254334/project-4_AYsTYSj5_qztqhn.mp4";
const video5 = "https://res.cloudinary.com/dkjsjwzvl/video/upload/v1778252003/uc_m7m5hu.mp4";
const video6 = "https://res.cloudinary.com/dkjsjwzvl/video/upload/v1778252097/uc_hjsqn5.mp4";
const video7 = "https://res.cloudinary.com/dkjsjwzvl/video/upload/v1778254349/chihab-1f_3L6ZdXjX_ja9mbw.mp4";
const video8 = "https://res.cloudinary.com/dkjsjwzvl/video/upload/v1778254338/chihab-2f_rqtAQjpj_zzobvp.mp4";
const video9 = "https://res.cloudinary.com/dkjsjwzvl/video/upload/v1778254339/chihab-3f_rOKObkad_sguigo.mp4";

const cdnVideo = (url: string) => url.replace("/upload/", "/upload/q_auto:good,f_auto,w_920/");
const videoPoster = (url: string) => url.replace("/upload/", "/upload/so_0/").replace(/\.[^/.]+$/, ".jpg");
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
  { video: cdnVideo(video1), label: "Facebook Ads Campaign — Auto-École Marrakech" },
  { video: cdnVideo(video2), label: "Brand Film — Drive Académie Casablanca" },
  { video: cdnVideo(video3), label: "TikTok Series — Permis Express Lyon" },
  { video: cdnVideo(video4), label: "Recruitment Funnel — Stadt Fahrschule Berlin" },
  { video: cdnVideo(video5), label: "Cinematic Showcase — Auto-École Khadija" },
  { video: cdnVideo(video6), label: "Promo Reel — Auto-École Khadija" },
  { video: cdnVideo(video7), label: "Student Success — Auto-École Chihab (Part 1)" },
  { video: cdnVideo(video8), label: "Student Success — Auto-École Chihab (Part 2)" },
  { video: cdnVideo(video9), label: "Student Success — Auto-École Chihab (Part 3)" },
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
  const [workingHours, setWorkingHours] = useState(4);

  useEffect(() => {
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    
    videoRefs.current.forEach((vid) => {
      if (!vid) return;
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            vid.load();
            vid.play().catch(err => console.error("Video play failed:", err));
          } else {
            vid.pause();
          }
        });
      }, { threshold: 0.3 });
      
      observer.observe(vid);
      observers.push(observer);
    });

    return () => {
      observers.forEach(o => o.disconnect());
    };
  }, []);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const scrollPortfolio = (dir: number) => {
    const el = portfolioRef.current;
    if (!el) return;
    const isRtl = i18n.language === 'ar';
    const factor = isRtl ? -1 : 1;
    el.scrollBy({ left: dir * el.clientWidth * 0.7 * factor, behavior: "smooth" });
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
      const response = await fetch(import.meta.env.VITE_WEBHOOK_URL, {
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
        <nav className="container flex items-center justify-between h-16 sm:h-20">
          <a href="#" className="flex items-center gap-2 shrink-0">
            <img src={logoIcon} alt="Flomark icon" className="h-8 sm:h-10 w-auto" />
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
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="relative">
              <button 
                onClick={() => setIsLangOpen(!isLangOpen)} 
                className="flex items-center gap-2 text-xs sm:text-sm font-medium border border-border/60 rounded-full px-2 py-1 sm:px-3 sm:py-1.5 hover:border-foreground/20 transition-colors shrink-0"
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
            <a href="#contact" className="inline-flex items-center gap-2 bg-forest text-forest-foreground px-3 py-2 sm:px-5 sm:py-3 rounded-full text-xs sm:text-sm font-medium hover:opacity-90 transition shrink-0">
              <span className="hidden sm:inline">{t('nav.getFreeAudit')}</span> <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
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
            <p className="mt-4 text-forest font-medium border-l-2 border-forest pl-4 py-1">
              {t('hero.hardPromise')}
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

          {/* CALCULATOR */}
          <div className="mt-24 max-w-2xl mx-auto bg-forest/5 border border-forest/10 rounded-3xl p-8 lg:p-12">
            <h3 className="font-display text-2xl font-semibold mb-8 text-center">{t('pains.calculator.title')}</h3>
            <div className="space-y-8">
              <div>
                <div className="flex justify-between mb-4">
                  <label className="text-sm font-medium text-muted-foreground">{t('pains.calculator.workingHours')}</label>
                  <span className="text-forest font-bold">{workingHours}h</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="8" 
                  step="1"
                  value={workingHours}
                  onChange={(e) => setWorkingHours(parseInt(e.target.value))}
                  className="w-full accent-forest"
                />
              </div>
              <div className="pt-8 border-t border-forest/10 text-center">
                <div className="text-sm uppercase tracking-widest text-muted-foreground mb-2">{t('pains.calculator.lostRevenue')}</div>
                <div className="display-xl text-red-500/80 text-[clamp(2.5rem,5vw,4rem)]">
                  ~{(8 - workingHours) * 500} <span className="text-lg opacity-60 font-normal">{t('pains.calculator.currency')}</span>
                </div>
              </div>
            </div>
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
                <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
              </button>
              <button
                onClick={() => scrollPortfolio(1)}
                aria-label="Next"
                className="w-11 h-11 rounded-full border border-foreground/20 flex items-center justify-center hover:bg-forest hover:text-forest-foreground hover:border-forest transition"
              >
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </button>
            </div>
          </div>
        </div>

        <div
          ref={portfolioRef}
          className="overflow-x-auto hide-scrollbar pb-6 scroll-smooth snap-x snap-mandatory scroll-ps-4 lg:scroll-ps-6"
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
                    poster={videoPoster(p.video)}
                    className="w-full h-full object-cover"
                    muted
                    loop
                    playsInline
                    preload="none"
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
                <h3 className="text-2xl font-display font-semibold mb-4">{t('contact.form.success.title')}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t('contact.form.success.message')}
                </p>
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="mt-8 text-sm font-medium text-forest hover:underline"
                >
                  {t('contact.form.success.sendAnother')}
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
            <div><img src={footerLogo} alt="Flomark logo" className="h-9 w-auto" /></div>
            <ul className="flex gap-8 justify-center text-sm opacity-70">
              <li><a href="#" className="hover:opacity-100">{t('footer.privacy')}</a></li>
              <li><a href="#" className="hover:opacity-100">{t('footer.terms')}</a></li>
              <li><a href="#" className="hover:opacity-100">{t('footer.imprint')}</a></li>
            </ul>
            <ul className="flex gap-6 md:justify-end text-sm opacity-70">
              <li><a href="https://web.facebook.com/profile.php?id=61572368781515" target="_blank" rel="noopener noreferrer" className="hover:opacity-100">{t('footer.facebook')}</a></li>
              <li><a href="https://www.instagram.com/flowmark.ma/" target="_blank" rel="noopener noreferrer" className="hover:opacity-100">{t('footer.instagram')}</a></li>
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
