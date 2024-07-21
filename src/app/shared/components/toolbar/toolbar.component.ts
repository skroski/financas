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
        @for ( link of linksMenu ; track link.link) {
        <a class="mr-2" routerLinkActive="link.link">{{ link.label }}</a>
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
    { label: 'Dashboard', link: 'dashboard' },
    { label: 'Categorias', link: 'categoria' },
    { label: 'Entradas', link: 'entradas' },
  ]
}
