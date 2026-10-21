import test from 'node:test';
import assert from 'node:assert/strict';
import { lockBodyScroll, unlockBodyScroll, getSavedScrollY } from './scrollLock.ts';

// Mock minimal DOM environment if running in node:test
if (typeof window === 'undefined') {
  (global as any).window = {
    scrollY: 450,
    innerWidth: 1024,
    scrollTo: (options: any) => {
      (global as any).window.scrollY = typeof options === 'object' ? options.top : options;
    },
  };
  (global as any).document = {
    documentElement: {
      clientWidth: 1008,
      scrollTop: 450,
    },
    body: {
      style: {},
    },
  };
}

test('lockBodyScroll sets body styles without throwing and preserves scrollY', () => {
  const y = lockBodyScroll();
  assert.equal(y, 450);
  assert.equal(document.body.style.position, 'fixed');
  assert.equal(document.body.style.overflow, 'hidden');
  assert.equal(document.body.style.top, '-450px');
});

test('unlockBodyScroll clears body styles and restores scroll', () => {
  unlockBodyScroll(450);
  assert.equal(document.body.style.position, '');
  assert.equal(document.body.style.overflow, '');
  assert.equal(document.body.style.top, '');
  assert.equal(window.scrollY, 450);
});
