import { cache } from 'swr';

function getStorage(mode: 'local' | 'session') {
  switch (mode) {
    case 'local':
      return localStorage;
    case 'session':
      return sessionStorage;
    default: {
      throw new Error(
        `Invalid mode ${mode}, it must be either local or session.`
      );
    }
  }
}

// the value of SWR could be either undefined or an object
// if you had other values you will need to check them here
// and parse it correctly (e.g. use Number for number)
function baseParser(value: string): any {
  return value === 'undefined' ? undefined : JSON.parse(value);
}

export function syncWithStorage(
  mode: 'local' | 'session',
  parser = baseParser
) {
  const storage = getStorage(mode);

  // Get all key from the storage
  for (let [key, data] of Object.entries(storage)) {
    if (!key.startsWith('swr-')) continue;
    // update SWR cache with the value from the storage
    cache.set(
      key.slice(4),
      parser(data).swrValue,
      false // don't notify the cache change, no-one is listening yet anyway
    );
  }

  // Subscribe to SWR cache changes in the future
  return cache.subscribe(() => {
    // get all the keys in cache
    const keys = cache.keys();
    // save each key in SWR with the prefix swr-
    for (let key of keys) {
      storage.setItem(
        `swr-${key}`,
        JSON.stringify({ swrValue: cache.get(key) })
      );
    }
  });
}

export function syncWithLocalStorage(parser?: typeof baseParser) {
  return syncWithStorage('local', parser);
}

export function syncWithSessionStorage(parser?: typeof baseParser) {
  return syncWithStorage('session', parser);
}
