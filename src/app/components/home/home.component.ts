import { Component } from '@angular/core';
import { UserToken } from "../../models/usertoken";

@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html'
})

export class HomeComponent {
    currentUserToken: UserToken;

    constructor() {
        this.currentUserToken = JSON.parse(localStorage.getItem('currentUserToken'));
    }
}