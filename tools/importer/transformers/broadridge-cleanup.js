/* global WebImporter */

/**
 * Broadridge site-wide cleanup transformer.
 * Removes non-authorable elements from the DOM before and after parsing.
 */
export default function transform(hookName, element, payload) {
  if (hookName === 'beforeTransform') {
    // Remove geolocation/snippet overlays
    WebImporter.DOMUtils.remove(element, [
      '#snippet_1744805197482',
      '#geolocation',
      '.geolocation',
    ]);

    // Remove cookie/consent banners
    WebImporter.DOMUtils.remove(element, [
      '#onetrust-consent-sdk',
      '.onetrust-consent-sdk',
      '#onetrust-banner-sdk',
      '.cookie-banner',
      '.consent-dialog',
    ]);

    // Remove search panel overlays
    WebImporter.DOMUtils.remove(element, [
      '.search-panel',
      '.search-overlay',
      '.site-search',
    ]);

    // Remove skip links and hidden accessibility helpers
    WebImporter.DOMUtils.remove(element, [
      '.skip-to-content',
      '[aria-hidden="true"]:empty',
    ]);
  }

  if (hookName === 'afterTransform') {
    // Remove header and footer (auto-populated in EDS)
    WebImporter.DOMUtils.remove(element, [
      'header',
      '#site-header',
      '.site-header',
      'footer',
      '.site-footer',
    ]);

    // Remove non-content elements
    WebImporter.DOMUtils.remove(element, [
      'iframe',
      'noscript',
      '.lottie-container',
      '.lottie-toggle',
      '.slider-controls',
      '.swiper-pagination',
      '.tabs__activator',
      '.tabs__icon-arrow',
      '.tabs__icon-accordion',
      '[data-nosnippet]',
    ]);

    // Remove SVG data URI images (decorative icons)
    const svgImages = element.querySelectorAll('img[src^="data:image/svg"]');
    svgImages.forEach((img) => img.remove());
  }
}
