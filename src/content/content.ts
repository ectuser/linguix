import {startSearch} from "./replace-text";
import {Message} from "../common/models";
import {Receiver} from "../common/receiver";
import {StorageService} from "../common/storage.service";
import {storageKeys} from "../common/consts";
import {insertGoogleFonts} from "./insert-fonts";

const matcher: Record<string, (message: Message) => unknown> = {};

const receiver = new Receiver(matcher);
const storage = StorageService.getInstance();

document.addEventListener('DOMContentLoaded', () => {
  storage.getItems([storageKeys.EXTENSION_ENABLED]).then((data) => {
    if (data && data[storageKeys.EXTENSION_ENABLED]) {
      receiver.receive();
      insertGoogleFonts();

      startSearch();
    }
  });
});


