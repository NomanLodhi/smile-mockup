// main.js

document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  // =========================================================
  // PRELOADER
  // =========================================================

  const preloader = document.getElementById("preloader");

  window.addEventListener("load", () => {
    if (preloader) {
      gsap.to(".pre-bar span", {
        width: "100%",
        duration: 1.2,
        ease: "power2.out",
      });

      gsap.to(preloader, {
        opacity: 0,
        visibility: "hidden",
        duration: 0.8,
        delay: 1.3,
        ease: "power3.out",
        onComplete: () => {
          preloader.style.display = "none";
          ScrollTrigger.refresh();
        },
      });
    }
  });

  // =========================================================
  // NAVBAR SCROLL
  // =========================================================

  const navbar = document.getElementById("mainNav");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar?.classList.add("scrolled");
    } else {
      navbar?.classList.remove("scrolled");
    }
  });

  // =========================================================
  // BACK TO TOP
  // =========================================================

  const backToTop = document.getElementById("backToTop");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backToTop?.classList.add("show");
    } else {
      backToTop?.classList.remove("show");
    }
  });

  backToTop?.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // =========================================================
  // HERO ANIMATIONS
  // =========================================================

  const heroTimeline = gsap.timeline({
    defaults: {
      ease: "power3.out",
    },
  });

  heroTimeline
    .from(".navbar-brand", {
      y: -30,
      opacity: 0,
      duration: 0.7,
    })
    .from(
      ".navbar-nav .nav-item",
      {
        y: -20,
        opacity: 0,
        stagger: 0.08,
        duration: 0.5,
      },
      "-=0.4"
    );

  // Home hero
  if (document.querySelector(".hero-section")) {
    heroTimeline
      .from(
        ".hero-badge",
        {
          y: 20,
          opacity: 0,
          duration: 0.6,
        },
        "-=0.2"
      )
      .from(
        ".hero-title",
        {
          y: 40,
          opacity: 0,
          duration: 0.9,
        },
        "-=0.3"
      )
      .from(
        ".hero-sub",
        {
          y: 20,
          opacity: 0,
          duration: 0.6,
        },
        "-=0.5"
      )
      .from(
        ".hero-btns .btn",
        {
          y: 20,
          opacity: 0,
          stagger: 0.12,
          duration: 0.5,
        },
        "-=0.4"
      )
      .from(
        ".scroll-indicator",
        {
          opacity: 0,
          y: 15,
          duration: 0.6,
        },
        "-=0.2"
      );
  }

  // About page hero
  if (document.querySelector(".page-hero")) {
    heroTimeline
      .from(
        ".page-hero .hero-badge",
        {
          y: 20,
          opacity: 0,
          duration: 0.5,
        },
        "-=0.2"
      )
      .from(
        ".page-hero-title",
        {
          y: 40,
          opacity: 0,
          duration: 0.8,
        },
        "-=0.3"
      )
      .from(
        ".breadcrumb",
        {
          y: 15,
          opacity: 0,
          duration: 0.5,
        },
        "-=0.4"
      );
  }

  // =========================================================
  // SAFE GSAP SCROLL REVEALS
  // =========================================================

  function animateElements(selector, animationVars = {}) {
    const elements = gsap.utils.toArray(selector);

    elements.forEach((el) => {
      gsap.set(el, {
        opacity: 1,
        visibility: "visible",
      });

      gsap.from(el, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power3.out",
        clearProps: "all",
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          once: true,
        },
        ...animationVars,
      });
    });
  }

  // Generic animations
  animateElements('[data-gsap="fadeUp"]', {
    y: 40,
  });

  animateElements('[data-gsap="fadeLeft"]', {
    x: -60,
    y: 0,
  });

  animateElements('[data-gsap="fadeRight"]', {
    x: 60,
    y: 0,
  });

  animateElements('[data-gsap="card"]', {
    y: 35,
    scale: 0.97,
  });

  animateElements('[data-gsap="stat"]', {
    y: 20,
    duration: 0.6,
  });

  // =========================================================
  // STATS COUNTER
  // =========================================================

  const counters = document.querySelectorAll(".stat-num");

  counters.forEach((counter) => {
    const target = +counter.dataset.count;

    ScrollTrigger.create({
      trigger: counter,
      start: "top 85%",
      once: true,

      onEnter: () => {
        let obj = {
          val: 0,
        };

        gsap.to(obj, {
          val: target,
          duration: 2,
          ease: "power2.out",

          onUpdate: () => {
            counter.textContent = Math.floor(obj.val).toLocaleString();
          },
        });
      },
    });
  });

  // =========================================================
  // GALLERY STRIP LOOP
  // =========================================================

  if (document.querySelector(".gallery-track")) {
    gsap.to(".gallery-track", {
      xPercent: -50,
      duration: 25,
      repeat: -1,
      ease: "linear",
    });
  }

  // =========================================================
  // FLOATING IMAGE EFFECTS
  // =========================================================

  gsap.utils.toArray(".why-main-img, .oral-img").forEach((img) => {
    gsap.to(img, {
      y: -12,
      duration: 2.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  });

  // =========================================================
  // CARD HOVER EFFECTS
  // =========================================================

  const hoverCards = document.querySelectorAll(`
    .service-card,
    .mission-card,
    .team-card,
    .branch-card,
    .testimonial-card,
    .gal-item
  `);

  hoverCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      gsap.to(card, {
        y: -8,
        duration: 0.3,
        ease: "power2.out",
      });
    });

    card.addEventListener("mouseleave", () => {
      gsap.to(card, {
        y: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    });
  });

  // =========================================================
  // PARALLAX EFFECTS
  // =========================================================

  gsap.utils.toArray(".hero-slide").forEach((slide) => {
    gsap.to(slide, {
      backgroundPosition: "50% 100%",
      ease: "none",

      scrollTrigger: {
        trigger: slide,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  });

  // =========================================================
  // SECTION TITLE ANIMATION
  // =========================================================

  gsap.utils.toArray(".section-title").forEach((title) => {
    gsap.from(title, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: "power3.out",

      scrollTrigger: {
        trigger: title,
        start: "top 88%",
        once: true,
      },
    });
  });

  // =========================================================
  // TESTIMONIAL CAROUSEL FIX
  // =========================================================

  document.querySelectorAll(".carousel").forEach((carousel) => {
    carousel.addEventListener("slid.bs.carousel", () => {
      ScrollTrigger.refresh();
    });
  });

  // =========================================================
  // REFRESH
  // =========================================================

  ScrollTrigger.refresh();
});