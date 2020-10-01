import { HttpClient,  HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from '../AppSettings';
import { Measurement } from '../Model/Master.Model';

const API_URL = AppSettings.API_ENDPOINT + "Measurement/";
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})

export class MeasurementService {

  constructor(private http: HttpClient) { }

  getData(): Observable<Measurement[]> {
    return this.http.get<Measurement[]>(API_URL, httpOptions);
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

  async getDatabyId(id: number): Promise<Measurement> {
    return this.http.get<Measurement>(API_URL + id, httpOptions).toPromise();
  }

  addData(brand: Measurement) {
    return this.http.post(API_URL, brand, httpOptions);
  }

  updateData(brand: Measurement) {
    return this.http.put(API_URL + brand.id.toString(), brand, httpOptions);
  }

  deleteData(id: number) {
    return this.http.delete(API_URL + id.toString(), httpOptions);
  }
}
