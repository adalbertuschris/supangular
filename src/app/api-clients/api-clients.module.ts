import { NgModule, Optional, SkipSelf } from '@angular/core';
import { httpProviders } from './http/providers';
import { supabaseProviders } from './supabase/providers';

@NgModule({
  providers: [...httpProviders, ...supabaseProviders]
})
export class ApiClientsModule {
  constructor(@Optional() @SkipSelf() parentModule?: ApiClientsModule) {
    if (parentModule) {
      throw new Error('ApiClientsModule is already loaded. Import it in the AppModule only');
    }
  }
}
