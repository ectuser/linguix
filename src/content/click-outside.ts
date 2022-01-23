export function clickOutsideElementHandle(element: HTMLElement) {
  const outsideClickListener = (event: MouseEvent) => {
    if (!element.contains(event.target as Node)) {
      removeClickListener();
      element.remove();
    }
  }

  const removeClickListener = () => {
    document.removeEventListener('click', outsideClickListener);
  }

  document.addEventListener('click', outsideClickListener);
}
