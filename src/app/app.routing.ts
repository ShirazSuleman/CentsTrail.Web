import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from "./components/login/login.component";
import { AuthenticationGuard } from "./guards/auth.guard";
import { RegisterComponent } from "./components/register/register.component";

const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthenticationGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const ROUTING = RouterModule.forRoot(appRoutes);