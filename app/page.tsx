"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Radio, Wifi, Activity, ChevronDown, Mail, Phone, MapPin } from "lucide-react"
import { AnimatedText } from "@/components/animated-text"
import { MagneticDots } from "@/components/magnetic-dots"


export default function FaradayPage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [selectedFeature, setSelectedFeature] = useState(0)
  const [autoRotationKey, setAutoRotationKey] = useState(0)
  const [dynamicWordIndex, setDynamicWordIndex] = useState(0)
  const [wordFade, setWordFade] = useState(true)
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)

  const dynamicWords = ["сигнали", "загрози", "ворога", "рухи", "частоти"]

  useEffect(() => {
    const wordInterval = setInterval(() => {
      setWordFade(false)
      setTimeout(() => {
        setDynamicWordIndex((prev) => (prev + 1) % dynamicWords.length)
        setWordFade(true)
      }, 300)
    }, 3000)

    return () => clearInterval(wordInterval)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setIsLoaded(true)

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in")
          }
        })
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    )

    const elements = document.querySelectorAll(".animate-on-scroll")
    elements.forEach((el) => observerRef.current?.observe(el))

    return () => observerRef.current?.disconnect()
  }, [])

  useEffect(() => {
    const featuresCount = 4

    const interval = setInterval(() => {
      setSelectedFeature((prev) => (prev + 1) % featuresCount)
      setAutoRotationKey((prev) => prev + 1)
    }, 6000)

    return () => clearInterval(interval)
  }, [autoRotationKey])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  return (
    <div className="relative min-h-screen bg-[#0A0A0A] text-[#F2F3F5] overflow-x-hidden">
      <header className="fixed top-6 left-6 md:left-8 lg:left-12 md:w-auto md:right-auto right-6 z-40 border border-[#25f860]/20 backdrop-blur-md bg-[#0A0A0A]/80 rounded-lg">
        <div className="w-full mx-auto px-6">
          <div className="flex items-center gap-6 md:h-14 h-14">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="text-lg md:text-xl font-bold hover:text-[#25f860] transition-colors duration-300 tracking-tight"
            >
              FARADAY
            </button>

            <nav className="hidden md:flex items-center gap-8">
              <button
                onClick={() => scrollToSection("problem")}
                className="text-sm font-medium text-[#A7ABB3] hover:text-[#25f860] transition-colors duration-300"
              >
                Проблема
              </button>
              <button
                onClick={() => scrollToSection("product")}
                className="text-sm font-medium text-[#A7ABB3] hover:text-[#25f860] transition-colors duration-300"
              >
                Продукт
              </button>
              <button
                onClick={() => scrollToSection("specs")}
                className="text-sm font-medium text-[#A7ABB3] hover:text-[#25f860] transition-colors duration-300"
              >
                Специфікації
              </button>
              <button
                onClick={() => scrollToSection("faq")}
                className="text-sm font-medium text-[#A7ABB3] hover:text-[#25f860] transition-colors duration-300"
              >
                FAQ
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-sm font-medium text-[#A7ABB3] hover:text-[#25f860] transition-colors duration-300"
              >
                {"Зв'язок"}
              </button>
            </nav>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden ml-auto p-2 hover:bg-[#25f860]/10 rounded-lg transition-colors duration-300"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {isMenuOpen && (
        <div className="fixed inset-0 bg-[#0A0A0A]/95 backdrop-blur-md z-50 flex flex-col items-start justify-end pb-20 pt-20 px-6">
          <div className="flex flex-col gap-8 items-start text-left w-full">
            <button
              onClick={() => scrollToSection("problem")}
              className="font-mono text-4xl md:text-5xl font-light text-[#F2F3F5] hover:text-[#25f860] transition-colors duration-300"
            >
              Проблема
            </button>
            <button
              onClick={() => scrollToSection("product")}
              className="font-mono text-4xl md:text-5xl font-light text-[#F2F3F5] hover:text-[#25f860] transition-colors duration-300"
            >
              Продукт
            </button>
            <button
              onClick={() => scrollToSection("specs")}
              className="font-mono text-4xl md:text-5xl font-light text-[#F2F3F5] hover:text-[#25f860] transition-colors duration-300"
            >
              Специфікації
            </button>
            <button
              onClick={() => scrollToSection("faq")}
              className="font-mono text-4xl md:text-5xl font-light text-[#F2F3F5] hover:text-[#25f860] transition-colors duration-300"
            >
              FAQ
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="font-mono text-4xl md:text-5xl font-light text-[#F2F3F5] hover:text-[#25f860] transition-colors duration-300"
            >
              {"Зв'язок"}
            </button>
          </div>
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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg mb-8 text-xs md:text-sm text-[#A7ABB3] border border-[#25f860]/20 bg-[#25f860]/5 stagger-reveal">
              <span className="w-1.5 h-1.5 rounded-full bg-[#25f860] animate-pulse" />
              SIGINT / ELINT / COMINT
            </div>
            
            <h1 className="text-[44px] leading-[1.05] md:text-[72px] md:leading-[1.05] font-bold mb-6 text-balance tracking-tight">
              <span
                className={`block stagger-reveal transition-all duration-500 ${
                  wordFade ? "opacity-100 blur-0" : "opacity-0 blur-lg"
                }`}
              >
                Виявляй{" "}
                <span className="text-[#25f860]">
                  <AnimatedText key={dynamicWordIndex} text={dynamicWords[dynamicWordIndex]} delay={0} />
                </span>
              </span>
              <span className="block stagger-reveal" style={{ animationDelay: "90ms" }}>
                в реальному часі
              </span>
            </h1>
            <p
              className="text-[#A7ABB3] text-base md:text-lg max-w-[560px] mx-auto mb-8 leading-relaxed stagger-reveal"
              style={{ animationDelay: "180ms" }}
            >
              Faraday RIB — мобільна платформа радіотехнічної розвідки для виявлення та аналізу 
              радіоелектронних засобів противника на передовій.
            </p>
            <div className="stagger-reveal flex flex-col sm:flex-row gap-4 justify-center" style={{ animationDelay: "270ms" }}>
              <Button className="px-6 py-3 h-11 text-sm rounded-lg bg-[#25f860] text-[#0A0A0A] hover:bg-[#25f860]/90 font-semibold transition-all duration-300">
                Замовити демо
              </Button>
              <Button className="px-6 py-3 h-11 text-sm rounded-lg border border-[#25f860]/30 bg-transparent text-[#F2F3F5] hover:bg-[#25f860]/10 hover:border-[#25f860]/50 transition-all duration-300">
                Технічна документація
              </Button>
            </div>
          </div>

          {/* Product Image Placeholder */}
          <div className="mt-12 md:mt-20 stagger-reveal" style={{ animationDelay: "360ms" }}>
            <div className="relative aspect-[16/9] rounded-xl overflow-hidden border border-[#25f860]/20 bg-[#0A0A0A]">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto mb-6 rounded-full border-2 border-[#25f860]/30 flex items-center justify-center">
                    <Radio className="w-16 h-16 text-[#25f860]/60" />
                  </div>
                  <p className="text-[#A7ABB3] text-sm font-mono">FARADAY RIB SYSTEM</p>
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

      {/* Problem Section */}
      <section id="problem" className="relative py-20 md:py-32 px-6 md:px-12 lg:px-24 animate-on-scroll">
        <div className="max-w-5xl w-full mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <div className="text-[10px] md:text-xs uppercase tracking-[0.15em] text-[#A7ABB3] mb-6 flex items-center justify-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#25f860] animate-pulse" />
              ПРОБЛЕМА
            </div>
            <h2 className="text-[32px] leading-[1.1] md:text-[48px] md:leading-[1.05] font-bold mb-6 text-balance tracking-tight">
              Ворог використовує радіо.{" "}
              <span className="text-[#25f860]">Ми це чуємо.</span>
            </h2>
            <p className="text-[#A7ABB3] text-sm md:text-base max-w-[700px] mx-auto leading-relaxed">
              Кожен радіопередавач — дрон, рація, РЕБ — залишає унікальний електронний слід. 
              Faraday перетворює цей слід на тактичну перевагу, дозволяючи командирам бачити те, що приховує ворог.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Radio,
                title: "Виявлення джерел",
                desc: "Автоматичне виявлення та класифікація радіовипромінювань у діапазоні 25 МГц — 6 ГГц"
              },
              {
                icon: Wifi,
                title: "Пеленгація",
                desc: "Визначення напрямку та приблизної відстані до джерела сигналу в реальному часі"
              },
              {
                icon: Activity,
                title: "Аналіз паттернів",
                desc: "Машинне навчання для ідентифікації типів пристроїв та прогнозування активності"
              }
            ].map((item, i) => (
              <div key={i} className="p-6 md:p-8 border border-[#25f860]/10 rounded-xl hover:border-[#25f860]/30 transition-all duration-300 bg-[#121212]">
                <item.icon className="w-8 h-8 text-[#25f860] mb-4" />
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-[#A7ABB3] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="relative py-12 md:py-20 px-6 md:px-12 lg:px-24 border-y border-[#25f860]/10 animate-on-scroll">
        <div className="max-w-5xl w-full mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12">
            {[
              { label: "Діапазон частот", value: "25 МГц — 6 ГГц" },
              { label: "Час виявлення", value: "< 2 сек" },
              { label: "Точність пеленгу", value: "± 5°" },
              { label: "Дальність", value: "50 км+" },
            ].map((metric, i) => (
              <div key={i} className="flex flex-col gap-1.5">
                <div className="text-[10px] uppercase tracking-[0.12em] text-[#A7ABB3]">
                  {metric.label}
                </div>
                <div className="font-mono text-xl md:text-3xl font-bold text-[#25f860] leading-tight">
                  {metric.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Section */}
      <section id="product" className="relative py-20 md:py-32 px-6 md:px-12 lg:px-24 animate-on-scroll">
        <div className="max-w-5xl w-full mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
            <div>
              <div className="text-[10px] md:text-xs uppercase tracking-[0.15em] text-[#A7ABB3] mb-6 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#25f860] animate-pulse" />
                ПРОДУКТ
              </div>
              <h2 className="text-[32px] leading-[1.1] md:text-[48px] md:leading-[1.05] font-bold mb-6 text-balance tracking-tight">
                Повний комплекс{" "}
                <span className="text-[#25f860]">радіорозвідки</span>
              </h2>
              <p className="text-[#A7ABB3] text-base md:text-lg leading-relaxed mb-8">
                Faraday RIB — це інтегрована система, що поєднує апаратну частину високочутливого приймача 
                з програмним забезпеченням для обробки та візуалізації сигналів. Розгортання займає менше 15 хвилин.
              </p>

              <div className="space-y-4">
                {[
                  {
                    title: "Апаратний модуль",
                    desc: "Компактний SDR-приймач з антенною системою для 360° охоплення",
                  },
                  {
                    title: "Польовий планшет",
                    desc: "Захищений планшет з інтуїтивним інтерфейсом для операторів",
                  },
                  {
                    title: "Командний софт",
                    desc: "Інтеграція з системами управління для штабного рівня",
                  },
                  {
                    title: "Хмарна аналітика",
                    desc: "Агрегація даних з множини датчиків для широкої картини",
                  },
                ].map((feature, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setSelectedFeature(i)
                      setAutoRotationKey((prev) => prev + 1)
                    }}
                    className={`relative w-full text-left flex gap-4 items-start p-4 transition-all duration-300 rounded-lg overflow-hidden ${
                      selectedFeature === i ? "border border-[#25f860]/40 bg-[#25f860]/5" : "border border-[#25f860]/10 hover:border-[#25f860]/20 bg-[#121212]"
                    }`}
                  >
                    <div className="flex-1">
                      <h3 className="text-base font-semibold mb-1">{feature.title}</h3>
                      <p className="text-sm text-[#A7ABB3]">{feature.desc}</p>
                    </div>
                    {selectedFeature === i && (
                      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#25f860]/20">
                        <div className="h-full bg-[#25f860] progress-bar" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="hidden md:flex items-center justify-center">
              <div className="relative w-full aspect-square max-w-[500px] rounded-xl border border-[#25f860]/20 bg-[#121212] overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    {/* Animated radar effect */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-64 h-64 rounded-full border border-[#25f860]/10 animate-ping-slow" />
                      <div className="absolute w-48 h-48 rounded-full border border-[#25f860]/20" />
                      <div className="absolute w-32 h-32 rounded-full border border-[#25f860]/30" />
                      <div className="absolute w-16 h-16 rounded-full bg-[#25f860]/10 flex items-center justify-center">
                        <Radio className="w-8 h-8 text-[#25f860]" />
                      </div>
                    </div>
                    {/* Rotating sweep */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-64 h-64 animate-spin-slow origin-center">
                        <div className="w-32 h-[2px] bg-gradient-to-r from-[#25f860]/60 to-transparent absolute top-1/2 left-1/2" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specs Section */}
      <section id="specs" className="relative py-20 md:py-32 px-6 md:px-12 lg:px-24 animate-on-scroll bg-[#050505]">
        <div className="max-w-5xl w-full mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <div className="text-[10px] md:text-xs uppercase tracking-[0.15em] text-[#A7ABB3] mb-6 flex items-center justify-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#25f860] animate-pulse" />
              ТЕХНІЧНІ ХАРАКТЕРИСТИКИ
            </div>
            <h2 className="text-[32px] leading-[1.1] md:text-[48px] md:leading-[1.05] font-bold mb-6 text-balance tracking-tight">
              Побудовано для{" "}
              <span className="text-[#25f860]">бойових умов</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { label: "Частотний діапазон", value: "25 МГц — 6 ГГц" },
              { label: "Чутливість приймача", value: "-130 дБм" },
              { label: "Динамічний діапазон", value: "> 100 дБ" },
              { label: "Швидкість сканування", value: "2 ГГц/сек" },
              { label: "Точність пеленгування", value: "± 5°" },
              { label: "Робоча температура", value: "-30°C до +55°C" },
              { label: "Захист корпусу", value: "IP67" },
              { label: "Живлення", value: "12-28 В DC / Li-Ion" },
              { label: "Вага комплексу", value: "< 8 кг" },
              { label: "Час розгортання", value: "< 15 хв" },
            ].map((spec, i) => (
              <div key={i} className="flex justify-between items-center p-4 border-b border-[#25f860]/10">
                <span className="text-[#A7ABB3] text-sm">{spec.label}</span>
                <span className="font-mono font-semibold text-[#25f860]">{spec.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platforms Section */}
      <section className="relative py-20 md:py-32 px-6 md:px-12 lg:px-24 animate-on-scroll">
        <div className="max-w-5xl w-full mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <div className="text-[10px] md:text-xs uppercase tracking-[0.15em] text-[#A7ABB3] mb-6 flex items-center justify-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#25f860] animate-pulse" />
              ПЛАТФОРМИ
            </div>
            <h2 className="text-[32px] leading-[1.1] md:text-[48px] md:leading-[1.05] font-bold mb-6 text-balance tracking-tight">
              Адаптовано під{" "}
              <span className="text-[#25f860]">будь-яку задачу</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Піший комплект",
                desc: "Компактна версія для розвідгруп. Рюкзачне виконання, автономність 8+ годин.",
                features: ["< 5 кг", "Рюкзак", "8 год роботи"]
              },
              {
                title: "Транспортний модуль",
                desc: "Інтеграція в бронетехніку та автомобілі. Живлення від бортової мережі.",
                features: ["Кріплення NATO", "12-28V", "Виносні антени"]
              },
              {
                title: "Стаціонарний пост",
                desc: "Довготривале спостереження. Посилені антени для максимальної дальності.",
                features: ["50+ км", "Мережева синхронізація", "24/7 робота"]
              }
            ].map((platform, i) => (
              <div key={i} className="p-6 md:p-8 border border-[#25f860]/10 rounded-xl hover:border-[#25f860]/30 transition-all duration-300 bg-[#121212]">
                <h3 className="text-xl font-semibold mb-3">{platform.title}</h3>
                <p className="text-sm text-[#A7ABB3] leading-relaxed mb-4">{platform.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {platform.features.map((f, j) => (
                    <span key={j} className="px-3 py-1 text-xs font-mono bg-[#25f860]/10 text-[#25f860] rounded-lg">
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="relative py-20 md:py-32 px-6 md:px-12 lg:px-24 animate-on-scroll">
        <div className="max-w-3xl w-full mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <div className="text-[10px] md:text-xs uppercase tracking-[0.15em] text-[#A7ABB3] mb-6 flex items-center justify-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#25f860] animate-pulse" />
              ПИТАННЯ ТА ВІДПОВІДІ
            </div>
            <h2 className="text-[32px] leading-[1.1] md:text-[48px] md:leading-[1.05] font-bold mb-6 text-balance tracking-tight">
              Часті{" "}
              <span className="text-[#25f860]">питання</span>
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                question: "Яке навчання потрібне для роботи з Faraday?",
                answer: "Базовий курс операторів займає 2 дні. Інтерфейс розроблено максимально інтуїтивним — більшість функцій доступні через сенсорний екран без спеціальних знань радіотехніки."
              },
              {
                question: "Чи можна інтегрувати з наявними системами C4ISR?",
                answer: "Так, Faraday підтримує стандартні протоколи обміну даними (CoT, NFFI) та має API для інтеграції з Delta, Kropyva та іншими системами управління."
              },
              {
                question: "Яка стійкість до РЕБ противника?",
                answer: "Система працює в пасивному режимі (тільки прийом) і не випромінює сигналів, що можуть бути виявлені. Додатково застосовано екранування та фільтрацію проти потужних завад."
              },
              {
                question: "Як швидко оновлюється база сигнатур?",
                answer: "База сигнатур оновлюється щотижня на основі даних з усієї мережи датчиків. Критичні оновлення (нові типи дронів) доставляються протягом 24 годин."
              },
              {
                question: "Чи є можливість офлайн роботи?",
                answer: "Так, система повністю функціональна без інтернету. Локальна база сигнатур та ML-моделі працюють автономно. Синхронізація відбувається при наявності зв'язку."
              },
            ].map((faq, i) => (
              <div
                key={i}
                className="border border-[#25f860]/10 rounded-xl overflow-hidden transition-all duration-300 hover:border-[#25f860]/20 bg-[#121212]"
              >
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="text-base md:text-lg font-semibold pr-4">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 flex-shrink-0 text-[#25f860] transition-transform duration-300 ${
                      openFaqIndex === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openFaqIndex === i ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="px-6 pb-6 text-sm md:text-base text-[#A7ABB3] leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-20 md:py-32 px-6 md:px-12 lg:px-24 animate-on-scroll bg-[#050505]">
        <div className="max-w-5xl w-full mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            <div>
              <div className="text-[10px] md:text-xs uppercase tracking-[0.15em] text-[#A7ABB3] mb-6 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#25f860] animate-pulse" />
                {"ЗВ'ЯЗАТИСЯ З НАМИ"}
              </div>
              <h2 className="text-[32px] leading-[1.1] md:text-[48px] md:leading-[1.05] font-bold mb-6 text-balance tracking-tight">
                Готові до{" "}
                <span className="text-[#25f860]">співпраці</span>
              </h2>
              <p className="text-[#A7ABB3] text-base md:text-lg leading-relaxed mb-8">
                {"Зв'яжіться з нами для отримання детальної інформації, демонстрації або обговорення умов постачання."}
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#25f860]/10 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-[#25f860]" />
                  </div>
                  <div>
                    <div className="text-xs text-[#A7ABB3]">Email</div>
                    <div className="font-medium">contact@faraday.ua</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#25f860]/10 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-[#25f860]" />
                  </div>
                  <div>
                    <div className="text-xs text-[#A7ABB3]">Телефон</div>
                    <div className="font-medium">+380 XX XXX XX XX</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#25f860]/10 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-[#25f860]" />
                  </div>
                  <div>
                    <div className="text-xs text-[#A7ABB3]">Локація</div>
                    <div className="font-medium">Україна</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 md:p-8 border border-[#25f860]/10 rounded-xl bg-[#121212]">
              <form className="space-y-6">
                <div>
                  <label className="block text-xs text-[#A7ABB3] mb-2">{"Ім'я та прізвище"}</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#25f860]/20 rounded-lg text-[#F2F3F5] placeholder-[#A7ABB3]/50 focus:outline-none focus:border-[#25f860]/50 transition-all"
                    placeholder="Ваше ім'я"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#A7ABB3] mb-2">Організація / Підрозділ</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#25f860]/20 rounded-lg text-[#F2F3F5] placeholder-[#A7ABB3]/50 focus:outline-none focus:border-[#25f860]/50 transition-all"
                    placeholder="Назва організації"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#A7ABB3] mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#25f860]/20 rounded-lg text-[#F2F3F5] placeholder-[#A7ABB3]/50 focus:outline-none focus:border-[#25f860]/50 transition-all"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#A7ABB3] mb-2">Повідомлення</label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#25f860]/20 rounded-lg text-[#F2F3F5] placeholder-[#A7ABB3]/50 focus:outline-none focus:border-[#25f860]/50 transition-all resize-none"
                    placeholder="Опишіть вашу задачу або питання..."
                  />
                </div>
                <Button className="w-full px-6 py-3 h-11 text-sm rounded-lg bg-[#25f860] text-[#0A0A0A] hover:bg-[#25f860]/90 font-semibold transition-all duration-300">
                  Надіслати запит
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative px-6 md:px-12 lg:px-24 border-t border-[#25f860]/10 py-8">
        <div className="max-w-5xl w-full mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4">
              <span className="text-lg font-bold tracking-tight">FARADAY</span>
              <span className="text-xs text-[#A7ABB3]">Радіотехнічна розвідка</span>
            </div>
            <div className="text-xs text-[#A7ABB3]">
              © 2026 Faraday Systems. Україна.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
