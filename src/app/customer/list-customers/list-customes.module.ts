import { MaterialModule } from 'src/shared/modules/matrial-shared.module';
import { MatTableModule } from '@angular/material/table';
import { ListCustomersComponent } from './list-customers.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    ListCustomersComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule
  ],
})

export class ListCustomersModule {


}
