/* global WebImporter */

/**
 * Parser for the carousel-insights block.
 * Extracts insight article cards from .insights__slider:
 * - Each slide has: image, category badge, heading, link
 *
 * Target structure (carousel block):
 *   Each row: Col 1 = image | Col 2 = category + heading + link
 */
export default function parse(element, { document }) {
  const cells = [];

  const slides = element.querySelectorAll('.swiper-wrapper > a.card');
  slides.forEach((slide) => {
    // Col 1: Image
    const col1 = document.createElement('div');
    const img = slide.querySelector('.card__image img');
    if (img) {
      const image = document.createElement('img');
      image.src = img.src;
      image.alt = img.alt || '';
      col1.append(image);
    }

    // Col 2: Badge + heading + link
    const col2 = document.createElement('div');

    const badge = slide.querySelector('.badge');
    if (badge) {
      const p = document.createElement('p');
      const em = document.createElement('em');
      em.textContent = badge.textContent.trim();
      p.append(em);
      col2.append(p);
    }

    const heading = slide.querySelector('h2.heading');
    if (heading) {
      const h3 = document.createElement('h3');
      h3.textContent = heading.textContent.trim();
      col2.append(h3);
    }

    if (slide.href) {
      const link = document.createElement('a');
      link.href = slide.href;
      link.textContent = heading?.textContent.trim() || 'Read more';
      const p = document.createElement('p');
      p.append(link);
      col2.append(p);
    }

    cells.push([col1, col2]);
  });

  const block = WebImporter.Blocks.createBlock(document, {
    name: 'Carousel Insights',
    cells,
  });

  element.replaceWith(block);
}
