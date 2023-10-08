import { LOCALE_ID, NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  TranslateLoader,
  TranslateModule,
  MissingTranslationHandler as ngxMissingTranslationHandler
} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MissingTranslationHandler } from './services/missing-translation-handler';

export function translateLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}

@NgModule({
  imports: [
    TranslateModule.forRoot({
      defaultLanguage: 'en-US',
      loader: {
        provide: TranslateLoader,
        useFactory: translateLoaderFactory,
        deps: [HttpClient]
      },
      missingTranslationHandler: { provide: ngxMissingTranslationHandler, useClass: MissingTranslationHandler }
    })
  ],
  exports: [TranslateModule],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'en-US'
    }
  ]
})
export class G11nModule {
  constructor(@Optional() @SkipSelf() parentModule?: G11nModule) {
    if (parentModule) {
      throw new Error('G11nModule is already loaded. Import it in the AppModule only');
    }
  }
}
