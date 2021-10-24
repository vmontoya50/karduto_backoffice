import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {FuseSharedModule} from '../../@fuse/shared.module';
import {FuseConfirmDialogModule, FuseSidebarModule} from '../../@fuse/components';
import {MatChipsModule, MatPaginatorModule, MatSelectModule, MatExpansionModule} from '@angular/material';
import {LayoutModule} from '../layout/layout.module';
import {BrowserModule} from '@angular/platform-browser';
import { FirmaExterna } from './firma-externa.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CommonModule} from '@angular/common';
import {EditorModule} from '@tinymce/tinymce-angular';
import { FirmasLibModule } from 'app/firma-modal/firmas-lib.module';

const routes = [
    {
        path     : '',
        component: FirmaExterna
    }
];

@NgModule({
    declarations: [
        FirmaExterna
    ],
    imports     : [
        RouterModule.forChild(routes),
        
        FuseSharedModule,
        FuseConfirmDialogModule,
        FuseSidebarModule,
        LayoutModule,
        FirmasLibModule,

    ]
})
export class FirmaExternaModule
{
}
