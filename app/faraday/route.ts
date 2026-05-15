import { NextResponse } from 'next/server'

const html = /* html */`<!DOCTYPE html>
<html lang="uk">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>FARADAY — Radio Intelligence Board</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;600;700&family=JetBrains+Mono:wght@500;700&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
  <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
  <style>
    :root {
      --bg: #131313;
      --surface-lowest: #0e0e0e;
      --surface-low: #1c1b1b;
      --surface: #201f1f;
      --surface-high: #2a2a2a;
      --surface-highest: #353534;
      --surface-bright: #393939;
      --on-surface: #e5e2e1;
      --on-surface-variant: #bacbb5;
      --primary: #d6ffd1;
      --primary-container: #25f860;
      --primary-dim: #00e554;
      --on-primary: #00390e;
      --secondary: #ffb59a;
      --secondary-container: #ff5e07;
      --tertiary: #ebf6ff;
      --tertiary-container: #aedeff;
      --outline: #859581;
      --outline-variant: #3b4b3a;
      --error: #ffb4ab;
    }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body {
      background: var(--bg);
      color: var(--on-surface);
      font-family: 'Hanken Grotesk', sans-serif;
      font-size: 16px;
      line-height: 1.5;
      overflow-x: hidden;
    }

    /* DOT GRID */
    .dot-grid {
      position: absolute; inset: 0; z-index: 0; pointer-events: none;
      background-image: radial-gradient(circle, #859581 1px, transparent 1px);
      background-size: 24px 24px;
      opacity: 0.08;
    }

    /* MONO LABEL */
    .label-caps {
      font-family: 'JetBrains Mono', monospace;
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
    }
    .code-sm {
      font-family: 'JetBrains Mono', monospace;
      font-size: 12px;
      font-weight: 500;
      letter-spacing: 0.05em;
    }
    .code-lg {
      font-family: 'JetBrains Mono', monospace;
      font-size: 16px;
      font-weight: 500;
    }

    /* NAV */
    nav {
      position: sticky; top: 0; z-index: 100;
      background: rgba(19,19,19,0.85);
      backdrop-filter: blur(12px);
      border-bottom: 1px solid var(--outline-variant);
      padding: 0 32px;
      height: 56px;
      display: flex; align-items: center; justify-content: space-between;
    }
    .nav-logo {
      font-family: 'Hanken Grotesk', sans-serif;
      font-size: 18px; font-weight: 700;
      color: var(--on-surface);
      letter-spacing: -0.02em;
      display: flex; align-items: center; gap: 6px;
    }
    .nav-logo .dot { width: 7px; height: 7px; border-radius: 50%; background: var(--primary-container); display: inline-block; }
    .nav-links { display: flex; gap: 32px; align-items: center; }
    .nav-links a {
      font-family: 'JetBrains Mono', monospace;
      font-size: 10px; font-weight: 700; letter-spacing: 0.1em;
      text-transform: uppercase; color: var(--on-surface-variant);
      text-decoration: none; transition: color 0.15s;
    }
    .nav-links a:hover, .nav-links a.active { color: var(--primary-container); }

    /* SECTION LABEL */
    .section-label {
      display: flex; align-items: center; gap: 12px; margin-bottom: 40px;
    }
    .section-label::before {
      content: ''; flex: 1; height: 1px; background: var(--outline-variant); max-width: 48px;
    }
    .section-label span {
      font-family: 'JetBrains Mono', monospace;
      font-size: 10px; font-weight: 700; letter-spacing: 0.1em;
      text-transform: uppercase; color: var(--primary-container);
    }

    /* BUTTONS */
    .btn-primary {
      display: inline-flex; align-items: center; justify-content: center;
      background: var(--primary-container); color: var(--on-primary);
      font-family: 'Hanken Grotesk', sans-serif; font-size: 13px; font-weight: 600;
      letter-spacing: 0.05em; text-transform: uppercase;
      padding: 12px 24px; border: none; cursor: pointer; text-decoration: none;
      clip-path: polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%);
      transition: opacity 0.15s;
    }
    .btn-primary:hover { animation: flicker 0.15s ease; }
    .btn-secondary {
      display: inline-flex; align-items: center; justify-content: center;
      background: transparent; color: var(--primary-container);
      font-family: 'Hanken Grotesk', sans-serif; font-size: 13px; font-weight: 600;
      letter-spacing: 0.05em; text-transform: uppercase;
      padding: 12px 24px; border: 1px solid var(--primary-container);
      cursor: pointer; text-decoration: none; transition: opacity 0.15s;
    }
    .btn-secondary:hover { opacity: 0.75; }

    @keyframes flicker {
      0%   { opacity: 1; }
      50%  { opacity: 0.85; }
      100% { opacity: 1; }
    }

    /* STATUS CHIP */
    .chip {
      display: inline-flex; align-items: center; gap: 6px;
      padding: 4px 10px; border: 1px solid;
      font-family: 'JetBrains Mono', monospace;
      font-size: 10px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
    }
    .chip-active  { border-color: var(--primary-container); color: var(--primary-container); }
    .chip-warning { border-color: var(--secondary-container); color: var(--secondary-container); }
    .chip-standby { border-color: var(--outline); color: var(--outline); }
    .chip-dot { width: 5px; height: 5px; border-radius: 50%; background: currentColor; }

    /* DATA CARD */
    .data-card {
      position: relative;
      background: var(--surface);
      border: 1px solid var(--outline-variant);
      padding: 16px;
      border-left: 2px solid var(--primary-container);
    }
    .data-card .mod-id {
      position: absolute; top: 10px; right: 12px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 9px; font-weight: 700; letter-spacing: 0.1em;
      text-transform: uppercase; color: var(--outline);
    }

    /* HERO */
    #hero {
      min-height: 100vh; display: flex; align-items: center;
      position: relative; overflow: hidden;
      background: var(--bg);
      padding: 80px 32px;
    }
    .hero-inner {
      position: relative; z-index: 1;
      max-width: 1440px; margin: 0 auto; width: 100%;
      display: grid; grid-template-columns: 60fr 40fr; gap: 48px; align-items: center;
    }
    .hero-glow {
      position: absolute; inset: 0; z-index: 0; pointer-events: none;
      background: radial-gradient(ellipse 60% 60% at 50% 50%, rgba(37,248,96,0.04) 0%, transparent 70%);
    }
    .hero-h1 {
      font-size: clamp(36px, 5vw, 56px); font-weight: 700;
      letter-spacing: -0.02em; line-height: 1.05;
      color: var(--on-surface); margin: 16px 0 12px;
    }
    .hero-h1 .accent { color: var(--primary-container); }
    .hero-sub {
      font-size: 16px; line-height: 1.6; color: var(--on-surface-variant);
      max-width: 520px; margin-bottom: 32px;
    }
    .hero-stats {
      display: flex; gap: 32px; flex-wrap: wrap;
      border-top: 1px solid var(--outline-variant);
      padding-top: 20px; margin-top: 8px;
    }
    .stat-item { display: flex; flex-direction: column; gap: 2px; }
    .stat-value { font-family: 'JetBrains Mono', monospace; font-size: 18px; font-weight: 700; color: var(--primary-container); }
    .stat-label { font-size: 11px; color: var(--outline); letter-spacing: 0.05em; text-transform: uppercase; font-family: 'JetBrains Mono', monospace; }

    /* BOARD VIZ */
    .board-viz {
      position: relative; width: 100%; aspect-ratio: 1;
      max-width: 400px; margin: 0 auto;
    }
    .board-frame {
      width: 100%; height: 100%; border: 1px solid var(--outline-variant);
      background: var(--surface-low); position: relative; overflow: hidden;
    }
    .board-inner { padding: 24px; position: relative; height: 100%; }
    .board-grid {
      position: absolute; inset: 0;
      background-image:
        linear-gradient(var(--outline-variant) 1px, transparent 1px),
        linear-gradient(90deg, var(--outline-variant) 1px, transparent 1px);
      background-size: 24px 24px; opacity: 0.3;
    }
    .board-chip {
      position: absolute; background: var(--surface-high);
      border: 1px solid var(--outline-variant);
    }
    .board-chip.main { width: 80px; height: 56px; top: 30%; left: 30%; border-color: var(--primary-container); box-shadow: 0 0 12px rgba(37,248,96,0.25); }
    .board-chip.sm1  { width: 36px; height: 28px; top: 15%; left: 15%; }
    .board-chip.sm2  { width: 28px; height: 20px; top: 15%; right: 20%; }
    .board-chip.sm3  { width: 44px; height: 32px; bottom: 20%; left: 20%; }
    .board-chip.sm4  { width: 32px; height: 24px; bottom: 20%; right: 15%; }
    .board-chip.sm5  { width: 20px; height: 20px; top: 50%; right: 12%; border-radius: 50%; }
    .trace {
      position: absolute; background: var(--outline-variant);
    }
    .trace.h { height: 1px; }
    .trace.v { width: 1px; }
    /* scanline */
    .scanline {
      position: absolute; left: 0; right: 0; height: 2px;
      background: linear-gradient(90deg, transparent, rgba(37,248,96,0.6), transparent);
      animation: scanline 3s linear infinite;
      z-index: 10;
    }
    @keyframes scanline {
      0%   { top: -2px; opacity: 0; }
      5%   { opacity: 1; }
      95%  { opacity: 1; }
      100% { top: 100%; opacity: 0; }
    }
    /* waveform */
    .waveform-wrap {
      position: absolute; bottom: 16px; left: 16px; right: 16px; height: 40px;
    }
    .waveform polyline {
      stroke: var(--primary-container);
      stroke-width: 1.5;
      fill: none;
      stroke-dasharray: 200;
      animation: wavemarch 2s linear infinite;
    }
    @keyframes wavemarch {
      0%   { stroke-dashoffset: 200; }
      100% { stroke-dashoffset: 0; }
    }
    /* board corner marks */
    .corner { position: absolute; width: 10px; height: 10px; }
    .corner.tl { top: 8px; left: 8px; border-top: 1px solid var(--primary-container); border-left: 1px solid var(--primary-container); }
    .corner.tr { top: 8px; right: 8px; border-top: 1px solid var(--primary-container); border-right: 1px solid var(--primary-container); }
    .corner.bl { bottom: 8px; left: 8px; border-bottom: 1px solid var(--primary-container); border-left: 1px solid var(--primary-container); }
    .corner.br { bottom: 8px; right: 8px; border-bottom: 1px solid var(--primary-container); border-right: 1px solid var(--primary-container); }
    .board-label { position: absolute; font-family: 'JetBrains Mono', monospace; font-size: 8px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--outline); }
    .board-label.tl-lbl { top: 20px; left: 20px; }
    .board-label.br-lbl { bottom: 60px; right: 16px; color: var(--primary-container); }
    .freq-tag {
      position: absolute; top: 12px; right: 12px;
      background: rgba(37,248,96,0.08); border: 1px solid rgba(37,248,96,0.3);
      padding: 3px 8px;
      font-family: 'JetBrains Mono', monospace; font-size: 9px; font-weight: 700;
      letter-spacing: 0.08em; text-transform: uppercase; color: var(--primary-container);
    }
    .ping-dot {
      position: absolute; width: 8px; height: 8px; border-radius: 50%;
      background: var(--primary-container);
      animation: ping 2s ease-in-out infinite;
    }
    @keyframes ping {
      0%   { transform: scale(1); opacity: 1; }
      70%  { transform: scale(2.5); opacity: 0; }
      100% { transform: scale(1); opacity: 0; }
    }

    /* SECTIONS */
    section { position: relative; }
    .container { max-width: 1440px; margin: 0 auto; padding: 96px 32px; }
    .section-bg-dark { background: var(--surface-lowest); }

    /* PROBLEM CARDS */
    .problem-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 1px; background: var(--outline-variant); }
    .problem-grid > * { background: var(--surface-lowest); }

    /* SPEC TABLE */
    .spec-row {
      display: flex; justify-content: space-between; align-items: center;
      padding: 12px 16px; border-bottom: 1px solid var(--outline-variant);
      border-left: 2px solid transparent;
      transition: border-color 0.15s, background 0.15s;
      cursor: default;
    }
    .spec-row:hover {
      border-left-color: var(--primary-container);
      background: rgba(37,248,96,0.03);
    }
    .spec-row:last-child { border-bottom: none; }
    .spec-label { font-size: 14px; color: var(--on-surface-variant); }
    .spec-value { font-family: 'JetBrains Mono', monospace; font-size: 14px; font-weight: 500; color: var(--primary-container); }

    /* PLATFORM CARDS */
    .platform-card {
      border: 1px solid var(--outline-variant);
      background: var(--surface); padding: 40px 32px;
      clip-path: polygon(16px 0%, 100% 0%, calc(100% - 16px) 100%, 0% 100%);
      transition: border-color 0.2s, box-shadow 0.2s;
      cursor: default;
    }
    .platform-card:hover {
      border-color: var(--primary-container);
      box-shadow: 0 0 8px rgba(37,248,96,0.2);
    }

    /* SIGNAL FLOW */
    .flow-steps { display: flex; align-items: flex-start; gap: 0; position: relative; }
    .flow-step { flex: 1; text-align: center; position: relative; }
    .flow-connector {
      flex: 1; height: 1px; background: var(--outline-variant); margin-top: 28px;
      position: relative; overflow: hidden;
    }
    .flow-connector::after {
      content: '';
      position: absolute; left: -100%; top: 0; width: 100%; height: 100%;
      background: linear-gradient(90deg, transparent, var(--primary-container), transparent);
      animation: signalpulse 2.5s linear infinite;
    }
    @keyframes signalpulse {
      0%   { left: -100%; }
      100% { left: 100%; }
    }
    .flow-num {
      width: 48px; height: 48px; border: 1px solid var(--outline-variant);
      display: flex; align-items: center; justify-content: center; margin: 0 auto 12px;
      font-family: 'JetBrains Mono', monospace; font-size: 12px; font-weight: 700;
      color: var(--primary-container);
      background: var(--surface);
    }

    /* CONTACT FORM */
    .form-field { display: flex; flex-direction: column; gap: 6px; }
    .form-field label { font-family: 'JetBrains Mono', monospace; font-size: 10px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--outline); }
    .form-field input, .form-field textarea {
      background: var(--surface); border: 1px solid var(--outline-variant);
      color: var(--on-surface); padding: 12px 14px;
      font-family: 'Hanken Grotesk', sans-serif; font-size: 14px;
      outline: none; border-radius: 0; width: 100%;
      transition: border-color 0.15s, box-shadow 0.15s;
    }
    .form-field input:focus, .form-field textarea:focus {
      border-color: var(--primary-container);
      box-shadow: 0 2px 0 -1px var(--primary-container), 0 0 0 1px rgba(37,248,96,0.12);
    }
    .form-field textarea { resize: vertical; min-height: 100px; }

    /* FOOTER */
    footer {
      background: var(--surface-lowest);
      border-top: 1px solid var(--outline-variant);
      padding: 48px 32px 24px;
    }

    /* RESPONSIVE */
    @media (max-width: 768px) {
      nav { padding: 0 16px; }
      .nav-links { gap: 16px; }
      .nav-links a { font-size: 9px; letter-spacing: 0.06em; }
      .hero-inner { grid-template-columns: 1fr; padding: 0; }
      .board-viz { max-width: 300px; }
      .container { padding: 64px 16px; }
      .problem-grid { grid-template-columns: 1fr; }
      .flow-steps { flex-direction: column; gap: 16px; }
      .flow-connector { height: 32px; width: 1px; margin: 0 auto; }
      .flow-connector::after { left: 0; top: -100%; width: 100%; height: 100%;
        background: linear-gradient(180deg, transparent, var(--primary-container), transparent);
        animation: signalpulse-v 2.5s linear infinite;
      }
      @keyframes signalpulse-v { 0% { top: -100%; } 100% { top: 100%; } }
      .platform-grid { grid-template-columns: 1fr !important; }
      .hero-stats { gap: 20px; }
      footer .footer-cols { grid-template-columns: 1fr !important; gap: 32px !important; }
    }
    @media (max-width: 480px) {
      .hero-h1 { font-size: 30px; }
      .nav-links { display: none; }
    }
  </style>
</head>
<body>

<!-- NAV -->
<nav id="navbar">
  <div class="nav-logo">
    FARADAY <span class="dot"></span>
  </div>
  <div class="nav-links">
    <a href="#specs" id="nav-specs">СПЕЦИФІКАЦІЇ</a>
    <a href="#platforms" id="nav-platforms">ПЛАТФОРМИ</a>
    <a href="#contact" id="nav-contact">КОНТАКТ</a>
  </div>
</nav>

<!-- HERO -->
<section id="hero">
  <div class="dot-grid"></div>
  <div class="hero-glow"></div>
  <div class="hero-inner">

    <!-- LEFT -->
    <div style="position:relative;z-index:1;">
      <div class="chip chip-active" style="margin-bottom:20px;">
        <span class="chip-dot"></span> ACTIVE DEVELOPMENT
      </div>
      <h1 class="hero-h1">
        Повний<br/>радіоконтроль.<br/><span class="accent">На рівні плати.</span>
      </h1>
      <p class="hero-sub">
        Бортова плата радіорозвідки для БПЛА та НРК. Перехоплення, підсилення та ретрансляція сигналів у складному РЕБ-середовищі.
      </p>
      <div style="display:flex;gap:12px;flex-wrap:wrap;margin-bottom:32px;">
        <a href="#contact" class="btn-primary">ЗАПРОСИТИ ДЕМО</a>
        <a href="#specs" class="btn-secondary">СПЕЦИФІКАЦІЇ</a>
      </div>
      <div class="hero-stats">
        <div class="stat-item">
          <span class="stat-value">2.4–6 ГГц</span>
          <span class="stat-label">Діапазон частот</span>
        </div>
        <div class="stat-item">
          <span class="stat-value">&lt; 90 г</span>
          <span class="stat-label">Маса</span>
        </div>
        <div class="stat-item">
          <span class="stat-value">UAV + UGV</span>
          <span class="stat-label">Платформи</span>
        </div>
        <div class="stat-item">
          <span class="stat-value">27 dBm</span>
          <span class="stat-label">Вихідна потужність</span>
        </div>
      </div>
    </div>

    <!-- RIGHT: board viz -->
    <div style="display:flex;justify-content:center;align-items:center;">
      <div class="board-viz">
        <div class="board-frame">
          <div class="board-grid"></div>
          <div class="scanline"></div>
          <div class="corner tl"></div>
          <div class="corner tr"></div>
          <div class="corner bl"></div>
          <div class="corner br"></div>
          <div class="board-label tl-lbl">FARADAY / RIB-1</div>
          <div class="board-label br-lbl">SIGNAL GREEN ●</div>
          <div class="freq-tag">2.4–6 GHz</div>
          <!-- chips -->
          <div class="board-chip main"></div>
          <div class="board-chip sm1"></div>
          <div class="board-chip sm2"></div>
          <div class="board-chip sm3"></div>
          <div class="board-chip sm4"></div>
          <div class="board-chip sm5"></div>
          <!-- ping -->
          <div class="ping-dot" style="top:31%;left:38%;"></div>
          <!-- traces -->
          <div class="trace h" style="top:35%;left:20%;width:30%;background:rgba(37,248,96,0.3);"></div>
          <div class="trace v" style="left:50%;top:15%;height:20%;background:rgba(37,248,96,0.2);"></div>
          <div class="trace h" style="bottom:28%;right:10%;width:20%;background:var(--outline-variant);"></div>
          <div class="trace v" style="right:30%;bottom:20%;height:15%;background:var(--outline-variant);"></div>
          <!-- waveform -->
          <div class="waveform-wrap">
            <svg width="100%" height="40" viewBox="0 0 320 40" preserveAspectRatio="none">
              <polyline points="0,20 20,10 40,30 60,5 80,35 100,15 120,25 140,8 160,32 180,18 200,28 220,12 240,20 260,8 280,30 300,15 320,20"/>
            </svg>
          </div>
        </div>
      </div>
    </div>

  </div>
</section>

<!-- PROBLEM -->
<section id="challenge" class="section-bg-dark">
  <div class="dot-grid" style="opacity:0.04;"></div>
  <div class="container" style="position:relative;z-index:1;">
    <div class="section-label"><span>ВИКЛИК</span></div>
    <h2 style="font-size:28px;font-weight:700;letter-spacing:-0.02em;margin-bottom:40px;max-width:600px;">Сучасний бойовий простір — це суцільна RF-перешкода</h2>
    <div class="problem-grid">

      <div style="padding:28px 24px;">
        <div class="chip chip-warning" style="margin-bottom:16px;"><span class="chip-dot"></span> WARNING</div>
        <div style="margin-bottom:12px;">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ff5e07" stroke-width="1.5" stroke-linecap="square">
            <path d="M1 6a9 9 0 0 1 11 0M5 10a5 5 0 0 1 4 0M9 14h.01M3 20l18-16"/><path d="M16 10.7a5 5 0 0 1 1.4 1.3"/>
          </svg>
        </div>
        <div class="mod-id label-caps" style="position:static;margin-bottom:4px;">MOD-01</div>
        <h3 style="font-size:16px;font-weight:600;margin-bottom:8px;color:var(--on-surface);">Придушення частот</h3>
        <p style="font-size:14px;line-height:1.6;color:var(--on-surface-variant);">Засоби РЕБ противника систематично глушать стандартні командні канали 2.4 та 5.8 ГГц, залишаючи платформу без управління у критичний момент.</p>
      </div>

      <div style="padding:28px 24px;border-left:1px solid var(--outline-variant);">
        <div class="chip chip-warning" style="margin-bottom:16px;"><span class="chip-dot"></span> WARNING</div>
        <div style="margin-bottom:12px;">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ff5e07" stroke-width="1.5" stroke-linecap="square">
            <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
          </svg>
        </div>
        <div class="label-caps" style="margin-bottom:4px;color:var(--outline);">MOD-02</div>
        <h3 style="font-size:16px;font-weight:600;margin-bottom:8px;color:var(--on-surface);">Загасання сигналу</h3>
        <p style="font-size:14px;line-height:1.6;color:var(--on-surface-variant);">На дистанціях понад 3 км у міській забудові або в умовах активних перешкод сигнал деградує до рівня нижче порогу надійного управління.</p>
      </div>

      <div style="padding:28px 24px;border-left:1px solid var(--outline-variant);">
        <div class="chip chip-warning" style="margin-bottom:16px;"><span class="chip-dot"></span> WARNING</div>
        <div style="margin-bottom:12px;">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ff5e07" stroke-width="1.5" stroke-linecap="square">
            <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
        </div>
        <div class="label-caps" style="margin-bottom:4px;color:var(--outline);">MOD-03</div>
        <h3 style="font-size:16px;font-weight:600;margin-bottom:8px;color:var(--on-surface);">Сліпа розвідка</h3>
        <p style="font-size:14px;line-height:1.6;color:var(--on-surface-variant);">Без пасивного перехоплення RF-активності противника — жодної картини електромагнітного середовища. Платформа рухається наосліп.</p>
      </div>

    </div>
  </div>
</section>

<!-- PRODUCT OVERVIEW -->
<section id="product">
  <div class="container">
    <div class="section-label"><span>ПРОДУКТ</span></div>
    <div style="text-align:center;max-width:700px;margin:0 auto 56px;">
      <h2 style="font-size:clamp(24px,4vw,40px);font-weight:700;letter-spacing:-0.02em;line-height:1.1;margin-bottom:16px;">
        Faraday RIB — єдина плата,<br/>що чує все.
      </h2>
      <p style="font-size:16px;line-height:1.6;color:var(--on-surface-variant);">
        Компактний бортовий модуль, розроблений для роботи в умовах активної РЕБ-протидії. Пасивний моніторинг спектру, підсилення та ретрансляція — в одному форм-факторі масою менше 90 г.
      </p>
    </div>
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:var(--outline-variant);" class="features-grid">

      <div class="data-card" style="padding:24px;background:var(--surface);">
        <div class="mod-id">MOD-A</div>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#25f860" stroke-width="1.5" stroke-linecap="square" style="margin-bottom:14px;">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
        <div class="label-caps" style="color:var(--primary-container);margin-bottom:8px;">ПЕРЕХОПЛЕННЯ</div>
        <p style="font-size:13px;line-height:1.6;color:var(--on-surface-variant);">Пасивне захоплення RF-трафіку у діапазоні 2.4–6 ГГц без випромінення власного сигналу. Повна прихованість.</p>
      </div>

      <div class="data-card" style="padding:24px;background:var(--surface);">
        <div class="mod-id">MOD-B</div>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#25f860" stroke-width="1.5" stroke-linecap="square" style="margin-bottom:14px;">
          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
        </svg>
        <div class="label-caps" style="color:var(--primary-container);margin-bottom:8px;">ПІДСИЛЕННЯ</div>
        <p style="font-size:13px;line-height:1.6;color:var(--on-surface-variant);">Підсилення до 27 dBm із чутливістю –100 dBm для відновлення деградованих ліній зв'язку у щільних перешкодних середовищах.</p>
      </div>

      <div class="data-card" style="padding:24px;background:var(--surface);">
        <div class="mod-id">MOD-C</div>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#25f860" stroke-width="1.5" stroke-linecap="square" style="margin-bottom:14px;">
          <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
        </svg>
        <div class="label-caps" style="color:var(--primary-container);margin-bottom:8px;">РЕТРАНСЛЯЦІЯ</div>
        <p style="font-size:13px;line-height:1.6;color:var(--on-surface-variant);">Mesh-ретрансляція між вузлами групи платформ — автономна організація mesh-мережі без інфраструктури оператора.</p>
      </div>

      <div class="data-card" style="padding:24px;background:var(--surface);">
        <div class="mod-id">MOD-D</div>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#25f860" stroke-width="1.5" stroke-linecap="square" style="margin-bottom:14px;">
          <rect x="2" y="3" width="20" height="14" rx="0"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
        </svg>
        <div class="label-caps" style="color:var(--primary-container);margin-bottom:8px;">МОНІТОРИНГ</div>
        <p style="font-size:13px;line-height:1.6;color:var(--on-surface-variant);">Аналіз спектру в реальному часі з передачею даних через UART/SPI/USB-C для відображення RF-картини на GCS.</p>
      </div>

    </div>
  </div>
</section>

<!-- SPECS -->
<section id="specs" class="section-bg-dark">
  <div class="container" style="position:relative;z-index:1;">
    <div class="dot-grid" style="opacity:0.04;position:absolute;inset:0;"></div>
    <div class="section-label"><span>СПЕЦИФІКАЦІЇ</span></div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:start;" class="specs-grid">

      <!-- TABLE -->
      <div>
        <h2 style="font-size:24px;font-weight:700;letter-spacing:-0.02em;margin-bottom:28px;">Технічні характеристики</h2>
        <div style="border:1px solid var(--outline-variant);">
          <div class="spec-row">
            <span class="spec-label">Діапазон частот</span>
            <span class="spec-value">2.4 ГГц – 6 ГГц</span>
          </div>
          <div class="spec-row">
            <span class="spec-label">Вихідна потужність</span>
            <span class="spec-value">до 27 dBm</span>
          </div>
          <div class="spec-row">
            <span class="spec-label">Чутливість приймача</span>
            <span class="spec-value">–100 dBm</span>
          </div>
          <div class="spec-row">
            <span class="spec-label">Інтерфейси</span>
            <span class="spec-value">UART / SPI / USB-C</span>
          </div>
          <div class="spec-row">
            <span class="spec-label">Живлення / Споживання</span>
            <span class="spec-value">3.3V / 5V, &lt;2W</span>
          </div>
          <div class="spec-row">
            <span class="spec-label">Маса</span>
            <span class="spec-value">&lt; 90 г</span>
          </div>
          <div class="spec-row">
            <span class="spec-label">Робоча температура</span>
            <span class="spec-value">–40°C до +70°C</span>
          </div>
          <div class="spec-row">
            <span class="spec-label">Сумісність платформ</span>
            <span class="spec-value">UAV / UGV</span>
          </div>
        </div>
      </div>

      <!-- FORM FACTOR VIZ -->
      <div style="display:flex;flex-direction:column;gap:20px;">
        <h2 style="font-size:24px;font-weight:700;letter-spacing:-0.02em;">Форм-фактор</h2>
        <div style="border:1px solid var(--outline-variant);background:var(--surface-low);padding:32px;position:relative;">
          <div class="corner tl"></div><div class="corner tr"></div>
          <div class="corner bl"></div><div class="corner br"></div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:20px;">
            <div style="background:var(--surface-high);border:1px solid var(--outline-variant);height:48px;display:flex;align-items:center;justify-content:center;">
              <span class="label-caps" style="color:var(--outline);">RF FRONT-END</span>
            </div>
            <div style="background:var(--surface-high);border:1px solid rgba(37,248,96,0.4);height:48px;display:flex;align-items:center;justify-content:center;box-shadow:0 0 8px rgba(37,248,96,0.15);">
              <span class="label-caps" style="color:var(--primary-container);">CORE MCU</span>
            </div>
            <div style="background:var(--surface-high);border:1px solid var(--outline-variant);height:36px;display:flex;align-items:center;justify-content:center;grid-column:span 2;">
              <span class="label-caps" style="color:var(--outline);">I/O — UART / SPI / USB-C</span>
            </div>
          </div>
          <div style="border-top:1px solid var(--outline-variant);padding-top:16px;display:flex;justify-content:space-between;align-items:center;">
            <span class="code-sm" style="color:var(--outline);">RIB-1 REV.A</span>
            <span class="chip chip-active" style="font-size:9px;padding:3px 8px;"><span class="chip-dot"></span> ACTIVE</span>
          </div>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
          <div style="border:1px solid var(--outline-variant);padding:14px;background:var(--surface);">
            <div class="label-caps" style="color:var(--outline);margin-bottom:4px;">Стандарт</div>
            <div class="code-sm" style="color:var(--on-surface);">MIL-STD-810H</div>
          </div>
          <div style="border:1px solid var(--outline-variant);padding:14px;background:var(--surface);">
            <div class="label-caps" style="color:var(--outline);margin-bottom:4px;">Захист</div>
            <div class="code-sm" style="color:var(--on-surface);">IP67</div>
          </div>
        </div>
      </div>

    </div>
  </div>
</section>

<!-- PLATFORMS -->
<section id="platforms">
  <div class="container">
    <div class="section-label"><span>ПЛАТФОРМИ</span></div>
    <h2 style="font-size:28px;font-weight:700;letter-spacing:-0.02em;margin-bottom:40px;">Розроблено для безпілотних систем</h2>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px;" class="platform-grid">

      <div class="platform-card">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#25f860" stroke-width="1.2" stroke-linecap="square" style="margin-bottom:20px;">
          <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
        </svg>
        <div class="label-caps" style="color:var(--primary-container);margin-bottom:8px;">UAV — БПЛА</div>
        <h3 style="font-size:18px;font-weight:600;margin-bottom:12px;letter-spacing:-0.01em;">Безпілотні авіаційні комплекси</h3>
        <p style="font-size:14px;line-height:1.6;color:var(--on-surface-variant);margin-bottom:20px;">
          Інтеграція у рамку мультиротора або фіксованого крила. RIB забезпечує пасивну розвідку RF-середовища та ретрансляцію командного сигналу за лінією горизонту під час виконання розвідувальних місій.
        </p>
        <div style="display:flex;gap:8px;flex-wrap:wrap;">
          <span class="chip chip-active" style="font-size:9px;padding:3px 8px;">MULTIROTОР</span>
          <span class="chip chip-active" style="font-size:9px;padding:3px 8px;">FIXED WING</span>
          <span class="chip chip-standby" style="font-size:9px;padding:3px 8px;">VTOL</span>
        </div>
      </div>

      <div class="platform-card">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#25f860" stroke-width="1.2" stroke-linecap="square" style="margin-bottom:20px;">
          <rect x="1" y="11" width="22" height="8" rx="0"/><path d="M1 15h22M5 11V7h14v4"/>
          <circle cx="6" cy="19" r="2"/><circle cx="18" cy="19" r="2"/>
        </svg>
        <div class="label-caps" style="color:var(--primary-container);margin-bottom:8px;">UGV — НРК</div>
        <h3 style="font-size:18px;font-weight:600;margin-bottom:12px;letter-spacing:-0.01em;">Наземні роботизовані комплекси</h3>
        <p style="font-size:14px;line-height:1.6;color:var(--on-surface-variant);margin-bottom:20px;">
          Монтаж на бойові наземні платформи для розвідки в умовах щільної міської забудови. RIB подовжує ефективну дистанцію управління та збирає сигнатури RF-активності у зоні операції.
        </p>
        <div style="display:flex;gap:8px;flex-wrap:wrap;">
          <span class="chip chip-active" style="font-size:9px;padding:3px 8px;">WHEELED</span>
          <span class="chip chip-active" style="font-size:9px;padding:3px 8px;">TRACKED</span>
          <span class="chip chip-standby" style="font-size:9px;padding:3px 8px;">LEGGED</span>
        </div>
      </div>

    </div>
  </div>
</section>

<!-- SIGNAL FLOW -->
<section id="flow" class="section-bg-dark">
  <div class="dot-grid" style="opacity:0.04;"></div>
  <div class="container" style="position:relative;z-index:1;">
    <div class="section-label"><span>ПОТІК СИГНАЛУ</span></div>
    <h2 style="font-size:28px;font-weight:700;letter-spacing:-0.02em;margin-bottom:48px;">Чотири кроки. Нульова затримка реакції.</h2>
    <div class="flow-steps" style="align-items:flex-start;">

      <div class="flow-step">
        <div class="flow-num">01</div>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#25f860" stroke-width="1.5" stroke-linecap="square" style="margin:0 auto 10px;display:block;">
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <div class="label-caps" style="color:var(--primary-container);">ВИЯВИТИ</div>
        <p style="font-size:13px;color:var(--on-surface-variant);margin-top:8px;line-height:1.5;">Пасивне сканування RF-спектру — від 2.4 до 6 ГГц.</p>
      </div>

      <div class="flow-connector"></div>

      <div class="flow-step">
        <div class="flow-num">02</div>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#25f860" stroke-width="1.5" stroke-linecap="square" style="margin:0 auto 10px;display:block;">
          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
        </svg>
        <div class="label-caps" style="color:var(--primary-container);">ПІДСИЛИТИ</div>
        <p style="font-size:13px;color:var(--on-surface-variant);margin-top:8px;line-height:1.5;">Підсилення до 27 dBm для відновлення слабких сигналів.</p>
      </div>

      <div class="flow-connector"></div>

      <div class="flow-step">
        <div class="flow-num">03</div>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#25f860" stroke-width="1.5" stroke-linecap="square" style="margin:0 auto 10px;display:block;">
          <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
        </svg>
        <div class="label-caps" style="color:var(--primary-container);">РЕТРАНСЛЮВАТИ</div>
        <p style="font-size:13px;color:var(--on-surface-variant);margin-top:8px;line-height:1.5;">Mesh-ретрансляція між платформами групи.</p>
      </div>

      <div class="flow-connector"></div>

      <div class="flow-step">
        <div class="flow-num">04</div>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#25f860" stroke-width="1.5" stroke-linecap="square" style="margin:0 auto 10px;display:block;">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
        </svg>
        <div class="label-caps" style="color:var(--primary-container);">ЗАПИСАТИ</div>
        <p style="font-size:13px;color:var(--on-surface-variant);margin-top:8px;line-height:1.5;">Логування RF-подій та передача до GCS через цифрові інтерфейси.</p>
      </div>

    </div>
  </div>
</section>

<!-- CONTACT -->
<section id="contact" style="background:var(--surface-lowest);">
  <div class="dot-grid" style="opacity:0.05;"></div>
  <div class="container" style="position:relative;z-index:1;max-width:720px;">
    <div class="section-label"><span>КОНТАКТ</span></div>
    <h2 style="font-size:clamp(28px,4vw,44px);font-weight:700;letter-spacing:-0.02em;margin-bottom:12px;">Запросити доступ</h2>
    <p style="font-size:16px;line-height:1.6;color:var(--on-surface-variant);margin-bottom:40px;">
      Для оборонних підрядників, системних інтеграторів та науково-дослідних установ.
    </p>
    <form style="display:flex;flex-direction:column;gap:20px;" onsubmit="handleSubmit(event)">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;" class="form-row">
        <div class="form-field">
          <label>Ім'я та прізвище</label>
          <input type="text" placeholder="Іван Коваленко" required />
        </div>
        <div class="form-field">
          <label>Організація</label>
          <input type="text" placeholder="Назва компанії або установи" required />
        </div>
      </div>
      <div class="form-field">
        <label>Email</label>
        <input type="email" placeholder="ivan@org.ua" required />
      </div>
      <div class="form-field">
        <label>Повідомлення</label>
        <textarea placeholder="Опишіть платформу та сценарій застосування..."></textarea>
      </div>
      <div>
        <button type="submit" class="btn-primary" style="padding:14px 36px;font-size:14px;">НАДІСЛАТИ ЗАПИТ</button>
      </div>
    </form>
  </div>
</section>

<!-- FOOTER -->
<footer>
  <div style="max-width:1440px;margin:0 auto;">
    <div style="display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:40px;padding-bottom:40px;border-bottom:1px solid var(--outline-variant);" class="footer-cols">
      <div>
        <div class="nav-logo" style="margin-bottom:12px;">FARADAY <span class="dot"></span></div>
        <p style="font-size:13px;line-height:1.6;color:var(--on-surface-variant);max-width:240px;">Апаратне забезпечення рівня SIGINT для наступного покоління безпілотних систем.</p>
      </div>
      <div>
        <div class="label-caps" style="color:var(--outline);margin-bottom:16px;">Продукт</div>
        <div style="display:flex;flex-direction:column;gap:10px;">
          <a href="#product" style="font-size:14px;color:var(--on-surface-variant);text-decoration:none;">Radio Intelligence Board</a>
          <a href="#specs" style="font-size:14px;color:var(--on-surface-variant);text-decoration:none;">Специфікації</a>
          <a href="#flow" style="font-size:14px;color:var(--on-surface-variant);text-decoration:none;">Потік сигналу</a>
        </div>
      </div>
      <div>
        <div class="label-caps" style="color:var(--outline);margin-bottom:16px;">Платформи</div>
        <div style="display:flex;flex-direction:column;gap:10px;">
          <a href="#platforms" style="font-size:14px;color:var(--on-surface-variant);text-decoration:none;">БПЛА (UAV)</a>
          <a href="#platforms" style="font-size:14px;color:var(--on-surface-variant);text-decoration:none;">НРК (UGV)</a>
        </div>
      </div>
      <div>
        <div class="label-caps" style="color:var(--outline);margin-bottom:16px;">Контакт</div>
        <div style="display:flex;flex-direction:column;gap:10px;">
          <a href="#contact" style="font-size:14px;color:var(--on-surface-variant);text-decoration:none;">Запросити демо</a>
          <a href="mailto:contact@faradaysystems.io" style="font-size:14px;color:var(--on-surface-variant);text-decoration:none;">contact@faradaysystems.io</a>
        </div>
      </div>
    </div>
    <div style="display:flex;justify-content:space-between;align-items:center;padding-top:20px;flex-wrap:wrap;gap:12px;">
      <span class="label-caps" style="color:var(--outline);">© 2025 FARADAY SYSTEMS</span>
      <span class="label-caps" style="color:var(--primary-container);">SIGINT GRADE HARDWARE</span>
    </div>
  </div>
</footer>

<script>
  // Nav active on scroll
  const sections = ['challenge','product','specs','platforms','flow','contact'];
  const navLinks = { specs: document.getElementById('nav-specs'), platforms: document.getElementById('nav-platforms'), contact: document.getElementById('nav-contact') };
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY + 80;
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      if (scrollY >= el.offsetTop && scrollY < el.offsetTop + el.offsetHeight) {
        Object.values(navLinks).forEach(a => a && a.classList.remove('active'));
        if (id === 'specs' && navLinks.specs) navLinks.specs.classList.add('active');
        if (id === 'platforms' && navLinks.platforms) navLinks.platforms.classList.add('active');
        if (id === 'contact' && navLinks.contact) navLinks.contact.classList.add('active');
      }
    });
  });

  // Mobile form-row collapse
  if (window.innerWidth <= 640) {
    document.querySelectorAll('.form-row').forEach(el => { el.style.gridTemplateColumns = '1fr'; });
  }

  // Feature grid responsive
  if (window.innerWidth <= 768) {
    document.querySelectorAll('.features-grid').forEach(el => { el.style.gridTemplateColumns = '1fr 1fr'; });
    document.querySelectorAll('.specs-grid').forEach(el => { el.style.gridTemplateColumns = '1fr'; });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const btn = e.target.querySelector('button[type=submit]');
    btn.textContent = 'ЗАПИТ НАДІСЛАНО ✓';
    btn.style.background = 'transparent';
    btn.style.border = '1px solid var(--primary-container)';
    btn.style.color = 'var(--primary-container)';
    btn.disabled = true;
  }
</script>
</body>
</html>`

export async function GET() {
  return new NextResponse(html, {
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  })
}
