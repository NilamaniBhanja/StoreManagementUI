import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from '../AppSettings';
import { Category } from '../Model/Master.Model';

const API_URL = AppSettings.API_ENDPOINT + "Category/";
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})

export class CategoryService {

  constructor(private http: HttpClient) { }

  getData(): Promise<Category[]> {
    return this.http.get<Category[]>(API_URL, httpOptions).toPromise();
  }

  getDatabyId(id: number): Promise<Category> {
    return this.http.get<Category>(API_URL + id, httpOptions).toPromise();
  }

  addData(category: Category) {
    return this.http.post(API_URL, category, httpOptions);
  }

  updateData(category: Category) {
    return this.http.put(API_URL, category, httpOptions);
  }

  deleteData(id: number) {
    return this.http.delete(API_URL + id.toString(), httpOptions);
  }
}
