/* global WebImporter */

/**
 * Parser for the form block.
 * Extracts contact form from .contact-us__form:
 * - Creates a Form block with a link to a form definition JSON
 *
 * Target structure (form block):
 *   Row 1: link to form definition
 */
export default function parse(element, { document }) {
  const cells = [];

  // Create a link to a form definition placeholder
  const link = document.createElement('a');
  link.href = '/forms/contact-us.json';
  link.textContent = '/forms/contact-us.json';
  const p = document.createElement('p');
  p.append(link);

  cells.push([p]);

  const block = WebImporter.Blocks.createBlock(document, {
    name: 'Form',
    cells,
  });

  element.replaceWith(block);
}
