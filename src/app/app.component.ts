import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToolbarComponent } from "./shared/components/toolbar/toolbar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <app-toolbar [menu]="menu" color="primary"></app-toolbar>
    <router-outlet />
  `,
  styles: [],
  imports: [RouterOutlet, ToolbarComponent]
})
export class AppComponent {
  title = 'financas';
  menu: any = [
    { title: 'Dashboard', rota: 'dashboard' },
    { title: 'Categorias', rota: 'categoria' },
    //{ title: 'Entradas', rota: 'entradas' },
  ]
}
