import { MutableRefObject } from "react";

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
	accessToken: MutableRefObject<string>;
	refreshToken: MutableRefObject<string>;
	accessTokenExp: MutableRefObject<number>;
	handleTokenRefresh: (expirationDate: number) => void;
	isLoggedIn: MutableRefObject<boolean>;
}

export interface Temp {
	name: string;
	email: string;
	role: Role;
}