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
	user: Temp | null;
	setUser: React.Dispatch<React.SetStateAction<Temp | null>>;
	accessToken: string;
	setAccessToken: React.Dispatch<React.SetStateAction<string>>;
	refreshToken: string;
	setRefreshToken: React.Dispatch<React.SetStateAction<string>>;
}

export interface Temp {
	name: string;
	email: string;
	role: Role;
}