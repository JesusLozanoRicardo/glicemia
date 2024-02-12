import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { defineCustomElements as jeepSqlite } from 'jeep-sqlite/loader'
import { NgApexchartsModule } from 'ng-apexcharts';
import { Page1Component } from './page1/page1.component';
import {ReactiveFormsModule} from '@angular/forms';

jeepSqlite(window)

@NgModule({
  declarations: [AppComponent,Page1Component,],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule, 
    HttpClientModule,
    NgApexchartsModule,
    ReactiveFormsModule,
  ],

  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule {}
