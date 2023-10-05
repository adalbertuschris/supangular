import { InjectionToken } from '@angular/core';

export const LOCAL_STORAGE = new InjectionToken<Storage>('Local Storage', {
  providedIn: 'root',
  factory: () => localStorage
});

export const SESSION_STORAGE = new InjectionToken<Storage>('Session Storage', {
  providedIn: 'root',
  factory: () => sessionStorage
});

export class BrowserStorageService {
  constructor(private readonly storage: Storage) {}

  get(key: string): any {
    return this.storage.getItem(key);
  }

  set(key: string, value: string): void {
    this.storage.setItem(key, value);
  }

  remove(key: string): void {
    this.storage.removeItem(key);
  }

  clear(): void {
    this.storage.clear();
  }
}
