import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { AppComponent } from './components/app.component';
import { HttpModule, Http } from "@angular/http";
import { FormsModule } from '@angular/forms';
import { LoginComponent } from "./components/login/login.component";
import { AuthenticationService } from "./services/authentication.service";
import { RegisterComponent } from "./components/register/register.component";
import { AlertService } from "./services/alert.service";
import { RegistrationService } from "./services/registration.service";
import { ROUTING } from "./app.routing";
import { AuthenticationGuard } from "./guards/auth.guard";
import { AlertComponent } from "./components/alert/alert.component";
import { HomeComponent } from "./components/home/home.component";
import { ConfigService } from "./services/config.service";
import { DataTableModule } from "angular-2-data-table";
import { TransactionService } from "./services/transaction.service";

@NgModule({
  imports: [BrowserModule, FormsModule, HttpModule, ROUTING, DataTableModule, CommonModule ],
  declarations: [AppComponent, LoginComponent, RegisterComponent, AlertComponent, HomeComponent],
  providers: [
    AuthenticationGuard,
    ConfigService,
    {
      provide: AuthenticationService,
      useFactory: (http: Http, configService: ConfigService) => new AuthenticationService(http, configService),
      deps: [Http, ConfigService]
    },
    {
      provide: RegistrationService,
      useFactory: (http: Http, configService: ConfigService) => new RegistrationService(http, configService),
      deps: [Http, ConfigService]
    },
    {
      provide: TransactionService,
      useFactory: (http: Http, configService: ConfigService, authenticationService: AuthenticationService) => new TransactionService(http, configService, authenticationService),
      deps: [Http, ConfigService, AuthenticationService]
    },
    AlertService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
