import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService {
    constructor(private http: Http, private baseUrl: string) { }

    register(email: string, password: string, confirmPassword: string): Observable<any> {
        return this.http.post(`${this.baseUrl}/UserAccounts/Register`,
            JSON.stringify({ email: email, password: password, confirmPassword: confirmPassword }))
            .map((response: Response) => response.json());
    }
}