import { useState, useEffect, useRef, useCallback } from "react";
import * as THREE from "three";

/* ══════════════════════════════════════════
   DATA
══════════════════════════════════════════ */
const SECTIONS = ["home", "about", "experience", "projects", "services", "contact"];

const techStack = [
  { name: "React", color: "#61DAFB" }, { name: "Node.js", color: "#68A063" },
  { name: "MongoDB", color: "#4DB33D" }, { name: "Next.js", color: "#aaaaaa" },
  { name: "Remix", color: "#818CF8" }, { name: "Svelte", color: "#FF3E00" },
  { name: "Shopify", color: "#96BF48" }, { name: "Docker", color: "#2496ED" },
  { name: "AWS", color: "#FF9900" }, { name: "Nginx", color: "#00AA00" },
  { name: "WordPress", color: "#21759B" }, { name: "DigitalOcean", color: "#0080FF" },
  { name: "JavaScript", color: "#F7DF1E" }, { name: "Redux", color: "#764ABC" },
  { name: "Git", color: "#F05032" }, { name: "HTML/CSS", color: "#E34F26" },
];

const experiences = [
  {
    company: "Freelance Developer", location: "Remote",
    period: "Mar 2024 – Present", role: "Full Stack / Freelance",
    desc: "Built customization websites, e-commerce stores, and interior design showcases for real clients. Projects include Everwood Interiors — a luxury interior design website. End-to-end development, deployment, and client communication.",
  },
  {
    company: "Helixo Innovations Pvt Ltd", location: "Kochi",
    period: "Oct 2024 – Mar 2025", role: "Junior Software Engineer",
    desc: "Contributed to Shopify's top-downloaded apps used by thousands of merchants worldwide. Built features using MERN, Next.js, Remix, Svelte, CRXJS, and WordPress. Improved UFE (36,000+ active users) with new features and performance optimizations. Deployed Shopify apps using Docker and DigitalOcean.",
  },
  {
    company: "Selfstack Hub LLP", location: "Calicut",
    period: "Feb 2024 – Oct 2024", role: "MERN Stack Intern",
    desc: "Built 20+ mini projects including a Shipping Aggregator API, QR generator, post scheduler, user management app, and multiple responsive websites. Collaborated using Git/GitHub and strengthened problem-solving skills through real-world projects.",
  },
];

const FEATURED = [
  {
    name: "TradeLens", tag: "AI-Powered",
    desc: "AI trade journal & P/L analyzer. Claude AI insights on why stocks moved. Google/GitHub auth, MongoDB Atlas, monthly charts.",
    tech: ["Next.js", "MongoDB", "NextAuth", "Claude AI"],
    color: "#00FFB2", site: "#", github: "#",
  },
  {
    name: "Everwood Interiors", tag: "Client Work",
    desc: "Luxury interior design showcase for a real client. Elegant design, smooth animations, fully responsive — production deployed.",
    tech: ["HTML", "CSS", "JavaScript"],
    color: "#FFD166", site: "https://salmanck66.github.io/Everwood-Interiors-/", github: "#",
  },
  {
    name: "jcclub.shop", tag: "Full Stack",
    desc: "E-commerce store on AWS EC2 with Nginx and Cloudflare. Node.js, Express, MongoDB, HBS — full cart/checkout/admin.",
    tech: ["Node.js", "Express", "MongoDB", "AWS"],
    color: "#818CF8", site: "https://www.jcclub.shop", github: "https://github.com/salmanck66/Ecommerce-Project-",
  },
];

const MINI = [
  { name: "Kanban ToDo App", desc: "Drag-and-drop kanban with progress statuses.", tech: ["React", "TailwindCSS"], color: "#61DAFB", site: "https://kanban-to-do-tasks-drag-and-drop.vercel.app/", github: "https://github.com/salmanck66/Kanban_To_Do_Tasks_Drag_And_Drop" },
  { name: "Seat Reservation", desc: "Minimalist seat reservation UI — extensible.", tech: ["React", "TailwindCSS"], color: "#FFD166", site: "https://seminar-hall-seat-resevation-app.vercel.app/", github: "https://github.com/salmanck66/Seminar-Hall-Seat-Resevation-App" },
  { name: "User Management", desc: "CRUD demo with React and Redux Toolkit.", tech: ["React", "Redux"], color: "#764ABC", site: "https://user-details-management-react-redux.vercel.app/", github: "https://github.com/salmanck66/User_Details_Management_React_Redux" },
  { name: "JS Quiz App", desc: "Quiz app with LocalStorage persistence.", tech: ["React", "LocalStorage"], color: "#F7DF1E", site: "https://javascript-quiz-app-react.vercel.app/", github: "https://github.com/salmanck66/Javascript-Quiz-App-React" },
  { name: "Keyboard Clone", desc: "Interactive keyboard visualizer — live keypresses.", tech: ["React"], color: "#FF6B6B", site: "https://keyboard-react-one.vercel.app/", github: "https://github.com/salmanck66/Keyboard_React" },
  { name: "Post Scheduler", desc: "Schedule posts by date/time or publish instantly.", tech: ["React"], color: "#00A8FF", site: "https://post-scheduler-lyart.vercel.app/", github: "https://github.com/salmanck66/Post-Scheduler" },
  { name: "StopWatch", desc: "Stylish responsive stopwatch with lap tracking.", tech: ["React", "TailwindCSS"], color: "#00FFB2", site: "https://stop-watch-react-js-six.vercel.app/", github: "https://github.com/salmanck66/StopWatch-ReactJs" },
];

/* ══════════════════════════════════════════
   SERVICES DATA
══════════════════════════════════════════ */
const SERVICES = [
  {
    id: "custom-app",
    icon: "⬡",
    title: "Custom App Development",
    short: "Full-stack web apps built from scratch — fast, scalable, and production-ready.",
    color: "#00FFB2",
    features: [
      "MERN stack / Next.js / Remix / Svelte",
      "REST & GraphQL API design",
      "Auth, payments & dashboards",
      "AWS / DigitalOcean deployment",
      "Docker & CI/CD setup",
    ],
    cta: "Book This Service",
  },
  {
    id: "extension-dev",
    icon: "◈",
    title: "Extension Development",
    short: "Browser extensions and Shopify app extensions that supercharge your platform.",
    color: "#00A8FF",
    features: [
      "Chrome / Firefox extensions (CRXJS)",
      "Shopify Theme Extensions",
      "Shopify Admin & Checkout UI Extensions",
      "React-based extension UIs",
      "Extension publishing & maintenance",
    ],
    cta: "Book This Service",
  },
  {
    id: "business-solutions",
    icon: "◆",
    title: "Business Solutions",
    short: "End-to-end digital solutions tailored to real business problems — not just code.",
    color: "#FFD166",
    features: [
      "SaaS product development",
      "Internal tools & admin dashboards",
      "Workflow automation systems",
      "Third-party API integrations",
      "Performance & cost optimization",
    ],
    cta: "Book This Service",
  },
  {
    id: "shopify-setup",
    icon: "◉",
    title: "Shopify Store Setup",
    short: "Get your Shopify store launched the right way — fully configured and optimized.",
    color: "#96BF48",
    features: [
      "Theme setup & brand customization",
      "App installation & configuration",
      "Product, collection & menu setup",
      "Payment gateway & shipping setup",
      "Speed & SEO optimization",
    ],
    cta: "Book This Service",
  },
  {
    id: "shopify-fix",
    icon: "◎",
    title: "Shopify Bug Fix & Customization",
    short: "Something broken or off-brand? I'll fix it fast and make it look exactly right.",
    color: "#FF6B6B",
    features: [
      "Theme bug fixes & patches",
      "Liquid template customization",
      "Custom section / block creation",
      "App conflict resolution",
      "Mobile responsiveness fixes",
    ],
    cta: "Book This Service",
  },
  {
    id: "shopify-app",
    icon: "⬟",
    title: "Shopify App Development",
    short: "Custom Shopify apps built with the latest stack — embedded or standalone.",
    color: "#818CF8",
    features: [
      "Embedded Shopify apps (Remix / Next.js)",
      "Shopify API & GraphQL integration",
      "Billing & subscription setup",
      "Multi-merchant architecture",
      "App Store submission ready",
    ],
    cta: "Book This Service",
  },
];

const FORMSPREE_URL = "https://formspree.io/f/mpqjkkrq";
const CV_URL = "https://drive.google.com/uc?export=download&id=1Z1LANp-jSfdch7fjXpHNEp4i-cVlAenf";

/* ══════════════════════════════════════════
   SCROLL REVEAL HOOK
══════════════════════════════════════════ */
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({ children, delay = 0, direction = "up", style }) {
  const [ref, visible] = useReveal();
  const translate = direction === "up" ? "translateY(40px)" : direction === "left" ? "translateX(-40px)" : direction === "right" ? "translateX(40px)" : "translateY(0)";
  return (
    <div ref={ref} style={{
      ...style,
      opacity: visible ? 1 : 0,
      transform: visible ? "translate(0,0)" : translate,
      transition: `opacity 0.7s ease ${delay}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

/* ══════════════════════════════════════════
   THREE.JS HERO
══════════════════════════════════════════ */
function HeroCanvas({ mousePosRef, isMobile }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!canvas || !container) return;

    const dpr = isMobile ? Math.min(window.devicePixelRatio, 1.5) : Math.min(window.devicePixelRatio, 2);
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: !isMobile, alpha: true });
    renderer.setPixelRatio(dpr);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100);
    camera.position.z = isMobile ? 7 : 5;

    const setSize = () => {
      const w = container.clientWidth, h = container.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };

    const count = isMobile ? 1000 : 2200;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const palettes = [new THREE.Color("#00FFB2"), new THREE.Color("#00A8FF"), new THREE.Color("#818CF8"), new THREE.Color("#ffffff")];
    for (let i = 0; i < count; i++) {
      const spread = isMobile ? 10 : 16;
      positions[i*3]   = (Math.random() - 0.5) * spread;
      positions[i*3+1] = (Math.random() - 0.5) * spread;
      positions[i*3+2] = (Math.random() - 0.5) * (isMobile ? 8 : 12);
      const c = palettes[Math.floor(Math.random() * palettes.length)];
      colors[i*3] = c.r; colors[i*3+1] = c.g; colors[i*3+2] = c.b;
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    pGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    const pMat = new THREE.PointsMaterial({ size: isMobile ? 0.055 : 0.035, vertexColors: true, transparent: true, opacity: isMobile ? 0.8 : 0.65 });
    const points = new THREE.Points(pGeo, pMat);
    scene.add(points);

    if (!isMobile) {
      const torusGeo = new THREE.TorusKnotGeometry(1.6, 0.28, 80, 12);
      scene.add(new THREE.Mesh(torusGeo, new THREE.MeshBasicMaterial({ color: "#00FFB2", wireframe: true, transparent: true, opacity: 0.09 })));
    }

    const ico = new THREE.Mesh(
      new THREE.IcosahedronGeometry(isMobile ? 1.4 : 1.1, 1),
      new THREE.MeshBasicMaterial({ color: "#00FFB2", wireframe: true, transparent: true, opacity: isMobile ? 0.14 : 0.08 })
    );
    scene.add(ico);

    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(2.2, 0.008, 8, 80),
      new THREE.MeshBasicMaterial({ color: "#00FFB2", transparent: true, opacity: isMobile ? 0.25 : 0.12 })
    );
    ring.rotation.x = Math.PI / 3;
    scene.add(ring);

    const ring2 = new THREE.Mesh(
      new THREE.TorusGeometry(1.5, 0.006, 8, 80),
      new THREE.MeshBasicMaterial({ color: "#00A8FF", transparent: true, opacity: isMobile ? 0.2 : 0.1 })
    );
    ring2.rotation.x = -Math.PI / 4; ring2.rotation.y = Math.PI / 6;
    scene.add(ring2);

    setSize();

    let touchTarget = { x: 0, y: 0 };
    const onTouch = (e) => {
      const t = e.touches[0];
      touchTarget.x = (t.clientX / window.innerWidth - 0.5) * 0.6;
      touchTarget.y = -(t.clientY / window.innerHeight - 0.5) * 0.6;
    };
    if (isMobile) window.addEventListener("touchmove", onTouch, { passive: true });

    let raf, t = 0;
    const animate = () => {
      raf = requestAnimationFrame(animate);
      t += isMobile ? 0.003 : 0.004;
      points.rotation.y = t * 0.15; points.rotation.x = t * 0.04;
      ico.rotation.y = -t * 0.3; ico.rotation.z = t * 0.15;
      ring.rotation.z = t * 0.2;
      ring2.rotation.z = -t * 0.25; ring2.rotation.y = t * 0.1;
      if (isMobile) {
        camera.position.x += (touchTarget.x - camera.position.x) * 0.05;
        camera.position.y += (touchTarget.y - camera.position.y) * 0.05;
      } else if (mousePosRef.current) {
        const tx = (mousePosRef.current.x / window.innerWidth - 0.5) * 0.8;
        const ty = -(mousePosRef.current.y / window.innerHeight - 0.5) * 0.8;
        camera.position.x += (tx - camera.position.x) * 0.04;
        camera.position.y += (ty - camera.position.y) * 0.04;
      }
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
    };
    animate();

    window.addEventListener("resize", setSize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", setSize);
      if (isMobile) window.removeEventListener("touchmove", onTouch);
      renderer.dispose();
    };
  }, [isMobile]);

  return (
    <div ref={containerRef} style={{ position: "absolute", inset: 0, zIndex: 0 }}>
      <canvas ref={canvasRef} style={{ width: "100%", height: "100%", display: "block" }} />
    </div>
  );
}

/* ══════════════════════════════════════════
   3D TILT CARD
══════════════════════════════════════════ */
function TiltCard({ children, style, color = "#00FFB2", isMobile }) {
  const ref = useRef(null);
  const [state, setState] = useState({ rx: 0, ry: 0, gx: 50, gy: 50, hovered: false });

  const onMove = useCallback((e) => {
    if (isMobile) return;
    const r = ref.current.getBoundingClientRect();
    const cx = e.clientX - r.left, cy = e.clientY - r.top;
    setState({ rx: ((cy / r.height) - 0.5) * -14, ry: ((cx / r.width) - 0.5) * 14, gx: (cx / r.width) * 100, gy: (cy / r.height) * 100, hovered: true });
  }, [isMobile]);

  const onLeave = useCallback(() => setState({ rx: 0, ry: 0, gx: 50, gy: 50, hovered: false }), []);

  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} style={{
      ...style,
      transform: `perspective(900px) rotateX(${state.rx}deg) rotateY(${state.ry}deg) scale(${state.hovered ? 1.025 : 1})`,
      transition: state.hovered ? "transform 0.08s linear" : "transform 0.5s cubic-bezier(.2,.8,.3,1)",
      border: `1px solid ${state.hovered ? color + "55" : "rgba(255,255,255,0.08)"}`,
      boxShadow: state.hovered ? `0 20px 60px ${color}18` : "none",
      background: state.hovered
        ? `radial-gradient(circle at ${state.gx}% ${state.gy}%, ${color}0D 0%, rgba(255,255,255,0.018) 60%)`
        : "rgba(255,255,255,0.025)",
      position: "relative", overflow: "hidden", willChange: "transform",
    }}>
      {state.hovered && !isMobile && (
        <div style={{
          position: "absolute", width: 200, height: 200, borderRadius: "50%",
          background: `radial-gradient(circle, ${color}18, transparent 70%)`,
          left: `calc(${state.gx}% - 100px)`, top: `calc(${state.gy}% - 100px)`,
          pointerEvents: "none", transition: "left 0.05s linear, top 0.05s linear", zIndex: 0,
        }} />
      )}
      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
    </div>
  );
}

/* ══════════════════════════════════════════
   ANIMATED COUNTER
══════════════════════════════════════════ */
function Counter({ target, suffix = "" }) {
  const [count, setCount] = useState(0);
  const [ref, visible] = useReveal();
  useEffect(() => {
    if (!visible) return;
    const num = parseInt(target);
    const step = Math.ceil(num / 40);
    let cur = 0;
    const iv = setInterval(() => {
      cur = Math.min(cur + step, num);
      setCount(cur);
      if (cur >= num) clearInterval(iv);
    }, 30);
    return () => clearInterval(iv);
  }, [visible, target]);
  return <span ref={ref}>{count}{suffix}</span>;
}

/* ══════════════════════════════════════════
   SERVICE CARD
══════════════════════════════════════════ */
function ServiceCard({ service, isMobile, onBook }) {
  const [open, setOpen] = useState(false);
  return (
    <TiltCard color={service.color} isMobile={isMobile} style={{ borderRadius: 16, padding: isMobile ? "20px 18px" : "26px", display: "flex", flexDirection: "column" }}>

      {/* Top row */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 18 }}>
        <div style={{
          width: 46, height: 46, borderRadius: 12,
          background: `${service.color}14`, border: `1px solid ${service.color}30`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 20, color: service.color,
        }}>
          {service.icon}
        </div>
        <span style={{
          fontFamily: "'Space Mono',monospace", fontSize: 7, color: service.color,
          border: `1px solid ${service.color}30`, padding: "3px 9px", borderRadius: 100,
          letterSpacing: 1.5, background: `${service.color}08`,
        }}>AVAILABLE</span>
      </div>

      {/* Accent bar */}
      <div style={{ width: 28, height: 2, background: service.color, borderRadius: 2, marginBottom: 14, boxShadow: `0 0 8px ${service.color}` }} />

      {/* Title */}
      <h3 style={{ fontSize: isMobile ? 15 : 17, fontWeight: 800, color: "#fff", marginBottom: 8, lineHeight: 1.25 }}>
        {service.title}
      </h3>

      {/* Short desc */}
      <p style={{ color: "rgba(255,255,255,0.42)", fontSize: isMobile ? 11.5 : 12.5, lineHeight: 1.75, marginBottom: 16, flex: 1 }}>
        {service.short}
      </p>

      {/* Toggle features */}
      <button onClick={() => setOpen(!open)} style={{
        background: "none", border: `1px solid ${service.color}28`,
        color: "rgba(255,255,255,0.4)", fontFamily: "'Space Mono',monospace",
        fontSize: 8, letterSpacing: 1.5, padding: "6px 11px", borderRadius: 6,
        cursor: "pointer", alignSelf: "flex-start", marginBottom: open ? 12 : 16,
        transition: "all 0.2s", display: "flex", alignItems: "center", gap: 6,
      }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = service.color + "66"; e.currentTarget.style.color = service.color; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = service.color + "28"; e.currentTarget.style.color = "rgba(255,255,255,0.4)"; }}
      >
        <span style={{ display: "inline-block", transition: "transform 0.2s", transform: open ? "rotate(180deg)" : "none" }}>▾</span>
        {open ? "HIDE DETAILS" : "WHAT'S INCLUDED"}
      </button>

      {open && (
        <div style={{ marginBottom: 16, animation: "expandDown 0.25s cubic-bezier(0.16,1,0.3,1)" }}>
          {service.features.map((f, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "7px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: service.color, flexShrink: 0, boxShadow: `0 0 5px ${service.color}` }} />
              <span style={{ fontFamily: "'Space Mono',monospace", fontSize: isMobile ? 9 : 9.5, color: "rgba(255,255,255,0.5)", letterSpacing: 0.3 }}>{f}</span>
            </div>
          ))}
        </div>
      )}

      {/* CTA */}
      <button onClick={() => onBook(service)} style={{
        background: service.color, color: "#07090E",
        border: "none", padding: "12px 0", borderRadius: 8, width: "100%",
        fontFamily: "'Space Mono',monospace", fontSize: 9, fontWeight: 700, letterSpacing: 1.5,
        cursor: "pointer", marginTop: "auto",
        boxShadow: `0 4px 20px ${service.color}28`,
        transition: "opacity 0.15s, transform 0.15s",
      }}
        onMouseEnter={e => { e.currentTarget.style.opacity = "0.88"; e.currentTarget.style.transform = "translateY(-1px)"; }}
        onMouseLeave={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "none"; }}
      >
        {service.cta} →
      </button>
    </TiltCard>
  );
}

/* ══════════════════════════════════════════
   BOOKING MODAL
══════════════════════════════════════════ */
function BookingModal({ service, onClose, isMobile }) {
  const [form, setForm] = useState({ name: "", email: "", budget: "", details: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  const submit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ service: service.title, ...form }),
      });
      setStatus(res.ok ? "success" : "error");
    } catch { setStatus("error"); }
  };

  // Close on Escape
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      style={{
        position: "fixed", inset: 0, zIndex: 999,
        background: "rgba(0,0,0,0.82)", backdropFilter: "blur(14px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "16px", animation: "fadeOverlay 0.2s ease",
      }}
    >
      <div style={{
        background: "#0C0E13", border: `1px solid ${service.color}28`,
        borderRadius: 20, width: "100%", maxWidth: 500,
        maxHeight: "92vh", overflowY: "auto",
        boxShadow: `0 40px 80px rgba(0,0,0,0.7), 0 0 0 1px ${service.color}12`,
        animation: "modalSlide 0.3s cubic-bezier(0.16,1,0.3,1)",
      }}>

        {/* Header */}
        <div style={{ padding: "22px 22px 18px", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 8, color: service.color, letterSpacing: 2, marginBottom: 6 }}>BOOK A SERVICE</div>
            <h2 style={{ fontSize: isMobile ? 17 : 20, fontWeight: 800, lineHeight: 1.2 }}>{service.title}</h2>
          </div>
          <button onClick={onClose} style={{
            background: "rgba(255,255,255,0.06)", border: "none", color: "rgba(255,255,255,0.45)",
            width: 30, height: 30, borderRadius: "50%", cursor: "pointer", fontSize: 14,
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            transition: "background 0.2s",
          }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.12)"}
            onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.06)"}
          >✕</button>
        </div>

        <div style={{ padding: "20px 22px 24px" }}>
          {status === "success" ? (
            /* ── Success state */
            <div style={{ textAlign: "center", padding: "28px 0" }}>
              <div style={{ width: 56, height: 56, borderRadius: "50%", background: `${service.color}18`, border: `2px solid ${service.color}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 18px", fontSize: 22, color: service.color }}>✓</div>
              <h3 style={{ fontSize: 18, fontWeight: 800, color: service.color, marginBottom: 8 }}>Request Sent!</h3>
              <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 13, lineHeight: 1.7, marginBottom: 24 }}>
                I'll review your request and get back to you within 24 hours.
              </p>
              <button onClick={onClose} style={{ background: service.color, color: "#07090E", border: "none", padding: "11px 28px", borderRadius: 8, fontFamily: "'Space Mono',monospace", fontSize: 9, fontWeight: 700, letterSpacing: 1.5, cursor: "pointer" }}>
                CLOSE
              </button>
            </div>
          ) : (
            /* ── Form */
            <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 11 }}>

              {status === "error" && (
                <div style={{ background: "rgba(255,80,80,0.07)", border: "1px solid rgba(255,80,80,0.28)", color: "#FF6B6B", padding: "10px 14px", borderRadius: 7, fontFamily: "'Space Mono',monospace", fontSize: 9 }}>
                  ✗ Something went wrong. Please try again.
                </div>
              )}

              <input placeholder="Your Name" required value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                style={MI} onFocus={e => e.target.style.borderColor = service.color} onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"} />

              <input type="email" placeholder="Your Email" required value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                style={MI} onFocus={e => e.target.style.borderColor = service.color} onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"} />

              <input placeholder="Budget (e.g. $500, open to discuss…)" value={form.budget}
                onChange={e => setForm({ ...form, budget: e.target.value })}
                style={MI} onFocus={e => e.target.style.borderColor = service.color} onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"} />

              <textarea placeholder="Describe your project — what you need, your goals, timeline…" required rows={4}
                value={form.details} onChange={e => setForm({ ...form, details: e.target.value })}
                style={{ ...MI, resize: "vertical" }}
                onFocus={e => e.target.style.borderColor = service.color} onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"} />

              <button type="submit" disabled={status === "sending"} style={{
                background: service.color, color: "#07090E", border: "none",
                padding: "14px", borderRadius: 8, fontFamily: "'Space Mono',monospace",
                fontSize: 10, fontWeight: 700, letterSpacing: 2, cursor: status === "sending" ? "not-allowed" : "pointer",
                opacity: status === "sending" ? 0.6 : 1, width: "100%",
                boxShadow: `0 4px 24px ${service.color}28`,
              }}>
                {status === "sending" ? "SENDING…" : "SEND REQUEST →"}
              </button>

              <p style={{ fontFamily: "'Space Mono',monospace", fontSize: 7, color: "rgba(255,255,255,0.18)", textAlign: "center", letterSpacing: 1 }}>
                No commitment · I respond within 24 hours
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

// Modal input style token
const MI = {
  background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: 7, padding: "12px 14px", color: "#fff",
  fontFamily: "'Syne',sans-serif", fontSize: 13.5, outline: "none",
  transition: "border-color 0.2s", width: "100%",
};

/* ══════════════════════════════════════════
   MAIN
══════════════════════════════════════════ */
export default function Portfolio() {
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(typeof window !== "undefined" ? window.innerWidth < 768 : false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const mousePosRef = useRef({ x: 0, y: 0 });
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [formState, setFormState] = useState("idle");
  const [tab, setTab] = useState("featured");
  const [booking, setBooking] = useState(null); // service being booked

  useEffect(() => {
    const onR = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onR);
    return () => window.removeEventListener("resize", onR);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    const onM = (e) => { mousePosRef.current = { x: e.clientX, y: e.clientY }; setMousePos({ x: e.clientX, y: e.clientY }); };
    window.addEventListener("mousemove", onM);
    return () => window.removeEventListener("mousemove", onM);
  }, [isMobile]);

  useEffect(() => {
    const navH = 60;
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter(e => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) setActive(visible[0].target.id);
      },
      { rootMargin: `-${navH}px 0px -40% 0px`, threshold: 0 }
    );
    const t = setTimeout(() => {
      SECTIONS.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
    }, 100);
    return () => { clearTimeout(t); obs.disconnect(); };
  }, []);

  // Lock body scroll when modal open
  useEffect(() => {
    document.body.style.overflow = booking ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [booking]);

  const go = (id) => {
    setActive(id);
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (!el) return;
    const top = id === "home" ? 0 : el.getBoundingClientRect().top + window.scrollY - 60;
    window.scrollTo({ top, behavior: "smooth" });
  };

  const submit = async (e) => {
    e.preventDefault();
    setFormState("sending");
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) { setFormState("success"); setForm({ name: "", email: "", message: "" }); setTimeout(() => setFormState("idle"), 5000); }
      else { setFormState("error"); setTimeout(() => setFormState("idle"), 4000); }
    } catch { setFormState("error"); setTimeout(() => setFormState("idle"), 4000); }
  };

  return (
    <div style={R.root}>
      {!isMobile && <div style={{ ...R.glow, left: mousePos.x - 260, top: mousePos.y - 260 }} />}
      <div style={R.gridBg} />

      {/* Booking modal */}
      {booking && <BookingModal service={booking} onClose={() => setBooking(null)} isMobile={isMobile} />}

      {/* ── NAV ── */}
      <nav style={R.nav}>
        <span style={R.logo} onClick={() => go("home")}>SF<span style={{ color: "#00FFB2" }}>/</span></span>
        {!isMobile && (
          <div style={{ display: "flex", gap: 22 }}>
            {SECTIONS.map(s => (
              <button key={s} onClick={() => go(s)} style={{
                background: "none", border: "none", cursor: "pointer",
                fontFamily: "'Space Mono',monospace", fontSize: 9, letterSpacing: 2.5,
                color: active === s ? "#00FFB2" : "rgba(255,255,255,0.4)",
                borderBottom: active === s ? "1px solid #00FFB2" : "1px solid transparent",
                paddingBottom: 2, transition: "color 0.2s",
              }}>{s.toUpperCase()}</button>
            ))}
          </div>
        )}
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          {!isMobile && <button style={R.hireCta} onClick={() => go("contact")}>HIRE ME</button>}
          <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", gap: 5, padding: 4 }}>
            {[0,1,2].map(i => (
              <span key={i} style={{
                width: 22, height: 2, background: "#00FFB2", borderRadius: 2, display: "block", transition: "all 0.3s",
                transform: menuOpen ? (i===0 ? "rotate(45deg) translate(5px,5px)" : i===2 ? "rotate(-45deg) translate(5px,-5px)" : "none") : "none",
                opacity: menuOpen && i===1 ? 0 : 1,
              }} />
            ))}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div style={R.mobileMenu}>
          {SECTIONS.map((s, idx) => (
            <button key={s} onClick={() => go(s)} style={{ ...R.mobileLink, color: active === s ? "#00FFB2" : "rgba(255,255,255,0.6)" }}>
              <span style={{ color: "#00FFB2", opacity: 0.6, marginRight: 8 }}>0{idx+1}.</span>{s.toUpperCase()}
            </button>
          ))}
          <button style={{ ...R.hireCta, alignSelf: "flex-start", marginTop: 16 }} onClick={() => go("contact")}>HIRE ME</button>
        </div>
      )}

      {/* ── HERO ── */}
      <section id="home" style={{ minHeight: "100vh", position: "relative", display: "flex", alignItems: "center", overflow: "hidden" }}>
        <HeroCanvas mousePosRef={mousePosRef} isMobile={isMobile} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "35%", background: "linear-gradient(to top, #07090E, transparent)", zIndex: 1, pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "20%", background: "linear-gradient(to bottom, #07090E, transparent)", zIndex: 1, pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 2, padding: isMobile ? "100px 20px 80px" : "120px 48px 80px", maxWidth: 800, margin: "0 auto", width: "100%" }}>
          <div style={{ ...R.badge, animation: "badgePop 0.6s cubic-bezier(0.16,1,0.3,1) 0.2s both" }}>
            <span style={R.pulse} /> AVAILABLE FOR WORK · 2026
          </div>
          <h1 style={{ ...R.heroH1, animation: "slideUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.35s both" }}>
            <span style={{ color: "#fff" }}>Salmanul</span><br />
            <span style={{ background: "linear-gradient(120deg,#00FFB2,#00A8FF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Faris CK</span>
          </h1>
          <p style={{ fontFamily: "'Space Mono',monospace", fontSize: isMobile ? 9 : 10, color: "rgba(255,255,255,0.3)", letterSpacing: 2, marginBottom: 14, animation: "slideUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.5s both" }}>
            FULL STACK DEVELOPER · MERN · SHOPIFY · SAAS
          </p>
          <p style={{ fontSize: isMobile ? 14 : 15, color: "rgba(255,255,255,0.5)", lineHeight: 1.9, marginBottom: 36, maxWidth: 480, animation: "slideUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.6s both" }}>
            Building high-performance web apps for the future.<br />From Calicut to the cloud.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", animation: "slideUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.75s both" }}>
            <button style={R.btnG} onClick={() => go("contact")}>CONNECT →</button>
            <button style={{ ...R.btnG, background: "transparent", color: "#00FFB2", border: "1px solid #00FFB2" }} onClick={() => go("services")}>SERVICES ↓</button>
            <a href={CV_URL} target="_blank" rel="noopener noreferrer" style={R.btnO}>RESUME ↓</a>
          </div>
        </div>
        <div style={R.scrollHint} onClick={() => go("about")}>
          <div style={{ width: 1, height: 44, background: "linear-gradient(to bottom, #00FFB2, transparent)" }} />
          <span style={{ fontFamily: "'Space Mono',monospace", fontSize: 7, letterSpacing: 3, color: "rgba(255,255,255,0.2)" }}>SCROLL</span>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" style={R.sec}>
        <div style={R.inner}>
          <Reveal direction="up"><div style={R.lbl}>// 01. ABOUT</div></Reveal>
          <Reveal direction="up" delay={80}><h2 style={R.h2}>Who I Am</h2></Reveal>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 36 : 48 }}>
            <div>
              <Reveal direction="up" delay={120}>
                <p style={R.p}>I'm a passionate Full Stack Developer specializing in the MERN stack. I work with React.js, Node.js, Next.js, Remix, and Svelte — building fast, modern, highly optimized web applications.</p>
              </Reveal>
              <Reveal direction="up" delay={180}>
                <p style={R.p}>With 40+ projects, professional SaaS exposure at Helixo (managing apps with 36,000+ active users), and real freelance client work, I bring technical depth and product mindset to every project.</p>
              </Reveal>
              <Reveal direction="up" delay={240}>
                <div style={{ display: "flex", gap: isMobile ? 28 : 40, marginTop: 32, flexWrap: "wrap" }}>
                  {[["40", "+", "Projects"], ["1", "yr+", "Experience"]].map(([n, s, l]) => (
                    <div key={l} style={{ textAlign: "center" }}>
                      <div style={{ fontSize: isMobile ? 34 : 40, fontWeight: 800, color: "#00FFB2", letterSpacing: -2, lineHeight: 1 }}>
                        <Counter target={n} suffix={s} />
                      </div>
                      <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 9, color: "rgba(255,255,255,0.35)", letterSpacing: 2, marginTop: 5 }}>{l}</div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
            <Reveal direction={isMobile ? "up" : "right"} delay={100}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 7, alignContent: "start" }}>
                {techStack.map((t, i) => (
                  <div key={t.name} style={{
                    border: `1px solid ${t.color}44`, borderRadius: 100, padding: "5px 13px",
                    fontSize: 10, fontFamily: "'Space Mono',monospace", color: t.color,
                    display: "flex", alignItems: "center", gap: 6,
                    animation: `chipPop 0.5s cubic-bezier(0.16,1,0.3,1) ${i * 40}ms both`, opacity: 0,
                  }}>
                    <span style={{ width: 5, height: 5, borderRadius: "50%", background: t.color, display: "block", boxShadow: `0 0 6px ${t.color}` }} />
                    {t.name}
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── EXPERIENCE ── */}
      <section id="experience" style={{ ...R.sec, background: "rgba(0,255,178,0.012)" }}>
        <div style={R.inner}>
          <Reveal><div style={R.lbl}>// 02. EXPERIENCE</div></Reveal>
          <Reveal delay={80}><h2 style={R.h2}>Timeline</h2></Reveal>
          {experiences.map((exp, i) => (
            <Reveal key={i} delay={i * 120} direction="up">
              <div style={{ display: "flex", gap: 16, marginBottom: 0 }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 16, flexShrink: 0 }}>
                  <div style={{ width: 11, height: 11, borderRadius: "50%", background: "#00FFB2", marginTop: 10, flexShrink: 0, boxShadow: "0 0 12px #00FFB2, 0 0 24px rgba(0,255,178,0.3)" }} />
                  {i < experiences.length - 1 && <div style={{ flex: 1, width: 1, background: "linear-gradient(to bottom, rgba(0,255,178,0.4), rgba(0,255,178,0.05))", margin: "3px 0", minHeight: 40 }} />}
                </div>
                <TiltCard color="#00FFB2" isMobile={isMobile} style={{ borderRadius: 14, padding: isMobile ? "16px 18px" : "18px 22px", marginBottom: 20, flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8, marginBottom: 10 }}>
                    <div>
                      <p style={{ fontWeight: 700, fontSize: isMobile ? 14 : 15 }}>{exp.company}</p>
                      <p style={{ fontFamily: "'Space Mono',monospace", fontSize: 9, color: "#00FFB2", letterSpacing: 1, marginTop: 2 }}>{exp.role} · {exp.location}</p>
                    </div>
                    <span style={{ fontFamily: "'Space Mono',monospace", fontSize: 8, color: "rgba(255,255,255,0.25)", whiteSpace: "nowrap" }}>{exp.period}</span>
                  </div>
                  <p style={{ color: "rgba(255,255,255,0.45)", fontSize: isMobile ? 12 : 12.5, lineHeight: 1.85 }}>{exp.desc}</p>
                </TiltCard>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" style={R.sec}>
        <div style={R.inner}>
          <Reveal><div style={R.lbl}>// 03. PROJECTS</div></Reveal>
          <Reveal delay={80}><h2 style={R.h2}>Selected Work</h2></Reveal>
          <Reveal delay={120}>
            <div style={{ display: "flex", gap: 3, marginBottom: 32, background: "rgba(255,255,255,0.03)", borderRadius: 8, padding: 3, width: "fit-content" }}>
              {[["featured","Featured"],["mini","Mini Projects"]].map(([k,l]) => (
                <button key={k} onClick={() => setTab(k)} style={{
                  background: tab===k ? "#00FFB2" : "transparent",
                  color: tab===k ? "#07090E" : "rgba(255,255,255,0.45)",
                  border: "none", padding: isMobile ? "8px 14px" : "7px 18px", borderRadius: 6,
                  fontFamily: "'Space Mono',monospace", fontSize: isMobile ? 8 : 9, letterSpacing: 2,
                  cursor: "pointer", fontWeight: 700, transition: "all 0.2s",
                }}>{l}</button>
              ))}
            </div>
          </Reveal>

          {tab === "featured" && (
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3,1fr)", gap: isMobile ? 14 : 18 }}>
              {FEATURED.map((p, i) => (
                <Reveal key={i} delay={i * 100} direction="up">
                  <TiltCard color={p.color} isMobile={isMobile} style={{ borderRadius: 16, padding: isMobile ? "20px" : "26px", height: "100%" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
                      <span style={{ fontFamily: "'Space Mono',monospace", fontSize: 8, color: p.color, border: `1px solid ${p.color}44`, padding: "3px 10px", borderRadius: 100, letterSpacing: 2 }}>{p.tag}</span>
                      <div style={{ display: "flex", gap: 10 }}>
                        {p.github !== "#" && <a href={p.github} target="_blank" rel="noopener noreferrer" style={{ color: "rgba(255,255,255,0.35)", fontSize: 12, textDecoration: "none", fontFamily: "monospace" }}>GH</a>}
                        {p.site !== "#" && <a href={p.site} target="_blank" rel="noopener noreferrer" style={{ color: "rgba(255,255,255,0.35)", fontSize: 16, textDecoration: "none" }}>↗</a>}
                      </div>
                    </div>
                    <div style={{ width: 36, height: 3, background: p.color, borderRadius: 2, marginBottom: 12, boxShadow: `0 0 10px ${p.color}` }} />
                    <h3 style={{ fontSize: isMobile ? 18 : 21, fontWeight: 800, color: p.color, letterSpacing: -0.5, marginBottom: 8 }}>{p.name}</h3>
                    <p style={{ color: "rgba(255,255,255,0.42)", fontSize: isMobile ? 12 : 12.5, lineHeight: 1.75, marginBottom: 14 }}>{p.desc}</p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                      {p.tech.map(t => <span key={t} style={{ fontFamily: "'Space Mono',monospace", fontSize: 8, color: "rgba(255,255,255,0.3)", border: "1px solid rgba(255,255,255,0.1)", padding: "2px 8px", borderRadius: 100, letterSpacing: 1 }}>{t}</span>)}
                    </div>
                  </TiltCard>
                </Reveal>
              ))}
            </div>
          )}

          {tab === "mini" && (
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(auto-fill,minmax(240px,1fr))", gap: isMobile ? 10 : 14 }}>
              {MINI.map((p, i) => (
                <Reveal key={i} delay={i * 60} direction="up">
                  <TiltCard color={p.color} isMobile={isMobile} style={{ borderRadius: 13, padding: isMobile ? "14px 14px" : "18px 20px", height: "100%" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                      <span style={{ width: 8, height: 8, borderRadius: "50%", background: p.color, display: "block", boxShadow: `0 0 8px ${p.color}` }} />
                      <div style={{ display: "flex", gap: 8 }}>
                        <a href={p.github} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'Space Mono',monospace", fontSize: 7, color: "rgba(255,255,255,0.3)", textDecoration: "none" }}>GH↗</a>
                        <a href={p.site} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'Space Mono',monospace", fontSize: 7, color: "rgba(255,255,255,0.3)", textDecoration: "none" }}>LIVE↗</a>
                      </div>
                    </div>
                    <h3 style={{ fontSize: isMobile ? 12 : 14, fontWeight: 700, marginBottom: 5, lineHeight: 1.3 }}>{p.name}</h3>
                    <p style={{ color: "rgba(255,255,255,0.35)", fontSize: isMobile ? 10 : 11, lineHeight: 1.6, marginBottom: 8 }}>{p.desc}</p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
                      {p.tech.map(t => <span key={t} style={{ fontFamily: "'Space Mono',monospace", fontSize: 6, color: p.color, border: `1px solid ${p.color}33`, padding: "2px 6px", borderRadius: 100 }}>{t}</span>)}
                    </div>
                  </TiltCard>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          ── SERVICES ──
      ══════════════════════════════════════════ */}
      <section id="services" style={{ ...R.sec, background: "rgba(0,255,178,0.012)" }}>
        <div style={R.inner}>
          <Reveal><div style={R.lbl}>// 04. SERVICES</div></Reveal>
          <Reveal delay={60}>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: 12, marginBottom: 36 }}>
              <h2 style={{ ...R.h2, marginBottom: 0 }}>Book a Service</h2>
              <p style={{ fontFamily: "'Space Mono',monospace", fontSize: 8, color: "rgba(255,255,255,0.28)", letterSpacing: 1.5, maxWidth: 280, lineHeight: 1.8 }}>
                Pick a service → tell me about your project → I respond within 24h.
              </p>
            </div>
          </Reveal>

          {/* Service cards grid */}
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3,1fr)", gap: isMobile ? 12 : 18 }}>
            {SERVICES.map((service, i) => (
              <Reveal key={service.id} delay={i * 70} direction="up">
                <ServiceCard service={service} isMobile={isMobile} onBook={setBooking} />
              </Reveal>
            ))}
          </div>

          {/* How it works strip */}
          <Reveal delay={180}>
            <div style={{ marginTop: 48, padding: isMobile ? "22px 18px" : "26px 30px", background: "rgba(255,255,255,0.018)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14 }}>
              <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 8, color: "#00FFB2", letterSpacing: 2.5, marginBottom: 20 }}>HOW IT WORKS</div>
              <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4,1fr)", gap: isMobile ? 18 : 0 }}>
                {[
                  ["01", "Pick a Service", "Choose what fits your needs above"],
                  ["02", "Fill the Form", "Share your project details & budget"],
                  ["03", "I Respond", "Hear back within 24 hours"],
                  ["04", "We Ship It", "Kick off the project and deliver"],
                ].map(([num, title, desc], idx) => (
                  <div key={num} style={{ padding: isMobile ? 0 : "0 20px", borderLeft: idx > 0 && !isMobile ? "1px solid rgba(255,255,255,0.06)" : "none" }}>
                    <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 20, fontWeight: 700, color: "#00FFB2", opacity: 0.25, lineHeight: 1, marginBottom: 8 }}>{num}</div>
                    <div style={{ fontWeight: 700, fontSize: isMobile ? 12 : 13, marginBottom: 4 }}>{title}</div>
                    <div style={{ fontSize: isMobile ? 10 : 11, color: "rgba(255,255,255,0.35)", lineHeight: 1.6 }}>{desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" style={R.sec}>
        <div style={R.inner}>
          <Reveal><div style={R.lbl}>// 05. CONTACT</div></Reveal>
          <Reveal delay={80}><h2 style={R.h2}>Let's Build</h2></Reveal>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1.5fr", gap: isMobile ? 36 : 60 }}>
            <Reveal direction={isMobile ? "up" : "left"} delay={120}>
              <div>
                <p style={{ fontSize: isMobile ? 15 : 17, fontWeight: 700, lineHeight: 1.65, color: "rgba(255,255,255,0.6)", marginBottom: 28 }}>
                  Open to full-time roles, freelance contracts, and collaborative projects.
                </p>
                {[["LinkedIn","https://www.linkedin.com/in/salmanul-faris-c-k/"],["GitHub","https://github.com/salmanck66"]].map(([l,h]) => (
                  <a key={l} href={h} target="_blank" rel="noopener noreferrer" style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    padding: "13px 0", borderBottom: "1px solid rgba(255,255,255,0.06)",
                    fontFamily: "'Space Mono',monospace", fontSize: 10, letterSpacing: 2,
                    color: "rgba(255,255,255,0.35)", textDecoration: "none", transition: "color 0.2s",
                  }}
                    onMouseEnter={e => e.currentTarget.style.color = "#00FFB2"}
                    onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.35)"}
                  >{l} <span>↗</span></a>
                ))}
                <div style={{ marginTop: 24, padding: "14px 16px", background: "rgba(0,255,178,0.04)", border: "1px solid rgba(0,255,178,0.12)", borderRadius: 8 }}>
                  <p style={{ fontFamily: "'Space Mono',monospace", fontSize: 8, color: "#00FFB2", letterSpacing: 1, marginBottom: 4 }}>INBOX POWERED BY FORMSPREE</p>
                  <p style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", lineHeight: 1.6 }}>Messages go directly to your email. No server needed.</p>
                </div>
              </div>
            </Reveal>
            <Reveal direction={isMobile ? "up" : "right"} delay={160}>
              <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 11 }}>
                {formState === "success" && (
                  <div style={{ background: "rgba(0,255,178,0.07)", border: "1px solid rgba(0,255,178,0.3)", color: "#00FFB2", padding: "12px 15px", borderRadius: 7, fontFamily: "'Space Mono',monospace", fontSize: 11 }}>
                    ✓ Message sent! I'll get back to you soon.
                  </div>
                )}
                {formState === "error" && (
                  <div style={{ background: "rgba(255,80,80,0.07)", border: "1px solid rgba(255,80,80,0.3)", color: "#FF6B6B", padding: "12px 15px", borderRadius: 7, fontFamily: "'Space Mono',monospace", fontSize: 11 }}>
                    ✗ Something went wrong. Try again.
                  </div>
                )}
                {["name","email"].map(f => (
                  <input key={f} type={f==="email"?"email":"text"} placeholder={f==="name"?"Your Name":"Your Email"} required
                    value={form[f]} onChange={e => setForm({...form,[f]:e.target.value})}
                    style={R.inp}
                    onFocus={e => e.target.style.borderColor = "#00FFB2"}
                    onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
                  />
                ))}
                <textarea placeholder="Your Message" required rows={4} value={form.message} onChange={e => setForm({...form,message:e.target.value})}
                  style={{ ...R.inp, resize: "vertical" }}
                  onFocus={e => e.target.style.borderColor = "#00FFB2"}
                  onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
                />
                <button type="submit" disabled={formState === "sending"} style={{
                  ...R.btnG, opacity: formState === "sending" ? 0.6 : 1,
                  cursor: formState === "sending" ? "not-allowed" : "pointer",
                  width: "100%", textAlign: "center", padding: "15px 26px",
                }}>
                  {formState === "sending" ? "SENDING..." : "SEND MESSAGE →"}
                </button>
              </form>
            </Reveal>
          </div>
        </div>
      </section>

      <footer style={{ position: "relative", zIndex: 1, textAlign: "center", padding: "26px 24px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <Reveal>
          <p style={{ fontFamily: "'Space Mono',monospace", fontSize: 9, color: "rgba(255,255,255,0.18)", letterSpacing: 2 }}>
            © 2025 SALMANUL FARIS CK · CALICUT, KERALA · REACT + THREE.JS
          </p>
        </Reveal>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Syne:wght@400;600;700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #07090E; overflow-x: hidden; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-thumb { background: #00FFB2; border-radius: 2px; }
        input, textarea, button { font-family: 'Syne', sans-serif; }
        input::placeholder, textarea::placeholder { color: rgba(255,255,255,0.18); }

        @keyframes pulseGlow {
          0%,100% { box-shadow: 0 0 6px #00FFB2; opacity: 1; }
          50% { box-shadow: 0 0 18px #00FFB2, 0 0 36px rgba(0,255,178,0.3); opacity: 0.6; }
        }
        @keyframes scrollBounce {
          0%,100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(10px); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(32px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes badgePop {
          from { opacity: 0; transform: scale(0.85) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes chipPop {
          from { opacity: 0; transform: scale(0.7) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes expandDown {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeOverlay {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes modalSlide {
          from { opacity: 0; transform: scale(0.94) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }

        * { -webkit-tap-highlight-color: rgba(0,255,178,0.1); }
        button:active, a:active { opacity: 0.75; transform: scale(0.97); transition: transform 0.1s, opacity 0.1s; }
        @media (max-width: 768px) { section { border-bottom: 1px solid rgba(0,255,178,0.04); } }
      `}</style>
    </div>
  );
}

/* ══════════════════════════════════════════
   STYLE TOKENS
══════════════════════════════════════════ */
const R = {
  root: { fontFamily: "'Syne',sans-serif", background: "#07090E", color: "#fff", minHeight: "100vh", overflowX: "hidden", position: "relative" },
  glow: { position: "fixed", width: 520, height: 520, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,255,178,0.05) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0, transition: "left 0.1s, top 0.1s" },
  gridBg: { position: "fixed", inset: 0, backgroundImage: "linear-gradient(rgba(0,255,178,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,178,0.018) 1px, transparent 1px)", backgroundSize: "60px 60px", pointerEvents: "none", zIndex: 0 },
  nav: { position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "13px 20px", background: "rgba(7,9,14,0.88)", backdropFilter: "blur(24px)", borderBottom: "1px solid rgba(0,255,178,0.07)" },
  logo: { fontFamily: "'Space Mono',monospace", fontSize: 19, fontWeight: 700, color: "#fff", cursor: "pointer", letterSpacing: -1 },
  hireCta: { background: "transparent", border: "1px solid rgba(0,255,178,0.6)", color: "#00FFB2", fontFamily: "'Space Mono',monospace", fontSize: 8, letterSpacing: 2, padding: "7px 15px", borderRadius: 4, cursor: "pointer" },
  mobileMenu: { position: "fixed", top: 57, left: 0, right: 0, zIndex: 99, background: "rgba(7,9,14,0.98)", padding: "20px 24px", display: "flex", flexDirection: "column", gap: 0, borderBottom: "1px solid rgba(0,255,178,0.08)", backdropFilter: "blur(24px)" },
  mobileLink: { background: "none", border: "none", fontFamily: "'Space Mono',monospace", fontSize: 11, letterSpacing: 2, cursor: "pointer", textAlign: "left", padding: "13px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" },
  badge: { fontFamily: "'Space Mono',monospace", fontSize: 8, letterSpacing: 3, color: "#00FFB2", border: "1px solid rgba(0,255,178,0.28)", padding: "6px 15px", borderRadius: 100, display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 24, background: "rgba(0,255,178,0.04)" },
  pulse: { width: 6, height: 6, borderRadius: "50%", background: "#00FFB2", display: "block", animation: "pulseGlow 2s ease-in-out infinite" },
  heroH1: { fontSize: "clamp(44px,11vw,92px)", fontWeight: 800, lineHeight: 1.0, letterSpacing: -3, marginBottom: 16 },
  btnG: { background: "#00FFB2", color: "#07090E", border: "none", padding: "13px 26px", fontFamily: "'Space Mono',monospace", fontSize: 9, fontWeight: 700, letterSpacing: 2, cursor: "pointer", borderRadius: 4, textDecoration: "none", display: "inline-block" },
  btnO: { background: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,0.2)", padding: "13px 26px", fontFamily: "'Space Mono',monospace", fontSize: 9, fontWeight: 700, letterSpacing: 2, cursor: "pointer", borderRadius: 4, textDecoration: "none", display: "inline-block" },
  scrollHint: { position: "absolute", bottom: 24, left: "50%", transform: "translateX(-50%)", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", gap: 6, cursor: "pointer", animation: "scrollBounce 2.2s ease-in-out infinite" },
  sec: { position: "relative", zIndex: 1, padding: "70px 0" },
  inner: { maxWidth: 1200, margin: "0 auto", padding: "0 20px" },
  lbl: { fontFamily: "'Space Mono',monospace", fontSize: 9, color: "#00FFB2", letterSpacing: 2.5, marginBottom: 10 },
  h2: { fontSize: "clamp(26px,6vw,50px)", fontWeight: 800, letterSpacing: -2, marginBottom: 36 },
  p: { color: "rgba(255,255,255,0.52)", lineHeight: 1.85, marginBottom: 16, fontSize: 14 },
  inp: { background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 7, padding: "13px 15px", color: "#fff", fontFamily: "'Syne',sans-serif", fontSize: 14, outline: "none", transition: "border-color 0.2s", width: "100%" },
};