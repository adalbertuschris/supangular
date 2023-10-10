import { Injectable } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { Observable } from 'rxjs';
import { ProfileUpsertRequest } from './models/profile-upsert-request';
import { ProfileResponse } from './models/profile-response';
import { SupabaseResponse, fromSupabase } from '../core/providers/supabase';
import { supabasePayload } from '../core/providers/supabase';

type ProfileSupabaseResponse = {
  id: string;
  first_name: string;
  last_name: string;
};

type ProfileUpsertSupabasePayload = Omit<ProfileSupabaseResponse, 'id'> & {
  updated_at: string;
};

@Injectable({
  providedIn: 'root'
})
export class ProfileDataService {
  constructor(private readonly supabaseClient: SupabaseClient) {}

  getProfile(userId: string): Observable<ProfileResponse> {
    return fromSupabase<SupabaseResponse<ProfileSupabaseResponse>, ProfileResponse>(
      this.supabaseClient.from('profiles').select(`*`).eq('id', userId).single()
    );
  }

  updateProfile(id: string, model: ProfileUpsertRequest): Observable<ProfileResponse> {
    const payload: ProfileUpsertSupabasePayload = supabasePayload({
      ...model,
      updatedAt: new Date().toISOString()
    });

    return fromSupabase<SupabaseResponse<ProfileSupabaseResponse>, ProfileResponse>(
      this.supabaseClient.from('profiles').update(payload).eq('id', id).select().single()
    );
  }
}
