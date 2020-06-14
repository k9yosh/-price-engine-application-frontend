import { Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PriceService {

  constructor(private http: HttpClient) { }

  // tslint:disable-next-line:ban-types
  calculateOptimalPricesByProductQuantity(id: number, quantity: number): Observable<HttpResponse<Object>> {
    return this.http.get('http://localhost:8080/price/product/optimalPriceProductQuantity/' + id,
      {
        observe: 'response',
        params: new HttpParams().set('quantity', String(quantity))
      });
  }

  // tslint:disable-next-line:ban-types
  calculateOptimalPrice(id: number, units: number, cartons: number): Observable<HttpResponse<Object>> {
    let params = new HttpParams();
    params = params.append('units', String(units));
    params = params.append('cartons', String(cartons));
    return this.http.get('http://localhost:8080/price/product/optimalPrice/' + id,
      {
        observe: 'response',
        params
      });
  }

}
