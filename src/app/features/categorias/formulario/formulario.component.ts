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
  id: string = '';
  formCategoria!: FormGroup;

  private categoriasService = inject(CategoriasService);
  private route = inject(ActivatedRoute);
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);


  ngOnInit(): void {
    this.id = this.route.snapshot.url[1].path;
    this.criarFormulario();
    this.categoriasService.getCategoriasById(parseInt(this.id))
      .subscribe((categoria: Categoria) => {
        this.categoria = categoria;
        this.formCategoria.controls['nome'].setValue(categoria.nome);
        this.formCategoria.controls['descricao'].setValue(categoria.descricao);
      })

  }
  criarFormulario() {
    this.formCategoria = this.formBuilder.group(
      {
        nome: ['', Validators.required],
        descricao: ['', Validators.required]
      }
    )
  }

}
