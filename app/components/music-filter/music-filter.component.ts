import {Component, Output, EventEmitter, OnInit} from '@angular/core';
import 'rxjs/add/operator/map';
import {FilterService} from "../../services/filter.service";

@Component({
    selector: 'app-music-filter',
    templateUrl: 'components/music-filter/music-filter.component.html',
    styleUrls: ['components/music-filter/music-filter.component.css']
})
export class MusicFilterComponent implements OnInit{
    @Output() onChangeFilter = new EventEmitter();
    singer: string = 'All';
    genre: string = 'All';
    year: string = 'All';

    filters: Object;

    constructor(private filterService: FilterService) {
        this.filters = {singers:[], genres: [], years: []};
    }

    ngOnInit() {
        this.getFilters();
    }

    //singer: string = 'all';
    onFiltersChange(e: any, filter: string) {
        this[filter] = e.target.value;

        let filters = {
            singer: this.singer,
            genre: this.genre,
            year: this.year
        };

        this.onChangeFilter.emit(filters);
    }

    getFilters() {
        this.filterService.getFilters().then((resp: any)=>{
            this.filters = resp;
        })
    }
}