var CustomImportScript = (() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // tools/importer/import-homepage.js
  var import_homepage_exports = {};
  __export(import_homepage_exports, {
    default: () => import_homepage_default
  });

  // tools/importer/parsers/hero-corporate.js
  function parse(element, { document }) {
    var _a;
    const cells = [];
    const mainArticle = element.querySelector("article.card");
    const bgImg = mainArticle == null ? void 0 : mainArticle.querySelector(".card__image picture img");
    if (bgImg) {
      const img = document.createElement("img");
      img.src = bgImg.src;
      img.alt = bgImg.alt || "";
      cells.push([img]);
    }
    const contentDiv = document.createElement("div");
    const h1 = element.querySelector("h1");
    if (h1) {
      const heading = document.createElement("h1");
      heading.textContent = h1.textContent.trim();
      contentDiv.append(heading);
    }
    const description = element.querySelector("#lottie-description");
    if (description) {
      const p = document.createElement("p");
      p.textContent = description.textContent.trim();
      contentDiv.append(p);
    }
    const mainCta = mainArticle == null ? void 0 : mainArticle.querySelector(".card__cta a.cta");
    if (mainCta) {
      const link = document.createElement("a");
      link.href = mainCta.href;
      link.textContent = ((_a = mainCta.querySelector("span")) == null ? void 0 : _a.textContent.trim()) || mainCta.textContent.trim();
      const p = document.createElement("p");
      p.append(link);
      contentDiv.append(p);
    }
    const miniCards = element.querySelectorAll(":scope > a.card");
    miniCards.forEach((card) => {
      const badge = card.querySelector(".badge");
      const heading = card.querySelector("h3.heading");
      if (badge || heading) {
        const cardP = document.createElement("p");
        if (badge) {
          const strong = document.createElement("strong");
          strong.textContent = badge.textContent.trim();
          cardP.append(strong);
          cardP.append(document.createTextNode(" - "));
        }
        if (heading) {
          const link = document.createElement("a");
          link.href = card.href;
          link.textContent = heading.textContent.trim();
          cardP.append(link);
        }
        contentDiv.append(cardP);
      }
    });
    cells.push([contentDiv]);
    const block = WebImporter.Blocks.createBlock(document, {
      name: "Hero Corporate",
      cells
    });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-solutions.js
  function parse2(element, { document }) {
    const cells = [];
    const cards = element.querySelectorAll("a.card");
    cards.forEach((card) => {
      const img = card.querySelector(".card__image img");
      const col1 = document.createElement("div");
      if (img) {
        const image = document.createElement("img");
        image.src = img.src;
        image.alt = img.alt || "";
        col1.append(image);
      }
      const col2 = document.createElement("div");
      const title = card.querySelector(".heading");
      if (title) {
        const h3 = document.createElement("h3");
        h3.textContent = title.textContent.trim();
        col2.append(h3);
      }
      const desc = card.querySelector(".text-atom p");
      if (desc) {
        const p = document.createElement("p");
        p.textContent = desc.textContent.trim();
        col2.append(p);
      }
      if (card.href) {
        const link = document.createElement("a");
        link.href = card.href;
        link.textContent = (title == null ? void 0 : title.textContent.trim()) || "Learn more";
        const p = document.createElement("p");
        p.append(link);
        col2.append(p);
      }
      cells.push([col1, col2]);
    });
    const block = WebImporter.Blocks.createBlock(document, {
      name: "Cards Solutions",
      cells
    });
    element.replaceWith(block);
  }

  // tools/importer/parsers/carousel-insights.js
  function parse3(element, { document }) {
    const cells = [];
    const slides = element.querySelectorAll(".swiper-wrapper > a.card");
    slides.forEach((slide) => {
      const col1 = document.createElement("div");
      const img = slide.querySelector(".card__image img");
      if (img) {
        const image = document.createElement("img");
        image.src = img.src;
        image.alt = img.alt || "";
        col1.append(image);
      }
      const col2 = document.createElement("div");
      const badge = slide.querySelector(".badge");
      if (badge) {
        const p = document.createElement("p");
        const em = document.createElement("em");
        em.textContent = badge.textContent.trim();
        p.append(em);
        col2.append(p);
      }
      const heading = slide.querySelector("h2.heading");
      if (heading) {
        const h3 = document.createElement("h3");
        h3.textContent = heading.textContent.trim();
        col2.append(h3);
      }
      if (slide.href) {
        const link = document.createElement("a");
        link.href = slide.href;
        link.textContent = (heading == null ? void 0 : heading.textContent.trim()) || "Read more";
        const p = document.createElement("p");
        p.append(link);
        col2.append(p);
      }
      cells.push([col1, col2]);
    });
    const block = WebImporter.Blocks.createBlock(document, {
      name: "Carousel Insights",
      cells
    });
    element.replaceWith(block);
  }

  // tools/importer/parsers/tabs-industry.js
  function parse4(element, { document }) {
    const cells = [];
    const triggers = element.querySelectorAll(".tabs__trigger-list > button.tabs__trigger-item");
    const contentItems = element.querySelectorAll(".tabs__content-list > .tabs__content-item");
    triggers.forEach((trigger, index) => {
      var _a;
      const contentItem = contentItems[index];
      if (!contentItem) return;
      const labelSpan = trigger.querySelector("span:first-child");
      const label = (labelSpan == null ? void 0 : labelSpan.textContent.trim()) || "";
      const col2 = document.createElement("div");
      const img = contentItem.querySelector(".top-tabber__content-item img");
      if (img && !img.src.startsWith("data:")) {
        const image = document.createElement("img");
        image.src = img.src;
        image.alt = img.alt || "";
        const p = document.createElement("p");
        p.append(image);
        col2.append(p);
      }
      const title = contentItem.querySelector(".top-tabber__content-title");
      if (title) {
        const h3 = document.createElement("h3");
        h3.textContent = title.textContent.trim();
        col2.append(h3);
      }
      const descEl = contentItem.querySelector(".top-tabber__content p:not(.text-atom)");
      if (descEl) {
        const p = document.createElement("p");
        p.textContent = descEl.textContent.trim();
        col2.append(p);
      }
      const cta = contentItem.querySelector("a.cta");
      if (cta) {
        const link = document.createElement("a");
        link.href = cta.href;
        link.textContent = ((_a = cta.querySelector("span")) == null ? void 0 : _a.textContent.trim()) || cta.textContent.trim();
        const p = document.createElement("p");
        p.append(link);
        col2.append(p);
      }
      cells.push([label, col2]);
    });
    const block = WebImporter.Blocks.createBlock(document, {
      name: "Tabs Industry",
      cells
    });
    element.replaceWith(block);
  }

  // tools/importer/parsers/tabs-capabilities.js
  function parse5(element, { document }) {
    const cells = [];
    const tabsContainer = element.querySelector(".tabs.vertical");
    if (!tabsContainer) return;
    const triggers = tabsContainer.querySelectorAll(".tabs__trigger-list > button.tabs__trigger-item");
    const contentItems = tabsContainer.querySelectorAll(".tabs__content-list > .tabs__content-item");
    triggers.forEach((trigger, index) => {
      const contentItem = contentItems[index];
      if (!contentItem) return;
      const labelSpan = trigger.querySelector("span:first-child");
      const label = (labelSpan == null ? void 0 : labelSpan.textContent.trim()) || "";
      const col2 = document.createElement("div");
      const title = contentItem.querySelector(".side-tabber__title");
      if (title) {
        const h3 = document.createElement("h3");
        h3.textContent = title.textContent.trim();
        col2.append(h3);
      }
      const desc = contentItem.querySelector(".side-tabber__card-description p");
      if (desc) {
        const p = document.createElement("p");
        p.textContent = desc.textContent.trim();
        col2.append(p);
      }
      const cardLink = contentItem.querySelector("a.card");
      if (cardLink == null ? void 0 : cardLink.href) {
        const link = document.createElement("a");
        link.href = cardLink.href;
        link.textContent = (title == null ? void 0 : title.textContent.trim()) || "Learn more";
        const p = document.createElement("p");
        p.append(link);
        col2.append(p);
      }
      cells.push([label, col2]);
    });
    const block = WebImporter.Blocks.createBlock(document, {
      name: "Tabs Capabilities",
      cells
    });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-recognition.js
  function parse6(element, { document }) {
    const cells = [];
    const featuredCard = element.querySelector(":scope > a.card");
    if (featuredCard) {
      const col1 = document.createElement("div");
      const img = featuredCard.querySelector(".card__image img");
      if (img) {
        const image = document.createElement("img");
        image.src = img.src;
        image.alt = img.alt || "";
        col1.append(image);
      }
      const col2 = document.createElement("div");
      const badge = featuredCard.querySelector(".badge");
      if (badge) {
        const p = document.createElement("p");
        const em = document.createElement("em");
        em.textContent = badge.textContent.trim();
        p.append(em);
        col2.append(p);
      }
      const heading = featuredCard.querySelector("h2.heading");
      if (heading) {
        const h3 = document.createElement("h3");
        h3.textContent = heading.textContent.trim();
        col2.append(h3);
      }
      if (featuredCard.href) {
        const link = document.createElement("a");
        link.href = featuredCard.href;
        link.textContent = (heading == null ? void 0 : heading.textContent.trim()) || "Read more";
        const p = document.createElement("p");
        p.append(link);
        col2.append(p);
      }
      cells.push([col1, col2]);
    }
    const subCards = element.querySelectorAll(".analyst-recognition__grid-sub > a.card");
    subCards.forEach((card) => {
      const col1 = document.createElement("div");
      const col2 = document.createElement("div");
      const badge = card.querySelector(".badge");
      if (badge) {
        const p = document.createElement("p");
        const em = document.createElement("em");
        em.textContent = badge.textContent.trim();
        p.append(em);
        col2.append(p);
      }
      const heading = card.querySelector("h2.heading");
      if (heading) {
        const h3 = document.createElement("h3");
        h3.textContent = heading.textContent.trim();
        col2.append(h3);
      }
      if (card.href) {
        const link = document.createElement("a");
        link.href = card.href;
        link.textContent = (heading == null ? void 0 : heading.textContent.trim()) || "Read more";
        const p = document.createElement("p");
        p.append(link);
        col2.append(p);
      }
      cells.push([col1, col2]);
    });
    const block = WebImporter.Blocks.createBlock(document, {
      name: "Cards Recognition",
      cells
    });
    element.replaceWith(block);
  }

  // tools/importer/parsers/form.js
  function parse7(element, { document }) {
    const cells = [];
    const link = document.createElement("a");
    link.href = "/forms/contact-us.json";
    link.textContent = "/forms/contact-us.json";
    const p = document.createElement("p");
    p.append(link);
    cells.push([p]);
    const block = WebImporter.Blocks.createBlock(document, {
      name: "Form",
      cells
    });
    element.replaceWith(block);
  }

  // tools/importer/transformers/broadridge-cleanup.js
  function transform(hookName, element, payload) {
    if (hookName === "beforeTransform") {
      WebImporter.DOMUtils.remove(element, [
        "#snippet_1744805197482",
        "#geolocation",
        ".geolocation"
      ]);
      WebImporter.DOMUtils.remove(element, [
        "#onetrust-consent-sdk",
        ".onetrust-consent-sdk",
        "#onetrust-banner-sdk",
        ".cookie-banner",
        ".consent-dialog"
      ]);
      WebImporter.DOMUtils.remove(element, [
        ".search-panel",
        ".search-overlay",
        ".site-search"
      ]);
      WebImporter.DOMUtils.remove(element, [
        ".skip-to-content",
        '[aria-hidden="true"]:empty'
      ]);
    }
    if (hookName === "afterTransform") {
      WebImporter.DOMUtils.remove(element, [
        "header",
        "#site-header",
        ".site-header",
        "footer",
        ".site-footer"
      ]);
      WebImporter.DOMUtils.remove(element, [
        "iframe",
        "noscript",
        ".lottie-container",
        ".lottie-toggle",
        ".slider-controls",
        ".swiper-pagination",
        ".tabs__activator",
        ".tabs__icon-arrow",
        ".tabs__icon-accordion",
        "[data-nosnippet]"
      ]);
      const svgImages = element.querySelectorAll('img[src^="data:image/svg"]');
      svgImages.forEach((img) => img.remove());
    }
  }

  // tools/importer/transformers/broadridge-sections.js
  function transform2(hookName, element, payload) {
    var _a;
    if (hookName !== "afterTransform") return;
    const { document } = payload;
    const sections = (_a = payload.template) == null ? void 0 : _a.sections;
    if (!sections || sections.length < 2) return;
    const sectionEntries = [...sections].reverse();
    for (const section of sectionEntries) {
      const selectors = Array.isArray(section.selector) ? section.selector : [section.selector];
      let sectionEl = null;
      for (const sel of selectors) {
        sectionEl = element.querySelector(sel);
        if (sectionEl) break;
      }
      if (!sectionEl) continue;
      if (section.id !== "section-1") {
        const hr = document.createElement("hr");
        sectionEl.before(hr);
      }
      if (section.style) {
        const sectionMetadata = WebImporter.Blocks.createBlock(document, {
          name: "Section Metadata",
          cells: [["style", section.style]]
        });
        sectionEl.append(sectionMetadata);
      }
    }
  }

  // tools/importer/import-homepage.js
  var parsers = {
    "hero-corporate": parse,
    "cards-solutions": parse2,
    "carousel-insights": parse3,
    "tabs-industry": parse4,
    "tabs-capabilities": parse5,
    "cards-recognition": parse6,
    "form": parse7
  };
  var PAGE_TEMPLATE = {
    name: "homepage",
    description: "Broadridge corporate homepage with hero banner, product/service highlights, and corporate messaging",
    urls: [
      "https://www.broadridge.com/"
    ],
    blocks: [
      {
        name: "hero-corporate",
        instances: ["section.hero-deconstructed"]
      },
      {
        name: "cards-solutions",
        instances: [".featured-solutions__card-grid"]
      },
      {
        name: "carousel-insights",
        instances: [".insights__slider"]
      },
      {
        name: "tabs-industry",
        instances: [".top-tabber__wrap"]
      },
      {
        name: "tabs-capabilities",
        instances: [".side-tabber__wrap"]
      },
      {
        name: "cards-recognition",
        instances: [".analyst-recognition__grid"]
      },
      {
        name: "form",
        instances: [".contact-us__form"]
      }
    ],
    sections: [
      {
        id: "section-1",
        name: "Hero",
        selector: "section.hero-deconstructed",
        style: null,
        blocks: ["hero-corporate"],
        defaultContent: []
      },
      {
        id: "section-2",
        name: "Featured Solutions",
        selector: "section.featured-solutions",
        style: "light",
        blocks: ["cards-solutions"],
        defaultContent: [".featured-solutions__wrap > .section-header h2"]
      },
      {
        id: "section-3",
        name: "Insights",
        selector: "section.insights",
        style: "dark",
        blocks: ["carousel-insights"],
        defaultContent: [".insights__wrap > .section-header h2", ".insights__cta"]
      },
      {
        id: "section-4",
        name: "Industry Tabs",
        selector: "section.top-tabber",
        style: null,
        blocks: ["tabs-industry"],
        defaultContent: [".top-tabber__heading h2"]
      },
      {
        id: "section-5",
        name: "Capabilities Tabs",
        selector: "section.side-tabber",
        style: null,
        blocks: ["tabs-capabilities"],
        defaultContent: [".side-tabber__wrap > .section-header h2", ".side-tabber__wrap > .section-header .side-tabber__description"]
      },
      {
        id: "section-6",
        name: "Analyst Recognition",
        selector: "section.analyst-recognition",
        style: "light",
        blocks: ["cards-recognition"],
        defaultContent: [".analyst-recognition__wrap > .section-header h2", ".analyst-recognition__cta"]
      },
      {
        id: "section-7",
        name: "Contact Us",
        selector: "section.contact-us#abc",
        style: null,
        blocks: ["form"],
        defaultContent: [".contact-us__top .section-header h2", ".contact-us__top .section-header .text-atom"]
      }
    ]
  };
  var transformers = [
    transform,
    ...PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [transform2] : []
  ];
  function executeTransformers(hookName, element, payload) {
    const enhancedPayload = __spreadProps(__spreadValues({}, payload), {
      template: PAGE_TEMPLATE
    });
    transformers.forEach((transformerFn) => {
      try {
        transformerFn.call(null, hookName, element, enhancedPayload);
      } catch (e) {
        console.error(`Transformer failed at ${hookName}:`, e);
      }
    });
  }
  function findBlocksOnPage(document, template) {
    const pageBlocks = [];
    template.blocks.forEach((blockDef) => {
      blockDef.instances.forEach((selector) => {
        const elements = document.querySelectorAll(selector);
        if (elements.length === 0) {
          console.warn(`Block "${blockDef.name}" selector not found: ${selector}`);
        }
        elements.forEach((element) => {
          pageBlocks.push({
            name: blockDef.name,
            selector,
            element,
            section: blockDef.section || null
          });
        });
      });
    });
    console.log(`Found ${pageBlocks.length} block instances on page`);
    return pageBlocks;
  }
  var import_homepage_default = {
    transform: (payload) => {
      const { document, url, params } = payload;
      const main = document.body;
      executeTransformers("beforeTransform", main, payload);
      const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);
      pageBlocks.forEach((block) => {
        const parser = parsers[block.name];
        if (parser) {
          try {
            parser(block.element, { document, url, params });
          } catch (e) {
            console.error(`Failed to parse ${block.name} (${block.selector}):`, e);
          }
        } else {
          console.warn(`No parser found for block: ${block.name}`);
        }
      });
      executeTransformers("afterTransform", main, payload);
      const hr = document.createElement("hr");
      main.appendChild(hr);
      WebImporter.rules.createMetadata(main, document);
      WebImporter.rules.transformBackgroundImages(main, document);
      WebImporter.rules.adjustImageUrls(main, url, params.originalURL);
      const path = WebImporter.FileUtils.sanitizePath(
        new URL(params.originalURL).pathname.replace(/\/$/, "").replace(/\.html$/, "") || "/index"
      );
      return [{
        element: main,
        path,
        report: {
          title: document.title,
          template: PAGE_TEMPLATE.name,
          blocks: pageBlocks.map((b) => b.name)
        }
      }];
    }
  };
  return __toCommonJS(import_homepage_exports);
})();
