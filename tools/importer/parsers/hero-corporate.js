/* global WebImporter */

/**
 * Parser for the hero-corporate block.
 * Extracts hero content from section.hero-deconstructed:
 * - Background image
 * - Main heading (h1) + description + CTA
 * - Two promotional mini-cards with badge, heading, and link
 *
 * Target structure (hero block):
 *   Row 1: background image
 *   Row 2: heading + description + CTA link
 */
export default function parse(element, { document }) {
  const cells = [];

  // Extract background image from the main article card
  const mainArticle = element.querySelector('article.card');
  const bgImg = mainArticle?.querySelector('.card__image picture img');
  if (bgImg) {
    const img = document.createElement('img');
    img.src = bgImg.src;
    img.alt = bgImg.alt || '';
    cells.push([img]);
  }

  // Extract main heading and CTA
  const contentDiv = document.createElement('div');

  const h1 = element.querySelector('h1');
  if (h1) {
    const heading = document.createElement('h1');
    heading.textContent = h1.textContent.trim();
    contentDiv.append(heading);
  }

  const description = element.querySelector('#lottie-description');
  if (description) {
    const p = document.createElement('p');
    p.textContent = description.textContent.trim();
    contentDiv.append(p);
  }

  const mainCta = mainArticle?.querySelector('.card__cta a.cta');
  if (mainCta) {
    const link = document.createElement('a');
    link.href = mainCta.href;
    link.textContent = mainCta.querySelector('span')?.textContent.trim() || mainCta.textContent.trim();
    const p = document.createElement('p');
    p.append(link);
    contentDiv.append(p);
  }

  // Extract promotional mini-cards
  const miniCards = element.querySelectorAll(':scope > a.card');
  miniCards.forEach((card) => {
    const badge = card.querySelector('.badge');
    const heading = card.querySelector('h3.heading');
    if (badge || heading) {
      const cardP = document.createElement('p');
      if (badge) {
        const strong = document.createElement('strong');
        strong.textContent = badge.textContent.trim();
        cardP.append(strong);
        cardP.append(document.createTextNode(' - '));
      }
      if (heading) {
        const link = document.createElement('a');
        link.href = card.href;
        link.textContent = heading.textContent.trim();
        cardP.append(link);
      }
      contentDiv.append(cardP);
    }
  });

  cells.push([contentDiv]);

  const block = WebImporter.Blocks.createBlock(document, {
    name: 'Hero Corporate',
    cells,
  });

  element.replaceWith(block);
}
