import { Component as ngComponent, NgModule as ngModule, enableProdMode as enableProdMode } from '@angular/core';
import { RouterModule as routerModule, PreloadAllModules as preLoadAllModules } from '@angular/router';
import { platformBrowserDynamic as platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule as BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule as BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MdButtonModule as MdButtonModule} from '@angular/material';

import _extend from 'lodash/extend';

const useHash = true;
let ROUTES = [];

export const component = (prop, targetClass) => {
    targetClass.annotations = [
        new ngComponent(_extend({}, prop))
    ];

    // check if has route config 
    // if YES then add it to routes
    if(prop.route !== undefined) {
        // it as route prop set
        ROUTES.push( 
            {
                path: prop.route,
                component: targetClass
            }
        );
    }

    return targetClass;
};

export const module = (prop, targetClass) => {
    targetClass.annotations = [
        new ngModule(_extend({}, prop))
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
export const mdButton = MdButtonModule;