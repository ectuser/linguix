export function insertGoogleFonts() {
  const head = document.getElementsByTagName('head')[0];

  const link = document.createElement('link');
  link.rel = 'preconnect';
  link.href = 'https://fonts.googleapis.com';

  const secondLink = document.createElement('link');
  secondLink.rel = 'preconnect';
  secondLink.href = 'https://fonts.gstatic.com';
  secondLink.crossOrigin = 'crossOrigin';

  const thirdLink = document.createElement('link');
  thirdLink.href = 'https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&family=Nunito+Sans:wght@400;700&display=swap';
  thirdLink.rel = 'stylesheet';

  head.append(link);
  head.append(secondLink);
  head.append(thirdLink);
}
