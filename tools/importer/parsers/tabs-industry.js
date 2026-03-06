/* global WebImporter */

/**
 * Parser for the tabs-industry block.
 * Extracts horizontal tabs from .top-tabber__wrap:
 * - 5 industry tabs: Asset Management, Capital Markets, Issuers, Wealth Management, Consumer Industries
 * - Each tab has: image, title, description, CTA link
 *
 * Target structure (tabs block):
 *   Each row: Col 1 = tab label | Col 2 = tab content (image + title + description + CTA)
 */
export default function parse(element, { document }) {
  const cells = [];

  const triggers = element.querySelectorAll('.tabs__trigger-list > button.tabs__trigger-item');
  const contentItems = element.querySelectorAll('.tabs__content-list > .tabs__content-item');

  triggers.forEach((trigger, index) => {
    const contentItem = contentItems[index];
    if (!contentItem) return;

    // Col 1: Tab label
    const labelSpan = trigger.querySelector('span:first-child');
    const label = labelSpan?.textContent.trim() || '';

    // Col 2: Tab content
    const col2 = document.createElement('div');

    const img = contentItem.querySelector('.top-tabber__content-item img');
    if (img && !img.src.startsWith('data:')) {
      const image = document.createElement('img');
      image.src = img.src;
      image.alt = img.alt || '';
      const p = document.createElement('p');
      p.append(image);
      col2.append(p);
    }

    const title = contentItem.querySelector('.top-tabber__content-title');
    if (title) {
      const h3 = document.createElement('h3');
      h3.textContent = title.textContent.trim();
      col2.append(h3);
    }

    const descEl = contentItem.querySelector('.top-tabber__content p:not(.text-atom)');
    if (descEl) {
      const p = document.createElement('p');
      p.textContent = descEl.textContent.trim();
      col2.append(p);
    }

    const cta = contentItem.querySelector('a.cta');
    if (cta) {
      const link = document.createElement('a');
      link.href = cta.href;
      link.textContent = cta.querySelector('span')?.textContent.trim() || cta.textContent.trim();
      const p = document.createElement('p');
      p.append(link);
      col2.append(p);
    }

    cells.push([label, col2]);
  });

  const block = WebImporter.Blocks.createBlock(document, {
    name: 'Tabs Industry',
    cells,
  });

  element.replaceWith(block);
}
