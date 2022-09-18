export default class Card {

	constructor (readonly titulo: string, readonly conteudo: string, readonly lista: string, readonly id?: number) {
		if (!titulo) throw new Error("titulo is required");
		if (!conteudo) throw new Error("conteudo is required");
		if (!lista) throw new Error("lista is required");
	}
}