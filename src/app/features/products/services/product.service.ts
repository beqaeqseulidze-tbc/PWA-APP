import { Injectable } from '@angular/core';
import { CrudService } from '../../../shared/services/crud.service';
import { Product } from '../models/products.models';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends CrudService<Product> {

  constructor(
    http: HttpClient, 
  ) {
    super(http,'products');
   }
}
