export class StorageService {
  private static instance?: StorageService;

  private constructor() {}

  static getInstance(): StorageService {
    return StorageService.instance ?? new StorageService();
  }

  getItems(keys: string[]): Promise<{[p: string]: unknown} | undefined> {
    return new Promise(function(resolve) {
      chrome.storage.sync.get(keys, function(data) {
        resolve(data);
      });
    });
  }

  setItems(data: {[p: string]: unknown}): Promise<void> {
    return new Promise(function(resolve) {
      chrome.storage.sync.set(data, function() {
        resolve();
      });
    });
  }
}
