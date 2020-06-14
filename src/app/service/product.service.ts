import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  // tslint:disable-next-line:ban-types
  getProducts(): Observable<HttpResponse<Object>> {
    return this.http.get('http://localhost:8080/product/all', {observe: 'response'});
  }

}
