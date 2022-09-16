require('dotenv-safe').config();

export const config = {
    secret: process.env.SECRET,
    login: process.env.LOGIN,
    password: process.env.PASSWORD,
} 