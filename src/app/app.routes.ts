import { Routes } from '@angular/router';
import { ProductsListComponent } from './features/products/components/products-list/products-list.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'products',
        pathMatch: 'full'
    },
    {
        path: 'products',
        component: ProductsListComponent
    }
];
