import { config } from '../config';
import jwt from 'jsonwebtoken';

export default class LoginService {
	async auth(body: any): Promise<any> {
        const { login, senha } = body;
        if(login === config.login && senha === config.password){
            const id = `${config.login}_${config.password}`;
            const secret: any = config.secret;
            const token = jwt.sign({ id }, secret, {
                expiresIn: 1500 // expires in 15 min
            });
            return token;
        }
        return { statusCode: 401, message: 'Invalid login!' };
	}
}