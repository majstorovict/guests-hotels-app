import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { GuestsComponent } from './guests/guests.component';
import { HotelsComponent } from './hotels/hotels.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { HotelsService } from './hotels/hotels.service';
import { GuestsService } from './guests/guests.service';
import { LoadingService } from './loading.service';

import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { LoadingInterceptor } from './loading.interceptor';
import { AppRoutingModule } from './app-routing.module';


@NgModule({
  declarations: [
    AppComponent,
    GuestsComponent,
    HotelsComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatProgressBarModule,
    AppRoutingModule
  ],
  exports: [RouterModule],
  providers: [HotelsService, GuestsService, LoadingService, { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
