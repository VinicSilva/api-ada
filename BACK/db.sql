create schema ada;

create table ada.card (
	id serial primary key,
	titulo text,
	conteudo text,
    lista text
);