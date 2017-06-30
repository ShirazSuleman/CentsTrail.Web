import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './components/app.component';
import { HttpModule } from "@angular/http";
import { FormsModule }    from '@angular/forms';
import { LoginComponent } from "./components/login/login.component";
import { AuthenticationService } from "./services/authentication.service";
import { RegisterComponent } from "./components/register/register.component";
import { AlertService } from "./services/alert.service";
import { RegistrationService } from "./services/registration.service";
import { ROUTING } from "./app.routing";
import { AuthenticationGuard } from "./guards/auth.guard";
import { AlertComponent } from "./components/alert/alert.component";
import { HomeComponent } from "./components/home/home.component";

@NgModule({
  imports:      [ BrowserModule, FormsModule, HttpModule, ROUTING ],
  declarations: [ AppComponent, LoginComponent, RegisterComponent, AlertComponent, HomeComponent ],
  providers:    [ AuthenticationGuard, AuthenticationService, RegistrationService, AlertService ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
