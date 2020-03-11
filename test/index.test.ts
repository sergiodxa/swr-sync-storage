import { cache } from 'swr';
import {
  syncWithStorage,
  syncWithLocalStorage,
  syncWithSessionStorage,
} from '../src';

describe('SWR Sync Storage', () => {
  beforeEach(() => {
    cache.clear();
    localStorage.clear();
    sessionStorage.clear();
  });

  describe(syncWithStorage, () => {
    test('should sync existing localStorage keys to the SWR cache', () => {
      localStorage.setItem(
        'swr-key-1',
        JSON.stringify({ swrValue: { key: 1 } })
      );
      localStorage.setItem(
        'swr-key-2',
        JSON.stringify({ swrValue: { key: 2 } })
      );

      const remove = syncWithStorage('local');
      remove();

      expect(cache.keys()).toEqual(['key-1', 'key-2']);
      expect(cache.get('key-1')).toEqual({ key: 1 });
      expect(cache.get('key-2')).toEqual({ key: 2 });
    });

    test('should sync new SWR cache keys to localStorage', () => {
      const remove = syncWithStorage('local');

      cache.set('key-1', { key: 1 });
      cache.set('key-2', { key: 2 });

      remove();

      expect(localStorage.getItem('swr-key-1')).toBe(
        JSON.stringify({ swrValue: { key: 1 } })
      );
      expect(localStorage.getItem('swr-key-2')).toBe(
        JSON.stringify({ swrValue: { key: 2 } })
      );
    });

    test('should sync existing sessionStorage keys to the SWR cache', () => {
      sessionStorage.setItem(
        'swr-key-1',
        JSON.stringify({ swrValue: { key: 1 } })
      );
      sessionStorage.setItem(
        'swr-key-2',
        JSON.stringify({ swrValue: { key: 2 } })
      );

      const remove = syncWithStorage('session');
      remove();

      expect(cache.keys()).toEqual(['key-1', 'key-2']);
      expect(cache.get('key-1')).toEqual({ key: 1 });
      expect(cache.get('key-2')).toEqual({ key: 2 });
    });

    test('should sync new SWR cache keys to sessionStorage', () => {
      const remove = syncWithStorage('session');

      cache.set('key-1', { key: 1 });
      cache.set('key-2', { key: 2 });

      remove();

      expect(sessionStorage.getItem('swr-key-1')).toBe(
        JSON.stringify({ swrValue: { key: 1 } })
      );
      expect(sessionStorage.getItem('swr-key-2')).toBe(
        JSON.stringify({ swrValue: { key: 2 } })
      );
    });

    test('should use custom parser', () => {
      localStorage.setItem('swr-key-1', '123');
      localStorage.setItem(
        'swr-key-2',
        JSON.stringify({ swrValue: { key: 2 } })
      );
      const remove = syncWithStorage('local', value => {
        const number = Number(value);
        if (Number.isNaN(number)) return JSON.parse(value);
        return { swrValue: number };
      });
      remove();
      expect(cache.get('key-1')).toBe(123);
      expect(cache.get('key-2')).toEqual({ key: 2 });
    });
  });

  describe(syncWithLocalStorage, () => {
    test('should sync existing localStorage keys to the SWR cache', () => {
      localStorage.setItem(
        'swr-key-1',
        JSON.stringify({ swrValue: { key: 1 } })
      );
      localStorage.setItem(
        'swr-key-2',
        JSON.stringify({ swrValue: { key: 2 } })
      );

      const remove = syncWithLocalStorage();
      remove();

      expect(cache.keys()).toEqual(['key-1', 'key-2']);
      expect(cache.get('key-1')).toEqual({ key: 1 });
      expect(cache.get('key-2')).toEqual({ key: 2 });
    });

    test('should sync new SWR cache keys to localStorage', () => {
      const remove = syncWithLocalStorage();

      cache.set('key-1', { key: 1 });
      cache.set('key-2', { key: 2 });

      remove();

      expect(localStorage.getItem('swr-key-1')).toBe(
        JSON.stringify({ swrValue: { key: 1 } })
      );
      expect(localStorage.getItem('swr-key-2')).toBe(
        JSON.stringify({ swrValue: { key: 2 } })
      );
    });
  });

  describe(syncWithSessionStorage, () => {
    test('should sync existing sessionStorage keys to the SWR cache', () => {
      sessionStorage.setItem(
        'swr-key-1',
        JSON.stringify({ swrValue: { key: 1 } })
      );
      sessionStorage.setItem(
        'swr-key-2',
        JSON.stringify({ swrValue: { key: 2 } })
      );

      const remove = syncWithSessionStorage();
      remove();

      expect(cache.keys()).toEqual(['key-1', 'key-2']);
      expect(cache.get('key-1')).toEqual({ key: 1 });
      expect(cache.get('key-2')).toEqual({ key: 2 });
    });

    test('should sync new SWR cache keys to sessionStorage', () => {
      const remove = syncWithSessionStorage();

      cache.set('key-1', { key: 1 });
      cache.set('key-2', { key: 2 });

      remove();

      expect(sessionStorage.getItem('swr-key-1')).toBe(
        JSON.stringify({ swrValue: { key: 1 } })
      );
      expect(sessionStorage.getItem('swr-key-2')).toBe(
        JSON.stringify({ swrValue: { key: 2 } })
      );
    });
  });
});
