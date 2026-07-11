"use strict";

/**
 * CodeZetta Modern Angular Landing Page
 *
 * Features:
 * - Mobile navigation
 * - Sticky header
 * - Accordion interactions
 * - Scroll reveal animations
 * - Back-to-top button
 * - Automatic copyright year
 */

document.addEventListener("DOMContentLoaded", () => {
  initializeMobileNavigation();
  initializeHeader();
  initializeAccordions();
  initializeScrollReveal();
  initializeBackToTop();
  initializeCurrentYear();
});

/**
 * Opens and closes the mobile navigation.
 */
function initializeMobileNavigation() {
  const menuButton = document.getElementById("menuButton");
  const navLinks = document.getElementById("navLinks");

  if (!menuButton || !navLinks) {
    return;
  }

  const closeMenu = () => {
    menuButton.classList.remove("active");
    navLinks.classList.remove("open");
    document.body.classList.remove("menu-open");

    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation menu");
  };

  const openMenu = () => {
    menuButton.classList.add("active");
    navLinks.classList.add("open");
    document.body.classList.add("menu-open");

    menuButton.setAttribute("aria-expanded", "true");
    menuButton.setAttribute("aria-label", "Close navigation menu");
  };

  menuButton.addEventListener("click", () => {
    const isOpen = navLinks.classList.contains("open");

    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 820) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });
}

/**
 * Adds a blurred background to the header after scrolling.
 */
function initializeHeader() {
  const header = document.querySelector(".site-header");

  if (!header) {
    return;
  }

  const updateHeader = () => {
    const hasScrolled = window.scrollY > 20;

    header.classList.toggle("scrolled", hasScrolled);
  };

  updateHeader();

  window.addEventListener("scroll", updateHeader, {
    passive: true
  });
}

/**
 * Initializes all curriculum and FAQ accordions.
 */
function initializeAccordions() {
  const accordionItems = document.querySelectorAll(".accordion-item");

  accordionItems.forEach((item) => {
    const trigger = item.querySelector(".accordion-trigger");
    const content = item.querySelector(".accordion-content");

    if (!trigger || !content) {
      return;
    }

    trigger.setAttribute("aria-expanded", "false");

    trigger.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      if (isActive) {
        closeAccordionItem(item, trigger, content);
      } else {
        openAccordionItem(item, trigger, content);
      }
    });
  });

  window.addEventListener("resize", updateOpenAccordions);
}

/**
 * Opens a specific accordion item.
 */
function openAccordionItem(item, trigger, content) {
  item.classList.add("active");
  trigger.setAttribute("aria-expanded", "true");

  content.style.maxHeight = `${content.scrollHeight}px`;
}

/**
 * Closes a specific accordion item.
 */
function closeAccordionItem(item, trigger, content) {
  item.classList.remove("active");
  trigger.setAttribute("aria-expanded", "false");

  content.style.maxHeight = "0px";
}

/**
 * Recalculates accordion heights after a screen resize.
 */
function updateOpenAccordions() {
  document
    .querySelectorAll(".accordion-item.active .accordion-content")
    .forEach((content) => {
      content.style.maxHeight = `${content.scrollHeight}px`;
    });
}

/**
 * Reveals elements when they enter the screen.
 */
function initializeScrollReveal() {
  const revealElements = document.querySelectorAll(".reveal");

  if (!revealElements.length) {
    return;
  }

  if (!("IntersectionObserver" in window)) {
    revealElements.forEach((element) => {
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
      rootMargin: "0px 0px -70px",
      threshold: 0.08
    }
  );

  revealElements.forEach((element, index) => {
    const delay = Math.min((index % 4) * 70, 210);

    element.style.transitionDelay = `${delay}ms`;

    observer.observe(element);
  });
}

/**
 * Shows the back-to-top button after scrolling.
 */
function initializeBackToTop() {
  const backToTopButton = document.getElementById("backToTop");

  if (!backToTopButton) {
    return;
  }

  const updateButtonVisibility = () => {
    backToTopButton.classList.toggle(
      "visible",
      window.scrollY > 600
    );
  };

  backToTopButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });

  updateButtonVisibility();

  window.addEventListener("scroll", updateButtonVisibility, {
    passive: true
  });
}

/**
 * Writes the current year into the footer.
 */
function initializeCurrentYear() {
  const currentYearElement = document.getElementById("currentYear");

  if (!currentYearElement) {
    return;
  }

  currentYearElement.textContent = String(
    new Date().getFullYear()
  );
}
