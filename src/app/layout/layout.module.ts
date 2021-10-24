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
    ContratoGrupoDialogComponentDirective,
    CuentasNuevoDialogComponentDirective,
    AgregarMonedaDialogComponentDirective,
    AgregarBancoDialogComponentDirective,
    AsociarOperadorDialogComponentDirective,
    AgregarFondosDialogComponentDirective,
    AgregarReceptorDialogComponentDirective,
    AgregarCuentaReceptorDialogComponentDirective,
    ContactsClientesComponentDirective,
    AgregarTasaDialogComponentDirective,
    EditarTasaDialogComponentDirective,
    AgregarPaisDialogComponentDirective,
    AsignarDialogComponentDirective,
    FinalizarDialogComponentDirective
} from './directive';
import { DialogComponent } from './dialog/dialog.component';
import { DialogPostulanteComponent } from './postulante-dialog/dialog.component';
import {
    MatChipsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatExpansionModule,
    MatAutocompleteModule, MatLineModule, MatListModule, MatRadioModule
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
import { CuentasNuevoDialogComponent } from './cuentas-nuevo/dialog.component';
import {AgregarMonedaDialogComponent} from './agregar-moneda/dialog.component';
import {AgregarBancoDialogComponent} from './agregar-banco/dialog.component';
import {AsociarOperadorDialogComponent} from './asociar-operador/dialog.component';
import {AgregarFondosDialogComponent} from './agregar-fondos/dialog.component';
import {AgregarReceptorDialogComponent} from './agregar-receptor/dialog.component';
import {AgregarCuentaReceptorDialogComponent} from './agregar-cuenta-receptor/dialog.component';
import {ContactsClientesDialogComponent} from './clientes/clientes.component';
import {AgregarTasaDialogComponent} from './agregar-tasa/dialog.component';
import {EditarTasaDialogComponent} from './editar-tasa/dialog.component';
import {AgregarPaisDialogComponent} from './agregar-pais/dialog.component';
import {NgxMatDatetimePickerModule, NgxMatNativeDateModule, NgxMatTimepickerModule} from 'ngx-mat-datetime-picker';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {MatNativeDateModule} from '@angular/material';
import { MatMomentDateModule } from '@angular/material-moment-adapter';

import {MatNativeTimeModule, MatTimeSelectModule} from 'ngx-material-time-select';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { AsignarDialogComponent } from './asignar/dialog.component';
import { FinalizarDialogComponent } from './finalizar/dialog.component';


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
        NgxMatDatetimePickerModule,
        HttpClientModule,
        NgxMatTimepickerModule,
        MatNativeDateModule, MatMomentDateModule,

        // time picker

        MatTimeSelectModule,
        MatNativeTimeModule,
        NgxMaterialTimepickerModule,
        NgxMatNativeDateModule
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
        CuentasNuevoDialogComponent,
        AgregarMonedaDialogComponent,
        AgregarBancoDialogComponent,
        AsociarOperadorDialogComponent,
        AgregarFondosDialogComponent,
        AgregarReceptorDialogComponent,
        AgregarCuentaReceptorDialogComponent,
        ContactsClientesDialogComponent,
        AgregarTasaDialogComponent,
        EditarTasaDialogComponent,
        AgregarPaisDialogComponent,
        AsignarDialogComponent,
        FinalizarDialogComponent,
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
        CuentasNuevoDialogComponentDirective,
        AgregarMonedaDialogComponentDirective,
        AgregarBancoDialogComponentDirective,
        AsociarOperadorDialogComponentDirective,
        AgregarFondosDialogComponentDirective,
        AgregarReceptorDialogComponentDirective,
        AgregarCuentaReceptorDialogComponentDirective,
        ContactsClientesComponentDirective,
        AgregarTasaDialogComponentDirective,
        EditarTasaDialogComponentDirective,
        AgregarPaisDialogComponentDirective,
        AsignarDialogComponentDirective,
        FinalizarDialogComponentDirective,
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
        CuentasNuevoDialogComponentDirective,
        AgregarMonedaDialogComponentDirective,
        AgregarBancoDialogComponentDirective,
        AsociarOperadorDialogComponentDirective,
        AgregarFondosDialogComponentDirective,
        AgregarReceptorDialogComponentDirective,
        AgregarCuentaReceptorDialogComponentDirective,
        ContactsClientesComponentDirective,
        AgregarTasaDialogComponentDirective,
        EditarTasaDialogComponentDirective,
        AgregarPaisDialogComponentDirective,
        AsignarDialogComponentDirective,
        FinalizarDialogComponentDirective,
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
        CuentasNuevoDialogComponent,
        AgregarMonedaDialogComponent,
        AgregarBancoDialogComponent,
        AsociarOperadorDialogComponent,
        AgregarFondosDialogComponent,
        AgregarReceptorDialogComponent,
        AgregarCuentaReceptorDialogComponent,
        ContactsClientesDialogComponent,
        AgregarTasaDialogComponent,
        EditarTasaDialogComponent,
        AgregarPaisDialogComponent,
        AsignarDialogComponent,
        FinalizarDialogComponent,

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
        CuentasNuevoDialogComponent,
        AgregarMonedaDialogComponent,
        AgregarBancoDialogComponent,
        AsociarOperadorDialogComponent,
        AgregarFondosDialogComponent,
        AgregarReceptorDialogComponent,
        AgregarCuentaReceptorDialogComponent,
        ContactsClientesDialogComponent,
        AgregarTasaDialogComponent,
        EditarTasaDialogComponent,
        AgregarPaisDialogComponent,
        AsignarDialogComponent,
        FinalizarDialogComponent,
    ],
})
export class LayoutModule
{
}
