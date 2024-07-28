import { Routes } from '@angular/router';
import { CategoriasComponent } from './categorias.component';
import { FormularioComponent } from './formulario/formulario.component';

export const CATEGORIAS_ROUTER: Routes = [
  { path: '', component: CategoriasComponent },
  {
    path: 'editar/:id', component: FormularioComponent
  }
];
