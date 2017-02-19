import { Route, RouterModule } from '@angular/router';

import { MusicListComponent } from './components/music-list/music-list.component';

export const routes: Route[] = [
    { path: '', pathMatch: 'full', component: MusicListComponent },
];

export const routing = RouterModule.forRoot(routes, { useHash: false });
