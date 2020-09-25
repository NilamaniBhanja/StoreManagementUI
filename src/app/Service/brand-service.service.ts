import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand } from '../Model/Master.Model';
import { ResDataModal } from '../Model/resDataModal';

const API_URL = "http://localhost:5000/api/Brand/";
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})

export class BrandServiceService {

  constructor(private http: HttpClient) { }

  getData(): Observable<Brand[]> {
    return this.http.get<Brand[]>(API_URL, httpOptions);
  }

  toQueryString(obj) {
    var parts = [];
    for (var property in obj) {
      var value = obj[property];
      if (value != null && value != undefined)
        parts.push(encodeURIComponent(property) + '=' + encodeURIComponent(value));
    }
    return parts.join('&');
  }

  async getDatabyId(id: number): Promise<Brand> {
    return this.http.get<Brand>(API_URL + id, httpOptions).toPromise();
  }

  addData(brand: Brand) {
    return this.http.post(API_URL, brand, httpOptions);
  }

  updateData(brand: Brand) {
    return this.http.put(API_URL + brand.id.toString(), brand, httpOptions);
  }

  deleteData(id: number) {
    return this.http.delete(API_URL + id.toString(), httpOptions);
  }
}
