/* global WebImporter */

/**
 * Parser for the tabs-capabilities block.
 * Extracts vertical/side tabs from .side-tabber__wrap .tabs.vertical:
 * - 7 capability tabs with title, description, and CTA link
 *
 * Target structure (tabs block):
 *   Each row: Col 1 = tab label | Col 2 = tab content (title + description + CTA)
 */
export default function parse(element, { document }) {
  const cells = [];

  const tabsContainer = element.querySelector('.tabs.vertical');
  if (!tabsContainer) return;

  const triggers = tabsContainer.querySelectorAll('.tabs__trigger-list > button.tabs__trigger-item');
  const contentItems = tabsContainer.querySelectorAll('.tabs__content-list > .tabs__content-item');

  triggers.forEach((trigger, index) => {
    const contentItem = contentItems[index];
    if (!contentItem) return;

    // Col 1: Tab label
    const labelSpan = trigger.querySelector('span:first-child');
    const label = labelSpan?.textContent.trim() || '';

    // Col 2: Tab content
    const col2 = document.createElement('div');

    const title = contentItem.querySelector('.side-tabber__title');
    if (title) {
      const h3 = document.createElement('h3');
      h3.textContent = title.textContent.trim();
      col2.append(h3);
    }

    const desc = contentItem.querySelector('.side-tabber__card-description p');
    if (desc) {
      const p = document.createElement('p');
      p.textContent = desc.textContent.trim();
      col2.append(p);
    }

    const cardLink = contentItem.querySelector('a.card');
    if (cardLink?.href) {
      const link = document.createElement('a');
      link.href = cardLink.href;
      link.textContent = title?.textContent.trim() || 'Learn more';
      const p = document.createElement('p');
      p.append(link);
      col2.append(p);
    }

    cells.push([label, col2]);
  });

  const block = WebImporter.Blocks.createBlock(document, {
    name: 'Tabs Capabilities',
    cells,
  });

  element.replaceWith(block);
}
