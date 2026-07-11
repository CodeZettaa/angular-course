"use strict";

document.addEventListener("DOMContentLoaded", () => {
  initializeHeader();
  initializeMobileNavigation();
  initializeAccordions();
  initializeRevealAnimations();
  initializeBackToTop();
  initializeCurrentYear();
});

/**
 * Add a transparent blurred background to the navigation after scrolling.
 */
function initializeHeader() {
  const header = document.getElementById("siteHeader");

  if (!header) {
    return;
  }

  const updateHeader = () => {
    header.classList.toggle("scrolled", window.scrollY > 20);
  };

  updateHeader();

  window.addEventListener("scroll", updateHeader, {
    passive: true
  });
}

/**
 * Open and close the responsive mobile navigation.
 */
function initializeMobileNavigation() {
  const menuButton = document.getElementById("menuButton");
  const navigation = document.getElementById("navigation");

  if (!menuButton || !navigation) {
    return;
  }

  const closeMenu = () => {
    navigation.classList.remove("open");
    document.body.classList.remove("menu-open");

    menuButton.setAttribute("aria-expanded", "false");
  };

  menuButton.addEventListener("click", () => {
    const shouldOpen = !navigation.classList.contains("open");

    navigation.classList.toggle("open", shouldOpen);
    document.body.classList.toggle("menu-open", shouldOpen);

    menuButton.setAttribute(
      "aria-expanded",
      String(shouldOpen)
    );
  });

  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("click", (event) => {
    const target = event.target;

    if (!(target instanceof Node)) {
      return;
    }

    const clickedInsideNavigation = navigation.contains(target);
    const clickedMenuButton = menuButton.contains(target);

    if (!clickedInsideNavigation && !clickedMenuButton) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 1000) {
      closeMenu();
    }
  });
}

/**
 * Open and close curriculum and FAQ accordion items.
 */
function initializeAccordions() {
  const accordionItems = document.querySelectorAll(".accordion-item");

  accordionItems.forEach((item) => {
    const trigger = item.querySelector(".accordion-trigger");
    const content = item.querySelector(".accordion-content");

    if (!(trigger instanceof HTMLButtonElement)) {
      return;
    }

    if (!(content instanceof HTMLElement)) {
      return;
    }

    trigger.setAttribute("aria-expanded", "false");

    trigger.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      item.classList.toggle("active", !isActive);
      trigger.setAttribute("aria-expanded", String(!isActive));

      content.style.maxHeight = isActive
        ? "0px"
        : `${content.scrollHeight}px`;
    });
  });

  window.addEventListener("resize", () => {
    document
      .querySelectorAll(".accordion-item.active .accordion-content")
      .forEach((content) => {
        if (content instanceof HTMLElement) {
          content.style.maxHeight = `${content.scrollHeight}px`;
        }
      });
  });
}

/**
 * Reveal sections and cards when they enter the viewport.
 */
function initializeRevealAnimations() {
  const elements = document.querySelectorAll(".reveal");

  if (!elements.length) {
    return;
  }

  if (!("IntersectionObserver" in window)) {
    elements.forEach((element) => {
      element.classList.add("visible");
    });

    return;
  }

  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("visible");
        currentObserver.unobserve(entry.target);
      });
    },
    {
      root: null,
      rootMargin: "0px 0px -60px 0px",
      threshold: 0.08
    }
  );

  elements.forEach((element, index) => {
    const delay = Math.min((index % 4) * 60, 180);

    if (element instanceof HTMLElement) {
      element.style.transitionDelay = `${delay}ms`;
    }

    observer.observe(element);
  });
}

/**
 * Display and control the back-to-top button.
 */
function initializeBackToTop() {
  const button = document.getElementById("backToTop");

  if (!(button instanceof HTMLButtonElement)) {
    return;
  }

  const updateVisibility = () => {
    button.classList.toggle("visible", window.scrollY > 600);
  };

  button.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });

  updateVisibility();

  window.addEventListener("scroll", updateVisibility, {
    passive: true
  });
}

/**
 * Set the footer year automatically.
 */
function initializeCurrentYear() {
  const yearElement = document.getElementById("currentYear");

  if (!yearElement) {
    return;
  }

  yearElement.textContent = String(new Date().getFullYear());
}
