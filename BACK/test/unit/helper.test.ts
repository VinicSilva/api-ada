import { verifyJWT } from "../../src/helper";
import jwt from 'jsonwebtoken';

const mockRequest = (data?: any) => {
    return data;
};
const mockResponse: any = () => {
    const res: any = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

describe('helper.ts', () => {
    test('Deve retornar um erro ao não informar o token JWT.', async () => {
        const req = mockRequest();
        const res = mockResponse();
        await verifyJWT(req, res, () => false);
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ message: 'No token provided.' });
    });
    
    test('Deve retornar um erro de token JWT inválido.', async () => {
        const req = mockRequest({
            headers: { authorization: 'Bearer any_token' }
        });
        const res = mockResponse();
        await verifyJWT(req, res, () => false);
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ message: 'Failed to authenticate token.' });
    });

    test('Deve entender como válido o token JWT.', async () => {
        const req = mockRequest({
            headers: { authorization: 'Bearer any_valid_token' }
        });
        const res = mockResponse();
        const verify = jest.spyOn(jwt, 'verify');
        verify.mockImplementation(() => () => ({ verified: 'true' }));
        await verifyJWT(req, res, () => true);
        expect(res.status).not.toHaveBeenCalledWith(401);
    });
});

