// Ensures that correct data is sent to the BackEnd and defines how to use Users in all the FrontEnd part

export interface User {
    id: string;
    username: string;
    email: string;
    profile_picture?: string;
    biography?: string;
    visibility: boolean;
}