import {crossIcon} from "./images/cross";
import {deleteContainer} from "../common/utils";
import {clickOutsideElementHandle} from "./click-outside";

export function createPopup(preferCats: boolean): HTMLDivElement {
  const container = document.createElement('div');
  container.className = 'meowoof-ext-highlight__container';
  container.style.position = 'fixed';
  container.style.top = '50%';
  container.style.left = '50%';

  const header = createHeader(preferCats);
  const image = createImage(preferCats);

  container.append(header);
  container.append(image);

  clickOutsideElementHandle(container);

  return container;
}

function createHeader(preferCats: boolean): HTMLDivElement {
  const header = document.createElement('div');

  header.className = 'meowoof-ext-highlight__header';

  const conditionalText = preferCats ? 'cat' : 'dog';

  const text = document.createElement('div');
  text.innerHTML = '<span class="meowoof-ext-highlight__bold">Look! </span> It\'s a ' + conditionalText + '!';
  text.className = 'meowoof-ext-highlight__title'

  const cross = createCross();

  header.append(text);
  header.append(cross);

  return header;
}

function createCross(): HTMLDivElement {
  const cross = document.createElement('div')
  cross.className = 'meowoof-ext-highlight__cross';
  cross.innerHTML = crossIcon;

  cross.addEventListener('click', deleteContainer);

  return cross;
}

function createImage(preferCats: boolean): HTMLDivElement {
  const container = document.createElement('div');
  container.className = 'meowoof-ext-highlight__image-container';

  const image = document.createElement('img');
  image.className = 'meowoof-ext-highlight__image';

  loadImage(preferCats).then((data) => {
    image.src = preferCats ? (data as CatImageResponse)[0].url : (data as DogImageResponse).message;
  });

  container.append(image);

  return container;
}

interface CatImageResponse extends Array<CatImageItem> {}

interface CatImageItem {
  id: string;
  url: string;
  width: number;
  height: number;
  sub_id: string;
  created_at: Date;
  original_filename: string;
}

interface DogImageResponse {
  message: string;
  status: string;
}

function loadImage(preferCat: boolean): Promise<CatImageResponse | DogImageResponse> {
  const catUrl = 'https://api.thecatapi.com/v1/images/search';
  const dogUrl = 'https://cat.ceo/api/breeds/image/random';

  const url = preferCat ? catUrl : dogUrl;

  return fetch(url).then((res) => res.json())
}
