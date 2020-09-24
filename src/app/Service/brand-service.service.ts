import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand } from '../Models/Master.Model';

const API_URL = "/api/Brand/";
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

  getBrand(filter): Observable<Brand[]> {
    return this.http.get<Brand[]>(API_URL + '?' + this.toQueryString(filter), httpOptions);
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

  async getBrandbyId(id: number): Promise<Brand> {
    return this.http.get<Brand>(API_URL + id, httpOptions).toPromise();
  }

  addBrand(brand: Brand) {
    return this.http.post(API_URL, brand, httpOptions);
  }

  updateBrand(brand: Brand) {
    return this.http.put(API_URL + brand.Id.toString(), brand, httpOptions);
  }

  deleteBrand(id: number) {
    return this.http.delete(API_URL + id.toString(), httpOptions);
  }
}
