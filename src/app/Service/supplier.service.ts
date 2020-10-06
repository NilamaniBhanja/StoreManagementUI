import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from '../AppSettings';
import { Supplier } from '../Model/Master.Model';

const API_URL = AppSettings.API_ENDPOINT + "Supplier/";
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})

export class SupplierService {

  constructor(private http: HttpClient) { }

  getData(): Promise<Supplier[]> {
    return this.http.get<Supplier[]>(API_URL, httpOptions).toPromise();
  }

  async getDatabyId(id: number): Promise<Supplier> {
    return this.http.get<Supplier>(API_URL + id, httpOptions).toPromise();
  }

  addData(supplier: Supplier) {
    
    return this.http.post(API_URL, supplier, httpOptions);
  }

  updateData(supplier: Supplier) {
    return this.http.put(API_URL, supplier, httpOptions);
  }

  deleteData(id: number) {
    return this.http.delete(API_URL + id.toString(), httpOptions);
  }
}
