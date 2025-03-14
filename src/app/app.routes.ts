import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: 'about', title: 'About page', loadComponent: () => import("./pages/about/about-page.component") },
    { path: 'contact', title: 'Contact page', loadComponent: () => import("./pages/contact/contact-page.component") },
    { path: 'pricing', title: 'Pricing page', loadComponent: () => import("./pages/pricing/pricing-page.component") },
    { path: '**', redirectTo: 'about' },
];
