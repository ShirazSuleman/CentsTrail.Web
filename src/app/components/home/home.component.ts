import { Component } from '@angular/core';
import { UserToken } from "../../models/usertoken";
import { DataTableResource } from 'angular-2-data-table';
import { TransactionService } from "../../services/transaction.service";
import { Observable } from "rxjs/Observable";
import { Transaction } from "../../models/transaction";
import { AuthenticationService } from "../../services/authentication.service";
import { PeriodService } from "../../services/period.service";
import { Period } from "../../models/period";


@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html'
})

export class HomeComponent {
    selectedPeriod: Period = new Period();
    periods: Period[];
    transactions: Transaction[];
    items: Transaction[] = [];
    itemCount: number = 0;
    itemResource: DataTableResource<Transaction>;

    constructor(
        private transactionService: TransactionService,
        private periodService: PeriodService,
        private authenticationService: AuthenticationService) {
        this.periodService.getPeriods().subscribe(
            data => {
                this.periods = data;
                this.selectedPeriod = this.periods.sort((a, b) => a.id > b.id ? 1 : b.id > a.id ? -1 : 0)[0];
                this.reloadItems({});
            });
    }

    reloadItems(params: any) {
        this.transactionService.getTransactions({ periodId: this.selectedPeriod.id }).subscribe(
            data => {
                this.transactions = data;
                this.itemResource = new DataTableResource(this.transactions);
                this.itemResource.count().then(count => this.itemCount = count);
                this.itemResource.query(params).then(items => this.items = items);
            });
    }

    // special properties:
    rowClick(rowEvent: any) {
        console.log('Clicked: ' + rowEvent.row.item.description);
    }

    rowDoubleClick(rowEvent: any) {
        alert('Double clicked: ' + rowEvent.row.item.description);
    }

    rowTooltip(item: any) { return item.description; }
}