const SAVED_EVENT = "us-address-tool:saved-change";

function getBrowserStorage() {
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

function getSavedCount() {
  const storage = getBrowserStorage();

  if (!storage) {
    return 0;
  }

  return Object.keys(storage)
    .filter((key) => key.startsWith("us-address-tool:"))
    .reduce((sum, key) => {
      try {
        const raw = storage.getItem(key);
        const parsed = raw ? JSON.parse(raw) : [];
        return sum + (Array.isArray(parsed) ? parsed.length : 0);
      } catch {
        return sum;
      }
    }, 0);
}

function updateSavedAddressLinks() {
  const total = getSavedCount();

  document.querySelectorAll("[data-saved-address-link]").forEach((node) => {
    if (!(node instanceof HTMLElement)) {
      return;
    }

    const label = node.dataset.label || "";
    node.textContent = `${label} (${total})`;
  });
}

function syncMoreMenuTop() {
  const header = document.querySelector(".site-header");
  const top =
    header instanceof HTMLElement ? Math.round(header.getBoundingClientRect().bottom + 8) : 112;

  document.documentElement.style.setProperty("--site-header-menu-top", `${top}px`);
}

function bindHeaderUi() {
  const dropdowns = [...document.querySelectorAll("[data-nav-more]")].filter(
    (node) => node instanceof HTMLDetailsElement
  );

  if (!window.__usAddressToolSavedLinksBound) {
    window.__usAddressToolSavedLinksBound = true;
    window.addEventListener("storage", updateSavedAddressLinks);
    window.addEventListener(SAVED_EVENT, updateSavedAddressLinks);
  }

  if (!window.__usAddressToolHeaderNavBound) {
    window.__usAddressToolHeaderNavBound = true;

    document.addEventListener("click", (event) => {
      if (!(event.target instanceof Node)) {
        return;
      }

      dropdowns.forEach((dropdown) => {
        if (dropdown.open && !dropdown.contains(event.target)) {
          dropdown.open = false;
        }
      });
    });

    window.addEventListener("resize", () => {
      syncMoreMenuTop();

      if (window.innerWidth > 960) {
        dropdowns.forEach((dropdown) => {
          dropdown.open = false;
        });
      }
    });

    window.addEventListener("scroll", syncMoreMenuTop, { passive: true });

    dropdowns.forEach((dropdown) => {
      dropdown.addEventListener("toggle", syncMoreMenuTop);

      dropdown.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
          dropdown.open = false;
        });
      });
    });
  }

  syncMoreMenuTop();
  updateSavedAddressLinks();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", bindHeaderUi, { once: true });
} else {
  bindHeaderUi();
}
