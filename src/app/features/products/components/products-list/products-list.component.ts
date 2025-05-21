import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { MaterialModule } from '../../../../shared/material/material.module';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { ActionMode, Product } from '../../models/products.models';
import { Observable, shareReplay } from 'rxjs';
import { ProductEditComponent } from '../product-edit/product-edit.component';
import { Dialog } from '@angular/cdk/dialog';
import { MatDialog } from '@angular/material/dialog';
import { Action } from 'rxjs/internal/scheduler/Action';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [MaterialModule,CommonModule],
  providers:[ProductService],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class ProductsListComponent implements OnInit {
  public products$!:Observable<Product[]>;
  private productService: ProductService=inject(ProductService);
  readonly dialog = inject(MatDialog);

  ngOnInit() {
    this.products$=this.productService.getAll().pipe(shareReplay(1));  
  }

  public onEdit(id?:number):void{
    this.dialog.open(ProductEditComponent,{
      data: {
        id: id,
        actionMode:ActionMode.edit
      }
    }).afterClosed().subscribe((result) => {
      console.log('Dialog result:', result);
      if (result) {
        this.products$=this.productService.getAll().pipe(shareReplay(1));
      }
    });
  }

  public onView(id?:number):void{
    this.dialog.open(ProductEditComponent,{
      data: {
        id: id,
        actionMode:ActionMode.view
      }
    }).afterClosed().subscribe((result) => {
      console.log('Dialog result:', result);
      if (result) {
        this.products$=this.productService.getAll().pipe(shareReplay(1));
      }
    });
  }


 

}
