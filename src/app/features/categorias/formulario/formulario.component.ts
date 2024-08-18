import { timeoutProvider } from './../../../../../node_modules/rxjs/src/internal/scheduler/timeoutProvider';
import { Component, inject, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CategoriasService } from '../categorias.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from '../models/categoria.model';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  template: `
    <form class="example-form" [formGroup]="formCategoria">
  <mat-form-field class="example-full-width">
    <mat-label>Categoria</mat-label>
    <input matInput placeholder="Ex. Alimentação, Transporte" formControlName="nome" >
  </mat-form-field>

  <mat-form-field class="example-full-width">
    <mat-label>Descrição da Categoria</mat-label>
    <textarea matInput placeholder="Digite as informações importantes" formControlName="descricao"></textarea>
  </mat-form-field>
   <button mat-button-raised color="primary" [disabled]="!formCategoria.valid" (click)="salvarCategoria()">Salvar</button>
</form>

  `,
  styles: `
  :host {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    margin-top: 2rem;
  }
  .example-form {
  min-width: 150px;
  max-width: 500px;
  width: 100%;
}

.example-full-width {
  width: 100%;
}`
})
export class FormularioComponent implements OnInit {
  categoria!: Categoria;
  id: string = ''
  title: string = '';

  formCategoria!: FormGroup;
  routeNavigate: string = 'form';
  newFormCategoria: boolean = false;

  private categoriasService = inject(CategoriasService);
  private activatedRoute = inject(ActivatedRoute);
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);



  ngOnInit(): void {

    this.routeNavigate = this.activatedRoute.snapshot.url[0].path;
    this.criarFormulario();

    if (this.routeNavigate === 'editar') {

      this.title = 'Editar Categoria'

      this.id = this.activatedRoute.snapshot.url[1].path;
      this.buscarCategoriaPeloId();

    } else {
      this.newFormCategoria = true;
    }

  }

  criarFormulario() {
    this.formCategoria = this.formBuilder.group(
      {
        nome: ['', Validators.required],
        descricao: ['', Validators.required]
      }
    )
  }
  buscarCategoriaPeloId() {
    this.categoriasService.getCategoriasById(parseInt(this.id))
      .subscribe((categoria: Categoria) => {
        this.categoria = categoria;
        this.formCategoria.controls['nome'].setValue(categoria.nome);
        this.formCategoria.controls['descricao'].setValue(categoria.descricao);
      });
  }


  salvarCategoria() {

    if (this.formCategoria.touched && this.formCategoria.dirty) {

      const payload: Categoria = {
        nome: this.formCategoria.controls['nome'].value,
        descricao: this.formCategoria.controls['descricao'].value,
      }

      if (this.newFormCategoria) {
        this.criarCategoria(payload)
      } else {
        payload.id = this.categoria.id;
        this.editarCategoria(payload);
      }

    }

  }

  editarCategoria(payload: Categoria) {
    this.categoriasService.alterarCategoria(payload)
      .subscribe(resposta => {

        //Retornar a tela anterior
        this.router.navigate(['categorias']);

      });
  }

  criarCategoria(payload: Categoria) {
    this.categoriasService.criarCategoria(payload)
      .subscribe(resposta => {

        //Retornar a tela anterior
        this.router.navigate(['categorias']);

      });
  }

}
