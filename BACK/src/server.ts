import CardController from "./infra/controller/CardController";
import LoginController from "./infra/controller/LoginController";
import PgPromiseConnection from "./infra/database/PgPromiseConnection";
import ExpressAdapter from "./infra/http/ExpressAdapter";
import CardRepositoryDatabase from "./infra/repository/CardRepositoryDatabase";

const connection = new PgPromiseConnection();
const cardRepository = new CardRepositoryDatabase(connection);
const http = new ExpressAdapter();
new LoginController(http);
new CardController(http, connection, cardRepository);
const port = 5001;
http.listen(port);

process.on("exit", async function () {
	await connection.close();
});