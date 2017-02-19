import {Component, OnChanges, SimpleChange, Input, OnInit, HostListener, Inject} from '@angular/core';
import {DOCUMENT} from "@angular/platform-browser";

import 'rxjs/add/operator/map';

import { MusicService } from "../../services/music.service";
import { Song } from "../../objects/song";


@Component({
    selector: 'app-music-list',
    templateUrl: 'components/music-list/music-list.component.html',
    styleUrls: ['components/music-list/music-list.component.css'],
})
export class MusicListComponent implements OnChanges, OnInit{
    music: Array<Song>;
    sort: string = null;
    order: number = 1;
    offset: number = 0;
    limit: number = 100;
    scrollDelay: number = 500;
    lastScrollTime: number = 0;
    scrollTreshold: number = 1500; // height of invisible items below the screen;
    noMoreElements: boolean = false;

    isLoading: boolean = true;

    @Input() filters: Object;

    constructor(private musicService: MusicService, @Inject(DOCUMENT) private document: Document) {}

    @HostListener('window:scroll', [])
    onWindowScroll() {
        if (this.noMoreElements || +(new Date()) -  this.lastScrollTime < this.scrollDelay) {
            return;
        }

        let top = this.document.body.scrollTop;
        let tableHeight = document.querySelector('.musicList').scrollHeight;
        let wsh = window.screen.height;

        if (wsh+top-tableHeight > -this.scrollTreshold) { // we are beloew treshold, need more items
            this.loadMore();
            this.lastScrollTime = +(new Date());
        }
    }

    ngOnInit() {
        //this.getMusic();
    }

    ngOnChanges (changes: {[propKey: string]: SimpleChange}) {
        this.isLoading = true;
        this.getMusic();
    }

    getMusic() {
        let mParams = {
            filters: this.filters,
            sortBy: this.sort,
            order: this.order,
            limit: this.limit
        };
        this.isLoading = true;

        this.musicService.getMusic(mParams).then((res)=>{
            this.music = res;
            this.offset = 0;
            this.noMoreElements = false;
            this.isLoading = false;
        });
    }

    loadMore() {
        this.offset += this.limit;
        let mParams = {
            filters: this.filters,
            sortBy: this.sort,
            order: this.order,
            offset: this.offset,
            limit: this.limit
        };

        this.musicService.getMusic(mParams).then((res)=>{
            if (res.length) {
                ([]).push.apply(this.music, res);
            } else {
                this.noMoreElements = true;
            }
        });
    }

    sortBy(sortKey: string) {
        this.order = sortKey == this.sort ? (-1 * this.order) : 1;
        this.sort = sortKey;

        if (this.noMoreElements || this.music.length < this.limit) {
            switch(sortKey) {
                case 'singer': {
                    this.music.sort((a, b)=>this.compariser(a.singer, b.singer, this.order));
                    break;
                }
                case 'song': {
                    this.music.sort((a, b)=>this.compariser(a.song, b.song, this.order));
                    break;
                }
                case 'year': {
                    this.music.sort((a, b)=>(a.year-b.year)*this.order);
                    break;
                }
                case 'genre': {
                    this.music.sort((a, b)=>this.compariser(a.genre, b.genre, this.order));
                    break;
                }
            }
        } else {
            this.getMusic();
        }
    }

    compariser(a: string, b: string, order: number) {
        if (a==b) return 0;
        return order * ( a < b ? -1 : 1 );
    }
}