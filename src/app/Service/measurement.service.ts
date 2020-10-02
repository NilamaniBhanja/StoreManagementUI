import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  getData(): Promise<Measurement[]> {
    return this.http.get<Measurement[]>(API_URL, httpOptions).toPromise();
  }

  getDatabyId(id: number): Promise<Measurement> {
    return this.http.get<Measurement>(API_URL + id, httpOptions).toPromise();
  }

  addData(measurement: Measurement) {
    return this.http.post(API_URL, measurement, httpOptions);
  }

  updateData(measurement: Measurement) {
    return this.http.put(API_URL, measurement, httpOptions);
  }

  deleteData(id: number) {
    return this.http.delete(API_URL + id.toString(), httpOptions);
  }
}
