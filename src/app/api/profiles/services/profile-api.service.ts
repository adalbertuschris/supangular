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

  updateProfile(profile: ProfileUpsertRequest): Observable<any> {
    const update = {
      ...profile,
      updatedAt: new Date()
    };

    return fromSupabase(
      this.supabaseClient.from('profiles').upsert(new SupabasePayloadBuilder({ fromObject: update }).getPayload())
    );
  }
}
