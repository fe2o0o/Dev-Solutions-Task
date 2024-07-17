import { Component, input, OnChanges, output, SimpleChanges } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CurrencyPipe,MatIconModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnChanges {
  product:any = input()
  closeDetailsEmitter = output<boolean>()
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['product'].currentValue != undefined) {
      this.product = changes['product'].currentValue    
    }
  }

  closeOverLay() {
    this.closeDetailsEmitter.emit(false)
  }

}
