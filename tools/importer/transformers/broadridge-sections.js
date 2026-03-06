/* global WebImporter */

/**
 * Broadridge section transformer.
 * Adds section breaks (<hr>) between sections and creates Section Metadata blocks
 * for sections with distinct background styling.
 *
 * Runs in afterTransform hook (after block parsing, before final metadata).
 */
export default function transform(hookName, element, payload) {
  if (hookName !== 'afterTransform') return;

  const { document } = payload;
  const sections = payload.template?.sections;
  if (!sections || sections.length < 2) return;

  // Process sections in reverse order to avoid offset issues when inserting elements
  const sectionEntries = [...sections].reverse();

  for (const section of sectionEntries) {
    // Try selector(s) to find the section element
    const selectors = Array.isArray(section.selector) ? section.selector : [section.selector];
    let sectionEl = null;
    for (const sel of selectors) {
      sectionEl = element.querySelector(sel);
      if (sectionEl) break;
    }
    if (!sectionEl) continue;

    // Add <hr> before this section (except the first section)
    if (section.id !== 'section-1') {
      const hr = document.createElement('hr');
      sectionEl.before(hr);
    }

    // Add Section Metadata block if section has a style
    if (section.style) {
      const sectionMetadata = WebImporter.Blocks.createBlock(document, {
        name: 'Section Metadata',
        cells: [['style', section.style]],
      });
      sectionEl.append(sectionMetadata);
    }
  }
}
