export interface User {
    id?: number,
    identification: string,
    password: string
    firstName: string,
    lastName: string,
    role: string
    headquarter?: string
};

export const userRequires = ["firstName", "lastName", "identification", "role", "headquarter", "password"]