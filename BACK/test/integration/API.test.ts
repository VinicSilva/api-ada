import { config } from './../../src/config';
import axios from "axios";

const port = config.port;

describe('API.test - Login', () => {
	test("Deve retornar que as credenciais não são autorizadas.", async function () {
		let statusCode: number;
		let errorMessage: string;
		try {
			await axios({
				url: `http://localhost:${port}/login`,
				method: "post",
				data: {
					"login": 'any_login',
					"senha": 'any_senha'
				}
			});
		} catch(error) {
			statusCode = error.response.status;
			errorMessage = error.response.data.message;
		} finally {
			expect(statusCode).toBe(401);
			expect(errorMessage).toBe('Invalid login!');
		}
	});

	test("Deve efetuar o login corretamente.", async function () {
		const { status } = await axios({
			url: `http://localhost:${port}/login`,
			method: "post",
			data: {
				"login": config.login,
				"senha": config.password
			}
		});
		expect(status).toBe(200);
	});
});

describe('API.test - Cards', () => {
	test("Deve retornar com sucesso a lista de cards.", async function () {
		const { data: loginData } = await axios({
			url: `http://localhost:${port}/login`,
			method: "post",
			data: {
				"login": config.login,
				"senha": config.password
			}
		});
		const { status, data: cardsData } = await axios({
			url: `http://localhost:${port}/cards`,
			method: "get",
			headers: { Authorization: `Bearer ${loginData}` }
		});
		expect(status).toBe(200);
	});

	test("Deve criar um card com sucesso.", async function () {
		const { data: loginData } = await axios({
			url: `http://localhost:${port}/login`,
			method: "post",
			data: {
				"login": config.login,
				"senha": config.password
			}
		});
		const randomString = (Math.random() + 1).toString(36).substring(7);
		const { status } = await axios({
			url: `http://localhost:${port}/cards`,
			method: "post",
			headers: { Authorization: `Bearer ${loginData}` },
			data: {
				"titulo": `Meu titulo ${randomString}`,
				"conteudo": `Meu conteudo ${randomString}`,
				"lista": `ToDo`,
			}
		});
		expect(status).toBe(201);
	});

	test("Deve atualizar um card com sucesso.", async function () {
		const { data: loginData } = await axios({
			url: `http://localhost:${port}/login`,
			method: "post",
			data: {
				"login": config.login,
				"senha": config.password
			}
		});
		const randomString = (Math.random() + 1).toString(36).substring(7);
		const { status: statusCodeCreatedCard, data: createdCardData } = await axios({
			url: `http://localhost:${port}/cards`,
			method: "post",
			headers: { Authorization: `Bearer ${loginData}` },
			data: {
				"titulo": `Meu titulo ${randomString}`,
				"conteudo": `Meu conteudo ${randomString}`,
				"lista": `ToDo`,
			}
		});
		const { id } = createdCardData;
		const { status: statusCodeUpdatedCard } = await axios({
			url: `http://localhost:${port}/cards/${id}`,
			method: "put",
			headers: { Authorization: `Bearer ${loginData}` },
			data: {
				"titulo": `Meu titulo atualizado ${randomString}`,
				"conteudo": `Meu conteudo atualizado ${randomString}`,
				"lista": `ToDo`,
			}
		});
		expect(statusCodeCreatedCard).toBe(201);
		expect(statusCodeUpdatedCard).toBe(200);
	});

	test("Deve remover um card com sucesso.", async function () {
		const { data: loginData } = await axios({
			url: `http://localhost:${port}/login`,
			method: "post",
			data: {
				"login": config.login,
				"senha": config.password
			}
		});
		const randomString = (Math.random() + 1).toString(36).substring(7);
		const { status: statusCodeCreatedCard, data: createdCardData } = await axios({
			url: `http://localhost:${port}/cards`,
			method: "post",
			headers: { Authorization: `Bearer ${loginData}` },
			data: {
				"titulo": `Meu titulo ${randomString}`,
				"conteudo": `Meu conteudo ${randomString}`,
				"lista": `ToDo`,
			}
		});
		const { id } = createdCardData;
		const { status: statusCodeDeletedCard } = await axios({
			url: `http://localhost:${port}/cards/${id}`,
			method: "delete",
			headers: { Authorization: `Bearer ${loginData}` }
		});
		expect(statusCodeCreatedCard).toBe(201);
		expect(statusCodeDeletedCard).toBe(200);
	});
});
