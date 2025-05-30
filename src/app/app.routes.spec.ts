import { TestBed } from "@angular/core/testing";
import { provideRouter, Router } from "@angular/router";

import { routes } from "./app.routes";
import { Location } from "@angular/common";

describe('AppRoutes', () => {
    let router: Router;
    let location: Location;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [provideRouter(routes)],
        });

        router = TestBed.inject(Router);
        location = TestBed.inject(Location);
    });

    it('should navigate to "about" redirect to "/about"', async () => {
        await router.navigate(['about']);
        expect(location.path()).toBe('/about');
    });

    // it('should navigate to "unknow-page" redirect to "/pokemons"', async () => {
    //     await router.navigate(['unknow-page']);
    //     console.log(location.path());

    //     expect(location.path()).toBe('/pokemons');
    // });

    it("should load the proper component", async () => {
        const aboutRoute = routes.find(route => route.path === 'about')!;
        expect(aboutRoute).toBeDefined();

        const aboutComponent = await aboutRoute.loadComponent!() as any;
        expect(aboutComponent).toBeDefined();
        expect(aboutComponent.default.name).toBe('AboutPageComponent');
        
        const pokemonRoute = routes.find(route => route.path === 'pokemons/page/:page')!;
        expect(pokemonRoute).toBeDefined();

        const pokemonComponent = await pokemonRoute.loadComponent!() as any;
        console.log(pokemonComponent.default.name);
        expect(pokemonComponent).toBeDefined();
        expect(pokemonComponent.default.name).toBe('PokemonsPageComponent');
    });
});
