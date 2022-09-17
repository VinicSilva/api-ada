import { verifyJWT } from "../../helper";
import CardRepository from "../../domain/repository/CardRepository";
import CardService from "../../service/CardService";
import Connection from "../database/Connection";
import Http from "../http/Http";
import CardRepositoryDatabase from "../repository/CardRepositoryDatabase";

export default class CardController {

	constructor (readonly http: Http, readonly connection: Connection, readonly cardRepository: CardRepository) {
        http.use('/cards', verifyJWT)

		http.route("get", "/cards", async function (_params: any, _body: any) {
			const cardService = new CardService(cardRepository);
			const cards = await cardService.getCards();
			return cards;
		});

		http.route("get", "/cards/:cardId", async function (params: any, _body: any) {
			const cardService = new CardService(cardRepository);
			const card = await cardService.getCard(parseInt(params.cardId));
			return card;
		});

		http.route("post", "/cards", async function (params: any, body: any) {
			const cardService = new CardService(cardRepository);
			const card = await cardService.create(body);
			return card;
		});

        http.route("put", "/cards/:cardId", async function (params: any, body: any) {
			const cardService = new CardService(cardRepository);
			const card = await cardService.update(parseInt(params.cardId), body);
			return card;
		});

		http.route("delete", "/cards/:cardId", async function (params: any, _body: any) {
			const cardRepository = new CardRepositoryDatabase(connection);
			const cardService = new CardService(cardRepository);
			const cards = await cardService.remove(parseInt(params.cardId));
			return cards;
		});
	}
}