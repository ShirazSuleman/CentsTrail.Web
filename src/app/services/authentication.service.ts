import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService {
    constructor(private http: Http, private baseUrl: string) { }

    public login(email: string, password: string): Observable<any> {
        return this.http.post(`${this.baseUrl}/Token`,
            JSON.stringify({ userName: email, password: password, grant_type: 'password' }))
            .map((response: Response) => {
                let userToken = response.json();

                if (userToken && userToken.access_token) {
                    localStorage.setItem('currentUserToken', JSON.stringify(userToken));
                }

                return userToken;
            });
    }

    public logout(): void {
        localStorage.removeItem('currentUserToken');
    }

    public jwt(): RequestOptions {
        let currentUserToken = JSON.parse(localStorage.getItem('currentUserToken'));

        if (currentUserToken && currentUserToken.access_token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUserToken.access_token });
            return new RequestOptions({ 'headers': headers });
        }
    }
}
