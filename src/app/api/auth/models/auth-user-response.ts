import { User } from '@supabase/supabase-js';

export type AuthUserResponse = Pick<User, 'id' | 'email'>;
