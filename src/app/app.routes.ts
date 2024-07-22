import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
export const APP_ROUTES: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  {
    path: 'categorias',
    loadComponent: () =>
      import('./features/categorias/categorias.component')
        .then(c => c.CategoriasComponent)

  },
  {
    path: 'editar/:id',
    loadComponent: () =>
      import('./features/categorias/formulario/formulario.component')
        .then(c => c.FormularioComponent)
  }
];
