import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { MaterialModule } from '../../../../shared/material/material.module';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActionMode, Product } from '../../models/products.models';
import { Observable, of, tap } from 'rxjs';
import { ProductService } from '../../services/product.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-edit',
  standalone: true,
  imports: [MaterialModule, CommonModule, ReactiveFormsModule],
  providers: [ProductService],
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductEditComponent implements OnInit {

  private productService: ProductService = inject(ProductService);
  readonly dialogRef = inject(MatDialogRef<ProductEditComponent>);
  readonly data = inject(MAT_DIALOG_DATA);
  public fb:FormBuilder=inject(FormBuilder);
  
  public productForm!: FormGroup;
  public model!:Product;
  public mode!:ActionMode;
  public actionMode = ActionMode;

  ngOnInit(): void {
    this.mode = this.data.actionMode;
    this.initForm();
    if(this.data.id){
      this.productService.getById(this.data.id).pipe(tap((product:Product) => {
        this.model = product;
        this.productForm.patchValue(this.model);
      })).subscribe();
    }
    else{
      this.model = new Product();
    }
  }

  private initForm(): void {
    this.productForm = this.fb.group({
      title: [{value:'', disabled:this.mode==ActionMode.view}, Validators.required],
      price: [{value:0, disabled:this.mode==ActionMode.view}, [Validators.required, Validators.min(0)]],
      description: [{value:'', disabled:this.mode==ActionMode.view}, Validators.required],
      category: [{value:'', disabled:this.mode==ActionMode.view},Validators.required],
      image: [{value:'', disabled:this.mode==ActionMode.view}, Validators.required]
    });
  }

  onSubmit() {
    if (this.productForm.valid) {
      console.log('Form submitted:', this.productForm.value);
    } else {
      this.productForm.markAllAsTouched();
    }
  }

  public onClose(): void {
    this.dialogRef.close();
  }

}
