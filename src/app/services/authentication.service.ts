import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { ConfigService } from "./config.service";

@Injectable()
export class AuthenticationService {
    private headers: Headers;

    constructor(private http: Http,
                private configService: ConfigService) { 
        this.headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
    }

    public login(email: string, password: string): Observable<any> {
        let body = "userName=" + email + "&password=" + password + "&grant_type=password";
        let options = new RequestOptions({ headers: this.headers }); 

        return this.http.post(`${this.configService.get('baseUrl')}/Token`, body, options)
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
