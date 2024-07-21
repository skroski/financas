import { Component, Input } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, RouterModule],
  template: `
    <mat-toolbar class="flex justify-between" color="primary">
      <h2>Finanças</h2>
      <nav>
        @for ( link of menu ; track link.rota) {
        <a class="text-xl font-bold hover:text-purple-100 cursor-pointer mx-4" [routerLink]="[link.rota]" routerLinkActive="router-link-active">{{ link.title }}</a>
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
  @Input() menu!: any[];
}
