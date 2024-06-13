export type Role = 'admin' | 'user';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
}

export interface AuthContextType {
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
}