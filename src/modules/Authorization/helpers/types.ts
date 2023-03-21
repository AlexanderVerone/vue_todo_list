export interface UserData {
    email: string
    password: string
}

export interface FormData extends UserData {
    formType: string
}