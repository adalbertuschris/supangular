import { EnvironmentProviders, Provider } from '@angular/core';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';

const supabaseClientFactory: () => SupabaseClient = () =>
  createClient(environment.supabaseUrl, environment.supabaseKey);

export const supabaseProviders: (Provider | EnvironmentProviders)[] = [
  {
    provide: SupabaseClient,
    useFactory: supabaseClientFactory
  }
];
