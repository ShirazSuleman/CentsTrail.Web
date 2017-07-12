import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { ConfigService } from "./config.service";

@Injectable()
export class RegistrationService {
    private headers: Headers;

    constructor(private http: Http,
                private configService: ConfigService) {
        this.headers = new Headers({ 'Content-Type': 'application/json' });
     }

    register(email: string, password: string, confirmPassword: string): Observable<any> {
        let options = new RequestOptions({ headers: this.headers }); 

        return this.http.post(`${this.configService.get('baseUrl')}/UserAccounts/Register`,
            JSON.stringify({ email: email, password: password, confirmPassword: confirmPassword }), options);
    }
}