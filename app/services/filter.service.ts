import {Injectable} from "@angular/core";
import {Http} from "@angular/http";

import 'rxjs/add/operator/toPromise'
import {AppSettings} from "../appSettings";

@Injectable()
export class FilterService {
    private fUrl = AppSettings.URL+'filters/';

    constructor(private http: Http) {}

    getFilters():Promise<any> {
        return this.http.get(this.fUrl)
            .toPromise()
            .then(responce => responce.json().filters)
            .catch((e)=>{console.log(e)});
    }
}