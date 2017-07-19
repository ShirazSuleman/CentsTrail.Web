import { Component } from '@angular/core';
import { UserToken } from "../../models/usertoken";
import { DataTableResource } from 'angular-2-data-table';
import { TransactionService } from "../../services/transaction.service";
import { Observable } from "rxjs/Observable";


@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html'
})

export class HomeComponent {
    currentUserToken: UserToken;
    transactions: Observable<any>;
    items: any[] = [];
    itemCount: number = 0;
    itemResource: DataTableResource<any>;

    constructor(private transactionService: TransactionService) {
        this.currentUserToken = JSON.parse(localStorage.getItem('currentUserToken'));
    }

    reloadItems(params: any) {
        this.transactionService.getTransactions().subscribe(
            data => {
                this.transactions = data;
                this.itemResource = new DataTableResource(this.transactions);
                this.itemResource.count().then(count => this.itemCount = count);
                this.itemResource.query(params).then(items => this.items = items);
            });
    }

    // special properties:

    rowClick(rowEvent: any) {
        console.log('Clicked: ' + rowEvent.row.item.name);
    }

    rowDoubleClick(rowEvent: any) {
        alert('Double clicked: ' + rowEvent.row.item.name);
    }

    rowTooltip(item: any) { return item.jobTitle; }
}