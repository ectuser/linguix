export function clickOutsideElementHandle(element: HTMLElement) {
  const outsideClickListener = (event: MouseEvent) => {
    // @ts-ignore
    if (!element.contains(event.target)) { // or use: event.target.closest(selector) === null
      removeClickListener();
      element.remove();
    }
  }

  const removeClickListener = () => {
    document.removeEventListener('click', outsideClickListener);
  }

  document.addEventListener('click', outsideClickListener);
}
