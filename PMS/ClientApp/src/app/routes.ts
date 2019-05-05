import { AuthGuard } from './../_guards/auth.guard';
import {Routes} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './member-list/member-list.component';
import { MessagesComponent } from './messages/messages.component';
import { ListsComponent } from './lists/lists.component';

export const appRoutes: Routes = [
    {path: '', component: HomeComponent}, // match home url without any route indicated by back slash
    {
        path: '', // prefix for the route e.g for messages route, it becpomes empty string + messages
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            {path: 'messages', component: MessagesComponent, canActivate: [AuthGuard] },
            {path: 'members', component: MemberListComponent },
            {path: 'lists', component: ListsComponent}
        ]
    },
    { path: '**', redirectTo: '', pathMatch: 'full' } // redirecting to empty route matches HomeComponent as declared in first path above
];
