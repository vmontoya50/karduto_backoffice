import { NgModule } from '@angular/core';

import {CommonModule} from '@angular/common';
import { VerticalLayout1Module } from 'app/layout/vertical/layout-1/layout-1.module';
import { VerticalLayout2Module } from 'app/layout/vertical/layout-2/layout-2.module';
import { VerticalLayout3Module } from 'app/layout/vertical/layout-3/layout-3.module';

import { HorizontalLayout1Module } from 'app/layout/horizontal/layout-1/layout-1.module';
import { ToastComponent } from './toast/toast.component';
import {
    EditPostualanteDialogDirective,
    FilterDialogDirective,
    NewPostualanteDialogDirective,
    ViewPostualanteDialogDirective,
    ContratoNuevoDialogComponentDirective,
    DialogContratoParrafoComponentDirective,
    DialogContratoTurnoComponentDirective,
    ContratoTurnoListDialogComponentDirective,
    ContratoRegistroNuevoDialogComponentDirective,
    FiniquitoNuevoDialogComponentDirective,
    ContratoGrupoDialogComponentDirective, ClienteNuevoDialogComponentDirective, ClienteEditarDialogComponentDirective, VacanteDialogComponentDirective
} from './directive';
import { DialogComponent } from './dialog/dialog.component';
import { DialogPostulanteComponent } from './postulante-dialog/dialog.component';
import {
    MatChipsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatExpansionModule,
    MatAutocompleteModule, MatLineModule, MatListModule, MatSlideToggleModule
} from '@angular/material';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';
import {MatRippleModule} from '@angular/material/core';
import {MatTableModule} from '@angular/material/table';
import {MatToolbarModule} from '@angular/material/toolbar';
import {DialogPostulanteEditComponent} from './postulante-edit-dialog/dialog.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DialogPostulanteNuevoComponent} from './postulante-nuevo-dialog/dialog.component';
import { ContratoNuevoDialogComponent } from './contrato-nuevo/dialog.component';
import {DialogContratoParrafoComponent} from './contrato-parrafo-dialog/dialog.component';
import { EditorModule } from '@tinymce/tinymce-angular';
import {MatTabsModule} from '@angular/material/tabs';
import {ContratoTurnoDialogComponent} from './contrato-turno/dialog.component';
import {ContratoTurnoListDialogComponent} from './contrato-turno-list/dialog.component';
import {ContratoRegistroNuevoDialogComponent} from './contrato-registro-nuevo/dialog.component';
import {Ng2Rut} from 'ng2-rut';
import {FiniquitoNuevoDialogComponent} from './finiquito-nuevo/dialog.component';
import {ContratoGrupoDialogComponent} from './contrato-grupo/dialog.component';
import {MatRadioModule} from '@angular/material/radio';
import {ClienteNuevoDialogComponent} from './cliente-nuevo/dialog.component';
import {ClienteEditarDialogComponent} from './cliente-editar/dialog.component';
import { VacanteDialogComponent } from './vacantes/dialog.component';


@NgModule({
    imports: [
        VerticalLayout1Module,
        VerticalLayout2Module,
        VerticalLayout3Module,
        HorizontalLayout1Module,
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
        MatDialogModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatExpansionModule,
        CommonModule,
        EditorModule,
        MatTabsModule,
        MatAutocompleteModule,
        Ng2Rut,
        MatLineModule,
        MatListModule,
        FormsModule,
        MatRadioModule,
        MatSlideToggleModule,
    ],
    exports: [
        VerticalLayout1Module,
        VerticalLayout2Module,
        VerticalLayout3Module,
        ToastComponent,
        HorizontalLayout1Module,
        // Dialogos
        DialogComponent,
        DialogPostulanteComponent,
        DialogPostulanteEditComponent,
        DialogPostulanteNuevoComponent,
        ContratoNuevoDialogComponent,
        DialogContratoParrafoComponent,
        ContratoTurnoDialogComponent,
        ContratoTurnoListDialogComponent,
        ContratoRegistroNuevoDialogComponent,
        FiniquitoNuevoDialogComponent,
        ContratoGrupoDialogComponent,
        ClienteNuevoDialogComponent,
        ClienteEditarDialogComponent,
        VacanteDialogComponent,
        // Directivas
        FilterDialogDirective,
        ViewPostualanteDialogDirective,
        EditPostualanteDialogDirective,
        NewPostualanteDialogDirective,
        ContratoNuevoDialogComponentDirective,
        DialogContratoParrafoComponentDirective,
        DialogContratoTurnoComponentDirective,
        ContratoTurnoListDialogComponentDirective,
        ContratoRegistroNuevoDialogComponentDirective,
        FiniquitoNuevoDialogComponentDirective,
        ContratoGrupoDialogComponentDirective,
        ClienteNuevoDialogComponentDirective,
        ClienteEditarDialogComponentDirective,
        VacanteDialogComponentDirective,
    ],
    declarations: [
        ToastComponent,
        // Directivas
        FilterDialogDirective,
        ViewPostualanteDialogDirective,
        EditPostualanteDialogDirective,
        NewPostualanteDialogDirective,
        ContratoNuevoDialogComponentDirective,
        DialogContratoParrafoComponentDirective,
        DialogContratoTurnoComponentDirective,
        ContratoTurnoListDialogComponentDirective,
        ContratoRegistroNuevoDialogComponentDirective,
        FiniquitoNuevoDialogComponentDirective,
        ContratoGrupoDialogComponentDirective,
        ClienteNuevoDialogComponentDirective,
        ClienteEditarDialogComponentDirective,
        VacanteDialogComponentDirective,
        // Componentee
        DialogPostulanteComponent,
        DialogComponent,
        DialogPostulanteEditComponent,
        DialogPostulanteNuevoComponent,
        ContratoNuevoDialogComponent,
        DialogContratoParrafoComponent,
        ContratoTurnoDialogComponent,
        ContratoTurnoListDialogComponent,
        ContratoRegistroNuevoDialogComponent,
        FiniquitoNuevoDialogComponent,
        ContratoGrupoDialogComponent,
        ClienteNuevoDialogComponent,
        ClienteEditarDialogComponent,
        VacanteDialogComponent,

    ],
    entryComponents : [
        DialogComponent,
        DialogPostulanteComponent,
        DialogPostulanteNuevoComponent,
        DialogPostulanteEditComponent,
        ContratoNuevoDialogComponent,
        DialogContratoParrafoComponent,
        ContratoTurnoDialogComponent,
        ContratoTurnoListDialogComponent,
        ContratoRegistroNuevoDialogComponent,
        FiniquitoNuevoDialogComponent,
        ContratoGrupoDialogComponent,
        ClienteNuevoDialogComponent,
        ClienteEditarDialogComponent,
        VacanteDialogComponent,
    ],
})
export class LayoutModule
{
}
