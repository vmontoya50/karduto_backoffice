import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseConfirmDialogModule, FuseSidebarModule } from '@fuse/components';
import {UsuariosComponent} from './usuarios.component';
import {UsuariosService} from './usuarios.service';
import {ContactsContactFormDialogComponent} from './contact-form/contact-form.component';
import {ContactsMainSidebarComponent} from './sidebars/main/main.component';
import {ContactsSelectedBarComponent} from './selected-bar/selected-bar.component';
import {ContactsContactListComponent} from './contact-list/contact-list.component';
import {MatSelectModule} from '@angular/material';

const routes: Routes = [
    {
        path     : '**',
        component: UsuariosComponent,
        resolve  : {
            contacts: UsuariosService
        }
    }
];

@NgModule({
    declarations   : [
       UsuariosComponent,
       ContactsContactListComponent,
       ContactsSelectedBarComponent,
       ContactsMainSidebarComponent,
       ContactsContactFormDialogComponent
    ],
    imports        : [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatRippleModule,
        MatTableModule,
        MatToolbarModule,
        MatSelectModule,

        FuseSharedModule,
        FuseConfirmDialogModule,
        FuseSidebarModule,
    ],
    providers      : [
        UsuariosService
    ],
    entryComponents: [
        ContactsContactFormDialogComponent
    ]
})
export class UsuariosModule
{
}
