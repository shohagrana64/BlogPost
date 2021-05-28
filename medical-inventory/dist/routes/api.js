"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const register = (app) => {
    const oidc = app.locals.oidc;
    const port = parseInt(process.env.PGPORT || "5432", 10);
    const config = {
        database: process.env.PGDATABASE || "postgres",
        host: process.env.PGHOST || "localhost",
        port,
        user: process.env.PGUSER || "postgres"
    };
    let arr = [
        { "BrandId": "test1", "Name": "testy", "TypeId": 0, "Comment": "NoComment" },
        { "BrandId": "test2", "Name": "testy1", "TypeId": 1, "Comment": "NoComment" },
        { "BrandId": "test3", "Name": "testy2", "TypeId": 2, "Comment": "NoComment" }
    ];
    app.get(`/api/modeltype`, (req, res) => {
        try {
            // const arr2 = [];
            // for (const val of arr) {
            //     arr2.push(val.BrandId);
            // }
            // return res.json(arr2);
            return res.json(arr);
        }
        catch (err) {
            // tslint:disable-next-line:no-console
            console.error(err);
            res.json({ error: err.message || err });
        }
    });
    app.get(`/api/modeldata/:id`, (req, res) => {
        try {
            for (const val of arr) {
                if (val.BrandId === req.params.id) {
                    return res.json(val);
                }
            }
        }
        catch (err) {
            // tslint:disable-next-line:no-console
            console.error(err);
            res.json({ error: err.message || err });
        }
    });
    app.delete(`/api/modeldata/remove/:id`, (req, res) => {
        try {
            for (const val of arr) {
                if (val.BrandId === req.params.id) {
                    const index = arr.indexOf(val);
                    const newArray = (index > -1) ? [
                        ...arr.slice(0, index),
                        ...arr.slice(index + 1)
                    ] : arr;
                    arr = newArray;
                    return res.json(newArray);
                }
            }
        }
        catch (err) {
            // tslint:disable-next-line:no-console
            console.error(err);
            res.json({ error: err.message || err });
        }
    });
    app.post(`/api/devicemodel`, (req, res) => {
        try {
            const b = req.body.BrandId;
            const n = req.body.Name;
            const t = req.body.TypeId;
            const c = req.body.Comment;
            const rana = {
                BrandId: b,
                Name: n,
                TypeId: t,
                Comment: c
            };
            if (b === "" || n === "" || t === "") {
                return res.json(arr);
            }
            else {
                arr.push(rana);
            }
            return res.json(arr);
        }
        catch (err) {
            // tslint:disable-next-line:no-console
            console.error(err);
            res.json({ error: err.message || err });
        }
    });
    // app.get( `/api/guitars/total`, oidc.ensureAuthenticated(), async ( req: any, res ) => {
    //     try {
    //         const userId = req.userContext.userinfo.sub;
    //         const total = await db.one( `
    //         SELECT  count(*) AS total
    //         FROM    guitars
    //         WHERE   user_id = $[userId]`, { userId }, ( data: { total: number } ) => {
    //             return {
    //                 total: +data.total
    //             };
    //         } );
    //         return res.json( total );
    //     } catch ( err ) {
    //         // tslint:disable-next-line:no-console
    //         console.error(err);
    //         res.json( { error: err.message || err } );
    //     }
    // } );
    // app.post( `/api/guitars/update`, oidc.ensureAuthenticated(), async ( req: any, res ) => {
    //     try {
    //         const userId = req.userContext.userinfo.sub;
    //         const id = await db.one( `
    //             UPDATE guitars
    //             SET brand = $[brand]
    //                 , model = $[model]
    //                 , year = $[year]
    //                 , color = $[color]
    //             WHERE
    //                 id = $[id]
    //                 AND user_id = $[userId]
    //             RETURNING
    //                 id;`,
    //             { userId, ...req.body  } );
    //         return res.json( { id } );
    //     } catch ( err ) {
    //         // tslint:disable-next-line:no-console
    //         console.error(err);
    //         res.json( { error: err.message || err } );
    //     }
    // } );
};
exports.register = register;
//# sourceMappingURL=api.js.map