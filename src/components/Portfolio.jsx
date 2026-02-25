import { useState, useEffect, useRef } from "react";
import * as THREE from "three";

/* ══════════════════════════════════════════
   DATA
══════════════════════════════════════════ */
const SECTIONS = ["home", "about", "experience", "projects", "contact"];

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
    desc: "AI-powered trade journal & P/L analyzer. Track every trade, get Claude AI insights on why stocks moved. Google/GitHub auth, MongoDB Atlas, monthly P/L charts.",
    tech: ["Next.js", "MongoDB", "NextAuth", "Claude AI"],
    color: "#00FFB2", site: "#", github: "#",
  },
  {
    name: "Everwood Interiors", tag: "Client Work",
    desc: "Luxury interior design showcase built for a real client. Elegant design, smooth animations, fully responsive — deployed for production use.",
    tech: ["HTML", "CSS", "JavaScript"],
    color: "#FFD166", site: "https://salmanck66.github.io/Everwood-Interiors-/", github: "#",
  },
  {
    name: "jcclub.shop", tag: "Full Stack",
    desc: "Complete e-commerce store on AWS EC2 with Nginx and Cloudflare. Built with Node.js, Express, MongoDB, and HBS — full cart/checkout/admin flow.",
    tech: ["Node.js", "Express", "MongoDB", "AWS"],
    color: "#818CF8", site: "https://www.jcclub.shop", github: "https://github.com/salmanck66/Ecommerce-Project-",
  },
];

const MINI = [
  { name: "Kanban ToDo App", desc: "Drag-and-drop kanban app with progress statuses.", tech: ["React", "TailwindCSS"], color: "#61DAFB", site: "https://kanban-to-do-tasks-drag-and-drop.vercel.app/", github: "https://github.com/salmanck66/Kanban_To_Do_Tasks_Drag_And_Drop" },
  { name: "Seat Reservation", desc: "Minimalist seat reservation UI — extensible architecture.", tech: ["React", "TailwindCSS"], color: "#FFD166", site: "https://seminar-hall-seat-resevation-app.vercel.app/", github: "https://github.com/salmanck66/Seminar-Hall-Seat-Resevation-App" },
  { name: "User Management", desc: "CRUD operations demo with React and Redux Toolkit.", tech: ["React", "Redux"], color: "#764ABC", site: "https://user-details-management-react-redux.vercel.app/", github: "https://github.com/salmanck66/User_Details_Management_React_Redux" },
  { name: "JS Quiz App", desc: "Quiz app with LocalStorage data persistence.", tech: ["React", "LocalStorage"], color: "#F7DF1E", site: "https://javascript-quiz-app-react.vercel.app/", github: "https://github.com/salmanck66/Javascript-Quiz-App-React" },
  { name: "Keyboard Clone", desc: "Interactive keyboard visualizer — see keypresses live.", tech: ["React"], color: "#FF6B6B", site: "https://keyboard-react-one.vercel.app/", github: "https://github.com/salmanck66/Keyboard_React" },
  { name: "Post Scheduler", desc: "Schedule posts by date/time or publish instantly.", tech: ["React"], color: "#00A8FF", site: "https://post-scheduler-lyart.vercel.app/", github: "https://github.com/salmanck66/Post-Scheduler" },
  { name: "StopWatch", desc: "Stylish responsive stopwatch with lap tracking.", tech: ["React", "TailwindCSS"], color: "#00FFB2", site: "https://stop-watch-react-js-six.vercel.app/", github: "https://github.com/salmanck66/StopWatch-ReactJs" },
];

// ─── REPLACE THIS with your real Formspree endpoint ───────────────────────────
// Steps:
// 1. Go to https://formspree.io and sign up free
// 2. Create a new form — it gives you an endpoint like https://formspree.io/f/xyzabcde
// 3. Paste that URL below
const FORMSPREE_URL = "https://formspree.io/f/mpqjkkrq";
// ──────────────────────────────────────────────────────────────────────────────

// Google Drive direct download link
// Converts the share link to a direct download
const CV_URL = "https://drive.google.com/uc?export=download&id=1Z1LANp-jSfdch7fjXpHNEp4i-cVlAenf";

/* ══════════════════════════════════════════
   THREE.JS HERO CANVAS
══════════════════════════════════════════ */
function HeroCanvas({ mousePosRef }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    const w = canvas.clientWidth, h = canvas.clientHeight;
    renderer.setSize(w, h, false);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, w / h, 0.1, 100);
    camera.position.z = 5;

    const count = 2200;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const palettes = [new THREE.Color("#00FFB2"), new THREE.Color("#00A8FF"), new THREE.Color("#818CF8"), new THREE.Color("#ffffff")];
    for (let i = 0; i < count; i++) {
      positions[i*3]   = (Math.random() - 0.5) * 16;
      positions[i*3+1] = (Math.random() - 0.5) * 16;
      positions[i*3+2] = (Math.random() - 0.5) * 12;
      const c = palettes[Math.floor(Math.random() * palettes.length)];
      colors[i*3] = c.r; colors[i*3+1] = c.g; colors[i*3+2] = c.b;
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    pGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    const pMat = new THREE.PointsMaterial({ size: 0.035, vertexColors: true, transparent: true, opacity: 0.65 });
    const points = new THREE.Points(pGeo, pMat);
    scene.add(points);

    const torusGeo = new THREE.TorusKnotGeometry(1.6, 0.28, 100, 16);
    const torusMat = new THREE.MeshBasicMaterial({ color: "#00FFB2", wireframe: true, transparent: true, opacity: 0.09 });
    const torusKnot = new THREE.Mesh(torusGeo, torusMat);
    scene.add(torusKnot);

    const icoGeo = new THREE.IcosahedronGeometry(1.1, 1);
    const icoMat = new THREE.MeshBasicMaterial({ color: "#00A8FF", wireframe: true, transparent: true, opacity: 0.08 });
    const ico = new THREE.Mesh(icoGeo, icoMat);
    scene.add(ico);

    let raf, t = 0;
    const animate = () => {
      raf = requestAnimationFrame(animate);
      t += 0.004;
      points.rotation.y = t * 0.18;
      points.rotation.x = t * 0.04;
      torusKnot.rotation.y = t * 0.35;
      torusKnot.rotation.x = t * 0.2;
      ico.rotation.y = -t * 0.25;
      ico.rotation.z = t * 0.15;

      if (mousePosRef.current) {
        const tx = (mousePosRef.current.x / window.innerWidth - 0.5) * 0.8;
        const ty = -(mousePosRef.current.y / window.innerHeight - 0.5) * 0.8;
        camera.position.x += (tx - camera.position.x) * 0.04;
        camera.position.y += (ty - camera.position.y) * 0.04;
        camera.lookAt(0, 0, 0);
      }
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      const nw = canvas.clientWidth, nh = canvas.clientHeight;
      renderer.setSize(nw, nh, false);
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize); renderer.dispose(); };
  }, []);

  return <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 0 }} />;
}

/* ══════════════════════════════════════════
   3D TILT CARD
══════════════════════════════════════════ */
function TiltCard({ children, style, color = "#00FFB2" }) {
  const ref = useRef(null);
  const [state, setState] = useState({ rx: 0, ry: 0, gx: 50, gy: 50, hovered: false });

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    const cx = e.clientX - r.left, cy = e.clientY - r.top;
    setState({ rx: ((cy / r.height) - 0.5) * -16, ry: ((cx / r.width) - 0.5) * 16, gx: (cx / r.width) * 100, gy: (cy / r.height) * 100, hovered: true });
  };
  const onLeave = () => setState({ rx: 0, ry: 0, gx: 50, gy: 50, hovered: false });

  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} style={{
      ...style,
      transform: `perspective(900px) rotateX(${state.rx}deg) rotateY(${state.ry}deg) scale(${state.hovered ? 1.025 : 1})`,
      transition: state.hovered ? "transform 0.08s linear" : "transform 0.5s cubic-bezier(.2,.8,.3,1)",
      border: `1px solid ${state.hovered ? color + "55" : "rgba(255,255,255,0.07)"}`,
      boxShadow: state.hovered ? `0 24px 60px ${color}15, 0 0 0 1px ${color}10` : "none",
      background: state.hovered
        ? `radial-gradient(circle at ${state.gx}% ${state.gy}%, ${color}0D 0%, rgba(255,255,255,0.018) 60%)`
        : "rgba(255,255,255,0.02)",
      position: "relative",
      overflow: "hidden",
      willChange: "transform",
    }}>
      {state.hovered && (
        <div style={{
          position: "absolute", width: 200, height: 200, borderRadius: "50%",
          background: `radial-gradient(circle, ${color}1A, transparent 70%)`,
          left: `calc(${state.gx}% - 100px)`, top: `calc(${state.gy}% - 100px)`,
          pointerEvents: "none", transition: "left 0.06s linear, top 0.06s linear", zIndex: 0,
        }} />
      )}
      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
    </div>
  );
}

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
  const [formState, setFormState] = useState("idle"); // idle | sending | success | error
  const [tab, setTab] = useState("featured");

  // ── Resize
  useEffect(() => {
    const onR = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onR);
    return () => window.removeEventListener("resize", onR);
  }, []);

  // ── Mouse
  useEffect(() => {
    const onM = (e) => { mousePosRef.current = { x: e.clientX, y: e.clientY }; setMousePos({ x: e.clientX, y: e.clientY }); };
    window.addEventListener("mousemove", onM);
    return () => window.removeEventListener("mousemove", onM);
  }, []);

  // ── Nav active section — FIX: use rootMargin so sections register correctly
  // The trick: a negative top margin equal to the nav height means a section
  // is only "active" when it's actually visible below the fixed navbar.
  useEffect(() => {
    // We use a sentinel div approach + rootMargin to handle the fixed nav offset
    const navH = 60;
    const obs = new IntersectionObserver(
      (entries) => {
        // Find the topmost intersecting section
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) setActive(visible[0].target.id);
      },
      {
        // Top offset = nav height, so sections count as visible only when below nav
        rootMargin: `-${navH}px 0px -40% 0px`,
        threshold: 0,
      }
    );
    // Small delay so DOM is fully painted
    const t = setTimeout(() => {
      SECTIONS.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    }, 100);
    return () => { clearTimeout(t); obs.disconnect(); };
  }, []);

  // ── Smooth scroll — also manually set active on click so it's instant
  const go = (id) => {
    setActive(id);
    setMenuOpen(false);
    // Offset for fixed nav
    const el = document.getElementById(id);
    if (!el) return;
    const navH = 60;
    const top = id === "home" ? 0 : el.getBoundingClientRect().top + window.scrollY - navH;
    window.scrollTo({ top, behavior: "smooth" });
  };

  // ── Contact form via Formspree
  const submit = async (e) => {
    e.preventDefault();
    setFormState("sending");
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email, message: form.message }),
      });
      if (res.ok) {
        setFormState("success");
        setForm({ name: "", email: "", message: "" });
        setTimeout(() => setFormState("idle"), 5000);
      } else {
        setFormState("error");
        setTimeout(() => setFormState("idle"), 4000);
      }
    } catch {
      setFormState("error");
      setTimeout(() => setFormState("idle"), 4000);
    }
  };

  return (
    <div style={R.root}>
      <div style={{ ...R.glow, left: mousePos.x - 260, top: mousePos.y - 260 }} />
      <div style={R.gridBg} />

      {/* ── NAV ── */}
      <nav style={R.nav}>
        <span style={R.logo} onClick={() => go("home")}>SF<span style={{ color: "#00FFB2" }}>/</span></span>
        {!isMobile && (
          <div style={{ display: "flex", gap: 28 }}>
            {SECTIONS.map((s) => (
              <button key={s} onClick={() => go(s)} style={{
                background: "none", border: "none", cursor: "pointer",
                fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: 2.5,
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
            <button key={s} onClick={() => go(s)} style={{
              ...R.mobileLink,
              color: active === s ? "#00FFB2" : "rgba(255,255,255,0.55)",
            }}>
              <span style={{ color: "#00FFB2", opacity: 0.7 }}>0{idx+1}. </span>{s.toUpperCase()}
            </button>
          ))}
          <button style={{ ...R.hireCta, alignSelf: "flex-start", marginTop: 12 }} onClick={() => go("contact")}>HIRE ME</button>
        </div>
      )}

      {/* ── HERO ── */}
      <section id="home" style={{ minHeight: "100vh", position: "relative", display: "flex", alignItems: "center", overflow: "hidden" }}>
        <HeroCanvas mousePosRef={mousePosRef} />
        <div style={{ position: "relative", zIndex: 2, padding: isMobile ? "110px 20px 80px" : "120px 48px 80px", maxWidth: 800, margin: "0 auto", width: "100%" }}>
          <div style={R.badge}><span style={R.pulse} /> AVAILABLE FOR WORK · 2025</div>
          <h1 style={R.heroH1}>
            <span style={{ color: "#fff" }}>Salmanul</span><br />
            <span style={{ background: "linear-gradient(120deg,#00FFB2,#00A8FF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Faris CK</span>
          </h1>
          <p style={{ fontFamily: "'Space Mono',monospace", fontSize: 10, color: "rgba(255,255,255,0.3)", letterSpacing: 2.5, marginBottom: 14 }}>
            FULL STACK DEVELOPER · MERN · SHOPIFY · SAAS
          </p>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.48)", lineHeight: 1.9, marginBottom: 36, maxWidth: 480 }}>
            Building high-performance web apps for the future.<br />From Calicut to the cloud.
          </p>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <button style={R.btnG} onClick={() => go("contact")}>CONNECT →</button>
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
          <div style={R.lbl}>// 01. ABOUT</div>
          <h2 style={R.h2}>Who I Am</h2>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 48 }}>
            <div>
              <p style={R.p}>I'm a passionate Full Stack Developer specializing in the MERN stack. I work with React.js, Node.js, Next.js, Remix, and Svelte — building fast, modern, highly optimized web applications.</p>
              <p style={R.p}>With 40+ projects, professional SaaS exposure at Helixo (managing apps with 36,000+ active users), and real freelance client work, I bring technical depth and product mindset to every project.</p>
              <div style={{ display: "flex", gap: 40, marginTop: 32, flexWrap: "wrap" }}>
                {[["40+","Projects"],["1yr+","Experience"]].map(([n,l]) => (
                  <div key={l}>
                    <div style={{ fontSize: 40, fontWeight: 800, color: "#00FFB2", letterSpacing: -2, lineHeight: 1 }}>{n}</div>
                    <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 9, color: "rgba(255,255,255,0.35)", letterSpacing: 2, marginTop: 5 }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 7, alignContent: "start" }}>
              {techStack.map((t) => (
                <div key={t.name} style={{ border: `1px solid ${t.color}44`, borderRadius: 100, padding: "5px 13px", fontSize: 10, fontFamily: "'Space Mono',monospace", color: t.color, display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ width: 5, height: 5, borderRadius: "50%", background: t.color, display: "block", boxShadow: `0 0 5px ${t.color}` }} />
                  {t.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── EXPERIENCE ── */}
      <section id="experience" style={{ ...R.sec, background: "rgba(0,255,178,0.012)" }}>
        <div style={R.inner}>
          <div style={R.lbl}>// 02. EXPERIENCE</div>
          <h2 style={R.h2}>Timeline</h2>
          {experiences.map((exp, i) => (
            <div key={i} style={{ display: "flex", gap: 18 }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 18, flexShrink: 0 }}>
                <div style={{ width: 11, height: 11, borderRadius: "50%", background: "#00FFB2", marginTop: 10, flexShrink: 0, boxShadow: "0 0 10px #00FFB2" }} />
                {i < experiences.length - 1 && <div style={{ flex: 1, width: 1, background: "rgba(0,255,178,0.18)", margin: "3px 0", minHeight: 40 }} />}
              </div>
              <TiltCard color="#00FFB2" style={{ borderRadius: 12, padding: "18px 22px", marginBottom: 20, flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8, marginBottom: 10 }}>
                  <div>
                    <p style={{ fontWeight: 700, fontSize: 15 }}>{exp.company}</p>
                    <p style={{ fontFamily: "'Space Mono',monospace", fontSize: 9, color: "#00FFB2", letterSpacing: 1, marginTop: 2 }}>{exp.role} · {exp.location}</p>
                  </div>
                  <span style={{ fontFamily: "'Space Mono',monospace", fontSize: 9, color: "rgba(255,255,255,0.25)", whiteSpace: "nowrap" }}>{exp.period}</span>
                </div>
                <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 12.5, lineHeight: 1.85 }}>{exp.desc}</p>
              </TiltCard>
            </div>
          ))}
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" style={R.sec}>
        <div style={R.inner}>
          <div style={R.lbl}>// 03. PROJECTS</div>
          <h2 style={R.h2}>Selected Work</h2>
          <div style={{ display: "flex", gap: 3, marginBottom: 36, background: "rgba(255,255,255,0.03)", borderRadius: 8, padding: 3, width: "fit-content" }}>
            {[["featured","Featured"],["mini","Mini Projects"]].map(([k,l]) => (
              <button key={k} onClick={() => setTab(k)} style={{
                background: tab===k ? "#00FFB2" : "transparent",
                color: tab===k ? "#07090E" : "rgba(255,255,255,0.45)",
                border: "none", padding: "7px 18px", borderRadius: 6,
                fontFamily: "'Space Mono',monospace", fontSize: 9, letterSpacing: 2,
                cursor: "pointer", fontWeight: 700, transition: "all 0.2s",
              }}>{l}</button>
            ))}
          </div>

          {tab === "featured" && (
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3,1fr)", gap: 18 }}>
              {FEATURED.map((p, i) => (
                <TiltCard key={i} color={p.color} style={{ borderRadius: 16, padding: 26 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
                    <span style={{ fontFamily: "'Space Mono',monospace", fontSize: 8, color: p.color, border: `1px solid ${p.color}44`, padding: "3px 10px", borderRadius: 100, letterSpacing: 2 }}>{p.tag}</span>
                    <div style={{ display: "flex", gap: 10 }}>
                      {p.github !== "#" && <a href={p.github} target="_blank" rel="noopener noreferrer" title="GitHub" style={{ color: "rgba(255,255,255,0.3)", fontSize: 13, textDecoration: "none", fontFamily: "monospace" }}>GH</a>}
                      {p.site !== "#" && <a href={p.site} target="_blank" rel="noopener noreferrer" style={{ color: "rgba(255,255,255,0.3)", fontSize: 16, textDecoration: "none" }}>↗</a>}
                    </div>
                  </div>
                  <h3 style={{ fontSize: 21, fontWeight: 800, color: p.color, letterSpacing: -0.5, marginBottom: 8 }}>{p.name}</h3>
                  <p style={{ color: "rgba(255,255,255,0.42)", fontSize: 12.5, lineHeight: 1.75, marginBottom: 14 }}>{p.desc}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                    {p.tech.map((t) => <span key={t} style={{ fontFamily: "'Space Mono',monospace", fontSize: 8, color: "rgba(255,255,255,0.3)", border: "1px solid rgba(255,255,255,0.1)", padding: "2px 8px", borderRadius: 100, letterSpacing: 1 }}>{t}</span>)}
                  </div>
                </TiltCard>
              ))}
            </div>
          )}

          {tab === "mini" && (
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fill,minmax(250px,1fr))", gap: 14 }}>
              {MINI.map((p, i) => (
                <TiltCard key={i} color={p.color} style={{ borderRadius: 13, padding: "18px 20px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                    <span style={{ width: 8, height: 8, borderRadius: "50%", background: p.color, display: "block", boxShadow: `0 0 8px ${p.color}` }} />
                    <div style={{ display: "flex", gap: 10 }}>
                      <a href={p.github} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'Space Mono',monospace", fontSize: 8, color: "rgba(255,255,255,0.3)", textDecoration: "none", letterSpacing: 1 }}>GH ↗</a>
                      <a href={p.site} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'Space Mono',monospace", fontSize: 8, color: "rgba(255,255,255,0.3)", textDecoration: "none", letterSpacing: 1 }}>LIVE ↗</a>
                    </div>
                  </div>
                  <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 6 }}>{p.name}</h3>
                  <p style={{ color: "rgba(255,255,255,0.38)", fontSize: 12, lineHeight: 1.7, marginBottom: 10 }}>{p.desc}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                    {p.tech.map((t) => <span key={t} style={{ fontFamily: "'Space Mono',monospace", fontSize: 7, color: p.color, border: `1px solid ${p.color}33`, padding: "2px 7px", borderRadius: 100, letterSpacing: 1 }}>{t}</span>)}
                  </div>
                </TiltCard>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" style={{ ...R.sec, background: "rgba(0,255,178,0.012)" }}>
        <div style={R.inner}>
          <div style={R.lbl}>// 04. CONTACT</div>
          <h2 style={R.h2}>Let's Build</h2>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1.5fr", gap: 60 }}>
            <div>
              <p style={{ fontSize: 17, fontWeight: 700, lineHeight: 1.65, color: "rgba(255,255,255,0.6)", marginBottom: 36 }}>
                Open to full-time roles, freelance contracts, and collaborative projects.
              </p>
              {[["LinkedIn","https://www.linkedin.com/in/salmanul-faris-c-k/"],["GitHub","https://github.com/salmanck66"]].map(([l,h]) => (
                <a key={l} href={h} target="_blank" rel="noopener noreferrer"
                  style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "13px 0", borderBottom: "1px solid rgba(255,255,255,0.06)", fontFamily: "'Space Mono',monospace", fontSize: 10, letterSpacing: 2, color: "rgba(255,255,255,0.35)", textDecoration: "none", transition: "color 0.2s" }}
                  onMouseEnter={(e) => e.currentTarget.style.color = "#00FFB2"}
                  onMouseLeave={(e) => e.currentTarget.style.color = "rgba(255,255,255,0.35)"}
                >{l} <span>↗</span></a>
              ))}

              {/* Formspree note */}
              <div style={{ marginTop: 28, padding: "14px 16px", background: "rgba(0,255,178,0.04)", border: "1px solid rgba(0,255,178,0.12)", borderRadius: 8 }}>
                <p style={{ fontFamily: "'Space Mono',monospace", fontSize: 8, color: "#00FFB2", letterSpacing: 1, marginBottom: 4 }}>INBOX POWERED BY</p>
                <p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", lineHeight: 1.6 }}>Messages go directly to your email via Formspree. No server needed.</p>
              </div>
            </div>

            <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 11 }}>
              {/* Status messages */}
              {formState === "success" && (
                <div style={{ background: "rgba(0,255,178,0.07)", border: "1px solid rgba(0,255,178,0.3)", color: "#00FFB2", padding: "12px 15px", borderRadius: 7, fontFamily: "'Space Mono',monospace", fontSize: 11, letterSpacing: 1 }}>
                  ✓ Message sent! I'll get back to you soon.
                </div>
              )}
              {formState === "error" && (
                <div style={{ background: "rgba(255,80,80,0.07)", border: "1px solid rgba(255,80,80,0.3)", color: "#FF6B6B", padding: "12px 15px", borderRadius: 7, fontFamily: "'Space Mono',monospace", fontSize: 11, letterSpacing: 1 }}>
                  ✗ Something went wrong. Please try again or email me directly.
                </div>
              )}

              {["name","email"].map((f) => (
                <input key={f} type={f==="email"?"email":"text"} placeholder={f==="name"?"Your Name":"Your Email"} required
                  value={form[f]} onChange={(e) => setForm({...form,[f]:e.target.value})}
                  style={R.inp}
                  onFocus={(e) => e.target.style.borderColor = "#00FFB2"}
                  onBlur={(e) => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
                />
              ))}
              <textarea placeholder="Your Message" required rows={4} value={form.message} onChange={(e) => setForm({...form,message:e.target.value})} style={{ ...R.inp, resize: "vertical" }}
                onFocus={(e) => e.target.style.borderColor = "#00FFB2"}
                onBlur={(e) => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
              />
              <button type="submit" disabled={formState === "sending"} style={{
                ...R.btnG,
                opacity: formState === "sending" ? 0.6 : 1,
                cursor: formState === "sending" ? "not-allowed" : "pointer",
                width: "100%",
                textAlign: "center",
              }}>
                {formState === "sending" ? "SENDING..." : "SEND MESSAGE →"}
              </button>
            </form>
          </div>
        </div>
      </section>

      <footer style={{ position: "relative", zIndex: 1, textAlign: "center", padding: "26px 24px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <p style={{ fontFamily: "'Space Mono',monospace", fontSize: 9, color: "rgba(255,255,255,0.18)", letterSpacing: 2 }}>© 2025 SALMANUL FARIS CK · CALICUT, KERALA · REACT + THREE.JS</p>
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
        @keyframes pulseGlow { 0%,100%{box-shadow:0 0 6px #00FFB2;opacity:1} 50%{box-shadow:0 0 16px #00FFB2;opacity:0.5} }
        @keyframes scrollBounce { 0%,100%{transform:translateX(-50%) translateY(0)} 50%{transform:translateX(-50%) translateY(8px)} }
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
  gridBg: { position: "fixed", inset: 0, backgroundImage: "linear-gradient(rgba(0,255,178,0.022) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,178,0.022) 1px, transparent 1px)", backgroundSize: "70px 70px", pointerEvents: "none", zIndex: 0 },
  nav: { position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "13px 24px", background: "rgba(7,9,14,0.84)", backdropFilter: "blur(24px)", borderBottom: "1px solid rgba(0,255,178,0.06)" },
  logo: { fontFamily: "'Space Mono',monospace", fontSize: 19, fontWeight: 700, color: "#fff", cursor: "pointer", letterSpacing: -1 },
  hireCta: { background: "transparent", border: "1px solid rgba(0,255,178,0.6)", color: "#00FFB2", fontFamily: "'Space Mono',monospace", fontSize: 8, letterSpacing: 2, padding: "7px 15px", borderRadius: 4, cursor: "pointer", transition: "all 0.2s" },
  mobileMenu: { position: "fixed", top: 58, left: 0, right: 0, zIndex: 99, background: "rgba(7,9,14,0.97)", padding: "22px 24px", display: "flex", flexDirection: "column", gap: 2, borderBottom: "1px solid rgba(0,255,178,0.07)", backdropFilter: "blur(20px)" },
  mobileLink: { background: "none", border: "none", fontFamily: "'Space Mono',monospace", fontSize: 10, letterSpacing: 2, cursor: "pointer", textAlign: "left", padding: "11px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" },
  badge: { fontFamily: "'Space Mono',monospace", fontSize: 8, letterSpacing: 3, color: "#00FFB2", border: "1px solid rgba(0,255,178,0.28)", padding: "6px 15px", borderRadius: 100, display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 28, background: "rgba(0,255,178,0.04)" },
  pulse: { width: 6, height: 6, borderRadius: "50%", background: "#00FFB2", display: "block", animation: "pulseGlow 2s ease-in-out infinite" },
  heroH1: { fontSize: "clamp(50px,12vw,92px)", fontWeight: 800, lineHeight: 1, letterSpacing: -4, marginBottom: 18 },
  btnG: { background: "#00FFB2", color: "#07090E", border: "none", padding: "13px 26px", fontFamily: "'Space Mono',monospace", fontSize: 9, fontWeight: 700, letterSpacing: 2, cursor: "pointer", borderRadius: 4, transition: "opacity 0.15s", textDecoration: "none", display: "inline-block" },
  btnO: { background: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,0.18)", padding: "13px 26px", fontFamily: "'Space Mono',monospace", fontSize: 9, fontWeight: 700, letterSpacing: 2, cursor: "pointer", borderRadius: 4, textDecoration: "none", display: "inline-block" },
  scrollHint: { position: "absolute", bottom: 28, left: "50%", transform: "translateX(-50%)", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", gap: 6, cursor: "pointer", animation: "scrollBounce 2.2s ease-in-out infinite" },
  sec: { position: "relative", zIndex: 1, padding: "80px 0" },
  inner: { maxWidth: 1200, margin: "0 auto", padding: "0 24px" },
  lbl: { fontFamily: "'Space Mono',monospace", fontSize: 9, color: "#00FFB2", letterSpacing: 2.5, marginBottom: 10 },
  h2: { fontSize: "clamp(28px,6vw,50px)", fontWeight: 800, letterSpacing: -2, marginBottom: 40 },
  p: { color: "rgba(255,255,255,0.52)", lineHeight: 1.85, marginBottom: 16, fontSize: 14.5 },
  inp: { background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 7, padding: "13px 15px", color: "#fff", fontFamily: "'Syne',sans-serif", fontSize: 13.5, outline: "none", transition: "border-color 0.2s", width: "100%" },
};