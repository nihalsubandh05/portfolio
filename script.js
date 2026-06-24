// Year in footer
document.getElementById("year").textContent = new Date().getFullYear();

// Nav background on scroll
const nav = document.getElementById("nav");
const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 24);
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

// Reveal on scroll
const reveals = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  reveals.forEach((el) => io.observe(el));
} else {
  reveals.forEach((el) => el.classList.add("in"));
}

// Stagger cards within a grid for a nicer cascade
document.querySelectorAll(".work-grid, .cap-grid, .stack-grid").forEach((grid) => {
  [...grid.children].forEach((child, i) => {
    if (child.classList.contains("reveal")) {
      child.style.transitionDelay = `${Math.min(i * 70, 350)}ms`;
    }
  });
});

// Gentle parallax on hero gradient
const grad = document.querySelector(".bg-gradient");
if (grad && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  window.addEventListener(
    "scroll",
    () => {
      grad.style.transform = `translateY(${window.scrollY * 0.04}px)`;
    },
    { passive: true }
  );
}

// Placeholder links: prevent dead navigation, hint they're coming
document.querySelectorAll("[data-placeholder]").forEach((el) => {
  el.addEventListener("click", (e) => {
    const href = el.getAttribute("href");
    if (!href || href === "#") e.preventDefault();
  });
});
