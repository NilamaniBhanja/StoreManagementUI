import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from '../AppSettings';
import { Store } from '../Model/Master.Model';

const API_URL = AppSettings.API_ENDPOINT + "Store/";
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})

export class StoreService {

  constructor(private http: HttpClient) { }

  getData(): Promise<Store[]> {
    return this.http.get<Store[]>(API_URL, httpOptions).toPromise();
  }

  async getDatabyId(id: number): Promise<Store> {
    return this.http.get<Store>(API_URL + id, httpOptions).toPromise();
  }

  addData(store: Store) {
    return this.http.post(API_URL, store, httpOptions);
  }

  updateData(store: Store) {
    return this.http.put(API_URL, store, httpOptions);
  }

  deleteData(id: number) {
    return this.http.delete(API_URL + id.toString(), httpOptions);
  }
}
