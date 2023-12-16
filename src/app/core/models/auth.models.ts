export class User {
    email?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    mobile?: number;
    token?: string;
}

export class LoginRequest {
    constructor(
        public email: string,
        public password: string,
    ) {}
}

export class RegisterRequest {
    constructor(
        public email: string,
        public password: string,
        public firstName: string,
        public lastName: string,
        public mobile: number
    ) {}
}

export class LoginResponse {
    constructor(
        public token: string
    ) {}
}