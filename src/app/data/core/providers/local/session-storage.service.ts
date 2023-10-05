import { Inject, Injectable } from '@angular/core';
import { BrowserStorageService, SESSION_STORAGE } from './browser-storage.service';

@Injectable({ providedIn: 'root' })
export class SessionStorageService extends BrowserStorageService {
  constructor(@Inject(SESSION_STORAGE) storage: Storage) {
    super(storage);
  }
}
