import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from '../AppSettings';
import { ProductCost } from '../Model/Master.Model';

const API_URL = AppSettings.API_ENDPOINT + "ProductCost/";
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})

export class ProductCostService {

  constructor(private http: HttpClient) { }

  getData(): Promise<ProductCost[]> {
    return this.http.get<ProductCost[]>(API_URL, httpOptions).toPromise();
  }

  async getDatabyId(id: number): Promise<ProductCost> {
    return this.http.get<ProductCost>(API_URL + id, httpOptions).toPromise();
  }

  addData(ProductCost: ProductCost) {
    return this.http.post(API_URL, ProductCost, httpOptions);
  }

  updateData(ProductCost: ProductCost) {
    return this.http.put(API_URL, ProductCost, httpOptions);
  }

  deleteData(id: number) {
    return this.http.delete(API_URL + id.toString(), httpOptions);
  }
}
