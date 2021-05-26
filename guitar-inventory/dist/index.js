"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const pg_promise_1 = __importDefault(require("pg-promise"));
const path_1 = __importDefault(require("path"));
// initialize configuration
dotenv_1.default.config();
// port is now available to the Node.js runtime
// as if it were an environment variable
const port = process.env.SERVER_PORT;
const app = express_1.default();
// Configure Express to use EJS
app.set("views", path_1.default.join(__dirname, "views"));
app.set("view engine", "ejs");
// Configure Express to serve static files in the public folder
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
// define a route handler for the default home page
app.get("/", (req, res) => {
    // render the index template
    res.render("index");
});
app.get("/guitars", (req, res) => {
    // render the index template
    res.render("guitars");
});
const oidc = app.locals.oidc;
const port2 = parseInt(process.env.PGPORT || "5432", 10);
const config = {
    database: process.env.PGDATABASE || "postgres",
    host: process.env.PGHOST || "localhost",
    port2,
    user: process.env.PGUSER || "postgres"
};
const pgp = pg_promise_1.default();
const db = pgp(config);
app.get(`/api/guitars/all`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userContext.userinfo.sub;
        const guitars = yield db.any(`
                SELECT
                    id
                    , brand
                    , model
                    , year
                    , color
                FROM    guitars
                WHERE   user_id = $[userId]
                ORDER BY year, brand, model`, { userId });
        return res.json(guitars);
    }
    catch (err) {
        // tslint:disable-next-line:no-console
        console.error(err);
        res.json({ error: err.message || err });
    }
}));
app.get(`/api/guitars/total`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userContext.userinfo.sub;
        const total = yield db.one(`
            SELECT  count(*) AS total
            FROM    guitars
            WHERE   user_id = $[userId]`, { userId }, (data) => {
            return {
                total: +data.total
            };
        });
        return res.json(total);
    }
    catch (err) {
        // tslint:disable-next-line:no-console
        console.error(err);
        res.json({ error: err.message || err });
    }
}));
app.get(`/api/guitars/find/:search`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userContext.userinfo.sub;
        const guitars = yield db.any(`
                SELECT
                    id
                    , brand
                    , model
                    , year
                    , color
                FROM    guitars
                WHERE   user_id = $[userId]
                AND   ( brand ILIKE $[search] OR model ILIKE $[search] )`, { userId, search: `%${req.params.search}%` });
        return res.json(guitars);
    }
    catch (err) {
        // tslint:disable-next-line:no-console
        console.error(err);
        res.json({ error: err.message || err });
    }
}));
app.post(`/api/guitars/add`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userContext.userinfo.sub;
        const id = yield db.one(`
                INSERT INTO guitars( user_id, brand, model, year, color )
                VALUES( $[userId], $[brand], $[model], $[year], $[color] )
                RETURNING id;`, Object.assign({ userId }, req.body));
        return res.json({ id });
    }
    catch (err) {
        // tslint:disable-next-line:no-console
        console.error(err);
        res.json({ error: err.message || err });
    }
}));
app.post(`/api/guitars/update`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userContext.userinfo.sub;
        const id = yield db.one(`
                UPDATE guitars
                SET brand = $[brand]
                    , model = $[model]
                    , year = $[year]
                    , color = $[color]
                WHERE
                    id = $[id]
                    AND user_id = $[userId]
                RETURNING
                    id;`, Object.assign({ userId }, req.body));
        return res.json({ id });
    }
    catch (err) {
        // tslint:disable-next-line:no-console
        console.error(err);
        res.json({ error: err.message || err });
    }
}));
app.delete(`/api/guitars/remove/:id`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userContext.userinfo.sub;
        const id = yield db.result(`
                DELETE
                FROM    guitars
                WHERE   user_id = $[userId]
                AND     id = $[id]`, { userId, id: req.params.id }, (r) => r.rowCount);
        return res.json({ id });
    }
    catch (err) {
        // tslint:disable-next-line:no-console
        console.error(err);
        res.json({ error: err.message || err });
    }
}));
// start the express server
app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`server started at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map