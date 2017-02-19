import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Song} from "../objects/song";

import { AppSettings } from "../appSettings";

import 'rxjs/add/operator/toPromise'

@Injectable()
export class MusicService {
    private mUrl = AppSettings.URL+'base/';

    constructor(private http: Http) {}

    getMusic(params: any):Promise<Song[]> {
        let urlParams = '?limit=' + ((params.limit) ? params.limit : 50);
        let where = [], equal = [];

        for (let filterBy in params.filters) {
            if (params.filters[filterBy]!='All') {
                where.push(filterBy);
                equal.push(params.filters[filterBy]);
            }
        }

        if (where.length) {
            urlParams += '&where='+JSON.stringify(where) +'&equal='+ JSON.stringify(equal);
        }

        if (params.sortBy) {
            urlParams += '&order='+params.sortBy
        }

        if (params.order == -1) {
            urlParams += '&desc=true';
        }

        if (params.offset) {
            urlParams += '&offset='+params.offset;
        }

        console.log(urlParams);

        return this.http.get(this.mUrl + urlParams)
            .toPromise()
            .then(responce => responce.json().music)
            .catch((e)=>{console.log(e)});
    }
}