"use client";

import Image from "next/image";
import { FormEvent, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown, Menu, Radio, X } from "lucide-react";
import { AnimatedText } from "@/components/animated-text";
import { MagneticDots } from "@/components/magnetic-dots";

type Language = "ua" | "en";

const copy = {
  ua: {
    nav: [
      { id: "ground", label: "Наземна пеленгація" },
      { id: "air", label: "Повітряна пеленгація" },
      { id: "team", label: "Команда" },
      { id: "technology", label: "Технології" },
    ],
    preorder: "Передзамовити",
    demo: "Записатися на демо",
    productsTitle: "Екосистема продуктів для радіорозвідки, зроблена в Україні",
    productsText: "",
    products: [
      {
        name: "FARADAY SDR",
        state: "ДОСТУПНО ЗАРАЗ",
        text: "",
        meta: ["4K SDR"],
      },
      {
        name: "Radio Direction Finder",
        state: "ПЕРЕДЗАМОВЛЕННЯ",
        text: "",
        meta: ["Direction finder"],
      },
      {
        name: "BRAVE AERO ELINT",
        state: "ПЕРЕДЗАМОВЛЕННЯ",
        text: "",
        meta: ["16K SDR", "UAV ELINT"],
      },
    ],
    airTitle: "FARADAY 16KRXSDR",
    airText:
      "16-канальна SDR-платформа для повітряної розвідки та систем CRPA.",
    preliminary: "Попередні характеристики",
    subjectToChange: "Попередні",
    notifyLaunch: "Повідомити мене про запуск",
    specs: [
      ["Кількість каналів", "16 когерентних"],
      ["Підтримка антен", "CRPA arrays"],
      ["Носій", "UAV payload / airborne"],
      ["Точність DOA", "Підвищена (TBD)"],
      ["Діапазон", "TBD (expanded vs 4K)"],
      ["Дальність роботи", "10+ км від фронту"],
    ],
    applicationsTitle: "Застосування 16K SDR",
    airCards: [
      [
        "UAV ELINT Faraday 16K",
        "Повітряна 16-канальна РТР-станція",
        "Шукає пріоритетні цілі",
        "Передає точні координати",
        "Працює за 10+ км від фронту",
      ],
      [
        "CRPA-антенна система",
        "Захист від навмисних завад",
        "Для критичних комунікацій",
        "Адаптивна антенна решітка",
      ],
      [
        "Пеленгація далекої дії",
        "Стаціонарна РТР",
        "Радіус покриття 50+ км",
        "Для спостереження за театром дій",
      ],
    ],
    techTitle: "",
    apiTitle: "Приклади використання API",
    datasheetTitle: "ТТХ / API / Datasheet",
    builtOnTitle: "На базі платформи",
    apiExamples: [
      "Signal Source Table",
      "Інтеграція з існуючими системами C2",
      "1GbE, оновлення 10 Hz",
    ],
    roadmap: [
      [
        "Anti-Radiation Seeker",
        "Дрон наводиться по випромінюванню РЕБ противника.",
      ],
      ["Корабельна РТР", "Для морських дронів та місій у Чорному морі."],
      ["Пасивний радар", "Виявлення цілей без власного випромінювання."],
    ],
    teamTitle: "Команда, яка це побудувала",
    team: [
      ["RESEARCH", "3 науковці", "1 з CERN, 2 PhD"],
      ["EMBEDDED", "2 інженери", "20+ років досвіду"],
      ["RF DESIGN", "2 інженери", "15+ років досвіду"],
      ["FPGA / LOGIC", "1 інженер", "10+ років досвіду"],
    ],
    faqTitle: "Поширені питання",
    faqs: [
      [
        "Яка точність пеленгації в реальних польових умовах?",
        "Алгоритм MUSIC забезпечує точність 8° (1.3% фазової похибки) при калібровці 4 каналів по 5-му опорному. Коефіцієнти кешуються, другий прохід значно швидший. Скидаються при power cycle або команді Reset.",
      ],
      [
        "Чи може система одночасно виявляти кілька цілей?",
        "Так. MUSIC підтримує виявлення 2+ джерел у вікні одночасно. Довжина фрейму регулюється від 2^12 до 2^20. Signal Source Table передає азимут, зеніт, частоту, силу, відстань і швидкість.",
      ],
      [
        "Скільки коштує повний комплект для підрозділу?",
        "Комплект з 4 радарів і 5 SDR-станцій: $100,000. Собівартість плати при тиражі 100 шт.: близько $2,800. Це у 10-30 разів дешевше західних аналогів.",
      ],
      [
        "Чи можна інтегрувати в існуючі системи C2?",
        "Так. Вихідні дані передаються через 1GbE з оновленням 10 Hz. Signal Source Table містить тактичні параметри для інтеграції через стандартний мережевий стек.",
      ],
      [
        "Коли доступне відвантаження?",
        "Передзамовлення приймаються зараз. Перші відвантаження: серпень 2026.",
      ],
    ],
    formTitle: "Реєстрація на демо і передзамовлення",
    formNotice:
      "Участь у заході здійснюється за запрошеннями. Ми уважно розглядаємо кожну заявку, але через обмежену кількість місць не зможемо задовольнити всі запити.",
    name: "Ім'я / Позивний",
    org: "Організація / Підрозділ",
    contact: "Контакт (Signal / WhatsApp / Email)",
    interest: "Що цікавить",
    send: "Надіслати",
    qr: "QR WhatsApp",
    emailQr: "QR email",
    contactNext: "QR WhatsApp · email · Давайте обговоримо наступний крок",
    footerLine: "Технологія готова. Команда готова. Фронт чекає.",
    sent: "Заявку отримано. Ми зв'яжемося з вами після перевірки.",
    error:
      "Не вдалося відправити заявку. Спробуйте ще раз або напишіть на email.",
  },
  en: {
    nav: [
      { id: "ground", label: "Ground DF" },
      { id: "air", label: "Airborne DF" },
      { id: "team", label: "Team" },
      { id: "technology", label: "Technology" },
    ],
    preorder: "Pre-order",
    demo: "Book a demo",
    productsTitle: "A radio intelligence ecosystem made in Ukraine",
    productsText: "",
    products: [
      {
        name: "FARADAY SDR",
        state: "AVAILABLE NOW",
        text: "",
        meta: ["4K SDR"],
      },
      {
        name: "Radio Direction Finder",
        state: "PRE-ORDER",
        text: "",
        meta: ["Direction finder"],
      },
      {
        name: "BRAVE AERO ELINT",
        state: "PRE-ORDER",
        text: "",
        meta: ["16K SDR", "UAV ELINT"],
      },
    ],
    airTitle: "FARADAY 16KRXSDR",
    airText:
      "16-channel SDR platform for airborne intelligence and CRPA antenna systems.",
    preliminary: "Preliminary specs",
    subjectToChange: "Preliminary / subject to change",
    notifyLaunch: "Notify me at launch",
    specs: [
      ["Number of Channels", "16 coherent"],
      ["Antenna Support", "CRPA arrays"],
      ["Platform", "UAV payload / airborne"],
      ["DOA Accuracy", "Enhanced (TBD)"],
      ["Frequency Range", "TBD (expanded vs 4K)"],
      ["Operational Range", "10+ km from front"],
    ],
    applicationsTitle: "Applications of 16K SDR",
    airCards: [
      [
        "UAV ELINT Faraday 16K",
        "Airborne 16-channel RECON station",
        "Prioritizes high-value targets",
        "Transmits precise coordinates",
        "Operates 10+ km from front line",
      ],
      [
        "CRPA antenna system",
        "Protection from intentional jamming",
        "For critical communications",
        "Adaptive antenna array",
      ],
      [
        "Long-range direction finding",
        "Fixed-position RECON station",
        "50+ km coverage radius",
        "Theater-level situational awareness",
      ],
    ],
    techTitle: "",
    apiTitle: "API usage examples",
    datasheetTitle: "Specs / API / Datasheet",
    builtOnTitle: "Built on platform",
    apiExamples: [
      "Signal Source Table",
      "Integration with existing C2 systems",
      "1GbE, 10 Hz update rate",
    ],
    roadmap: [
      ["Anti-Radiation Seeker", "Drone homes on enemy EW emissions."],
      ["Naval RECON", "For naval USVs and Black Sea missions."],
      ["Passive Radar", "Target detection with zero own emissions."],
    ],
    teamTitle: "The team that built it",
    team: [
      ["RESEARCH", "3 scientists", "1 from CERN, 2 PhDs"],
      ["EMBEDDED", "2 engineers", "20+ years experience"],
      ["RF DESIGN", "2 engineers", "15+ years experience"],
      ["FPGA / LOGIC", "1 engineer", "10+ years experience"],
    ],
    faqTitle: "FAQ",
    faqs: [
      [
        "What is direction-finding accuracy in real field conditions?",
        "The MUSIC algorithm achieves 8° accuracy (1.3% phase error) with 4 channels calibrated against the 5th reference. Calibration coefficients are cached, making the second pass significantly faster. Reset on power cycle or Reset command.",
      ],
      [
        "Can the system detect multiple targets simultaneously?",
        "Yes. MUSIC supports 2+ simultaneous sources per window. Frame length is adjustable from 2^12 to 2^20. The Signal Source Table provides azimuth, zenith, frequency, power, distance and velocity.",
      ],
      [
        "What does a full kit for a unit cost?",
        "Bundle of 4 radars and 5 SDR stations: $100,000. PCB cost at a 100-unit run: around $2,800. That is 10-30 times cheaper than Western equivalents.",
      ],
      [
        "Can it integrate with existing C2 systems?",
        "Yes. Output data is transmitted via 1GbE at a 10 Hz update rate. The Signal Source Table includes tactical parameters for integration through a standard network stack.",
      ],
      [
        "When are shipments available?",
        "Pre-orders are open now. First shipments: August 2026.",
      ],
    ],
    formTitle: "Demo registration and pre-order",
    formNotice:
      "Participation is invitation-based. We review every application carefully, but due to limited capacity we may not be able to accept every request.",
    name: "Name / Callsign",
    org: "Organization / Unit",
    contact: "Contact (Signal / WhatsApp / Email)",
    interest: "Interest",
    send: "Send",
    qr: "WhatsApp QR",
    emailQr: "email QR",
    contactNext: "WhatsApp QR · email · Let's discuss next steps",
    footerLine:
      "The technology is ready. The team is ready. The front is waiting.",
    sent: "Request received. We will contact you after review.",
    error: "Could not send the request. Please try again or email us directly.",
  },
};

const interestOptions = {
  ua: ["4K SDR", "16K SDR", "Партнерство", "Інвестиції"],
  en: ["4K SDR", "16K SDR", "Partnership", "Investment"],
};

const productImages = [
  "/Drone-Detector-Faraday-4K.webp",
  "/EW-Detector-Faraday-4K.webp",
  "/UAV-ELINT-Faraday-16K.webp",
];

const primaryAction =
  "cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#48ff7d] hover:shadow-[0_0_24px_rgba(37,248,96,0.28)] active:translate-y-0 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-[#25f860]/60";

const secondaryAction =
  "cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#25f860]/12 hover:border-[#25f860]/70 active:translate-y-0 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-[#25f860]/50";

const quietAction =
  "cursor-pointer transition-colors duration-200 active:scale-[0.98]";

export default function FaradayPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [dynamicWordIndex, setDynamicWordIndex] = useState(0);
  const [wordFade, setWordFade] = useState(true);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [language, setLanguage] = useState<Language>("ua");
  const [formStatus, setFormStatus] = useState<
    "idle" | "sending" | "sent" | "error"
  >("idle");
  const heroRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const t = copy[language];
  const dynamicWords = ["сигнали", "загрози", "ворога", "рухи", "частоти"];

  useEffect(() => {
    const wordInterval = setInterval(() => {
      setWordFade(false);
      setTimeout(() => {
        setDynamicWordIndex((prev) => (prev + 1) % dynamicWords.length);
        setWordFade(true);
      }, 300);
    }, 3000);

    return () => clearInterval(wordInterval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsLoaded(true);

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    );

    const elements = document.querySelectorAll(".animate-on-scroll");
    elements.forEach((el) => observerRef.current?.observe(el));

    return () => observerRef.current?.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  const handleLeadSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormStatus("sending");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: formData.get("name"),
      organization: formData.get("organization"),
      contact: formData.get("contact"),
      interest: formData.get("interest"),
      message: formData.get("message"),
      language,
    };

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Lead request failed");
      }

      form.reset();
      setFormStatus("sent");
    } catch {
      setFormStatus("error");
    }
  };

  return (
    <div className="relative min-h-screen bg-[#0A0A0A] text-[#F2F3F5] overflow-x-hidden">
      {/* Desktop header */}
      <header className="fixed top-4 left-6 right-6 md:left-8 md:right-8 lg:left-12 lg:right-12 z-40 flex items-center justify-between">
        {/* Logo + nav pill */}
        <div className="flex items-center gap-0 border border-[#25f860]/20 backdrop-blur-md bg-[#0A0A0A]/80 rounded-lg h-11 px-4 py-5">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className={`flex items-center gap-0 pr-5 border-r border-[#25f860]/15 hover:opacity-70 ${quietAction}`}
          >
            <Image
              src="/logo.svg"
              alt="Faraday"
              width={80}
              height={20}
              className="h-[24px] w-auto"
              priority
            />
          </button>
          <nav className="hidden md:flex items-center gap-6 pl-6">
            {t.nav.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-sm font-medium text-[#A7ABB3] hover:text-[#25f860] ${quietAction}`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="hidden md:flex items-center gap-2">
          <div className="flex h-11 items-center rounded-lg border border-[#25f860]/20 bg-[#0A0A0A]/80 p-1 backdrop-blur-md">
            {(["ua", "en"] as Language[]).map((item) => (
              <button
                key={item}
                onClick={() => setLanguage(item)}
                className={`h-8 rounded-md px-3 text-xs font-semibold ${quietAction} ${
                  language === item
                    ? "bg-[#25f860] text-[#0A0A0A]"
                    : "text-[#A7ABB3] hover:text-[#F2F3F5]"
                }`}
              >
                {item.toUpperCase()}
              </button>
            ))}
          </div>
          <Button
            onClick={() => scrollToSection("contact")}
            className={`h-11 rounded-lg bg-[#25f860] px-4 text-sm font-semibold text-[#0A0A0A] ${primaryAction}`}
          >
            {t.preorder} <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        {/* Mobile hamburger - separate pill */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`md:hidden w-12 h-12 flex items-center justify-center border border-[#25f860]/20 backdrop-blur-md bg-[#0A0A0A]/80 rounded-lg ${secondaryAction}`}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="w-4 h-4" />
          ) : (
            <Menu className="w-4 h-4" />
          )}
        </button>
      </header>

      {/* Mobile dropdown menu - popup card */}
      {isMenuOpen && (
        <div className="fixed top-[76px] left-6 right-6 z-50 border border-[#25f860]/20 backdrop-blur-xl bg-[#0D0D0D]/95 rounded-xl overflow-hidden shadow-2xl shadow-black/60 md:hidden">
          <nav className="flex flex-col py-2">
            {t.nav.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`w-full text-left px-5 py-3.5 text-sm font-medium text-[#A7ABB3] hover:text-[#25f860] hover:bg-[#25f860]/5 border-b border-[#25f860]/8 last:border-0 ${quietAction}`}
              >
                {item.label}
              </button>
            ))}
            <div className="flex items-center justify-between gap-3 px-5 py-3.5">
              <div className="flex rounded-lg border border-[#25f860]/20 p-1">
                {(["ua", "en"] as Language[]).map((item) => (
                  <button
                    key={item}
                    onClick={() => setLanguage(item)}
                    className={`h-8 rounded-md px-3 text-xs font-semibold ${quietAction} ${
                      language === item
                        ? "bg-[#25f860] text-[#0A0A0A]"
                        : "text-[#A7ABB3]"
                    }`}
                  >
                    {item.toUpperCase()}
                  </button>
                ))}
              </div>
              <Button
                onClick={() => scrollToSection("contact")}
                className={`h-10 rounded-lg bg-[#25f860] px-4 text-sm font-semibold text-[#0A0A0A] ${primaryAction}`}
              >
                {t.preorder}
              </Button>
            </div>
          </nav>
        </div>
      )}

      {/* Hero Section */}
      <section
        ref={heroRef}
        className={`relative min-h-screen flex flex-col items-center justify-center px-6 md:px-12 lg:px-24 pt-24 pb-16 md:pt-32 md:pb-24 transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden ${isLoaded ? "scale-100 opacity-100" : "scale-[1.03] opacity-0"}`}
      >
        <MagneticDots
          dotColor="rgba(37, 248, 96, 0.2)"
          dotSpacing={24}
          dotSize={1.5}
          rippleRadius={150}
          rippleStrength={30}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#25f860]/5 via-transparent to-transparent pointer-events-none" />

        <div
          className="max-w-5xl w-full mx-auto relative z-10"
          style={{
            transform: `translateY(${scrollY * 0.2}px)`,
          }}
        >
          <div className="text-center mb-8 md:mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg mb-6 text-[10px] md:text-xs text-[#A7ABB3] border border-[#25f860]/20 bg-[#25f860]/5 stagger-reveal">
              <span className="w-1 h-1 rounded-full bg-[#25f860] animate-pulse" />
              SIGINT / ELINT / COMINT
            </div>

            <h1 className="text-[36px] leading-[1.05] sm:text-[52px] md:text-[72px] md:leading-[1.05] font-bold mb-4 md:mb-6 text-balance tracking-tight">
              <span
                className={`block stagger-reveal transition-all duration-500 ${
                  wordFade ? "opacity-100 blur-0" : "opacity-0 blur-lg"
                }`}
              >
                Виявляй{" "}
                <span className="text-[#25f860]">
                  <AnimatedText
                    key={dynamicWordIndex}
                    text={dynamicWords[dynamicWordIndex]}
                    delay={0}
                  />
                </span>
              </span>
              <span
                className="block stagger-reveal"
                style={{ animationDelay: "90ms" }}
              >
                в реальному часі
              </span>
            </h1>
            <p
              className="text-[#A7ABB3] text-sm md:text-lg max-w-[560px] mx-auto mb-6 md:mb-8 leading-relaxed stagger-reveal"
              style={{ animationDelay: "180ms" }}
            >
              Faraday RIB — мобільна платформа радіотехнічної розвідки для
              виявлення та аналізу радіоелектронних засобів противника на
              передовій.
            </p>
            <div
              className="stagger-reveal flex flex-row gap-3 justify-center"
              style={{ animationDelay: "270ms" }}
            >
              <Button
                onClick={() => scrollToSection("contact")}
                className={`flex-1 sm:flex-none px-5 py-2.5 h-10 text-sm rounded-lg bg-[#25f860] text-[#0A0A0A] font-semibold ${primaryAction}`}
              >
                Замовити демо
              </Button>
              <Button
                onClick={() => scrollToSection("products")}
                className={`flex-1 sm:flex-none px-5 py-2.5 h-10 text-sm rounded-lg border border-[#25f860]/30 bg-transparent text-[#F2F3F5] ${secondaryAction}`}
              >
                Документація
              </Button>
            </div>
          </div>

          {/* Product Image Placeholder */}
          <div
            className="mt-12 md:mt-20 stagger-reveal"
            style={{ animationDelay: "360ms" }}
          >
            <div className="relative aspect-[16/9] rounded-xl overflow-hidden border border-[#25f860]/20 bg-[#0A0A0A]">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto mb-6 rounded-full border-2 border-[#25f860]/30 flex items-center justify-center">
                    <Radio className="w-16 h-16 text-[#25f860]/60" />
                  </div>
                  <p className="text-[#A7ABB3] text-sm font-mono">
                    FARADAY RIB SYSTEM
                  </p>
                </div>
              </div>
              {/* Animated scan line */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute w-full h-[2px] bg-gradient-to-r from-transparent via-[#25f860]/50 to-transparent animate-scan" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="products"
        className="relative min-h-screen px-5 py-12 md:px-12 md:py-14 lg:px-24 animate-on-scroll"
      >
        <div className="mx-auto flex min-h-[calc(100vh-6rem)] w-full max-w-6xl flex-col justify-start gap-10 pt-16 md:pt-20">
          <div className="mx-auto max-w-5xl text-center">
            <h2 className="text-[30px] font-bold leading-[1.05] tracking-tight md:text-[52px] lg:text-[58px]">
              {t.productsTitle}
            </h2>
            {t.productsText && (
              <p className="mx-auto mt-4 max-w-[620px] text-sm leading-relaxed text-[#A7ABB3] md:text-base">
                {t.productsText}
              </p>
            )}
            <Button
              onClick={() => scrollToSection("contact")}
              className={`mt-6 h-11 rounded-lg bg-[#25f860] px-5 text-sm font-semibold text-[#0A0A0A] ${primaryAction}`}
            >
              {t.preorder} <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {t.products.map((product, index) => (
              <article
                key={product.name}
                id={index === 1 ? "ground" : undefined}
                className="rounded-xl border border-[#25f860]/12 bg-[#111312] p-4 transition-all duration-200 hover:-translate-y-1 hover:border-[#25f860]/40 hover:bg-[#151915] hover:shadow-[0_0_28px_rgba(37,248,96,0.10)]"
              >
                <div className="relative h-[150px] overflow-hidden rounded-lg border border-[#25f860]/10 bg-[#050706] md:h-[180px] lg:h-[170px]">
                  <Image
                    src={productImages[index]}
                    alt={product.name}
                    fill
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    className="object-contain p-4"
                  />
                </div>
                <div className="pt-4">
                  <div className="mb-3 inline-flex rounded-md border border-[#25f860]/20 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#25f860]">
                    {product.state}
                  </div>
                  <h3 className="text-lg font-semibold leading-tight md:text-xl">
                    {product.name}
                  </h3>
                  {product.text && (
                    <p className="mt-2 text-sm leading-relaxed text-[#A7ABB3]">
                      {product.text}
                    </p>
                  )}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {product.meta.map((item) => (
                      <span
                        key={item}
                        className="rounded-md bg-[#25f860]/10 px-3 py-1 text-xs font-mono text-[#25f860]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="air"
        className="relative px-5 py-16 md:px-12 md:py-28 lg:px-24 animate-on-scroll"
      >
        <div className="mx-auto w-full max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div>
              <h2 className="max-w-[700px] text-[30px] font-bold leading-[1.05] tracking-tight md:text-[56px]">
                {t.airTitle}
              </h2>
              <p className="mt-5 max-w-[620px] text-sm leading-relaxed text-[#A7ABB3] md:text-base">
                {t.airText}
              </p>
              <Button
                onClick={() => scrollToSection("contact")}
                className={`mt-7 h-11 rounded-lg bg-[#25f860] px-5 text-sm font-semibold text-[#0A0A0A] ${primaryAction}`}
              >
                {t.notifyLaunch} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="rounded-xl border border-[#25f860]/12 bg-[#111312] p-5 md:p-6">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <h3 className="text-lg font-semibold">{t.preliminary}</h3>
                <span className="rounded-md border border-[#25f860]/20 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#25f860]">
                  {t.subjectToChange}
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[480px] text-left text-sm">
                  <thead className="text-xs text-[#A7ABB3]">
                    <tr className="border-b border-[#25f860]/12">
                      <th className="py-3 pr-4 font-medium">
                        {language === "ua" ? "Параметр" : "Parameter"}
                      </th>
                      <th className="py-3 font-medium">
                        {language === "ua" ? "Значення" : "Value"}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {t.specs.map(([parameter, value]) => (
                      <tr
                        key={parameter}
                        className="border-b border-[#25f860]/8 last:border-0"
                      >
                        <td className="py-3 pr-4 text-[#D9DDE3]">
                          {parameter}
                        </td>
                        <td className="py-3 font-semibold text-[#25f860]">
                          {value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <h3 className="text-[26px] font-bold leading-tight md:text-[36px]">
              {t.applicationsTitle}
            </h3>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {t.airCards.map(([title, ...items]) => (
                <div
                  key={title}
                  className="rounded-xl border border-[#25f860]/12 bg-[#111312] p-6"
                >
                  <h4 className="text-lg font-semibold leading-tight">
                    {title}
                  </h4>
                  <ul className="mt-5 space-y-3 text-sm leading-relaxed text-[#A7ABB3]">
                    {items.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-[#25f860]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="team"
        className="relative px-5 py-16 md:px-12 md:py-28 lg:px-24 animate-on-scroll"
      >
        <div className="mx-auto w-full max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <h2 className="text-[30px] font-bold leading-[1.05] tracking-tight md:text-[52px]">
                {t.teamTitle}
              </h2>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              {t.team.map(([area, count, details]) => (
                <div
                  key={area}
                  className="rounded-xl border border-[#25f860]/12 bg-[#111312] p-5"
                >
                  <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#25f860]">
                    {area}
                  </div>
                  <div className="mt-4 text-2xl font-bold">{count}</div>
                  <div className="mt-2 text-sm text-[#A7ABB3]">{details}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="technology"
        className="relative border-y border-[#25f860]/10 bg-[#050505] px-5 py-16 md:px-12 md:py-28 lg:px-24 animate-on-scroll"
      >
        <div className="mx-auto w-full max-w-6xl">
          <div>
            <h2 className="max-w-[760px] text-[30px] font-bold leading-[1.05] tracking-tight md:text-[52px]">
              {t.techTitle}
            </h2>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="rounded-xl border border-[#25f860]/12 bg-[#111312] p-6">
              <h3 className="text-xl font-semibold">{t.apiTitle}</h3>
              <div className="mt-5 grid gap-3">
                {t.apiExamples.map((item) => (
                  <div
                    key={item}
                    className="rounded-lg border border-[#25f860]/10 bg-[#0A0A0A] px-4 py-3 text-sm text-[#D9DDE3]"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-xl border border-[#25f860]/12 bg-[#111312] p-6">
              <h3 className="text-xl font-semibold">{t.datasheetTitle}</h3>
              <p className="mt-4 text-sm leading-relaxed text-[#A7ABB3]">
                {language === "ua"
                  ? "ТТХ, API та datasheet для максимально повного опису продукту."
                  : "Specs, API and datasheet for the full product reference."}
              </p>
              <Button
                onClick={() => scrollToSection("contact")}
                className={`mt-6 h-11 rounded-lg border border-[#25f860]/30 bg-transparent px-5 text-sm font-semibold text-[#F2F3F5] ${secondaryAction}`}
              >
                {language === "ua" ? "Запитати datasheet" : "Request datasheet"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="mt-10">
            <h3 className="text-[24px] font-bold leading-tight md:text-[34px]">
              {t.builtOnTitle}
            </h3>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {t.roadmap.map(([title, text]) => (
                <div
                  key={title}
                  className="rounded-xl border border-[#25f860]/12 bg-[#111312] p-5"
                >
                  <h3 className="text-base font-semibold">{title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#A7ABB3]">
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="faq"
        className="relative border-y border-[#25f860]/10 bg-[#050505] px-5 py-16 md:px-12 md:py-28 lg:px-24 animate-on-scroll"
      >
        <div className="mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <h2 className="text-[30px] font-bold leading-[1.05] tracking-tight md:text-[52px]">
              {t.faqTitle}
            </h2>
          </div>
          <div className="space-y-3">
            {t.faqs.map(([question, answer], index) => (
              <div
                key={question}
                className="overflow-hidden rounded-xl border border-[#25f860]/12 bg-[#111312]"
              >
                <button
                  onClick={() =>
                    setOpenFaqIndex(openFaqIndex === index ? null : index)
                  }
                  className={`flex w-full items-center justify-between gap-4 p-5 text-left md:p-6 hover:bg-[#25f860]/5 ${quietAction}`}
                >
                  <span className="text-sm font-semibold md:text-base">
                    {question}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 flex-none text-[#25f860] transition-transform ${openFaqIndex === index ? "rotate-180" : ""}`}
                  />
                </button>
                <div
                  className={`grid transition-[grid-template-rows] duration-300 ${openFaqIndex === index ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-sm leading-relaxed text-[#A7ABB3] md:px-6 md:pb-6">
                      {answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="contact"
        className="relative px-5 py-16 md:px-12 md:py-28 lg:px-24 animate-on-scroll"
      >
        <div className="mx-auto grid w-full max-w-6xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <h2 className="text-[30px] font-bold leading-[1.05] tracking-tight md:text-[52px]">
              {t.formTitle}
            </h2>
            <p className="mt-5 max-w-[620px] text-sm leading-relaxed text-[#A7ABB3] md:text-base">
              {t.formNotice}
            </p>
            <p className="mt-6 text-sm font-semibold text-[#D9DDE3]">
              {t.contactNext}
            </p>
            <div className="mt-5 grid max-w-[520px] grid-cols-2 gap-4">
              <div className="rounded-xl border border-[#25f860]/12 bg-[#111312] p-4">
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src="/faraday-whatsapp.svg"
                    alt={t.qr}
                    fill
                    sizes="320px"
                    className="object-contain"
                  />
                </div>
                <p className="mt-3 text-center text-xs font-mono text-[#25f860]">
                  {t.qr}
                </p>
              </div>
              <div className="rounded-xl border border-[#25f860]/12 bg-[#111312] p-4">
                <div className="grid aspect-square grid-cols-7 gap-1 rounded-lg p-4">
                  {Array.from({ length: 49 }).map((_, index) => (
                    <span
                      key={index}
                      className={`rounded-[1px] ${
                        [
                          0, 1, 2, 7, 14, 36, 42, 43, 44, 6, 13, 20, 28, 35, 41,
                          46, 48, 24, 30, 32,
                        ].includes(index)
                          ? "bg-[#25f860]"
                          : "bg-[#25f860]/12"
                      }`}
                    />
                  ))}
                </div>
                <p className="mt-3 text-center text-xs font-mono text-[#25f860]">
                  {t.emailQr}
                </p>
              </div>
            </div>
            <a
              href="mailto:hello@faraday.tel"
              className={`mt-5 inline-flex text-lg font-semibold text-[#25f860] hover:text-[#48ff7d] ${quietAction}`}
            >
              hello@faraday.tel
            </a>
          </div>

          <form
            onSubmit={handleLeadSubmit}
            className="rounded-xl border border-[#25f860]/18 bg-[#111312] p-5 md:p-7"
          >
            <div className="grid gap-5 md:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-xs text-[#A7ABB3]">
                  {t.name}
                </span>
                <input
                  name="name"
                  required
                  className="h-12 w-full rounded-lg border border-[#25f860]/20 bg-[#0A0A0A] px-4 text-sm text-[#F2F3F5] outline-none transition-colors placeholder:text-[#A7ABB3]/50 focus:border-[#25f860]"
                  placeholder={
                    language === "ua"
                      ? "Ваше ім'я або позивний"
                      : "Your name or callsign"
                  }
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-xs text-[#A7ABB3]">
                  {t.org}
                </span>
                <input
                  name="organization"
                  className="h-12 w-full rounded-lg border border-[#25f860]/20 bg-[#0A0A0A] px-4 text-sm text-[#F2F3F5] outline-none transition-colors placeholder:text-[#A7ABB3]/50 focus:border-[#25f860]"
                  placeholder={
                    language === "ua"
                      ? "Підрозділ або компанія"
                      : "Unit or company"
                  }
                />
              </label>
            </div>
            <label className="mt-5 block">
              <span className="mb-2 block text-xs text-[#A7ABB3]">
                {t.contact}
              </span>
              <input
                name="contact"
                required
                className="h-12 w-full rounded-lg border border-[#25f860]/20 bg-[#0A0A0A] px-4 text-sm text-[#F2F3F5] outline-none transition-colors placeholder:text-[#A7ABB3]/50 focus:border-[#25f860]"
                placeholder="Signal / WhatsApp / email"
              />
            </label>
            <fieldset className="mt-5">
              <legend className="mb-3 text-xs text-[#A7ABB3]">
                {t.interest}
              </legend>
              <div className="grid gap-2 sm:grid-cols-2">
                {interestOptions[language].map((interest, index) => (
                  <label
                    key={interest}
                    className="flex min-h-11 cursor-pointer items-center gap-3 rounded-lg border border-[#25f860]/12 bg-[#0A0A0A] px-4 text-sm text-[#D9DDE3] transition-all hover:-translate-y-0.5 hover:border-[#25f860]/55 hover:bg-[#25f860]/7 active:translate-y-0 active:scale-[0.99]"
                  >
                    <input
                      name="interest"
                      type="radio"
                      value={interest}
                      defaultChecked={index === 0}
                      className="h-4 w-4 accent-[#25f860]"
                    />
                    {interest}
                  </label>
                ))}
              </div>
            </fieldset>
            <label className="mt-5 block">
              <span className="mb-2 block text-xs text-[#A7ABB3]">
                {language === "ua" ? "Контекст запиту" : "Request context"}
              </span>
              <textarea
                name="message"
                rows={4}
                className="w-full resize-none rounded-lg border border-[#25f860]/20 bg-[#0A0A0A] px-4 py-3 text-sm text-[#F2F3F5] outline-none transition-colors placeholder:text-[#A7ABB3]/50 focus:border-[#25f860]"
                placeholder={
                  language === "ua"
                    ? "Що потрібно обговорити на наступному кроці?"
                    : "What should we discuss next?"
                }
              />
            </label>
            <Button
              type="submit"
              disabled={formStatus === "sending"}
              className={`mt-6 h-12 w-full rounded-lg bg-[#25f860] text-sm font-semibold text-[#0A0A0A] disabled:opacity-60 ${primaryAction}`}
            >
              {formStatus === "sending" ? "..." : t.send}{" "}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            {formStatus === "sent" && (
              <p className="mt-4 text-sm text-[#25f860]">{t.sent}</p>
            )}
            {formStatus === "error" && (
              <p className="mt-4 text-sm text-red-300">{t.error}</p>
            )}
          </form>
        </div>
      </section>

      <footer className="relative border-t border-[#25f860]/10 px-5 py-10 md:px-12 lg:px-24">
        <div className="mx-auto w-full max-w-6xl">
          <div className="grid gap-8 md:grid-cols-[1.1fr_1.4fr]">
            <div>
              <Image
                src="/logo.svg"
                alt="Faraday"
                width={96}
                height={24}
                className="h-6 w-auto"
              />
              <p className="mt-5 max-w-[420px] text-sm leading-relaxed text-[#A7ABB3]">
                {t.footerLine}
              </p>
              <div className="mt-5 flex w-fit items-center gap-2 text-xs font-semibold">
                {(["ua", "en"] as Language[]).map((item) => (
                  <button
                    key={item}
                    onClick={() => setLanguage(item)}
                    className={`${quietAction} ${language === item ? "text-[#25f860]" : "text-[#A7ABB3] hover:text-[#F2F3F5]"}`}
                  >
                    {item.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6 text-sm md:grid-cols-4">
              {[
                ["Продукти", "SDR", "AERO ELINT"],
                ["Застосування", "Дрон-детектор", "UAV ELINT"],
                ["Компанія", "Команда", "Roadmap"],
                ["Соцмережі", "LinkedIn", "Signal"],
              ].map(([title, first, second]) => (
                <div key={title}>
                  <div className="mb-3 font-semibold text-[#F2F3F5]">
                    {title}
                  </div>
                  <div className="space-y-2 text-[#A7ABB3]">
                    <button
                      onClick={() => scrollToSection("products")}
                      className={`block hover:text-[#25f860] ${quietAction}`}
                    >
                      {first}
                    </button>
                    <button
                      onClick={() => scrollToSection("contact")}
                      className={`block hover:text-[#25f860] ${quietAction}`}
                    >
                      {second}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-10 border-t border-[#25f860]/10 pt-6 text-xs text-[#A7ABB3]">
            © 2026 FARADAY.{" "}
            {language === "ua" ? "Всі права захищені." : "All rights reserved."}
          </div>
        </div>
      </footer>
    </div>
  );
}
