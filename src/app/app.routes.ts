import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
export const APP_ROUTES: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  {
    path: 'categorias',
    loadChildren: () =>
      import('./features/categorias/categorias.route')
        .then(r => r.CATEGORIAS_ROUTER)
  }
];
