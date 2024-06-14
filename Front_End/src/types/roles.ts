export type Role = "admin" | "user";

export interface User {
	//id: string;
	name: string;
	email: string;
	password: string;
	isOnline?: boolean;
	role?: Role;
}

export interface AuthContextType {
	user: User | null;
	signIn: (email: string, password: string) => Promise<void>;
	signOut: () => void;
}
