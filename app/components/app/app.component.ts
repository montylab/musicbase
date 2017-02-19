import { Component } from '@angular/core';

@Component({
    selector: 'my-app',
    styleUrls: ['components/app/app.component.css'],
    templateUrl: 'components/app/app.component.html',
})
export class AppComponent {
    filters: Object = {};

    constructor() {}

    onChangeFilter(filters: Object) {
        this.filters = filters;
    }
}
