import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { ConfigService } from "./config.service";
import { UserToken } from "../models/usertoken";

@Injectable()
export class AuthenticationService {
    private headers: Headers;

    constructor(private http: Http,
        private configService: ConfigService) {
        this.headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    }

    public login(email: string, password: string): Observable<UserToken> {
        let body = "userName=" + email + "&password=" + password + "&grant_type=password";
        let options = new RequestOptions({ headers: this.headers });

        return this.http.post(`${this.configService.get('baseUrl')}/Token`, body, options)
            .map((response: Response) => {
                let tempToken = response.json();

                let userToken = new UserToken(
                    tempToken.access_token,
                    tempToken.token_type,
                    tempToken.expires_in,
                    tempToken.refresh_token,
                    tempToken.userName,
                    tempToken['.issued'],
                    tempToken['.expires']);

                if (userToken && userToken.accessToken) {
                    localStorage.setItem('currentUserToken', JSON.stringify(userToken));
                }

                return userToken;
            });
    }

    public logout(): void {
        localStorage.removeItem('currentUserToken');
    }

    get currentUserName(): string { 
        let currentUserToken: UserToken = JSON.parse(localStorage.getItem('currentUserToken'));
        return currentUserToken.userName; 
    }

    public jwt(): RequestOptions {
        let currentUserToken: UserToken = JSON.parse(localStorage.getItem('currentUserToken'));

        if (currentUserToken && currentUserToken.accessToken) {
            let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + currentUserToken.accessToken });
            return new RequestOptions({ 'headers': headers });
        }
    }
}
