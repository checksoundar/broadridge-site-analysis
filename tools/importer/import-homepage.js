/* eslint-disable */
/* global WebImporter */

// PARSER IMPORTS
import heroCorporateParser from './parsers/hero-corporate.js';
import cardsSolutionsParser from './parsers/cards-solutions.js';
import carouselInsightsParser from './parsers/carousel-insights.js';
import tabsIndustryParser from './parsers/tabs-industry.js';
import tabsCapabilitiesParser from './parsers/tabs-capabilities.js';
import cardsRecognitionParser from './parsers/cards-recognition.js';
import formParser from './parsers/form.js';

// TRANSFORMER IMPORTS
import broadridgeCleanupTransformer from './transformers/broadridge-cleanup.js';
import broadridgeSectionsTransformer from './transformers/broadridge-sections.js';

// PARSER REGISTRY
const parsers = {
  'hero-corporate': heroCorporateParser,
  'cards-solutions': cardsSolutionsParser,
  'carousel-insights': carouselInsightsParser,
  'tabs-industry': tabsIndustryParser,
  'tabs-capabilities': tabsCapabilitiesParser,
  'cards-recognition': cardsRecognitionParser,
  'form': formParser,
};

// PAGE TEMPLATE CONFIGURATION
const PAGE_TEMPLATE = {
  name: 'homepage',
  description: 'Broadridge corporate homepage with hero banner, product/service highlights, and corporate messaging',
  urls: [
    'https://www.broadridge.com/'
  ],
  blocks: [
    {
      name: 'hero-corporate',
      instances: ['section.hero-deconstructed']
    },
    {
      name: 'cards-solutions',
      instances: ['.featured-solutions__card-grid']
    },
    {
      name: 'carousel-insights',
      instances: ['.insights__slider']
    },
    {
      name: 'tabs-industry',
      instances: ['.top-tabber__wrap']
    },
    {
      name: 'tabs-capabilities',
      instances: ['.side-tabber__wrap']
    },
    {
      name: 'cards-recognition',
      instances: ['.analyst-recognition__grid']
    },
    {
      name: 'form',
      instances: ['.contact-us__form']
    }
  ],
  sections: [
    {
      id: 'section-1',
      name: 'Hero',
      selector: 'section.hero-deconstructed',
      style: null,
      blocks: ['hero-corporate'],
      defaultContent: []
    },
    {
      id: 'section-2',
      name: 'Featured Solutions',
      selector: 'section.featured-solutions',
      style: 'light',
      blocks: ['cards-solutions'],
      defaultContent: ['.featured-solutions__wrap > .section-header h2']
    },
    {
      id: 'section-3',
      name: 'Insights',
      selector: 'section.insights',
      style: 'dark',
      blocks: ['carousel-insights'],
      defaultContent: ['.insights__wrap > .section-header h2', '.insights__cta']
    },
    {
      id: 'section-4',
      name: 'Industry Tabs',
      selector: 'section.top-tabber',
      style: null,
      blocks: ['tabs-industry'],
      defaultContent: ['.top-tabber__heading h2']
    },
    {
      id: 'section-5',
      name: 'Capabilities Tabs',
      selector: 'section.side-tabber',
      style: null,
      blocks: ['tabs-capabilities'],
      defaultContent: ['.side-tabber__wrap > .section-header h2', '.side-tabber__wrap > .section-header .side-tabber__description']
    },
    {
      id: 'section-6',
      name: 'Analyst Recognition',
      selector: 'section.analyst-recognition',
      style: 'light',
      blocks: ['cards-recognition'],
      defaultContent: ['.analyst-recognition__wrap > .section-header h2', '.analyst-recognition__cta']
    },
    {
      id: 'section-7',
      name: 'Contact Us',
      selector: 'section.contact-us#abc',
      style: null,
      blocks: ['form'],
      defaultContent: ['.contact-us__top .section-header h2', '.contact-us__top .section-header .text-atom']
    }
  ]
};

// TRANSFORMER REGISTRY
const transformers = [
  broadridgeCleanupTransformer,
  ...(PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [broadridgeSectionsTransformer] : []),
];

/**
 * Execute all page transformers for a specific hook
 */
function executeTransformers(hookName, element, payload) {
  const enhancedPayload = {
    ...payload,
    template: PAGE_TEMPLATE,
  };

  transformers.forEach((transformerFn) => {
    try {
      transformerFn.call(null, hookName, element, enhancedPayload);
    } catch (e) {
      console.error(`Transformer failed at ${hookName}:`, e);
    }
  });
}

/**
 * Find all blocks on the page based on the embedded template configuration
 */
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
          section: blockDef.section || null,
        });
      });
    });
  });

  console.log(`Found ${pageBlocks.length} block instances on page`);
  return pageBlocks;
}

// EXPORT DEFAULT CONFIGURATION
export default {
  transform: (payload) => {
    const { document, url, params } = payload;

    const main = document.body;

    // 1. Execute beforeTransform transformers (initial cleanup)
    executeTransformers('beforeTransform', main, payload);

    // 2. Find blocks on page using embedded template
    const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);

    // 3. Parse each block using registered parsers
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

    // 4. Execute afterTransform transformers (final cleanup + section breaks)
    executeTransformers('afterTransform', main, payload);

    // 5. Apply WebImporter built-in rules
    const hr = document.createElement('hr');
    main.appendChild(hr);
    WebImporter.rules.createMetadata(main, document);
    WebImporter.rules.transformBackgroundImages(main, document);
    WebImporter.rules.adjustImageUrls(main, url, params.originalURL);

    // 6. Generate sanitized path
    const path = WebImporter.FileUtils.sanitizePath(
      new URL(params.originalURL).pathname.replace(/\/$/, '').replace(/\.html$/, '') || '/index'
    );

    return [{
      element: main,
      path,
      report: {
        title: document.title,
        template: PAGE_TEMPLATE.name,
        blocks: pageBlocks.map((b) => b.name),
      },
    }];
  },
};
