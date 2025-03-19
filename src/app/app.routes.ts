import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', title: 'Home page', loadComponent: () => import("./pages/home/home-page.component") },
    { path: 'about', title: 'About page', loadComponent: () => import("./pages/about/about-page.component") },
    { path: 'contact', title: 'Contact page', loadComponent: () => import("./pages/contact/contact-page.component") },
    { path: 'pricing', title: 'Pricing page', loadComponent: () => import("./pages/pricing/pricing-page.component") },
    { path: 'pokemons', loadComponent: () => import("./pages/pokemons/pokemons-page.component") },
    { path: 'pokemons/:id', loadComponent: () => import("./pages/pokemon/pokemon-page.component") },
    {
        path: '**', redirectTo: () => {
            return 'pokemons'
        }
    },
];
