import jwt from 'jsonwebtoken';
import LoginService from "../../src/service/LoginService";
import { config } from "../../src/config";

describe('LoginService.ts', () => {
    test('Should return an error stating that the login is invalid.', async () => {
        const mockBody = {
            login: 'any_login',
            senha: 'any_senha'
        };
        const loginService = new LoginService();
        const output = await loginService.auth(mockBody);
        expect(output).toEqual({ statusCode: 401, message: 'Invalid login!' });
    });

    test('Should return JWT token with valid login.', async () => {
        const sign = jest.spyOn(jwt, 'sign');
        sign.mockImplementation(() => ('any_valid_token'));
        const mockBody = {
            login: config.login,
            senha: config.password
        };
        const loginService = new LoginService();
        const output = await loginService.auth(mockBody);
        expect(output).toBe('any_valid_token');
    });
});