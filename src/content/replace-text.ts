import {storageKeys} from "../common/consts";
import {createPopup, deleteContainers} from "./create-popup";
import {StorageService} from "../common/storage.service";

const storageService = StorageService.getInstance();

export function startSearch() {
  storageService.getItems([storageKeys.LIKE_CATS, storageKeys.LIKE_DOGS])
    .then(function(data) {
      if (data && typeof data[storageKeys.LIKE_CATS] === 'boolean' && typeof data[storageKeys.LIKE_DOGS] === 'boolean') {
        const preferCats = data[storageKeys.LIKE_CATS] as boolean;
        const preferDogs = data[storageKeys.LIKE_DOGS] as boolean;
        replaceText(preferCats, preferDogs);
        addClickListeners();
      }
    });
}


function replaceText(preferCats: boolean, preferDogs: boolean) {
  if (preferCats === preferDogs) {
    return;
  }
  const elements = document.body.getElementsByTagName('*');

  Array.from(elements).forEach((element) => {
    const childNodes = element.childNodes;

    childNodes.forEach((childNode) => {
      if (childNode.nodeType === 3) {

        const text = childNode.nodeValue;
        if (text) {
          const searchRegex = preferCats ? /dog/gi : /cat/gi;
          const preferredAnimal = preferCats ? 'cat' : 'dog';
          const replaceValue = `<span class="meowoof-ext-highlight">${preferredAnimal}</span>`;
          const replacedText = text.replace(searchRegex, replaceValue);
          if (replacedText !== text) {
            const el = document.createElement('span');
            el.innerHTML = replacedText;
            element.replaceChild(el, childNode);
          }
        }
      }
    });
  });
}

function addClickListeners() {
  const clickableElements = document.querySelectorAll('span.meowoof-ext-highlight');
  clickableElements.forEach((el) => {
    el.addEventListener('click', function(event) {
      onHighlightedClick(event as PointerEvent);
    });
  });
}

function onHighlightedClick(event: PointerEvent) {
  deleteContainers();

  storageService.getItems([storageKeys.LIKE_CATS, storageKeys.LIKE_DOGS]).then((data) => {
    if (
      !data
      || typeof data[storageKeys.LIKE_CATS] !== 'boolean'
      || typeof data[storageKeys.LIKE_DOGS] !== 'boolean'
      || data[storageKeys.LIKE_CATS] === data[storageKeys.LIKE_DOGS]
    ) {
      return;
    }

    const likeCats = data[storageKeys.LIKE_CATS] as boolean;
    const likeDogs = data[storageKeys.LIKE_DOGS] as boolean;
    const preferCats = likeCats && !likeDogs;

    const popup = createPopup(preferCats, event);
    document.body.append(popup);
  });
}
