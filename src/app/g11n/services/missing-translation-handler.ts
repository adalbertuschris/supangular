import { Injectable } from '@angular/core';
import {
  MissingTranslationHandler as ngxMissingTranslationHandler,
  MissingTranslationHandlerParams as ngxMissingTranslationHandlerParams
} from '@ngx-translate/core';

@Injectable()
export class MissingTranslationHandler implements ngxMissingTranslationHandler {
  handle(params: ngxMissingTranslationHandlerParams): string {
    console.warn(`Missing translation key for '${params.key}'`);

    return params.key;
  }
}
