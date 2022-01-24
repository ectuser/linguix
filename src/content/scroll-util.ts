export function scrollUtil(event: PointerEvent) {
  const popupHeight = 270;
  const offset = 20;
  const middleOfPage = window.screen.height / 2;

  const append = event.clientY > middleOfPage - offset ? 'top' : 'bottom';

  const x = event.pageX;
  const y = append === 'top' ? event.pageY - offset : event.pageY + popupHeight + offset;

  return {x, y};
}
