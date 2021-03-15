import { Pagination } from './../../models/pagination.mode';
import { PhoneState } from './../../models/phone-state.model';
import { CustomerEndPoint, EndPoints } from './../../util/EndPoints';
import { Customer } from './../../models/customer.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomerService{

  private httpClient:HttpClient;
  constructor(httpClient: HttpClient){
    this.httpClient=httpClient;
  }

  search(countryName:string,phoneState:PhoneState,page:number,pageSize:number): Observable<Pagination> {
    const uri=`${CustomerEndPoint.SEARCH_FULL_PATH}?countryName=${countryName}&phoneState=${phoneState}&page=${page}&pageSize=${pageSize}`;
    return this.httpClient.get<Pagination>(uri);
  }
}
