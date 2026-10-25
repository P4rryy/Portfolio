(() => {
  "use strict";
  const root = document.documentElement;
  const themeToggle = document.querySelector(".theme-toggle");
  const navToggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector("#primary-nav");
  const modal = document.querySelector("#project-modal");
  const closeButtons = document.querySelectorAll(".modal-close, .modal-close-secondary");
  const projects = [
    {title:"Personal Portfolio", summary:"A clear, responsive home for your work, background, and learning journey.", problem:"Early-career developers need a focused place to explain what they are learning and make their work easy to review.", approach:"Build a semantic one-page site with accessible navigation, project details, responsive layouts, and a theme toggle. This repository itself can become the starting point once personalised.", tech:["HTML","CSS","JavaScript","GitHub Pages"], visual:"visual-portfolio"},
    {title:"API Status Tracker", summary:"A small dashboard to practise requests, loading states, and data visualisation.", problem:"When working with APIs, it's useful to understand success, error, latency, and empty states instead of only the happy path.", approach:"Start with a mock dataset, then connect a public API. Add clear loading and error messages, timestamps, and a compact status history.", tech:["JavaScript","Fetch API","REST","CSS"], visual:"visual-api"},
    {title:"Creator Toolkit", summary:"A proposed content-planning space for small brands and independent creators.", problem:"Small brands often need a simple way to organise content ideas, production stages, and publishing dates.", approach:"Start with a responsive content board, filters, and local persistence; later add accounts and a backend API as learning milestones.", tech:["HTML","CSS","JavaScript","REST API (later)"], visual:"visual-hub"}
  ];
  const setTheme = (theme) => {
    root.dataset.theme = theme;
    try { localStorage.setItem("ps-theme", theme); } catch (error) {}
    if (themeToggle) themeToggle.setAttribute("aria-label", `Switch to ${theme === "dark" ? "light" : "dark"} theme`);
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = theme === "dark" ? "#101113" : "#f7f7f5";
  };
  setTheme(root.dataset.theme === "light" ? "light" : "dark");
  themeToggle?.addEventListener("click", () => setTheme(root.dataset.theme === "dark" ? "light" : "dark"));

  navToggle?.addEventListener("click", () => {
    const expanded = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!expanded));
    navToggle.setAttribute("aria-label", expanded ? "Open navigation" : "Close navigation");
    nav?.classList.toggle("is-open", !expanded);
  });
  nav?.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    nav.classList.remove("is-open");
    navToggle?.setAttribute("aria-expanded", "false");
    navToggle?.setAttribute("aria-label", "Open navigation");
  }));

  // Reveal sections only when motion is permitted; keep all content available without JS.
  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    }), {threshold: 0.12});
    revealItems.forEach(item => observer.observe(item));
  } else revealItems.forEach(item => item.classList.add("is-visible"));

  const modalTitle = document.querySelector("#modal-title");
  const modalSummary = document.querySelector("#modal-summary");
  const modalProblem = document.querySelector("#modal-problem");
  const modalApproach = document.querySelector("#modal-approach");
  const modalTech = document.querySelector("#modal-tech");
  const modalVisual = document.querySelector("#modal-visual");
  let lastFocused = null;
  function openProject(index, trigger) {
    const project = projects[index];
    if (!project || !modal) return;
    lastFocused = trigger || document.activeElement;
    modalTitle.textContent = project.title;
    modalSummary.textContent = project.summary;
    modalProblem.textContent = project.problem;
    modalApproach.textContent = project.approach;
    modalTech.replaceChildren(...project.tech.map(label => {
      const chip = document.createElement("span"); chip.textContent = label; return chip;
    }));
    modalVisual.className = `modal-visual ${project.visual}`;
    modalVisual.innerHTML = visualMarkup(project.visual);
    if (typeof modal.showModal === "function") modal.showModal();
    else modal.setAttribute("open", "");
    document.querySelector(".modal-close")?.focus();
  }
  function visualMarkup(kind) {
    if (kind === "visual-portfolio") return '<div class="project-visual"><span class="visual-index">CONCEPT / 01</span><div class="mock-browser"><div class="browser-bar"><i></i><i></i><i></i></div><div class="browser-content"><span class="mock-kicker">HELLO, WORLD</span><b>Build with<br>intention<span>.</span></b><div class="mock-lines"><i></i><i></i></div></div></div></div>';
    if (kind === "visual-api") return '<div class="project-visual visual-api"><div class="terminal-card"><div class="terminal-head"><span>~/api-lab</span><span>● ● ●</span></div><p><span class="terminal-green">$</span> fetch("/api/status")</p><p class="terminal-dim">→ response: 200 OK</p><div class="terminal-bars"><i></i><i></i><i></i><i></i><i></i></div></div></div>';
    return '<div class="project-visual visual-hub"><div class="hub-ui"><div class="hub-side"><b>H.</b><i></i><i></i><i></i></div><div class="hub-main"><span>TEAM DASHBOARD</span><b>Mission control.</b><div class="hub-stats"><i></i><i></i><i></i></div><div class="hub-task"><i></i><span></span></div><div class="hub-task"><i></i><span></span></div></div></div></div>';
  }
  document.querySelectorAll("[data-project]").forEach(button => button.addEventListener("click", () => openProject(Number(button.dataset.project), button)));
  closeButtons.forEach(button => button.addEventListener("click", () => modal?.close()));
  modal?.addEventListener("click", event => { if (event.target === modal) modal.close(); });
  modal?.addEventListener("close", () => lastFocused?.focus());
  modal?.addEventListener("keydown", event => {
    if (event.key !== "Tab") return;
    const focusable = [...modal.querySelectorAll('a[href],button:not([disabled]),input:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])')].filter(el => el.offsetParent !== null);
    if (!focusable.length) return;
    const first = focusable[0], last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  });
  document.querySelector("#modal-cta")?.addEventListener("click", () => modal?.close());

  const form = document.querySelector("#contact-form");
  const status = document.querySelector("#form-status");
  const fields = [
    {id:"sender-name", error:"name-error", message:"Please enter your name (at least 2 characters).", valid:value => value.trim().length >= 2},
    {id:"sender-email", error:"email-error", message:"Enter a valid email address.", valid:value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())},
    {id:"sender-message", error:"message-error", message:"Please add a message of at least 10 characters.", valid:value => value.trim().length >= 10}
  ];
  function validate(field) {
    const input = document.getElementById(field.id);
    const error = document.getElementById(field.error);
    const okay = field.valid(input.value);
    input.setAttribute("aria-invalid", String(!okay));
    input.setAttribute("aria-describedby", field.error);
    error.textContent = okay ? "" : field.message;
    return okay;
  }
  fields.forEach(field => {
    const input = document.getElementById(field.id);
    input.addEventListener("blur", () => validate(field));
    input.addEventListener("input", () => { if (input.getAttribute("aria-invalid") === "true") validate(field); });
  });
  form?.addEventListener("submit", event => {
    event.preventDefault();
    const results = fields.map(validate);
    if (results.some(okay => !okay)) {
      status.textContent = "Please fix the highlighted fields before preparing your email.";
      fields[results.indexOf(false)] && document.getElementById(fields[results.indexOf(false)].id).focus();
      return;
    }
    const name = document.getElementById("sender-name").value.trim();
    const email = document.getElementById("sender-email").value.trim();
    const message = document.getElementById("sender-message").value.trim();
    const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
    const body = encodeURIComponent(`Hi Paarthsaarthi,\n\n${message}\n\n— ${name}\n${email}`);
    status.textContent = "Opening your email app. Review the draft and send it from there.";
    window.location.href = `mailto:sarla3sunaria@gmail.com?subject=${subject}&body=${body}`;
  });
  document.querySelector("#year").textContent = new Date().getFullYear();
})();