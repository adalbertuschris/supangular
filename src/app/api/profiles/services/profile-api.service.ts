import { Injectable } from '@angular/core';
import { SupabaseClient, User } from '@supabase/supabase-js';
import { ProfileUpsertRequest } from '../models/profile-upsert-request';

@Injectable({
  providedIn: 'root'
})
export class ProfileApiService {
  constructor(private readonly supabaseClient: SupabaseClient) {}

  profile(user: User) {
    return this.supabaseClient.from('profiles').select(`username, website, avatar_url`).eq('id', user.id).single();
  }

  updateProfile(profile: ProfileUpsertRequest) {
    const update = {
      ...profile,
      updated_at: new Date()
    };

    return this.supabaseClient.from('profiles').upsert(update);
  }
}
