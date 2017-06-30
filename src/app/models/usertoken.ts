export class UserToken {
    accessToken: string;
    tokenType: string;
    expiresIn: number;
    refreshToken: string;
    userName: string;
    issuedDate: Date;
    expiryDate: Date;
}