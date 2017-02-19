import { Component, NgModule } from '@angular/core';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { extend } from 'lodash';

const useHash = true;
let ROUTES = [];

export const component = (prop, targetClass) => {
    targetClass.annotations = [
        new Component(extend({}, prop))
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
        new NgModule(extend({}, prop))
    ];

    return targetClass;
};

export const routerConfig = (ROUTES) => {
    return RouterModule.forRoot(ROUTES, { useHash: useHash, preloadingStrategy: PreloadAllModules }) 
};

export const routeConfig = ROUTES;
