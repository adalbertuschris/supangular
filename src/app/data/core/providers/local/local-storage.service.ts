import { Inject, Injectable } from '@angular/core';
import { BrowserStorageService, LOCAL_STORAGE } from './browser-storage.service';

@Injectable({ providedIn: 'root' })
export class LocalStorageService extends BrowserStorageService {
  constructor(@Inject(LOCAL_STORAGE) storage: Storage) {
    super(storage);
  }
}
