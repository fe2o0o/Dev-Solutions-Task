import { Component, OnInit, signal } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { HeroComponent } from "../../components/hero/hero.component";
import { PrductService } from '../../services/prduct.service';
import { NgClass } from '@angular/common';
import { CurrencyPipe } from '@angular/common';
import { ProductComponent } from "../../components/product/product.component";
import { ProductDetailsComponent } from "../../components/product-details/product-details.component";
@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CurrencyPipe, NgClass, NavbarComponent, HeroComponent, ProductComponent, ProductDetailsComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit {
  constructor(private _PrductService: PrductService) { }
  categories: string[] = [];
  cuurentCat = signal('all')
  products: any[] = []
  showProductDetails = signal(false)
  selectedShowProductDetails: any;
  ngOnInit(): void {
    this._PrductService.getAllCategories().subscribe({
      next: (res) => {
        this.categories = res
      }
    })

    this._PrductService.getProducts().subscribe({
      next: (res) => {
        this.products = res
      }
    })
  }

  handleChangeCategory(cat: string) {
    this.cuurentCat.set(cat)
    this.fetchProductCategory(cat)
  }

  handleShowDetails(event: any) {
    this.showProductDetails.set(true)
    this.selectedShowProductDetails = event
  }

  handleCloseDetails(event: boolean) {
    this.showProductDetails.set(event)
  }

  fetchProductCategory(cat: string) {
    if (cat === 'all') {
      this._PrductService.getProducts().subscribe({
        next: (res) => {
          this.products = res
        }
      })
    } else {
      this._PrductService.getProductsByCategory(cat).subscribe({
        next: (res) => {
          this.products = res

        }
      })
    }
  }
}
