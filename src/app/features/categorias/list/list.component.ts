import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CategoriasService } from '../categorias.service';
import { Categoria } from '../categoria.model';


@Component({
  selector: 'app-list',
  standalone: true,
  imports: [MatPaginator, MatPaginatorModule, MatTableModule],
  template: `
   <div class="mx-8">
  <table mat-table [dataSource]="dataSource">

    <!-- Nome Column -->
    <ng-container matColumnDef="nome">
      <th mat-header-cell *matHeaderCellDef> Nome </th>
      <td mat-cell *matCellDef="let element"> {{element.nome}} </td>
    </ng-container>

    <!-- DescriçãoColumn -->
    <ng-container matColumnDef="descricao">
      <th mat-header-cell *matHeaderCellDef> Descrição </th>
      <td mat-cell *matCellDef="let element"> {{element.descricao}} </td>
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

  displayedColumns: string[] = ['nome', 'descricao'];
  dataSource = new MatTableDataSource<Categoria>();
  categorias: Categoria[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  private categoriasService = inject(CategoriasService);

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
}

