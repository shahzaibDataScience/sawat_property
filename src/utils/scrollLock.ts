/**
 * Safe body scroll lock utility that prevents background page jump
 * and prevents layout shift by compensating for scrollbar width.
 */

let savedScrollY = 0;
let isLocked = false;

export function lockBodyScroll(): number {
  if (isLocked) return savedScrollY;

  savedScrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;

  // Calculate scrollbar width to prevent layout shift
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

  // Lock body without jumping
  document.body.style.position = 'fixed';
  document.body.style.top = `-${savedScrollY}px`;
  document.body.style.left = '0';
  document.body.style.right = '0';
  document.body.style.width = '100%';
  document.body.style.overflow = 'hidden';

  if (scrollbarWidth > 0) {
    document.body.style.paddingRight = `${scrollbarWidth}px`;
  }

  isLocked = true;
  return savedScrollY;
}

export function unlockBodyScroll(targetScrollY?: number): void {
  if (!isLocked) return;

  const restoreY = typeof targetScrollY === 'number' ? targetScrollY : savedScrollY;

  // Restore body styles
  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.left = '';
  document.body.style.right = '';
  document.body.style.width = '';
  document.body.style.overflow = '';
  document.body.style.paddingRight = '';

  isLocked = false;

  // Restore exact scroll position
  window.scrollTo({
    top: restoreY,
    left: 0,
    behavior: 'instant' as ScrollBehavior,
  });
}

export function getSavedScrollY(): number {
  return savedScrollY;
}
