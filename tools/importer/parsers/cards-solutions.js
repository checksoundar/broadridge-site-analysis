/* global WebImporter */

/**
 * Parser for the cards-solutions block.
 * Extracts solution cards from .featured-solutions__card-grid:
 * - Each card has: icon image, title, description, link
 *
 * Target structure (cards block):
 *   Each row: Col 1 = icon image | Col 2 = title + description + link
 */
export default function parse(element, { document }) {
  const cells = [];

  const cards = element.querySelectorAll('a.card');
  cards.forEach((card) => {
    // Col 1: Icon image
    const img = card.querySelector('.card__image img');
    const col1 = document.createElement('div');
    if (img) {
      const image = document.createElement('img');
      image.src = img.src;
      image.alt = img.alt || '';
      col1.append(image);
    }

    // Col 2: Title + description + link
    const col2 = document.createElement('div');

    const title = card.querySelector('.heading');
    if (title) {
      const h3 = document.createElement('h3');
      h3.textContent = title.textContent.trim();
      col2.append(h3);
    }

    const desc = card.querySelector('.text-atom p');
    if (desc) {
      const p = document.createElement('p');
      p.textContent = desc.textContent.trim();
      col2.append(p);
    }

    // Card link
    if (card.href) {
      const link = document.createElement('a');
      link.href = card.href;
      link.textContent = title?.textContent.trim() || 'Learn more';
      const p = document.createElement('p');
      p.append(link);
      col2.append(p);
    }

    cells.push([col1, col2]);
  });

  const block = WebImporter.Blocks.createBlock(document, {
    name: 'Cards Solutions',
    cells,
  });

  element.replaceWith(block);
}
