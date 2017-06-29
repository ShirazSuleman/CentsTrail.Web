import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './components/app.component';
import { HttpModule } from "@angular/http";
import { FormsModule }    from '@angular/forms';
import { LoginComponent } from "./components/login/login.component";
import { AuthenticationService } from "./services/authentication.service";

@NgModule({
  imports:      [ BrowserModule, FormsModule, HttpModule ],
  declarations: [ AppComponent, LoginComponent ],
  providers:    [ AuthenticationService ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
