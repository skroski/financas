import { Component, OnInit, inject } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Entrada } from './models/entrada.model';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSelectModule,
  ],
  template: `
    <h1 class="title">Minhas Finanças</h1>
    <div class="flex header">
      <div>
        <mat-form-field appearance="fill" class="input-item">
          <mat-label>Mês</mat-label>
          <mat-select>
            <mat-option>Selecione o mês</mat-option>
            <mat-option *ngFor="let mes of meses" [value]="mes.value">{{
              mes.viewValue
            }}</mat-option>
          </mat-select>
        </mat-form-field>
      </div>

      <div>
        <mat-form-field appearance="fill" class="input-item">
          <mat-label>Ano</mat-label>
          <mat-select>
            <mat-option value="2023">2023</mat-option>
            <mat-option value="2024">2024</mat-option>
          </mat-select>
        </mat-form-field>
      </div>
    </div>

    <div class="flex card-item">
      <div class="flex-item">
        <mat-card class="receita">
          <mat-card-header class="center">
            <mat-card-title class="titulo"> Receitas </mat-card-title>
          </mat-card-header>

          <mat-card-content class="center conteudo">
          {{ receita | currency: 'BRL' }}
          </mat-card-content>
        </mat-card>
      </div>

      <div class="flex-item">
        <mat-card class="despesa">
          <mat-card-header class="center">
            <mat-card-title class="titulo"> Despesas </mat-card-title>
          </mat-card-header>

          <mat-card-content class="center conteudo">
            {{ despesa | currency: 'BRL' }}
          </mat-card-content>
        </mat-card>
      </div>

      <div class="flex-item">
        <mat-card class="saldo">
          <mat-card-header class="center">
            <mat-card-title class="titulo"> Saldo </mat-card-title>
          </mat-card-header>

          <mat-card-content class="center conteudo"> {{ saldo | currency: 'BRL'}} </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: `
  .flex {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
}

.header {
    height: 300px;
}

.title {
    position: relative;
    font-size: 3rem;
    top: 24px;
    align-items: center;
    justify-content: center;
    display: flex;
}

.mat-mdc-card {
    width: 400px;
    height: 120px;
}

.input-item {
    width: 400px;
    margin-top: 90px;

}

.card-item {
    margin-top: 50px;
    position: relative;
    top: -130px;
}

.flex-item {
    width: 100%;
    padding: 1.2rem;
}

.center {
    margin: 0 auto;
}

.conteudo{
    font-size: 1.5rem;
}

.titulo {
    font-size: 1.6rem;
    padding: 20px;
}

.receita {
    background-color: rgb(75, 179, 75);
    color: #fff;
}

.despesa {
    background-color: rgb(190, 81, 81);
    color: #fff;
}

.saldo {
    background-color: rgb(35, 127, 177);
    color: #fff;
}
  `,
})
export class DashboardComponent implements OnInit {
  meses = [
    { value: 0, viewValue: 'Janeiro' },
    { value: 1, viewValue: 'Fevereiro' },
    { value: 2, viewValue: 'Março' },
    { value: 3, viewValue: 'Abril' },
    { value: 4, viewValue: 'Maio' },
    { value: 5, viewValue: 'Junho' },
    { value: 6, viewValue: 'Julho' },
    { value: 7, viewValue: 'Agosto' },
    { value: 8, viewValue: 'Setembro' },
    { value: 9, viewValue: 'Outubro' },
    { value: 10, viewValue: 'Novembro' },
    { value: 11, viewValue: 'Dezembro' },
  ];

  entradas: any[] = [];
  saldo = 0;
  despesa = 0;
  receita = 0;

  dashboardService = inject(DashboardService);

  ngOnInit(): void {
    this.dashboardService.getEntradas()
      .subscribe((entradas) => {
        this.entradas = entradas;
        this.getReceitas();
        this.getDespesas();
        this.getSaldo();
      });
  }
  getReceitas() {
    return this.entradas.forEach((entrada: Entrada) => {
      if (entrada.tipo === 'receita') {
        this.receita += parseInt(entrada.valor);
      }
    });
  }
  getDespesas() {
    return this.entradas.forEach((entrada: Entrada) => {
      if (entrada.tipo === 'despesa') {
        this.despesa += parseInt(entrada.valor);
      }
    });
  }

  getSaldo() {
    this.saldo = this.receita - this.despesa;
  }
}
