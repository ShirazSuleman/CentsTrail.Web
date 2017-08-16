import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { ConfigService } from "./config.service";
import { AuthenticationService } from "./authentication.service";
import { Transaction } from "../models/transaction";

@Injectable()
export class TransactionService {
    private headers: Headers;

    constructor(private http: Http,
        private configService: ConfigService,
        private authenticationService: AuthenticationService) {
    }

    getTransactions(request: any): Observable<Transaction[]> {
        return this.http.post(`${this.configService.get('baseUrl')}/Transactions/Search`,
            JSON.stringify(request), this.authenticationService.jwt()).map((response: Response) => {
                return response.json();
            });
    }
}