import { Component as ngComponent, NgModule as ngModule, enableProdMode as enableProdMode } from '@angular/core';
import { RouterModule as routerModule, PreloadAllModules as preLoadAllModules } from '@angular/router';
import { platformBrowserDynamic as platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule as BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule as BrowserAnimationsModule } from '@angular/platform-browser/animations';

const useHash = true;
let ROUTES = [];

export const component = (prop, targetClass) => {
    let services = null;
    if( prop.service !== undefined ) {
        services = prop.service;
        delete prop.service;
    }

    let routeProp = null;
    if( prop.route !== undefined ) {
        routeProp = prop.route;
        delete prop.route;
    }

    targetClass.annotations = [
        new ngComponent(Object.assign({}, prop))
    ];

    // check for any service injection
    services ? targetClass.parameters = services : null

    // check if has route config 
    // if YES then add it to routes
    if(routeProp) {
        // it as route prop set
        ROUTES.push( 
            {
                path: routeProp,
                component: targetClass
            }
        );
    }

    return targetClass;
};

export const ngmodule = (prop, targetClass) => {
    targetClass.annotations = [
        new ngModule(Object.assign({}, prop))
    ];

    return targetClass;
};

export const routerConfig = (ROUTES) => {
    return RouterModule.forRoot(ROUTES, { useHash: useHash, preloadingStrategy: preLoadAllModules }) 
};

export const routeConfig = ROUTES;
export const browserPlatform = platformBrowserDynamic;
export const browserModule = BrowserModule;
export const appProdMode = enableProdMode;
export const browserAnimationModule = BrowserAnimationsModule;