export interface SupabaseError {
  code: string;
  details: string;
  hint: any;
  message: string;
}

export interface SupabaseAuthError {
  name: string;
  message: string;
  status: number;
}
