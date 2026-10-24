import { useState } from "react";

const EMAIL = "salmanulfaris.c.k10@gmail.com";
const FORMSPREE_URL = "https://formspree.io/f/mpqjkkrq";
const CV_URL = "https://drive.google.com/uc?export=download&id=1Z1LANp-jSfdch7fjXpHNEp4i-cVlAenf";

const LINKS = [
  { label: "Email", href: `mailto:${EMAIL}` },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/salmanul-faris-c-k/" },
  { label: "GitHub", href: "https://github.com/salmanck66" },
  { label: "Resume", href: CV_URL },
];

const EXPERIENCE = [
  {
    role: "Freelance Full-Stack Developer",
    company: "Remote",
    period: "Mar 2024 – Present",
    desc: "Websites, e-commerce stores and custom tools for clients, from design to deployment. Also building and running JCClub, a WooCommerce store, including its custom plugins for shipping, payments and invoicing.",
  },
  {
    role: "Junior Software Engineer",
    company: "Helixo Innovations · Kochi",
    period: "Oct 2024 – Mar 2025",
    desc: "Worked on top-downloaded Shopify apps, including UFE (36,000+ active users). Built features with React, Node.js, Next.js, Remix and Svelte, and deployed with Docker on DigitalOcean.",
  },
  {
    role: "MERN Stack Intern",
    company: "Selfstack Hub · Calicut",
    period: "Feb 2024 – Oct 2024",
    desc: "Built 20+ projects, including a shipping aggregator API, a post scheduler and a user management app.",
  },
];

const PROJECTS = [
  {
    name: "chatWAER",
    desc: "Real-time chat app with live online status, secure login and one-click demo accounts.",
    tech: "React · Node.js · MongoDB · Socket.IO",
    live: "https://chatwaer.onrender.com/",
    code: "https://github.com/salmanck66/ChatAPP_MERN",
  },
  {
    name: "ClearCut Studio",
    desc: "Image editor that runs in the browser: AI background removal, logo blur, resizing and batch export.",
    tech: "JavaScript · Canvas · WebAssembly",
    live: "https://salmanck66.github.io/ClearCut-Studio-AI-Image-Editing-Canvas-Tools/",
    code: "https://github.com/salmanck66/ClearCut-Studio-AI-Image-Editing-Canvas-Tools",
  },
  {
    name: "Everwood Interiors",
    desc: "Website for an interior design studio. Client project, live in production.",
    tech: "HTML · CSS · JavaScript",
    live: "https://everwoodinteriors.in/",
    code: "https://github.com/salmanck66/Everwood-Interiors-Website",
  },
  {
    name: "E-commerce Store",
    desc: "Online store with cart, checkout, Razorpay payments and an admin panel.",
    tech: "Node.js · Express · MongoDB",
    code: "https://github.com/salmanck66/Ecommerce-Project-",
  },
  {
    name: "TradeLens",
    desc: "Trade journal and profit/loss analyser with AI notes on why a stock moved.",
    tech: "Next.js · MongoDB · NextAuth · Claude AI",
  },
];

const SMALL_PROJECTS = [
  ["Kanban board", "https://kanban-to-do-tasks-drag-and-drop.vercel.app/"],
  ["Seat reservation", "https://seminar-hall-seat-resevation-app.vercel.app/"],
  ["User management (Redux)", "https://user-details-management-react-redux.vercel.app/"],
  ["JS quiz", "https://javascript-quiz-app-react.vercel.app/"],
  ["Post scheduler", "https://post-scheduler-lyart.vercel.app/"],
  ["Stopwatch", "https://stop-watch-react-js-six.vercel.app/"],
];

const SKILLS =
  "JavaScript, TypeScript, React, Next.js, Remix, Node.js, Express, MongoDB, MySQL, PHP, WordPress, WooCommerce, Shopify, Docker, AWS, Git";

function Section({ title, children }) {
  return (
    <section className="section">
      <h2>{title}</h2>
      {children}
    </section>
  );
}

function ContactForm() {
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(e.target),
      });
      if (!res.ok) throw new Error();
      e.target.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return <p className="note">Thanks, your message has been sent. I&apos;ll reply soon.</p>;
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input name="name" placeholder="Your name" required />
      <input name="email" type="email" placeholder="Your email" required />
      <textarea name="message" rows="4" placeholder="Message" required />
      <button type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
      {status === "error" && (
        <p className="note">
          Something went wrong. Please email me at <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
        </p>
      )}
    </form>
  );
}

export default function Portfolio() {
  return (
    <main className="page">
      <header className="header">
        <h1>Salmanul Faris CK</h1>
        <p className="lead">Full-stack developer · Calicut, Kerala</p>
        <p>
          I build web apps with React, Node.js and MongoDB, and e-commerce on Shopify and
          WooCommerce. Open to full-time roles and freelance work.
        </p>
        <nav className="links">
          {LINKS.map((l) => (
            <a key={l.label} href={l.href} target={l.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
              {l.label}
            </a>
          ))}
        </nav>
      </header>

      <Section title="Experience">
        {EXPERIENCE.map((x) => (
          <div className="item" key={x.role}>
            <div className="item-head">
              <h3>{x.role}</h3>
              <span className="muted">{x.period}</span>
            </div>
            <p className="muted">{x.company}</p>
            <p>{x.desc}</p>
          </div>
        ))}
      </Section>

      <Section title="Projects">
        {PROJECTS.map((p) => (
          <div className="item" key={p.name}>
            <div className="item-head">
              <h3>{p.name}</h3>
              <span className="item-links">
                {p.live && (
                  <a href={p.live} target="_blank" rel="noreferrer">
                    Live
                  </a>
                )}
                {p.code && (
                  <a href={p.code} target="_blank" rel="noreferrer">
                    Code
                  </a>
                )}
              </span>
            </div>
            <p>{p.desc}</p>
            <p className="muted small">{p.tech}</p>
          </div>
        ))}
        <p className="small">
          <span className="muted">Smaller React projects: </span>
          {SMALL_PROJECTS.map(([name, url], i) => (
            <span key={name}>
              <a href={url} target="_blank" rel="noreferrer">
                {name}
              </a>
              {i < SMALL_PROJECTS.length - 1 && " · "}
            </span>
          ))}
        </p>
      </Section>

      <Section title="Skills">
        <p>{SKILLS}</p>
      </Section>

      <Section title="Contact">
        <p>
          Email me at <a href={`mailto:${EMAIL}`}>{EMAIL}</a> or send a message here.
        </p>
        <ContactForm />
      </Section>

      <footer className="footer muted small">© {new Date().getFullYear()} Salmanul Faris CK</footer>
    </main>
  );
}
