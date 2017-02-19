import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, JsonpModule } from '@angular/http';
import {FormsModule } from '@angular/forms';

import { AppComponent }  from './components/app/app.component';
import { MusicListComponent } from "./components/music-list/music-list.component";
import { MusicFilterComponent } from "./components/music-filter/music-filter.component";
import {MusicService} from "./services/music.service";
import {FilterService} from "./services/filter.service";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        JsonpModule,
    ],
    declarations: [
        AppComponent,
        MusicListComponent,
        MusicFilterComponent
    ],
    bootstrap: [ AppComponent ],
    providers: [ MusicService, FilterService ]
})
export class AppModule { }
