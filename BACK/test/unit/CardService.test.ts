import CardService from "../../src/service/CardService";
import CardRepositoryMemory from "../../src/infra/repository/CardRepositoryMemory";

describe('CardService.ts', () => {
    test('Should validate the return of the empty list of cards.', async () => {
        const cardRepositoryMemory = new CardRepositoryMemory();
        const cardService = new CardService(cardRepositoryMemory);
        const output = await cardService.getCards();
        expect(output).toEqual([]);
    });

    test('Should validate the return of the list of cards with items.', async () => {
        const cardRepositoryMemory = new CardRepositoryMemory();
        const cardService = new CardService(cardRepositoryMemory);
        await cardService.create({
            titulo: 'card 1',
            conteudo: 'conteudo 1',
            lista: 'lista 1',
        });
        await cardService.create({
            titulo: 'card 2',
            conteudo: 'conteudo 2',
            lista: 'lista 2',
        });
        const output = await cardService.getCards();
        expect(output).toHaveLength(2);
    });

    test('Should return the card looking for id.', async () => {
        const cardRepositoryMemory = new CardRepositoryMemory();
        const cardService = new CardService(cardRepositoryMemory);
        await cardService.create({
            titulo: 'card 1',
            conteudo: 'conteudo 1',
            lista: 'lista 1',
        });
        const output = await cardService.getCard(1);
        expect(output).toEqual({
            id: 1,
            titulo: 'card 1',
            conteudo: 'conteudo 1',
            lista: 'lista 1',
        });
    });

    test('Should return null when searching for a card by non-existent id.', async () => {
        const cardRepositoryMemory = new CardRepositoryMemory();
        const cardService = new CardService(cardRepositoryMemory);
        await cardService.create({
            titulo: 'card 1',
            conteudo: 'conteudo 1',
            lista: 'lista 1',
        });
        const output = await cardService.getCard(2);
        expect(output).toEqual(null);
    });

    test('Should return error when not passing all card data.', async () => {
        const cardRepositoryMemory = new CardRepositoryMemory();
        const cardService = new CardService(cardRepositoryMemory);
        const output: any = await cardService.create({
            conteudo: 'conteudo 1',
            lista: 'lista 1',
        });
        expect(output.statusCode).toBe(400);
        expect(output.message).toBe("Fields required.");
    });

    test('Should return card data when creating.', async () => {
        const cardRepositoryMemory = new CardRepositoryMemory();
        const cardService = new CardService(cardRepositoryMemory);
        const output: any = await cardService.create({
            titulo: 'card 1',
            conteudo: 'conteudo 1',
            lista: 'lista 1',
        });
        expect(output).toEqual({
            id: 1,
            titulo: 'card 1',
            conteudo: 'conteudo 1',
            lista: 'lista 1',
        });
    });

    test('Should return an error when not finding the card by id when removing.', async () => {
        const cardRepositoryMemory = new CardRepositoryMemory();
        const cardService = new CardService(cardRepositoryMemory);
        const output: any = await cardService.remove(1);
        expect(output.statusCode).toBe(404);
        expect(output.message).toBe("Card not found.");
    });

    test('Should return to card list after removing one of the cards.', async () => {
        const cardRepositoryMemory = new CardRepositoryMemory();
        const cardService = new CardService(cardRepositoryMemory);
        await cardService.create({
            titulo: 'card 1',
            conteudo: 'conteudo 1',
            lista: 'lista 1',
        });
        await cardService.create({
            titulo: 'card 2',
            conteudo: 'conteudo 2',
            lista: 'lista 2',
        });
        const output: any = await cardService.remove(1);
        expect(output).toHaveLength(1);
    });

    test('It should return the updated card data.', async () => {
        const cardRepositoryMemory = new CardRepositoryMemory();
        const cardService = new CardService(cardRepositoryMemory);
        const cardData = {
            titulo: 'card 1',
            conteudo: 'conteudo 1',
            lista: 'lista 1',
        };
        await cardService.create(cardData);
        const output: any = await cardService.update(1, { ...cardData, conteudo: 'conteudo 12' });
        expect(output).toEqual({
            ...cardData,
            id: 1,
            conteudo: 'conteudo 12'
        });
    });

    test('Should return an error when not finding the card by id when updating.', async () => {
        const cardRepositoryMemory = new CardRepositoryMemory();
        const cardService = new CardService(cardRepositoryMemory);
        const cardData = {
            titulo: 'card 1',
            conteudo: 'conteudo 1',
            lista: 'lista 1',
        };
        await cardService.create(cardData);
        const output: any = await cardService.update(12, { ...cardData, conteudo: 'conteudo 12' });
        expect(output.statusCode).toBe(404);
        expect(output.message).toBe("Card not found.");
    });

    test('Should return an error when not sending card data when updating.', async () => {
        const cardRepositoryMemory = new CardRepositoryMemory();
        const cardService = new CardService(cardRepositoryMemory);
        const cardData = {
            titulo: 'card 1',
            conteudo: 'conteudo 1',
            lista: 'lista 1',
        };
        await cardService.create(cardData);
        const output: any = await cardService.update(1, {});
        expect(output.statusCode).toBe(400);
        expect(output.message).toBe("Fields required.");
    });
});