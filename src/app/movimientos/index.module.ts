import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
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
import {MatChipsModule, MatPaginatorModule, MatSelectModule, MatExpansionModule} from '@angular/material';
import {LayoutModule} from '../layout/layout.module';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CommonModule} from '@angular/common';
import {EditorModule} from '@tinymce/tinymce-angular';
import {MovimientosComponent} from './index.component';

const routes = [
    {
        path     : '',
        component: MovimientosComponent
    }
];

@NgModule({
    declarations: [
       MovimientosComponent
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
        MatExpansionModule,

        FuseSharedModule,
        FuseConfirmDialogModule,
        FuseSidebarModule,
        MatPaginatorModule,
        LayoutModule,
        EditorModule,

    ]
})
export class MovimientosModule
{
}
