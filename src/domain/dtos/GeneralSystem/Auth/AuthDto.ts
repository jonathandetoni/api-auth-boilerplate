export type AuthDto = {
    email: string;
    password: string;
}

export type AuthDtoResult = {
    user: object;
    acessToken: string;
    authorized: boolean;
}