import Http from "./Http";
import express, { Request, Response } from "express";

export default class ExpressAdapter implements Http {
	app: any;

	constructor () {
		this.app = express();
		this.app.use(express.json())
		this.app.use(function (req: any, res: any, next: any) {
			//log middle
			res.header("Access-Control-Allow-Origin", "*");
			res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
			res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
			
			next();
		});
	}

	route(method: string, url: string, callback: Function): void {
		this.app[method](url, async function (req: Request, res: Response) {
			const output = await callback(req.params, req.body);
			const statusCode = output.statusCode || 200;
			delete output.statusCode;
			res.status(statusCode).json(output);
		});
	}

	use(url: string, callback: Function): void {
		this.app.use(url, callback);
	}

	listen(port: number): void {
		this.app.listen(port);
	}
}