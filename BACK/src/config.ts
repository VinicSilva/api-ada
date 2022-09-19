require('dotenv-safe').config();

export const config = {
    secret: process.env.SECRET || 'mySecret',
    login: process.env.LOGIN || 'myLogin',
    password: process.env.PASSWORD || 'myPassword',
    port: process.env.PORT || 5000,
    db_url_config: process.env.DB_URL_CONFIG || ''
} 