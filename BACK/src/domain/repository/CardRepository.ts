import Card from "../entity/Card";

export default interface CardRepository {
	findAll(): Promise<Card[]>;
    findOne(cardId: number): Promise<Card>;
    create(card: any): Promise<Card>;
    update(cardId: number, card: any): Promise<Card>;
    remove(cardId: number): Promise<Card[]>;
}