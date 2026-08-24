import { Role } from "../../user-role/enum/user.enum";
export declare class Auth {
    id: number;
    username: string | null;
    email: string;
    password: string | null;
    firstName: string;
    lastName: string | null;
    isConfirmed: boolean;
    confirmationToken: string | null;
    provider: string | null;
    providerId: string | null;
    role: Role;
}
