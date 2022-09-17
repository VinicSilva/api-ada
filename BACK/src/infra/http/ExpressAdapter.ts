import Http from "./Http";
import express, { Request, Response } from "express";
import cors from 'cors';

export default class ExpressAdapter implements Http {
	app: any;

	constructor () {
		this.app = express();
		this.app.use(express.json());
		this.app.use(cors());
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