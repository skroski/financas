import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule],
  template: `
    <mat-toolbar color="primary">
      <span>Finanças</span>
      <span class="example-spacer"></span>
      <nav>
        @for ( link of linksMenu ; track link.rota) {
        <a class="text-xl font-bold hover:text-purple-100 cursor-pointer mx-4"  routerLinkActive="active">{{ link.title }}</a>
        }
      </nav>
    </mat-toolbar>
  `,
  styles: `
  .example-spacer {
    flex: 1 1 auto;
  }
  .example-spacer nav a{
    padding: 0px 10px;
    margin: 0px 10px;
    color: purple;
  }
`,
})
export class ToolbarComponent {
  linksMenu: any = [
    { title: 'Dashboard', rota: 'dashboard' },
    { title: 'Categorias', rota: 'categoria' },
    { title: 'Entradas', rota: 'entradas' },
  ]
}
