import { Component } from '@angular/core';
import { ListComponent } from "./list/list.component";

@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [ListComponent],
  template: `
  <h1>Categorias</h1>
  <app-list></app-list>
  `,
  styles: ``
})
export class CategoriasComponent {

};
