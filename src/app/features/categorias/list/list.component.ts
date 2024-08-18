import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CategoriasService } from '../categorias.service';
import { Categoria } from '../models/categoria.model';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';


@Component({
  selector: 'app-list',
  standalone: true,
  imports: [MatPaginator, MatPaginatorModule, MatTableModule, MatIconModule],
  template: `
  <div class="container flex">
    <button mat-raised-button color="accent" class="bg-yellow-600 text-yellow-950 px-4 py-2 rounded-sm border-s-yellow-50 mb-4" (click)="novaCategoria()">Novo</button>

</div>
   <div class="mx-8">
  <table mat-table [dataSource]="dataSource">

    <!-- Nome Column -->
    <ng-container matColumnDef="nome">
      <th mat-header-cell *matHeaderCellDef> Nome </th>
      <td mat-cell *matCellDef="let element"> {{element.nome}} </td>
    </ng-container>

    <!-- Descrição Column -->
    <ng-container matColumnDef="descricao">
      <th mat-header-cell *matHeaderCellDef> Descrição </th>
      <td mat-cell *matCellDef="let element"> {{ element.descricao }} </td>
    </ng-container>

     <!-- Editar Column -->
     <ng-container matColumnDef="editar">
      <th mat-header-cell *matHeaderCellDef> Edição </th>
      <td mat-cell *matCellDef="let element"> <mat-icon (click)="chamarEdicao(element)" class="text-orange-400 cursor-pointer">edit</mat-icon> </td>
    </ng-container>

     <!-- Deletar Column -->
     <ng-container matColumnDef="deletar">
      <th mat-header-cell *matHeaderCellDef> Deletar </th>
      <td mat-cell *matCellDef="let element"> <mat-icon (click)="excluirCategoria(element.id)" class="text-red-700 cursor-pointer">delete</mat-icon> </td>
    </ng-container>


    <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
    <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
  </table>

  <mat-paginator [pageSizeOptions]="[10, 20]"
                 showFirstLastButtons
                 aria-label="Select page of periodic elements">
  </mat-paginator>
  </div>
  `,
  styles: `
  `
})
export class ListComponent implements AfterViewInit, OnInit {

  displayedColumns: string[] = ['nome', 'descricao', 'editar', 'deletar'];
  dataSource = new MatTableDataSource<Categoria>();
  categorias: Categoria[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  private categoriasService = inject(CategoriasService);
  private router = inject(Router);

  buscarCategorias() {
    this.categoriasService.getCategorias()
      .subscribe((categorias: Categoria[]) => {
        this.categorias = categorias;
        this.dataSource.data = this.categorias;
      });
  }
  ngOnInit(): void {
    this.categoriasService.getCategorias()
      .subscribe((categorias: Categoria[]) => {
        this.categorias = categorias;
        this.dataSource.data = this.categorias;
      });
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  chamarEdicao(categoria: Categoria): void {
    this.router.navigate(['categorias', 'editar', categoria.id]);
  }
  excluirCategoria(id: number) {
    this.categoriasService.excluirCategoria(id)
      .subscribe(resposta => {
        this.buscarCategorias();
      });
  }
  novaCategoria() {
    this.router.navigate(['categorias', 'nova-categoria']);
  }
}

