import Card from "../../domain/entity/Card";
import CardRepository from "../../domain/repository/CardRepository";

export default class CardRepositoryMemory implements CardRepository {
    cards: Card[];

    constructor() {
        this.cards = [];
    }

    async findAll(): Promise<Card[]> {
        return this.cards;
    }

    async findOne(cardId: number): Promise<Card> {
        const cardData = this.cards.find( (card: Card) => card.id === cardId );
        if (!cardData) return null;
		const card: Card = new Card(cardData.titulo, cardData.conteudo, cardData.lista, cardData.id);
		return card;
    }
    
    async create(cardDto: Card): Promise<Card> {
        const id = this.cards.length + 1;
        this.cards.push({
            ...cardDto,
            id
        });
        const card: Card = new Card(cardDto.titulo, cardDto.conteudo, cardDto.lista, id);
		return card;
    }

    async update(cardId: number, cardDto: any): Promise<Card> {
        const cardIndex = this.cards.findIndex( (card: Card) => card.id === cardId );
        if (cardIndex == -1) return null;
        this.cards[cardIndex] = {
            ...cardDto,
            id: cardId
        };
        const card: Card = new Card(cardDto.titulo, cardDto.conteudo, cardDto.lista, cardId);
        return card;
    }

    async remove(cardId: number): Promise<Card[]> {
        const cardIndex = this.cards.findIndex( (card: Card) => card.id === cardId );
        if (cardIndex == -1) return null;
        this.cards = this.cards.slice(cardIndex, 1);
        return this.findAll();
    }
}