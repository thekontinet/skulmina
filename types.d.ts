export type LoginCredentials = {
    email: string,
    password: string
}

export type LoginCredentialsError = {
    email: string[] | undefined,
    password: string[] | undefined
}