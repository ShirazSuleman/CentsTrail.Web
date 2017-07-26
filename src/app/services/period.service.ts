import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { ConfigService } from "./config.service";
import { AuthenticationService } from "./authentication.service";
import { Period } from "../models/period";

@Injectable()
export class PeriodService {
    private headers: Headers;

    constructor(private http: Http,
        private configService: ConfigService,
        private authenticationService: AuthenticationService) {
    }

    getPeriods(): Observable<Period[]> {
        return this.http.get(`${this.configService.get('baseUrl')}/Periods`,
            this.authenticationService.jwt()).map((response: Response) => {
                return response.json();
            });
    }
}