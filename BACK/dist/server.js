"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_2 = require("express");
const app = (0, express_1.default)();
const route = (0, express_2.Router)();
app.use(express_1.default.json());
route.get('/', (req, res) => {
    res.json({ message: 'hello world with Typescript' });
});
app.use(route);
app.listen(5000, () => 'Server running on port 5000');
//# sourceMappingURL=server.js.map