import { Component, input, OnChanges, output, SimpleChanges } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnChanges {
  product:any = input()
    showDetailsEmitter = output()
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['product'].currentValue != undefined) {
      this.product = changes['product'].currentValue
    }
  }

  
  showDetails(product: any) {
    this.showDetailsEmitter.emit(product)
  }


}
