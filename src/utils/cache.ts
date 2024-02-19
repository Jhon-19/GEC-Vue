// the encapsulation of window.localStorage

function renameKey(key: string) {
  return `gec-${key}`;
}

class LocalCache {
  setCache(key: string, value: any) {
    window.localStorage.setItem(renameKey(key), JSON.stringify(value));
  }

  getCache(key: string) {
    const value = window.localStorage.getItem(renameKey(key));
    if (value) {
      return JSON.parse(value);
    }
  }

  deleteCache(key: string) {
    window.localStorage.removeItem(renameKey(key));
  }

  clearCache() {
    window.localStorage.clear();
  }
}

const localCache = new LocalCache();

export default localCache;
