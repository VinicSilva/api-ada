import Card from "../../domain/entity/Card";
import CardRepository from "../../domain/repository/CardRepository";
import Connection from "../database/Connection";

export default class CardRepositoryDatabase implements CardRepository {

	constructor (readonly connection: Connection) {
	}

    async findAll(): Promise<Card[]> {
        const cardsData = await this.connection.query("select * from ada.card", []);
		const cards: Card[] = [];
        for (const cardData of cardsData) {
			cards.push(new Card(cardData.titulo, cardData.conteudo, cardData.lista, cardData.id));
		}
		return cards;
    }

    async findOne(cardId: number): Promise<Card> {
        const [cardData] = await this.connection.query("select * from ada.card WHERE id = $1", [cardId]);
        if (!cardData) return null;
		const card: Card = new Card(cardData.titulo, cardData.conteudo, cardData.lista, cardData.id);
		return card;
    }
    
    async create(cardDto: Card): Promise<Card> {
        const [cardData] = await this.connection.query("insert into ada.card (titulo, conteudo, lista) values ($1, $2, $3) returning *", [cardDto.titulo, cardDto.conteudo, cardDto.lista]);
        const card: Card = new Card(cardData.titulo, cardData.conteudo, cardData.lista, cardData.id);
        return card;
    }

    async update(cardId: number, cardDto: any): Promise<Card> {
        const [cardData] = await this.connection.query("update ada.card set titulo=$1, conteudo=$2, lista=$3 WHERE id = $4 returning *", [cardDto.titulo, cardDto.conteudo, cardDto.lista, cardId]);
        const card: Card = new Card(cardData.titulo, cardData.conteudo, cardData.lista, cardData.id);
        return card;
    }

    async remove(cardId: number): Promise<Card[]> {
        await this.connection.query("delete from ada.card WHERE id = $1", [cardId]);
        return this.findAll();
    }
}