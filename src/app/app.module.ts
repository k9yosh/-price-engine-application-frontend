import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PriceListComponent } from './price-list/price-list.component';
import { PriceCalcComponent } from './price-calc/price-calc.component';
import {RouterModule, Routes} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';

const appRoutes: Routes = [
  {
    path: '',
    component: PriceListComponent
  },
  {
    path: 'price-list',
    component: PriceListComponent
  },
  {
    path: 'price-calc',
    component: PriceCalcComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    PriceListComponent,
    PriceCalcComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: true} // <-- debugging purposes only
    ),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
