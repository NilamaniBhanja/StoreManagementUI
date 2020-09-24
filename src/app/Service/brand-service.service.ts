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

  getBrand(): Observable<Brand[]> {
    console.log(API_URL);
    console.log(this.http.get<Brand[]>(API_URL, httpOptions));
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
