import { config } from '../config';
import jwt from 'jsonwebtoken';

export default class LoginService {
	async auth(body: any): Promise<any> {
        const { login, password } = body;
        if(login === config.login && password === config.password){
            const id = `${config.login}_${config.password}`;
            const secret: any = config.secret;
            const token = jwt.sign({ id }, secret, {
                expiresIn: 300 // expires in 5min
            });
            return token;
        }
        return null;
	}
}