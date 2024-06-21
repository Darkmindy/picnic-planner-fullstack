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
	accessTokenExp: number;
	setAccessTokenExp: React.Dispatch<React.SetStateAction<number>>
	// refreshTokenExp: number;
	// setRefreshTokenExp: React.Dispatch<React.SetStateAction<number>>
	show: boolean;
	setShow: React.Dispatch<React.SetStateAction<boolean>>
}

export interface Temp {
	name: string;
	email: string;
	role: Role;
}