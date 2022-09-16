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
		const card = await this.cardRepository.create(body);
		return card;
	}

    async update(cardId: number, body: any) {
		const card = await this.cardRepository.update(cardId, body);
		return card;
	}

    async remove(cardId: number) {
		const cards = await this.cardRepository.remove(cardId);
		return cards;
	}
}