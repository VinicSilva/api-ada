import { auditLog } from "../helper";
import CardRepository from "../domain/repository/CardRepository";

export default class CardService {

	constructor (readonly cardRepository: CardRepository) {
	}

	async getCards() {
		const cards = await this.cardRepository.findAll();
		return cards;
	}

    async getCard(cardId: number) {
		const card = await this.cardRepository.findOne(cardId);
		return card;
	}

    async create(body: any) {
		const { titulo, conteudo, lista } = body;
		if (!titulo || !conteudo || !lista) {
			return { statusCode: 400, message: "Fields required." }
		}
		const card = await this.cardRepository.create(body);
		return card;
	}

    async update(cardId: number, body: any) {
		const { titulo, conteudo, lista } = body;
		if (!titulo || !conteudo || !lista) {
			return { statusCode: 400, message: "Fields required." }
		}
		const findCard = await this.cardRepository.findOne(cardId);
		if (!findCard) {
			return { statusCode: 404, message: "Card not found." }
		}
		auditLog({ cardId, cardTitle: body.titulo, action: 'Alterar' });
		const card = await this.cardRepository.update(cardId, body);
		return card;
	}

    async remove(cardId: number) {
		const findCard = await this.cardRepository.findOne(cardId);
		if (!findCard) {
			return { statusCode: 404, message: "Card not found." }
		}
		auditLog({ cardId, cardTitle: findCard.titulo, action: 'Remover' });
		const cards = await this.cardRepository.remove(cardId);
		return cards;
	}
}