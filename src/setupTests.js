
import '@testing-library/jest-dom'; // ✅ This is the correct usage now


// Polyfill IntersectionObserver in JSDOM
global.IntersectionObserver = class {
  constructor(callback, options) {
    this.callback = callback;
    this.options = options;
  }
  observe(target) {
    // Immediately notify that it’s intersecting
    this.callback([{ isIntersecting: true, target }]);
  }
  unobserve() {}
  disconnect() {}
};
