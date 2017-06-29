import { OnInit, Component } from "@angular/core";
import { AuthenticationService } from "../../services/authentication.service";

@Component({
    moduleId: module.id,
    selector: 'centstrail-login',
    templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {
    returnUrl: string;
    loading = false;
    model: any = {};

    constructor(private authenticationService: AuthenticationService) {
    }

    ngOnInit(): void {
        // reset login status
        this.authenticationService.logout();

        // TODO: Get Return Url From Route
        this.returnUrl = "";
    }

    login() {
        this.loading = true;
        this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(
            data => {
                console.log(data);
                this.loading = false;
            },
            error => {
                console.log(error);
                this.loading = false;
            });
    }
}