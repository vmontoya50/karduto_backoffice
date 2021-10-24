import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FirmasComponent } from './firmas.component';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';
import {MatRippleModule} from '@angular/material/core';
import {MatTableModule} from '@angular/material/table';
import {MatToolbarModule} from '@angular/material/toolbar';
import {FuseSharedModule} from '../../@fuse/shared.module';
import {FuseConfirmDialogModule, FuseSidebarModule} from '../../@fuse/components';
import {MatChipsModule, MatPaginatorModule, MatSelectModule} from '@angular/material';
import {LayoutModule} from '../layout/layout.module';
import {BrowserModule} from '@angular/platform-browser';

const routes = [
    {
        path     : '',
        component: FirmasComponent
    }
];

@NgModule({
    declarations: [
        FirmasComponent
    ],
    imports     : [
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
        MatChipsModule,
        MatSelectModule,

        FuseSharedModule,
        FuseConfirmDialogModule,
        FuseSidebarModule,
        MatPaginatorModule,
        LayoutModule,

    ]
})
export class FirmasModule
{
}
