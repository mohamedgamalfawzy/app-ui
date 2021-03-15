import { Country } from './../../models/country.model';
import { PhoneState } from './../../models/phone-state.model';
import { CountryEndPoint, CustomerEndPoint, EndPoints } from './../../util/EndPoints';
import { Customer } from './../../models/customer.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CountryService{

  private httpClient:HttpClient;
  constructor(httpClient: HttpClient){
    this.httpClient=httpClient;
  }

  getAll(): Observable<Country[]> {
    const uri=`${CountryEndPoint.GETALL_URI}`;
    return this.httpClient.get<Country[]>(uri);
  }
}
