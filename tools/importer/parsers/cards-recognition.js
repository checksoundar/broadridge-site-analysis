/* global WebImporter */

/**
 * Parser for the cards-recognition block.
 * Extracts analyst recognition cards from .analyst-recognition__grid:
 * - 1 large featured card (with background image, badge, heading, link)
 * - 3 smaller cards (badge, heading, link - no image)
 *
 * Target structure (cards block):
 *   Each row: Col 1 = image (or empty) | Col 2 = badge + heading + link
 */
export default function parse(element, { document }) {
  const cells = [];

  // Large featured card
  const featuredCard = element.querySelector(':scope > a.card');
  if (featuredCard) {
    const col1 = document.createElement('div');
    const img = featuredCard.querySelector('.card__image img');
    if (img) {
      const image = document.createElement('img');
      image.src = img.src;
      image.alt = img.alt || '';
      col1.append(image);
    }

    const col2 = document.createElement('div');
    const badge = featuredCard.querySelector('.badge');
    if (badge) {
      const p = document.createElement('p');
      const em = document.createElement('em');
      em.textContent = badge.textContent.trim();
      p.append(em);
      col2.append(p);
    }

    const heading = featuredCard.querySelector('h2.heading');
    if (heading) {
      const h3 = document.createElement('h3');
      h3.textContent = heading.textContent.trim();
      col2.append(h3);
    }

    if (featuredCard.href) {
      const link = document.createElement('a');
      link.href = featuredCard.href;
      link.textContent = heading?.textContent.trim() || 'Read more';
      const p = document.createElement('p');
      p.append(link);
      col2.append(p);
    }

    cells.push([col1, col2]);
  }

  // Smaller sub-grid cards
  const subCards = element.querySelectorAll('.analyst-recognition__grid-sub > a.card');
  subCards.forEach((card) => {
    const col1 = document.createElement('div');

    const col2 = document.createElement('div');
    const badge = card.querySelector('.badge');
    if (badge) {
      const p = document.createElement('p');
      const em = document.createElement('em');
      em.textContent = badge.textContent.trim();
      p.append(em);
      col2.append(p);
    }

    const heading = card.querySelector('h2.heading');
    if (heading) {
      const h3 = document.createElement('h3');
      h3.textContent = heading.textContent.trim();
      col2.append(h3);
    }

    if (card.href) {
      const link = document.createElement('a');
      link.href = card.href;
      link.textContent = heading?.textContent.trim() || 'Read more';
      const p = document.createElement('p');
      p.append(link);
      col2.append(p);
    }

    cells.push([col1, col2]);
  });

  const block = WebImporter.Blocks.createBlock(document, {
    name: 'Cards Recognition',
    cells,
  });

  element.replaceWith(block);
}
