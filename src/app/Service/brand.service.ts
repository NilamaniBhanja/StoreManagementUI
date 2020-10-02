import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from '../AppSettings';
import { Brand } from '../Model/Master.Model';

const API_URL = AppSettings.API_ENDPOINT + "Brand/";
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})

export class BrandService {

  constructor(private http: HttpClient) { }

  getData(): Promise<Brand[]> {
    return this.http.get<Brand[]>(API_URL, httpOptions).toPromise();
  }

  async getDatabyId(id: number): Promise<Brand> {
    return this.http.get<Brand>(API_URL + id, httpOptions).toPromise();
  }

  addData(brand: Brand) {
    return this.http.post(API_URL, brand, httpOptions);
  }

  updateData(brand: Brand) {
    return this.http.put(API_URL, brand, httpOptions);
  }

  deleteData(id: number) {
    return this.http.delete(API_URL + id.toString(), httpOptions);
  }
}
