import { config } from './../../src/config';
import axios from "axios";

test("Deve efetuar o login corretamente.", async function () {
	const response = await axios({
		url: "http://localhost:5000/login",
		method: "post",
		data: {
            "login": config.login,
            "senha": config.password
		}
	});
	expect(response.status).toBe(200);
});


test("Deve retornar que as credenciais não são autorizadas", async function () {
	const response = await axios({
		url: "http://localhost:5000/login",
		method: "post",
		data: {
            "login": 'any_login',
            "senha": 'any_senha'
		}
	});
	expect(response.status).toBe(401);
});
