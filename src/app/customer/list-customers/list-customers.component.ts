import { Pagination } from './../../../shared/models/pagination.mode';
import { CountryService } from './../../../shared/services/countries/country.service';
import { Country } from './../../../shared/models/country.model';
import { Customer } from './../../../shared/models/customer.model';
import { CustomerService } from './../../../shared/services/customers/customer.service';
import { PhoneState } from './../../../shared/models/phone-state.model';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-list-customers',
  templateUrl: './list-customers.component.html',
  styleUrls: ['./list-customers.component.css']
})

export class ListCustomersComponent implements OnInit {
selectedPhoneState: PhoneState | null;
phoneStateCtrl =new FormControl();
options: string[] = [PhoneState.ALL.toLocaleString(), PhoneState.Valid.toLocaleString(),PhoneState.INValid.toLocaleString()];
isLoading=false;
filteredCountries: Observable<Country[]>;
  countries: Country[];
  filteredStates:Observable<any>;
  countriesCtrl = new FormControl();
  displayedColumns: string[] = ['id', 'name', 'countryName', 'countryCode','phoneState'];
  dataSource :Customer[];
  customerService:CustomerService
  countryService:CountryService
  customers:Pagination;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  restApiFailed=false;
  constructor(httpClient:HttpClient) {
    this.customerService=new CustomerService(httpClient);
    this.countryService=new CountryService(httpClient);
    this.countries=[];
    this.selectedPhoneState=PhoneState.ALL;
   }

  ngOnInit(): void {
    try{
      this.isLoading=true;
      this.filteredCountries = this.countryService.getAll();
      this.filteredCountries.subscribe(countries=>{
        this.countries=countries;
      })
      this.customerService.search(null,PhoneState.ALL,1,20).subscribe(r=> {
        this.customers=r;
        this.dataSource=this.customers.items;
        this.isLoading=false;
      });
      this.countriesCtrl.valueChanges.pipe(startWith(''),map(value => this._filter(value)));
    }catch(ex){
      this.restApiFailed=true;
      console.error("Error while intializing http connections ");
    }

  }
  private _filter(value: string): Country[] {
   return this.countries.filter( r=> r.name.trim().toLocaleLowerCase().includes( value.trim().toLocaleLowerCase()));
  }

  public doFilter = (value: string) => {
   this.dataSource= this.dataSource.filter( r=> r.name.trim().toLocaleLowerCase() === value.trim().toLocaleLowerCase());
  }
  onKeyUp(event){
    this.filteredCountries = this.countriesCtrl.valueChanges.pipe(startWith(''),map(value => this._filter(event.target.value)))
  }
  submit(event){
    this.isLoading=true;
    this.search(this.countriesCtrl.value,this.selectedPhoneState,this.paginator.pageIndex,this.paginator.pageSize);

  }
  onChangePage(event){
    this.search(this.countriesCtrl.value,this.selectedPhoneState,this.paginator.pageIndex,this.paginator.pageSize);
  }
  search(name:string,state:PhoneState,page:number,pageSize:number):void{
    this.customerService.search(name,state,page,pageSize).subscribe(r=> {
      this.customers=r;
      this.paginator.pageIndex = this.customers.page;
      this.dataSource=this.customers.items;
      this.isLoading=false;
    },err => {
      this.isLoading=false;
      this.customers=new Pagination();
      console.log(err)
    });

  }
}
