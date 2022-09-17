import LoginService from "../../service/LoginService";
import Http from "../http/Http";

export default class LoginController {

	constructor (readonly http: Http) {
		http.route("post", "/login", async function (params: any, body: any) {
			const loginService = new LoginService();
			return loginService.auth(body);
		});

	}
}