export class UserToken {
    constructor(
        public accessToken: string,
        public tokenType: string,
        public expiresIn: number,
        public refreshToken: string,
        public userName: string,
        public issuedDate: Date,
        public expiryDate: Date) {
    }
}