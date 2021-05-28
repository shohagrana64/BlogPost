import * as express from "express";
import * as api from "./api";

export const register = ( app: express.Application ) => {
    // const oidc = app.locals.oidc;

    // define a route handler for the default home page
    app.get( "/", ( req: any, res ) => {
        res.render( "index" );
    } );

    // define a route to handle logout
    app.get( "/logout", ( req: any, res ) => {
        req.logout();
        res.redirect( "/" );
    } );

    // define a secure route handler for the medical page
    app.get( "/modeltype", ( req: any, res ) => {
        res.render( "medical" );
    } );
    api.register( app );
};