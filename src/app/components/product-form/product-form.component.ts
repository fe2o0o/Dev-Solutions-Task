import { Component, input, OnChanges, OnInit, output, signal, SimpleChanges } from '@angular/core';
import { PrductService } from '../../services/prduct.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [MatIconModule,NgClass,ReactiveFormsModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss'
})
export class ProductFormComponent implements OnChanges , OnInit {
  constructor(private _PrductService:PrductService ){}
  productId = input()
  categories: string[] = []
  imageUrl = signal('');
  fileToUpload: any;
  mood: string = 'add';
  toogleForm = output<boolean>()

  productEmiter = output<any>()
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes['productId'].currentValue);
    
    if (changes['productId'].currentValue != undefined) {      
      this.productId = changes['productId'].currentValue;
      this.handleFormForUpdaate()
      this.mood='update'
    } else {
      this.mood='add'
    }
    
  }

  ngOnInit(): void {
    this._PrductService.getAllCategories().subscribe({
      next: (res) => {
          this.categories=res
        }
      })
  }

  readUrl(file: FileList) {
    this.fileToUpload = file.item(0);    
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl.set(event.target.result);
    }
    reader.readAsDataURL(this.fileToUpload);
    
  }

  productForm: FormGroup = new FormGroup({
    title: new FormControl(null, [Validators.required]),
    price: new FormControl(null, [Validators.required, Validators.min(1)]),
    category: new FormControl(null, [Validators.required]),
    description: new FormControl(null, [Validators.required]),
    image:new FormControl(null )
  })
  hadleSubmitProduct(form: FormGroup) {
    if (form.valid) {
      form.value.image = this.imageUrl();
      if (this.mood == 'add') {
        this.productEmiter.emit({status:"add" , data:form.value})
      } else {
        form.value.id = this.productId
        this.productEmiter.emit({status:"update" , data:form.value})
      }
    }
  }

  handleFormForUpdaate() {
    this._PrductService.getSpacificProduct(this.productId).subscribe({
      next: (res: any) => {        
        this.productForm.setValue({
          title: res.title,
          price: res.price,
          category: res.category,
          description: res.description,
          image: ''
        })
        this.imageUrl.set(res.image)
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  closeOverLay() {
    this.toogleForm.emit(false)
    this.mood='add'
  }
}
