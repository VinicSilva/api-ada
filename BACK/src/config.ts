require('dotenv-safe').config();

export const config = {
    secret: process.env.SECRET || 'mySecret',
    login: process.env.LOGIN || 'myLogin',
    password: process.env.PASSWORD || 'myPassword',
    port: process.env.PORT || 5000,
} 