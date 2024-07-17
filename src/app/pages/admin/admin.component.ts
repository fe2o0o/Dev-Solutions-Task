import { AfterViewInit, Component, OnInit, signal, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { NgClass } from '@angular/common';

import { PrductService } from '../../services/prduct.service';
import { ProductFormComponent } from "../../components/product-form/product-form.component";
import { NavbarComponent } from "../../components/navbar/navbar.component";
@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [NgClass, MatTableModule, MatPaginatorModule, MatIconModule, ProductFormComponent, NavbarComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit, AfterViewInit {
  constructor(private _PrductService: PrductService) { }
  displayedColumns: string[] = ['image', 'title', 'price', 'description', 'category', "Controls"];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  isToggle = signal(false)
  selectedProduct: any;
  ngOnInit(): void {
    this._PrductService.getProducts().subscribe({
      next: (res) => {
        this.dataSource.data = res

      }
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  handleUpdateProduct(id: number) {
    this.isToggle.set(true);
    this.selectedProduct = id
  }

  hanldeChangeProduct(event: any) {
    if (event.status == 'add') {
      this.dataSource.data.push(event.data)
      this.dataSource.data = this.dataSource.data.slice();
      this.isToggle.set(false)
    } else {
      const data = event.data
      this.dataSource.data.splice(data.id-1, 1, data)
      this.dataSource.data = this.dataSource.data.slice();
    }
  }

  handleCloseForm(event:any) {
    if (event == false) {
        this.isToggle.set(false)
      this.selectedProduct = undefined
    }
  }

  handleDeleteProduct(id: any) {
    
    this.dataSource.data = this.dataSource.data.filter((pro) => pro.id != id)    
  }
}


