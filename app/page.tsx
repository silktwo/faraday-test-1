"use client";

import Image from "next/image";
import { FormEvent, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import { AnimatedText } from "@/components/animated-text";
import TargetScanner from "@/app/target-scanner";

type Language = "ua" | "en";

const copy = {
  ua: {
    nav: [
      { id: "products", label: "Продукти" },
      { id: "team", label: "Команда" },
      { id: "contact", label: "Записатися на демо" },
    ],
    heroPrefix: "Виявляй",
    heroSuffix: "в реальному часі",
    heroWords: ["сигнали", "загрози", "ворога", "рухи", "частоти"],
    preorder: "Передзамовити",
    demo: "Записатися на демо",
    productsHeading: "Продукти",
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
    preliminary: "Технічні характеристики",
    subjectToChange: "Може бути змінено",
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
    contactNext: "Давайте обговоримо наступний крок",
    footerLine: "Технологія готова. Команда готова. Фронт чекає.",
    footerProductsTitle: "Продукти",
    footerContactsTitle: "Контакти",
    footerProducts: ["FARADAY SDR", "Radio Direction Finder", "BRAVE AERO ELINT"],
    footerContacts: ["WhatsApp", "hello@faraday.tel"],
    sent: "Заявку отримано. Ми зв'яжемося з вами після перевірки.",
    error:
      "Не вдалося відправити заявку. Спробуйте ще раз або напишіть на email.",
  },
  en: {
    nav: [
      { id: "products", label: "Products" },
      { id: "team", label: "Team" },
      { id: "contact", label: "Book a demo" },
    ],
    heroPrefix: "Detect",
    heroSuffix: "in real time",
    heroWords: ["signals", "threats", "enemy activity", "movement", "frequencies"],
    preorder: "Pre-order",
    demo: "Book a demo",
    productsHeading: "Products",
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
    preliminary: "Tech specs",
    subjectToChange: "subject to change",
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
    contactNext: "Let's discuss next steps",
    footerLine:
      "The technology is ready. The team is ready. The front is waiting.",
    footerProductsTitle: "Products",
    footerContactsTitle: "Contacts",
    footerProducts: ["FARADAY SDR", "Radio Direction Finder", "BRAVE AERO ELINT"],
    footerContacts: ["WhatsApp", "hello@faraday.tel"],
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

const partnerLogos = [
  { src: "/logo-partner/Brave1-logo.webp", alt: "Brave1", className: "max-h-7 md:max-h-11" },
  { src: "/logo-partner/Lasars-group-logo.webp", alt: "Lasars Group", className: "max-h-7 md:max-h-11" },
  { src: "/logo-partner/avision_logo.webp", alt: "Avision", className: "max-h-5 md:max-h-8" },
  { src: "/logo-partner/deviro_logo.svg", alt: "Deviro", className: "max-h-7 md:max-h-11" },
  { src: "/logo-partner/zuok-logo.svg", alt: "ZUOK", className: "max-h-8 md:max-h-12" },
];

const productDetails = {
  ua: [
    {
      summary: "FARADAY SDR — основа для різноманітних ELINT засобів.",
      benefits: [
        "Платформа для побудови SDR-станцій",
        "Підходить для задач радіорозвідки",
        "Може бути частиною ширшої екосистеми FARADAY",
      ],
      specs: [
        ["Статус", "Доступно зараз"],
        ["Платформа", "4K SDR"],
        ["Datasheet", "Буде додано після фіналізації ТТХ"],
      ],
    },
    {
      summary:
        "Наземний комплекс пеленгації, який передає тактичні параметри у Signal Source Table.",
      benefits: [
        "Алгоритм MUSIC для роботи в реальних польових умовах",
        "Підтримка 2+ одночасних джерел у вікні",
        "Інтеграція через стандартний мережевий стек",
      ],
      specs: [
        ["Точність пеленгації", "8°"],
        ["Оновлення вихідних даних", "10 Hz"],
        ["Інтерфейс передачі", "1GbE"],
      ],
    },
    {
      summary:
        "FARADAY 16KRXSDR: 16-канальна SDR-платформа для повітряної розвідки та систем CRPA.",
      benefits: [
        "Повітряна 16-канальна РТР-станція",
        "Шукає пріоритетні цілі та передає точні координати",
        "Працює за 10+ км від фронту",
      ],
      specs: [
        ["Кількість каналів", "16 когерентних"],
        ["Підтримка антен", "CRPA arrays"],
        ["Носій", "UAV payload / airborne"],
        ["Точність DOA", "Підвищена (TBD)"],
        ["Діапазон", "TBD (expanded vs 4K)"],
        ["Дальність роботи", "10+ км від фронту"],
      ],
    },
  ],
  en: [
    {
      summary: "FARADAY SDR is the foundation for different ELINT systems.",
      benefits: [
        "Platform for SDR station builds",
        "Designed for radio intelligence tasks",
        "Can operate as part of the broader FARADAY ecosystem",
      ],
      specs: [
        ["Status", "Available now"],
        ["Platform", "4K SDR"],
        ["Datasheet", "Will be added after specs are finalized"],
      ],
    },
    {
      summary:
        "Ground direction-finding system that sends tactical parameters into the Signal Source Table.",
      benefits: [
        "MUSIC algorithm for real field conditions",
        "Supports 2+ simultaneous sources per window",
        "Integration through a standard network stack",
      ],
      specs: [
        ["Direction-finding accuracy", "8°"],
        ["Output update rate", "10 Hz"],
        ["Transmission interface", "1GbE"],
      ],
    },
    {
      summary:
        "FARADAY 16KRXSDR: 16-channel SDR platform for airborne intelligence and CRPA antenna systems.",
      benefits: [
        "Airborne 16-channel RECON station",
        "Prioritizes high-value targets and transmits precise coordinates",
        "Operates 10+ km from front line",
      ],
      specs: [
        ["Number of Channels", "16 coherent"],
        ["Antenna Support", "CRPA arrays"],
        ["Platform", "UAV payload / airborne"],
        ["DOA Accuracy", "Enhanced (TBD)"],
        ["Frequency Range", "TBD (expanded vs 4K)"],
        ["Operational Range", "10+ km from front"],
      ],
    },
  ],
};

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
  const [activeSection, setActiveSection] = useState("");
  const [dynamicWordIndex, setDynamicWordIndex] = useState(0);
  const [wordFade, setWordFade] = useState(true);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [selectedProductIndex, setSelectedProductIndex] = useState<
    number | null
  >(null);
  const [language, setLanguage] = useState<Language>("ua");
  const [formStatus, setFormStatus] = useState<
    "idle" | "sending" | "sent" | "error"
  >("idle");
  const heroRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const t = copy[language];
  const selectedProduct =
    selectedProductIndex === null ? null : t.products[selectedProductIndex];
  const selectedProductDetails =
    selectedProductIndex === null
      ? null
      : productDetails[language][selectedProductIndex];
  const dynamicWords = t.heroWords;

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
      const nextScrollY = window.scrollY;
      setScrollY(nextScrollY);

      const sectionIds = ["products", "team", "contact"];
      const current = sectionIds.findLast((id) => {
        const element = document.getElementById(id);
        if (!element) return false;
        return element.offsetTop <= nextScrollY + window.innerHeight * 0.38;
      });

      setActiveSection(current ?? "");
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

  useEffect(() => {
    if (selectedProductIndex === null) {
      return;
    }

    document.body.style.overflow = "hidden";
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedProductIndex(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedProductIndex]);

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
        <div className="flex min-h-16 items-center gap-0 rounded-xl bg-[#0A0A0A]/80 px-5 py-4 backdrop-blur-md md:h-11 md:min-h-0 md:rounded-lg md:border md:border-[#25f860]/20 md:px-4 md:py-5">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className={`flex items-center gap-0 hover:opacity-70 md:border-r md:border-[#25f860]/15 md:pr-5 ${quietAction}`}
          >
            <Image
              src="/logo.svg"
              alt="Faraday"
              width={80}
              height={20}
              className="h-[28px] w-auto md:h-[24px]"
              priority
            />
          </button>
          <nav className="hidden md:flex items-center gap-6 pl-6">
            {t.nav.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-sm font-medium ${
                  activeSection === item.id
                    ? "text-[#25f860]"
                    : "text-[#A7ABB3] hover:text-[#25f860]"
                } ${quietAction}`}
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
        <div className="fixed top-[96px] left-6 right-6 z-50 border border-[#25f860]/20 backdrop-blur-xl bg-[#0D0D0D]/95 rounded-xl overflow-hidden shadow-2xl shadow-black/60 md:hidden">
          <nav className="flex flex-col py-2">
            {t.nav.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`w-full text-left px-5 py-3.5 text-sm font-medium hover:bg-[#25f860]/5 border-b border-[#25f860]/8 last:border-0 ${
                  activeSection === item.id
                    ? "text-[#25f860]"
                    : "text-[#A7ABB3] hover:text-[#25f860]"
                } ${quietAction}`}
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
        <div className="absolute inset-0 z-0 opacity-80">
          <TargetScanner />
        </div>
        <div className="absolute left-1/2 top-[46%] z-[1] h-[420px] w-[min(92vw,980px)] -translate-x-1/2 -translate-y-1/2 rounded-[32px] bg-[#0A0A0A]/70 blur-3xl pointer-events-none" />

        <div
          className="max-w-5xl w-full mx-auto relative z-10"
          style={{
            transform: `translateY(${scrollY * 0.2}px)`,
          }}
        >
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-[36px] leading-[1.05] sm:text-[52px] md:text-[72px] md:leading-[1.05] font-bold mb-4 md:mb-6 text-balance tracking-tight">
              <span
                className={`block stagger-reveal transition-all duration-500 ${
                  wordFade ? "opacity-100 blur-0" : "opacity-0 blur-lg"
                }`}
              >
                {t.heroPrefix}{" "}
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
                {t.heroSuffix}
              </span>
            </h1>
            <p
              className="text-[#A7ABB3] text-sm md:text-lg max-w-[560px] mx-auto mb-6 md:mb-8 leading-relaxed stagger-reveal"
              style={{ animationDelay: "180ms" }}
            >
              {language === "ua" ? (
                <>
                  <span>Екосистема продуктів для радіорозвідки,</span>
                  <span className="block sm:inline"> зроблена в Україні</span>
                </>
              ) : (
                t.productsTitle
              )}
            </p>
            <div
              className="stagger-reveal flex flex-row gap-3 justify-center"
              style={{ animationDelay: "270ms" }}
            >
              <Button
                onClick={() => scrollToSection("contact")}
                className={`w-auto px-5 py-2.5 h-10 text-sm rounded-lg bg-[#25f860] text-[#0A0A0A] font-semibold ${primaryAction}`}
              >
                {t.demo}
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section
        aria-label={language === "ua" ? "Партнери" : "Partners"}
        className="relative overflow-hidden border-y border-[#25f860]/10 bg-[#050706] py-6"
      >
        <div className="partner-marquee-track flex w-max">
          {Array.from({ length: 3 }).map((_, groupIndex) => (
            <div key={groupIndex} className="flex shrink-0 gap-2 px-1 md:gap-4 md:px-2">
              {partnerLogos.map((logo) => (
                <div
                  key={`${logo.alt}-${groupIndex}`}
                  className="flex h-12 min-w-[29vw] items-center justify-center px-2 md:h-20 md:min-w-[250px] md:px-10"
                >
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={190}
                    height={52}
                    className={`w-auto object-contain opacity-90 ${logo.className}`}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      <section
        id="products"
        className="relative min-h-screen px-5 py-12 md:px-12 md:py-14 lg:px-24 animate-on-scroll"
      >
        <div className="mx-auto flex min-h-[calc(100vh-6rem)] w-full max-w-6xl flex-col justify-center gap-10">
          <h2 className="text-left text-[30px] font-bold leading-[1.05] tracking-tight md:text-[52px]">
            {t.productsHeading}
          </h2>
          <div className="grid gap-4 lg:grid-cols-3">
            {t.products.map((product, index) => (
              <button
                key={product.name}
                id={index === 1 ? "ground" : index === 2 ? "air" : undefined}
                type="button"
                onClick={() => setSelectedProductIndex(index)}
                className="group rounded-xl border border-[#25f860]/12 bg-[#111312] p-4 text-left transition-all duration-200 hover:-translate-y-1 hover:border-[#25f860]/40 hover:bg-[#151915] hover:shadow-[0_0_28px_rgba(37,248,96,0.10)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25f860]/60"
                aria-label={`${product.name}: ${
                  language === "ua" ? "відкрити деталі продукту" : "open product details"
                }`}
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
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="mb-3 inline-flex rounded-md border border-[#25f860]/20 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#25f860]">
                        {product.state}
                      </div>
                      <h3 className="text-lg font-semibold leading-tight md:text-xl">
                        {product.name}
                      </h3>
                    </div>
                    <ArrowRight className="mt-8 h-4 w-4 flex-none text-[#25f860] transition-transform group-hover:translate-x-1" />
                  </div>
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
              </button>
            ))}
          </div>
        </div>
      </section>

      {selectedProduct && selectedProductDetails && selectedProductIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-[#050505]/82 px-3 py-3 backdrop-blur-md md:items-center md:px-4 md:py-6"
          role="dialog"
          aria-modal="true"
          aria-label={selectedProduct.name}
          onClick={() => setSelectedProductIndex(null)}
        >
          <div
            className="relative grid min-h-[calc(100dvh-1.5rem)] w-full max-w-5xl overflow-hidden rounded-xl border border-[#25f860]/18 bg-[#0D0F0E] p-4 shadow-2xl shadow-black/70 md:max-h-[92vh] md:min-h-0 md:overflow-y-auto md:p-7 lg:grid-cols-[0.9fr_1.1fr] lg:gap-7"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedProductIndex(null)}
              className={`absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-lg border border-[#25f860]/18 bg-[#0A0A0A] text-[#D9DDE3] hover:border-[#25f860]/50 hover:text-[#25f860] ${quietAction}`}
              aria-label={language === "ua" ? "Закрити" : "Close"}
            >
              <X className="h-4 w-4" />
            </button>

            <div className="flex items-center justify-center pr-0 pt-10 lg:min-h-[520px] lg:pr-4 lg:pt-0">
              <div className="relative h-[170px] w-full sm:h-[220px] md:h-[360px] lg:h-[480px]">
                <Image
                  src={productImages[selectedProductIndex]}
                  alt={selectedProduct.name}
                  fill
                  sizes="(min-width: 1024px) 42vw, 100vw"
                  className="object-contain"
                />
              </div>
            </div>

            <div className="pt-4 lg:pt-10">
              <span className="inline-flex rounded-md border border-[#25f860]/20 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#25f860]">
                {selectedProduct.state}
              </span>
              <h2 className="mt-4 pr-12 text-[26px] font-bold leading-[1.05] tracking-tight md:mt-5 md:text-[48px]">
                {selectedProduct.name}
              </h2>
              <p className="mt-5 text-sm leading-relaxed text-[#A7ABB3] md:text-base">
                {selectedProductDetails.summary}
              </p>

              <div className="mt-7">
                <h3 className="text-lg font-semibold">
                  {language === "ua" ? "Переваги" : "Benefits"}
                </h3>
                <ul className="mt-4 space-y-2 text-sm leading-relaxed text-[#A7ABB3] md:space-y-3">
                  {selectedProductDetails.benefits.map((benefit) => (
                    <li key={benefit} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-[#25f860]" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-7">
                <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                  <h3 className="text-lg font-semibold">
                    {language === "ua" ? "ТТХ" : "Specs"}
                  </h3>
                  <span className="rounded-md border border-[#25f860]/20 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#25f860]">
                    {language === "ua" ? "Попередні" : "Subject to change"}
                  </span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-0 text-left text-sm md:min-w-[420px]">
                    <tbody>
                      {selectedProductDetails.specs.map(([parameter, value]) => (
                        <tr
                          key={parameter}
                          className="border-b border-[#25f860]/8 last:border-0"
                        >
                          <td className="py-3 pr-4 text-[#A7ABB3]">
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

              <div className="mt-7 flex flex-wrap gap-3">
                <Button
                  onClick={() => {
                    setSelectedProductIndex(null);
                    setTimeout(() => scrollToSection("contact"), 0);
                  }}
                  className={`h-11 rounded-lg bg-[#25f860] px-5 text-sm font-semibold text-[#0A0A0A] ${primaryAction}`}
                >
                  {t.preorder} <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <span className="inline-flex h-11 items-center rounded-lg border border-[#25f860]/20 px-5 text-sm font-semibold text-[#A7ABB3]">
                  {language === "ua" ? "PDF буде додано" : "PDF coming soon"}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

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
            <div className="mt-7 flex flex-col items-start gap-3">
              <p className="max-w-[520px] text-xl font-semibold leading-snug text-[#D9DDE3] md:text-2xl">
                {t.contactNext}
              </p>
              <a
                href="mailto:hello@faraday.tel"
                className={`text-lg font-semibold text-[#25f860] hover:text-[#48ff7d] md:text-xl ${quietAction}`}
              >
                hello@faraday.tel
              </a>
            </div>
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
            <div className="grid grid-cols-1 gap-8 text-sm sm:grid-cols-2">
              <div>
                <div className="mb-4 text-lg font-semibold text-[#F2F3F5]">
                  {t.footerProductsTitle}
                </div>
                <div className="space-y-3 text-[#A7ABB3]">
                  {t.footerProducts.map((product, index) => (
                    <button
                      key={product}
                      onClick={() => setSelectedProductIndex(index)}
                      className={`block text-left hover:text-[#25f860] ${quietAction}`}
                    >
                      {product}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <div className="mb-4 text-lg font-semibold text-[#F2F3F5]">
                  {t.footerContactsTitle}
                </div>
                <div className="space-y-3 text-[#A7ABB3]">
                  <button
                    onClick={() => scrollToSection("contact")}
                    className={`block text-left hover:text-[#25f860] ${quietAction}`}
                  >
                    {t.footerContacts[0]}
                  </button>
                  <a
                    href="mailto:hello@faraday.tel"
                    className={`block hover:text-[#25f860] ${quietAction}`}
                  >
                    {t.footerContacts[1]}
                  </a>
                </div>
              </div>
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
