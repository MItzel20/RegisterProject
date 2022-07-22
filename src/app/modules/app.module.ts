import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ModalModule } from 'ngx-bootstrap/modal';

import { AppRoutingModule } from '../app-routing.module';
import { BasicAuthInterceptor } from '../basic-auth-interceptor';
import { MainComponent } from '../components/main.component';
import { NamesComponent } from '../components/names.component';
import { PhoneComponent } from '../components/phone.component';
import { RegisterComponent } from '../components/register.component';
import { ValidateComponent } from '../components/validate.component';

@NgModule({
  declarations: [
    MainComponent,
    RegisterComponent,
    PhoneComponent,
    NamesComponent,
    ValidateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ModalModule.forRoot(),
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    {
    provide: HTTP_INTERCEPTORS,
    useClass: BasicAuthInterceptor,
    deps: [Router],
    multi: true
  }
],
  bootstrap: [MainComponent]
})
export class AppModule { }
