import { buildSharePath } from "../utils/share-link.js";

const SAVED_EVENT = "us-address-tool:saved-change";

const shareIconMarkup = `
  <svg aria-hidden="true" viewBox="0 0 24 24">
    <circle cx="18" cy="5" r="2.2" fill="none" stroke="currentColor" stroke-width="1.9"></circle>
    <circle cx="6" cy="12" r="2.2" fill="none" stroke="currentColor" stroke-width="1.9"></circle>
    <circle cx="18" cy="19" r="2.2" fill="none" stroke="currentColor" stroke-width="1.9"></circle>
    <path d="M8 11l7.6-4.4M8 13l7.6 4.4" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.9"></path>
  </svg>
`.trim();

const removeIconMarkup = `
  <svg aria-hidden="true" viewBox="0 0 24 24">
    <path d="M4 7h16M9 7V4h6v3m-8 0 1 12a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2l1-12" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.9"></path>
  </svg>
`.trim();

let domReadyHooked = false;

function getBrowserStorage() {
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

function safeParseJson(value) {
  if (!value) {
    return null;
  }

  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

async function copyToClipboard(value) {
  if (!value) {
    return false;
  }

  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(value);
      return true;
    }
  } catch {
    // Keep the manual fallback below for browsers with stricter clipboard rules.
  }

  const textArea = document.createElement("textarea");
  textArea.value = value;
  textArea.setAttribute("readonly", "readonly");
  textArea.style.position = "fixed";
  textArea.style.opacity = "0";
  document.body.append(textArea);
  textArea.select();

  let copied = false;

  try {
    copied = document.execCommand("copy");
  } catch {
    copied = false;
  }

  textArea.remove();
  return copied;
}

function formatSavedDate(value) {
  try {
    return new Date(value).toLocaleString();
  } catch {
    return value;
  }
}

function createActionButton(label, iconMarkup, className = "") {
  const button = document.createElement("button");
  button.className = `saved-action-button ${className}`.trim();
  button.type = "button";
  button.setAttribute("aria-label", label);
  button.innerHTML = iconMarkup;
  return button;
}

function enhanceGenerator(root) {
  if (!(root instanceof HTMLElement) || root.dataset.enhanced === "true") {
    return;
  }

  const configNode = root.querySelector("template[data-generator-config]");
  const config = safeParseJson(configNode?.innerHTML);

  if (!config) {
    return;
  }

  root.dataset.enhanced = "true";

  const regionSelect = root.querySelector("[data-region-select]");
  const generateButton = root.querySelector("[data-generate-button]");
  const copyAllButton = root.querySelector("[data-copy-all]");
  const saveButton = root.querySelector("[data-save-button]");
  const shareButton = root.querySelector("[data-share-button]");
  const exportButton = root.querySelector("[data-export-saved]");
  const statusLine = root.querySelector("[data-status-line]");
  const emptyNote = root.querySelector("[data-empty-note]");
  const copyToast = root.querySelector("[data-copy-toast]");
  const copyToastMessage = root.querySelector("[data-copy-toast-message]");
  const savedPanel = root.querySelector("[data-saved-panel]");
  const savedGrid = root.querySelector("[data-saved-grid]");
  const shareModal = root.querySelector("[data-share-modal]");
  const sharePreview = root.querySelector("[data-share-preview]");
  const shareLinkInput = root.querySelector("[data-share-link]");
  const copyShareTextButton = root.querySelector("[data-copy-share-text]");
  const systemShareButton = root.querySelector("[data-system-share]");
  const shareCloseButtons = Array.from(root.querySelectorAll("[data-share-close]"));
  const fieldCards = Array.from(root.querySelectorAll("[data-field-key]"));

  if (
    !(regionSelect instanceof HTMLSelectElement) ||
    !(generateButton instanceof HTMLButtonElement) ||
    !(copyAllButton instanceof HTMLButtonElement) ||
    !(saveButton instanceof HTMLButtonElement) ||
    !(shareButton instanceof HTMLButtonElement) ||
    !(exportButton instanceof HTMLButtonElement) ||
    !(statusLine instanceof HTMLElement) ||
    !(emptyNote instanceof HTMLElement) ||
    !(savedPanel instanceof HTMLElement) ||
    !(savedGrid instanceof HTMLElement) ||
    !(shareModal instanceof HTMLElement) ||
    !(sharePreview instanceof HTMLTextAreaElement) ||
    !(shareLinkInput instanceof HTMLInputElement) ||
    !(copyShareTextButton instanceof HTMLButtonElement) ||
    !(systemShareButton instanceof HTMLButtonElement)
  ) {
    return;
  }

  const fields = fieldCards.reduce((list, card) => {
    const key = card.getAttribute("data-field-key");
    const value = card.querySelector("[data-field-value]");
    const copyButton = card.querySelector("[data-copy-field]");

    if (
      !key ||
      !(card instanceof HTMLElement) ||
      !(value instanceof HTMLElement) ||
      !(copyButton instanceof HTMLButtonElement)
    ) {
      return list;
    }

    list.push({ key, card, value, copyButton });
    return list;
  }, []);

  const {
    countrySlug,
    countryHeading,
    locale,
    profile,
    labels,
    storageKey,
    emptyHint,
    savedUi,
    shareUi
  } = config;

  const regionCodes = Array.from(regionSelect.options)
    .map((option) => option.value)
    .filter(Boolean);

  let current = null;
  let saved = [];
  let loading = false;
  let recentEntryIds = [];
  let copiedFieldTimer = null;
  let copyToastTimer = null;
  let copyToastHideTimer = null;
  let activeSharePayload = null;
  let lastShareTrigger = null;

  function setStatus(message = "") {
    statusLine.textContent = message;
  }

  function showToast(message) {
    if (!(copyToast instanceof HTMLElement) || !(copyToastMessage instanceof HTMLElement)) {
      return;
    }

    if (copyToastTimer) {
      window.clearTimeout(copyToastTimer);
    }

    if (copyToastHideTimer) {
      window.clearTimeout(copyToastHideTimer);
    }

    copyToastMessage.textContent = message;
    copyToast.hidden = false;

    window.requestAnimationFrame(() => {
      copyToast.classList.add("copy-toast--visible");
    });

    copyToastTimer = window.setTimeout(() => {
      copyToast.classList.remove("copy-toast--visible");
      copyToastHideTimer = window.setTimeout(() => {
        copyToast.hidden = true;
      }, 220);
    }, 1600);
  }

  function markFieldCopied(activeField) {
    if (copiedFieldTimer) {
      window.clearTimeout(copiedFieldTimer);
    }

    fields.forEach((field) => {
      field.card.classList.toggle(
        "generator-field-card--copied",
        field === activeField
      );
    });

    copiedFieldTimer = window.setTimeout(() => {
      fields.forEach((field) => {
        field.card.classList.remove("generator-field-card--copied");
      });
    }, 1400);
  }

  function getGenderLabel(gender) {
    return gender === "female"
      ? labels.genderLabels.female
      : labels.genderLabels.male;
  }

  function renderRecord(record) {
    current = record;
    emptyNote.hidden = Boolean(record);
    emptyNote.textContent = emptyHint;

    if (record?.sourceEntryId) {
      recentEntryIds = [
        record.sourceEntryId,
        ...recentEntryIds.filter((entryId) => entryId !== record.sourceEntryId)
      ].slice(0, 6);
    }

    fields.forEach((field) => {
      const rawValue =
        !record
          ? ""
          : field.key === "gender"
            ? getGenderLabel(record.gender)
            : record[field.key] ?? "";

      field.value.dataset.rawValue = rawValue;
      field.value.textContent = rawValue || "--";
      field.value.classList.toggle(
        "generator-field-card__value--empty",
        !rawValue
      );
    });

    syncActionState();
  }

  function openShareModal(payload) {
    activeSharePayload = payload;
    lastShareTrigger =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    sharePreview.value = payload.previewText;
    shareLinkInput.value = payload.shortUrl;
    shareModal.hidden = false;
    document.body.classList.add("share-modal-open");
    window.requestAnimationFrame(() => {
      shareLinkInput.focus();
      shareLinkInput.select();
    });
  }

  function closeShareModal() {
    activeSharePayload = null;
    shareModal.hidden = true;
    document.body.classList.remove("share-modal-open");
    lastShareTrigger?.focus();
    lastShareTrigger = null;
  }

  function buildSharePayload(record) {
    const sharePath = buildSharePath({
      countrySlug,
      locale,
      profile,
      regionCode: record.regionCode || "",
      seed: record.seed
    });

    if (!sharePath) {
      return null;
    }

    const shortUrl = new URL(sharePath, window.location.origin).toString();
    const personLine = `${record.firstName} ${record.lastName} | ${record.phone} | ${record.fullAddress}`;
    const generatedBy =
      shareUi.generatedPrefix || shareUi.generatedSuffix
        ? `${shareUi.generatedPrefix}${countryHeading}${shareUi.generatedSuffix}`
        : countryHeading;
    const previewText = [
      shareUi.previewHeading,
      personLine,
      "",
      shortUrl,
      generatedBy
    ].join("\n");

    return {
      shortUrl,
      previewText
    };
  }

  async function handleSystemShare(payload) {
    if (navigator.share) {
      try {
        await navigator.share({
          title: countryHeading,
          text: payload.previewText,
          url: payload.shortUrl
        });
        setStatus(labels.statusShared);
        closeShareModal();
        return;
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }
      }
    }

    const copied = await copyToClipboard(payload.shortUrl);

    if (copied) {
      showToast(shareUi.systemFallback);
    }

    setStatus(copied ? shareUi.systemFallback : labels.statusFailed);
  }

  function restoreSavedRecord(record) {
    regionSelect.value = record.regionCode || "";
    renderRecord(record);
    setStatus(labels.statusLoaded);
  }

  function renderSaved() {
    savedGrid.replaceChildren();
    savedPanel.hidden = saved.length === 0;
    exportButton.disabled = saved.length === 0;

    saved.forEach((item) => {
      const article = document.createElement("article");
      article.className = "saved-row";
      article.tabIndex = 0;
      article.title = savedUi.rowTitle;

      const name = document.createElement("div");
      name.className = "saved-cell saved-cell--name";
      name.dataset.label = savedUi.columns.name;
      name.textContent = `${item.record.firstName} ${item.record.lastName}`;

      const gender = document.createElement("div");
      gender.className = "saved-cell";
      gender.dataset.label = savedUi.columns.gender;
      gender.textContent = getGenderLabel(item.record.gender);

      const phone = document.createElement("div");
      phone.className = "saved-cell";
      phone.dataset.label = savedUi.columns.phone;
      phone.textContent = item.record.phone;

      const address = document.createElement("div");
      address.className = "saved-cell saved-cell--address";
      address.dataset.label = savedUi.columns.address;
      address.textContent = item.record.fullAddress;

      const actions = document.createElement("div");
      actions.className = "saved-cell saved-cell--actions";
      actions.dataset.label = savedUi.columns.actions;

      const shareSavedButton = createActionButton(labels.share, shareIconMarkup);
      const removeButton = createActionButton(
        labels.remove,
        removeIconMarkup,
        "saved-action-button--danger"
      );

      shareSavedButton.addEventListener("click", (event) => {
        event.stopPropagation();
        const payload = buildSharePayload(item.record);

        if (!payload) {
          setStatus(labels.statusFailed);
          return;
        }

        openShareModal(payload);
      });

      removeButton.addEventListener("click", (event) => {
        event.stopPropagation();
        removeSaved(item.id);
      });

      article.addEventListener("click", (event) => {
        if (event.target instanceof HTMLElement && event.target.closest("button")) {
          return;
        }

        restoreSavedRecord(item.record);
      });

      article.addEventListener("keydown", (event) => {
        if (event.key !== "Enter" && event.key !== " ") {
          return;
        }

        if (event.target instanceof HTMLElement && event.target.closest("button")) {
          return;
        }

        event.preventDefault();
        restoreSavedRecord(item.record);
      });

      actions.append(shareSavedButton, removeButton);
      article.append(name, gender, phone, address, actions);
      savedGrid.append(article);
    });
  }

  function readSavedRecords() {
    const storage = getBrowserStorage();

    if (!storage) {
      saved = [];
      renderSaved();
      return;
    }

    try {
      const parsed = safeParseJson(storage.getItem(storageKey));
      saved = Array.isArray(parsed)
        ? parsed.filter((item) => item?.record?.countrySlug === countrySlug)
        : [];
    } catch {
      try {
        storage.removeItem(storageKey);
      } catch {
        // Ignore storage write failures and keep the UI responsive.
      }

      saved = [];
    }

    renderSaved();
  }

  function broadcastSavedChange() {
    window.dispatchEvent(new CustomEvent(SAVED_EVENT));
  }

  async function requestAddress(nextRegion, seed, excludeEntryIds = []) {
    const searchParams = new URLSearchParams({
      country: countrySlug,
      locale,
      profile
    });

    if (nextRegion) {
      searchParams.set("region", nextRegion);
    }

    if (seed) {
      searchParams.set("seed", seed);
    }

    if (excludeEntryIds.length) {
      searchParams.set("exclude", excludeEntryIds.join(","));
    }

    const response = await fetch(`/api/address/generate/?${searchParams.toString()}`, {
      headers: {
        Accept: "application/json"
      }
    });

    if (!response.ok) {
      const payload = await response.json().catch(() => null);
      throw new Error(payload?.error || labels.statusFailed);
    }

    return response.json();
  }

  async function generate(nextRegion = regionSelect.value, seed, mode = "generate") {
    loading = true;
    setStatus(labels.statusLoading);
    syncActionState();

    try {
      const next = await requestAddress(
        nextRegion,
        seed,
        mode === "generate" ? recentEntryIds : []
      );

      if (mode === "load") {
        regionSelect.value = nextRegion || next.regionCode || "";
      }

      renderRecord(next);
      setStatus(mode === "load" ? labels.statusLoaded : labels.statusGenerated);
    } catch (error) {
      const message = error instanceof Error ? error.message : labels.statusFailed;
      setStatus(message);
    } finally {
      loading = false;
      syncActionState();
    }
  }

  function syncActionState() {
    const hasCurrent = Boolean(current);

    generateButton.disabled = loading;
    generateButton.textContent = loading ? labels.statusLoading : labels.generate;
    copyAllButton.disabled = !hasCurrent || loading;
    saveButton.disabled = !hasCurrent || loading;
    shareButton.disabled = !hasCurrent || loading;

    fields.forEach((field) => {
      const rawValue = field.value.dataset.rawValue || "";
      field.copyButton.disabled = !rawValue || loading;
    });
  }

  async function copyCurrentValue(value, field = null) {
    const copied = await copyToClipboard(value);

    if (copied && field) {
      markFieldCopied(field);
    }

    if (copied) {
      showToast(labels.statusCopied);
    }

    setStatus(copied ? labels.statusCopied : labels.statusFailed);
  }

  function saveCurrent() {
    if (!current) {
      return;
    }

    const storage = getBrowserStorage();
    const nextSaved = [
      {
        id: `${countrySlug}:${profile}:${current.seed}`,
        savedAt: new Date().toISOString(),
        record: current
      },
      ...saved.filter((item) => item.record.seed !== current.seed)
    ].slice(0, 20);

    saved = nextSaved;
    renderSaved();

    if (!storage) {
      setStatus(labels.statusSaved);
      return;
    }

    try {
      storage.setItem(storageKey, JSON.stringify(nextSaved));
      broadcastSavedChange();
    } catch {
      // Keep the in-memory result even if storage is unavailable.
    }

    setStatus(labels.statusSaved);
  }

  function removeSaved(id) {
    const storage = getBrowserStorage();
    saved = saved.filter((item) => item.id !== id);
    renderSaved();

    if (storage) {
      try {
        storage.setItem(storageKey, JSON.stringify(saved));
        broadcastSavedChange();
      } catch {
        // Ignore storage failures and keep the current in-memory list.
      }
    }

    setStatus(labels.statusRemoved);
  }

  function exportSavedRecords() {
    if (!saved.length) {
      return;
    }

    const rows = [
      [
        savedUi.columns.name,
        savedUi.columns.gender,
        savedUi.columns.phone,
        savedUi.columns.address,
        labels.savedAt
      ],
      ...saved.map((item) => [
        `${item.record.firstName} ${item.record.lastName}`,
        getGenderLabel(item.record.gender),
        item.record.phone,
        item.record.fullAddress,
        formatSavedDate(item.savedAt)
      ])
    ];

    const csv = rows
      .map((row) =>
        row
          .map((value) => `"${String(value).replace(/"/g, "\"\"")}"`)
          .join(",")
      )
      .join("\n");

    const blob = new Blob([`\uFEFF${csv}`], {
      type: "text/csv;charset=utf-8;"
    });
    const downloadUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = `${countrySlug}-saved-addresses-${new Date()
      .toISOString()
      .slice(0, 10)}.csv`;
    document.body.append(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(downloadUrl);

    showToast(savedUi.exportStatus);
    setStatus(savedUi.exportStatus);
  }

  function handleShare() {
    if (!current) {
      return;
    }

    const payload = buildSharePayload(current);

    if (!payload) {
      setStatus(labels.statusFailed);
      return;
    }

    openShareModal(payload);
  }

  generateButton.addEventListener("click", () => {
    void generate(regionSelect.value);
  });

  copyAllButton.addEventListener("click", () => {
    void copyCurrentValue(current?.fullAddress || "");
  });

  saveButton.addEventListener("click", saveCurrent);
  exportButton.addEventListener("click", exportSavedRecords);
  shareButton.addEventListener("click", () => {
    handleShare();
  });

  copyShareTextButton.addEventListener("click", async () => {
    const copied = await copyToClipboard(sharePreview.value);

    if (copied) {
      showToast(shareUi.textCopied);
    }

    setStatus(copied ? shareUi.textCopied : labels.statusFailed);
  });

  systemShareButton.addEventListener("click", () => {
    if (!activeSharePayload) {
      return;
    }

    void handleSystemShare(activeSharePayload);
  });

  sharePreview.addEventListener("click", () => {
    sharePreview.select();
  });

  shareLinkInput.addEventListener("click", () => {
    shareLinkInput.select();
  });

  shareCloseButtons.forEach((button) => {
    button.addEventListener("click", () => {
      closeShareModal();
    });
  });

  fields.forEach((field) => {
    field.card.addEventListener("click", (event) => {
      if (event.target instanceof HTMLElement && event.target.closest("[data-copy-field]")) {
        return;
      }

      const rawValue = field.value.dataset.rawValue || "";

      if (!rawValue || loading) {
        return;
      }

      void copyCurrentValue(rawValue, field);
    });

    field.card.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") {
        return;
      }

      if (event.target instanceof HTMLElement && event.target.closest("[data-copy-field]")) {
        return;
      }

      const rawValue = field.value.dataset.rawValue || "";

      if (!rawValue || loading) {
        return;
      }

      event.preventDefault();
      void copyCurrentValue(rawValue, field);
    });

    field.copyButton.addEventListener("click", () => {
      void copyCurrentValue(field.value.dataset.rawValue || "", field);
    });
  });

  const handleStorage = () => {
    readSavedRecords();
  };

  window.addEventListener("storage", handleStorage);
  window.addEventListener(SAVED_EVENT, handleStorage);
  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !shareModal.hidden) {
      closeShareModal();
    }
  });

  renderRecord(null);
  readSavedRecords();

  const url = new URL(window.location.href);
  const regionFromUrl = url.searchParams.get("region") ?? "";
  const sharedSeed = url.searchParams.get("seed") ?? "";
  const regionIsValid = regionCodes.includes(regionFromUrl);

  regionSelect.value = regionIsValid ? regionFromUrl : "";

  if (sharedSeed) {
    void generate(regionSelect.value, sharedSeed, "load");
  }
}

function enhanceAll() {
  document
    .querySelectorAll("[data-address-generator]")
    .forEach((root) => enhanceGenerator(root));
}

export function initAddressGenerators() {
  if (document.readyState === "loading") {
    if (domReadyHooked) {
      return;
    }

    domReadyHooked = true;
    document.addEventListener(
      "DOMContentLoaded",
      () => {
        domReadyHooked = false;
        enhanceAll();
      },
      { once: true }
    );
    return;
  }

  enhanceAll();
}

initAddressGenerators();
