import { Injectable } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { ProfileUpsertRequest } from '../models/profile-upsert-request';
import { fromSupabase } from 'src/app/core/supabase/rxjs/from-supabase';
import { ProfileResponse } from '../models/profile-response';
import { Observable } from 'rxjs';
import { SupabasePayloadBuilder } from 'src/app/core/supabase/models/supabase-payload';

@Injectable({
  providedIn: 'root'
})
export class ProfileApiService {
  constructor(private readonly supabaseClient: SupabaseClient) {}

  getProfile(userId: string): Observable<ProfileResponse> {
    return fromSupabase<ProfileResponse>(this.supabaseClient.from('profiles').select(`*`).eq('id', userId).single());
  }

  updateProfile(id: string, model: ProfileUpsertRequest): Observable<ProfileResponse> {
    const payload = {
      ...model,
      updatedAt: new Date().toISOString()
    };

    return fromSupabase<ProfileResponse>(
      this.supabaseClient
        .from('profiles')
        .update(new SupabasePayloadBuilder({ fromObject: payload }).getPayload())
        .eq('id', id)
        .select()
        .single()
    );
  }
}
