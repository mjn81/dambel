export interface AuthState {
  refresh: string;
  access: string;
  role: Role;
}

export type Role = 'gymowner' | 'trainer' | 'trainee' | 'admin' | 'unknown';


