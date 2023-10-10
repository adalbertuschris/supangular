import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { httpProviders } from './core/providers/http/providers';
import { supabaseProviders } from './core/providers/supabase/providers';

@NgModule({
  providers: [...httpProviders, ...supabaseProviders],
  imports: [HttpClientModule]
})
export class DataModule {
  constructor(@Optional() @SkipSelf() parentModule?: DataModule) {
    if (parentModule) {
      throw new Error('DataModule is already loaded. Import it in the AppModule only');
    }
  }
}
