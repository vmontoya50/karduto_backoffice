/****************
 * Angular Directive WorkFlowFlujoDirective *
 * @copyright      Especialistas en Procesos y Sistemas Spa
 * @package        directive.ts
 * @version        20.01.136.302
 * @update         2020-01-28 09:00:00
 *
 *
 *
 **/


// -----------------------------------------------------------------------------------------------------
// @ Angular & ThirdParty
// -----------------------------------------------------------------------------------------------------
import {Directive, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';


// -----------------------------------------------------------------------------------------------------
// @ Import Dialogs
// -----------------------------------------------------------------------------------------------------

import {DialogComponent} from './dialog/dialog.component';
import {DialogPostulanteComponent} from './postulante-dialog/dialog.component';
import {DialogPostulanteEditComponent} from './postulante-edit-dialog/dialog.component';
import {DialogPostulanteNuevoComponent} from './postulante-nuevo-dialog/dialog.component';
import { ContratoNuevoDialogComponent } from './contrato-nuevo/dialog.component';
import {DialogContratoParrafoComponent} from './contrato-parrafo-dialog/dialog.component';
import {ContratoTurnoDialogComponent} from './contrato-turno/dialog.component';
import {ContratoTurnoListDialogComponent} from './contrato-turno-list/dialog.component';
import {ContratoRegistroNuevoDialogComponent} from './contrato-registro-nuevo/dialog.component';
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
import { AsignarDialogComponent } from './asignar/dialog.component';
import { FinalizarDialogComponent } from './finalizar/dialog.component';


// -----------------------------------------------------------------------------------------------------
// @ FilterDialogDirective
// -----------------------------------------------------------------------------------------------------

@Directive({
    selector: '[filter-dialog]',
    exportAs: 'FilterDialogDirective'
})
export class FilterDialogDirective {

    // -----------------------------------------------------------------------------------------------------
    // @ Decorators
    // -----------------------------------------------------------------------------------------------------

    // @ Input ---------------------------------------------------------------------------------------------
    @Input() data;
    @Input() disableClose;
    @Input() panelClass: string;
    @Input() width;

    // @ Output --------------------------------------------------------------------------------------------
    @Output() afterClosed = new EventEmitter<any>();

    // @ HostListener --------------------------------------------------------------------------------------
    @HostListener('click', ['$event']) onClick($event): void {
        console.log('Directiva corriendo');
        this._dlgOpen();
    }

    /**
     * Constructor
     *
     * @param {MatDialog} dialog
     *
     */
    constructor(
        public dialog: MatDialog
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private Methods
    // -----------------------------------------------------------------------------------------------------

    /**
     *  Private _dlgOpen
     */
    _dlgOpen(): void {
        console.log('Directiva Funcion');
        this.dialog
            .open(DialogComponent, {
                panelClass: this.panelClass || 'app-dialog',
                disableClose: this.disableClose,
                width: this.width,
                data: this.data || {}
            })
            .afterClosed().subscribe(result => this.afterClosed.emit(result));
    }

}

// -----------------------------------------------------------------------------------------------------
// @ ViewPostualanteDialogDirective
// -----------------------------------------------------------------------------------------------------

@Directive({
    selector: '[postulante-dialog]',
    exportAs: 'ViewPostualanteDialogDirective'
})
export class ViewPostualanteDialogDirective {

    // -----------------------------------------------------------------------------------------------------
    // @ Decorators
    // -----------------------------------------------------------------------------------------------------

    // @ Input ---------------------------------------------------------------------------------------------
    @Input() data;
    @Input() disableClose;
    @Input() panelClass: string;
    @Input() width;

    // @ Output --------------------------------------------------------------------------------------------
    @Output() afterClosed = new EventEmitter<any>();

    // @ HostListener --------------------------------------------------------------------------------------
    @HostListener('click', ['$event']) onClick($event): void {
        console.log('Directiva corriendo');
        this._dlgOpen();
    }

    /**
     * Constructor
     *
     * @param {MatDialog} dialog
     *
     */
    constructor(
        public dialog: MatDialog
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private Methods
    // -----------------------------------------------------------------------------------------------------

    /**
     *  Private _dlgOpen
     */
    _dlgOpen(): void {
        console.log('Directiva Funcion');
        this.dialog
            .open(DialogPostulanteComponent, {
                panelClass: this.panelClass || 'dialog-postulante',
                disableClose: this.disableClose,
                width: this.width,
                data: this.data || {}
            })
            .afterClosed().subscribe(result => this.afterClosed.emit(result));
    }

}




// -----------------------------------------------------------------------------------------------------
// @ EditPostualanteDialogDirective
// -----------------------------------------------------------------------------------------------------

@Directive({
    selector: '[postulante-edit-dialog]',
    exportAs: 'ViewPostualanteEditDialogDirective'
})
export class EditPostualanteDialogDirective {

    // -----------------------------------------------------------------------------------------------------
    // @ Decorators
    // -----------------------------------------------------------------------------------------------------

    // @ Input ---------------------------------------------------------------------------------------------
    @Input() data;
    @Input() disableClose;
    @Input() panelClass: string;
    @Input() width;

    // @ Output --------------------------------------------------------------------------------------------
    @Output() afterClosed = new EventEmitter<any>();

    // @ HostListener --------------------------------------------------------------------------------------
    @HostListener('click', ['$event']) onClick($event): void {
        console.log('Directiva corriendo');
        this._dlgOpen();
    }

    /**
     * Constructor
     *
     * @param {MatDialog} dialog
     *
     */
    constructor(
        public dialog: MatDialog
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private Methods
    // -----------------------------------------------------------------------------------------------------

    /**
     *  Private _dlgOpen
     */
    _dlgOpen(): void {
        console.log('Directiva Funcion');
        this.dialog
            .open(DialogPostulanteEditComponent, {
                panelClass: this.panelClass || 'dialog-postulante',
                disableClose: this.disableClose,
                width: this.width,
                data: this.data || {}
            })
            .afterClosed().subscribe(result => this.afterClosed.emit(result));
    }

}



// -----------------------------------------------------------------------------------------------------
// @ EditPostualanteDialogDirective
// -----------------------------------------------------------------------------------------------------

@Directive({
    selector: '[postulante-new-dialog]',
    exportAs: 'ViewPostualanteEditDialogDirective'
})
export class NewPostualanteDialogDirective {

    // -----------------------------------------------------------------------------------------------------
    // @ Decorators
    // -----------------------------------------------------------------------------------------------------

    // @ Input ---------------------------------------------------------------------------------------------
    @Input() data;
    @Input() disableClose;
    @Input() panelClass: string;
    @Input() width;

    // @ Output --------------------------------------------------------------------------------------------
    @Output() afterClosed = new EventEmitter<any>();

    // @ HostListener --------------------------------------------------------------------------------------
    @HostListener('click', ['$event']) onClick($event): void {
        console.log('Directiva corriendo');
        this._dlgOpen();
    }

    /**
     * Constructor
     *
     * @param {MatDialog} dialog
     *
     */
    constructor(
        public dialog: MatDialog
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private Methods
    // -----------------------------------------------------------------------------------------------------

    /**
     *  Private _dlgOpen
     */
    _dlgOpen(): void {
        console.log('Directiva Funcion');
        this.dialog
            .open(DialogPostulanteNuevoComponent, {
                panelClass: this.panelClass || 'dialog-postulante-nuevo',
                disableClose: this.disableClose,
                width: this.width,
                data: this.data || {}
            })
            .afterClosed().subscribe(result => this.afterClosed.emit(result));
    }

}




// -----------------------------------------------------------------------------------------------------
// @ EditPostualanteDialogDirective
// -----------------------------------------------------------------------------------------------------

@Directive({
    selector: '[contrato-new-dialog]',
    exportAs: 'ContratoNuevoDialogComponentDirective'
})
export class ContratoNuevoDialogComponentDirective {

    // -----------------------------------------------------------------------------------------------------
    // @ Decorators
    // -----------------------------------------------------------------------------------------------------

    // @ Input ---------------------------------------------------------------------------------------------
    @Input() data;
    @Input() disableClose;
    @Input() panelClass: string;
    @Input() width;

    // @ Output --------------------------------------------------------------------------------------------
    @Output() afterClosed = new EventEmitter<any>();

    // @ HostListener --------------------------------------------------------------------------------------
    @HostListener('click', ['$event']) onClick($event): void {
        console.log('Directiva corriendo');
        this._dlgOpen();
    }

    /**
     * Constructor
     *
     * @param {MatDialog} dialog
     *
     */
    constructor(
        public dialog: MatDialog
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private Methods
    // -----------------------------------------------------------------------------------------------------

    /**
     *  Private _dlgOpen
     */
    _dlgOpen(): void {
        console.log('Directiva Funcion');
        this.dialog
            .open(ContratoNuevoDialogComponent, {
                panelClass: this.panelClass || 'contrato-nuevo-dialog',
                disableClose: this.disableClose,
                width: this.width,
                data: this.data || {}
            })
            .afterClosed().subscribe(result => this.afterClosed.emit(result));
    }

}

// -----------------------------------------------------------------------------------------------------
// @ EditPostualanteDialogDirective
// -----------------------------------------------------------------------------------------------------

@Directive({
    selector: '[cuentas-nuevo]',
    exportAs: 'CuentasNuevoDialogComponentDirective'
})
export class CuentasNuevoDialogComponentDirective {

    // -----------------------------------------------------------------------------------------------------
    // @ Decorators
    // -----------------------------------------------------------------------------------------------------

    // @ Input ---------------------------------------------------------------------------------------------
    @Input() data;
    @Input() disableClose;
    @Input() panelClass: string;
    @Input() width;

    // @ Output --------------------------------------------------------------------------------------------
    @Output() afterClosed = new EventEmitter<any>();

    // @ HostListener --------------------------------------------------------------------------------------
    @HostListener('click', ['$event']) onClick($event): void {
        console.log('Directiva corriendo');
        this._dlgOpen();
    }

    /**
     * Constructor
     *
     * @param {MatDialog} dialog
     *
     */
    constructor(
        public dialog: MatDialog
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private Methods
    // -----------------------------------------------------------------------------------------------------

    /**
     *  Private _dlgOpen
     */
    _dlgOpen(): void {
        console.log('Directiva Funcion');
        this.dialog
            .open(CuentasNuevoDialogComponent, {
                panelClass: this.panelClass || 'cuentas-nuevo-dialog',
                disableClose: this.disableClose,
                width: this.width,
                data: this.data || {}
            })
            .afterClosed().subscribe(result => this.afterClosed.emit(result));
    }

}


// -----------------------------------------------------------------------------------------------------
// @ AgregarReceptorDialogComponentDirective
// -----------------------------------------------------------------------------------------------------

@Directive({
    selector: '[agregar-receptor]',
    exportAs: 'AgregarReceptorDialogComponentDirective'
})
export class AgregarReceptorDialogComponentDirective {

    // -----------------------------------------------------------------------------------------------------
    // @ Decorators
    // -----------------------------------------------------------------------------------------------------

    // @ Input ---------------------------------------------------------------------------------------------
    @Input() data;
    @Input() disableClose;
    @Input() panelClass: string;
    @Input() width;

    // @ Output --------------------------------------------------------------------------------------------
    @Output() afterClosed = new EventEmitter<any>();

    // @ HostListener --------------------------------------------------------------------------------------
    @HostListener('click', ['$event']) onClick($event): void {
        console.log('Directiva corriendo');
        this._dlgOpen();
    }

    /**
     * Constructor
     *
     * @param {MatDialog} dialog
     *
     */
    constructor(
        public dialog: MatDialog
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private Methods
    // -----------------------------------------------------------------------------------------------------

    /**
     *  Private _dlgOpen
     */
    _dlgOpen(): void {
        console.log('Directiva Funcion');
        this.dialog
            .open(AgregarReceptorDialogComponent, {
                panelClass: this.panelClass || 'agregar-receptor-dialog',
                disableClose: this.disableClose,
                width: this.width,
                data: this.data || {}
            })
            .afterClosed().subscribe(result => this.afterClosed.emit(result));
    }

}


// -----------------------------------------------------------------------------------------------------
// @ AgregarCuentaReceptorDialogComponentDirective
// -----------------------------------------------------------------------------------------------------

@Directive({
    selector: '[agregarCuentaReceptor]',
    exportAs: 'AgregarCuentaReceptorDialogComponentDirective'
})
export class AgregarCuentaReceptorDialogComponentDirective {

    // -----------------------------------------------------------------------------------------------------
    // @ Decorators
    // -----------------------------------------------------------------------------------------------------

    // @ Input ---------------------------------------------------------------------------------------------
    @Input() data;
    @Input() disableClose;
    @Input() panelClass: string;
    @Input() width;

    // @ Output --------------------------------------------------------------------------------------------
    @Output() afterClosed = new EventEmitter<any>();

    // @ HostListener --------------------------------------------------------------------------------------
    @HostListener('click', ['$event']) onClick($event): void {
        console.log('Directiva corriendo');
        this._dlgOpen();
    }

    /**
     * Constructor
     *
     * @param {MatDialog} dialog
     *
     */
    constructor(
        public dialog: MatDialog
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private Methods
    // -----------------------------------------------------------------------------------------------------

    /**
     *  Private _dlgOpen
     */
    _dlgOpen(): void {
        console.log('Directiva Funcion');
        this.dialog
            .open(AgregarCuentaReceptorDialogComponent, {
                panelClass: this.panelClass || 'agregar-cuenta-receptor-dialog',
                disableClose: this.disableClose,
                width: this.width,
                data: this.data || {}
            })
            .afterClosed().subscribe(result => this.afterClosed.emit(result));
    }

}

// -----------------------------------------------------------------------------------------------------
// @ AgregarTasaDialogComponentDirective AgregarTasaDialogComponent
// -----------------------------------------------------------------------------------------------------

@Directive({
    selector: '[agregarTasa]',
    exportAs: 'AgregarTasaDialogComponentDirective'
})
export class AgregarTasaDialogComponentDirective {

    // -----------------------------------------------------------------------------------------------------
    // @ Decorators
    // -----------------------------------------------------------------------------------------------------

    // @ Input ---------------------------------------------------------------------------------------------
    @Input() data;
    @Input() disableClose;
    @Input() panelClass: string;
    @Input() width;

    // @ Output --------------------------------------------------------------------------------------------
    @Output() afterClosed = new EventEmitter<any>();

    // @ HostListener --------------------------------------------------------------------------------------
    @HostListener('click', ['$event']) onClick($event): void {
        console.log('Directiva corriendo');
        this._dlgOpen();
    }

    /**
     * Constructor
     *
     * @param {MatDialog} dialog
     *
     */
    constructor(
        public dialog: MatDialog
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private Methods
    // -----------------------------------------------------------------------------------------------------

    /**
     *  Private _dlgOpen
     */
    _dlgOpen(): void {
        console.log('Directiva Funcion');
        this.dialog
            .open(AgregarTasaDialogComponent, {
                panelClass: this.panelClass || 'agregar-tasa-dialog',
                disableClose: this.disableClose,
                width: this.width,
                data: this.data || {}
            })
            .afterClosed().subscribe(result => this.afterClosed.emit(result));
    }

}


// -----------------------------------------------------------------------------------------------------
// @ AgregarTasaDialogComponentDirective AgregarTasaDialogComponent
// -----------------------------------------------------------------------------------------------------

@Directive({
    selector: '[editarTasa]',
    exportAs: 'EditarTasaDialogComponentDirective'
})
export class EditarTasaDialogComponentDirective {

    // -----------------------------------------------------------------------------------------------------
    // @ Decorators
    // -----------------------------------------------------------------------------------------------------

    // @ Input ---------------------------------------------------------------------------------------------
    @Input() data;
    @Input() disableClose;
    @Input() panelClass: string;
    @Input() width;

    // @ Output --------------------------------------------------------------------------------------------
    @Output() afterClosed = new EventEmitter<any>();

    // @ HostListener --------------------------------------------------------------------------------------
    @HostListener('click', ['$event']) onClick($event): void {
        console.log('Directiva corriendo');
        this._dlgOpen();
    }

    /**
     * Constructor
     *
     * @param {MatDialog} dialog
     *
     */
    constructor(
        public dialog: MatDialog
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private Methods
    // -----------------------------------------------------------------------------------------------------

    /**
     *  Private _dlgOpen
     */
    _dlgOpen(): void {
        console.log('Directiva Funcion');
        this.dialog
            .open(EditarTasaDialogComponent, {
                panelClass: this.panelClass || 'editar-tasa-dialog',
                disableClose: this.disableClose,
                width: this.width,
                data: this.data || {}
            })
            .afterClosed().subscribe(result => this.afterClosed.emit(result));
    }

}

// -----------------------------------------------------------------------------------------------------
// @ EditPostualanteDialogDirective
// -----------------------------------------------------------------------------------------------------

@Directive({
    selector: '[monedas-nuevo]',
    exportAs: 'AgregarMonedaDialogComponentDirective'
})
export class AgregarMonedaDialogComponentDirective {

    // -----------------------------------------------------------------------------------------------------
    // @ Decorators
    // -----------------------------------------------------------------------------------------------------

    // @ Input ---------------------------------------------------------------------------------------------
    @Input() data;
    @Input() disableClose;
    @Input() panelClass: string;
    @Input() width;

    // @ Output --------------------------------------------------------------------------------------------
    @Output() afterClosed = new EventEmitter<any>();

    // @ HostListener --------------------------------------------------------------------------------------
    @HostListener('click', ['$event']) onClick($event): void {
        console.log('Directiva corriendo');
        this._dlgOpen();
    }

    /**
     * Constructor
     *
     * @param {MatDialog} dialog
     *
     */
    constructor(
        public dialog: MatDialog
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private Methods
    // -----------------------------------------------------------------------------------------------------

    /**
     *  Private _dlgOpen
     */
    _dlgOpen(): void {
        console.log('Directiva Funcion');
        this.dialog
            .open(AgregarMonedaDialogComponent, {
                panelClass: this.panelClass || 'agregar-monedas-dialog',
                disableClose: this.disableClose,
                width: this.width,
                data: this.data || {}
            })
            .afterClosed().subscribe(result => this.afterClosed.emit(result));
    }

}

// -----------------------------------------------------------------------------------------------------
// @ AgregarBancoDialogComponentDirective
// -----------------------------------------------------------------------------------------------------

@Directive({
    selector: '[agregar-banco]',
    exportAs: 'AgregarBancoDialogComponentDirective'
})
export class AgregarBancoDialogComponentDirective {

    // -----------------------------------------------------------------------------------------------------
    // @ Decorators
    // -----------------------------------------------------------------------------------------------------

    // @ Input ---------------------------------------------------------------------------------------------
    @Input() data;
    @Input() disableClose;
    @Input() panelClass: string;
    @Input() width;

    // @ Output --------------------------------------------------------------------------------------------
    @Output() afterClosed = new EventEmitter<any>();

    // @ HostListener --------------------------------------------------------------------------------------
    @HostListener('click', ['$event']) onClick($event): void {
        console.log('Directiva corriendo');
        this._dlgOpen();
    }

    /**
     * Constructor
     *
     * @param {MatDialog} dialog
     *
     */
    constructor(
        public dialog: MatDialog
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private Methods
    // -----------------------------------------------------------------------------------------------------

    /**
     *  Private _dlgOpen
     */
    _dlgOpen(): void {
        console.log('Directiva Funcion');
        this.dialog
            .open(AgregarBancoDialogComponent, {
                panelClass: this.panelClass || 'agregar-banco-dialog',
                disableClose: this.disableClose,
                width: this.width,
                data: this.data || {}
            })
            .afterClosed().subscribe(result => this.afterClosed.emit(result));
    }

}

// -----------------------------------------------------------------------------------------------------
// @ AgregarPaisDialogComponentDirective
// -----------------------------------------------------------------------------------------------------

@Directive({
    selector: '[agregar-pais]',
    exportAs: 'AgregarPaisDialogComponentDirective'
})
export class AgregarPaisDialogComponentDirective {

    // -----------------------------------------------------------------------------------------------------
    // @ Decorators
    // -----------------------------------------------------------------------------------------------------

    // @ Input ---------------------------------------------------------------------------------------------
    @Input() data;
    @Input() disableClose;
    @Input() panelClass: string;
    @Input() width;

    // @ Output --------------------------------------------------------------------------------------------
    @Output() afterClosed = new EventEmitter<any>();

    // @ HostListener --------------------------------------------------------------------------------------
    @HostListener('click', ['$event']) onClick($event): void {
        console.log('Directiva corriendo');
        this._dlgOpen();
    }

    /**
     * Constructor
     *
     * @param {MatDialog} dialog
     *
     */
    constructor(
        public dialog: MatDialog
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private Methods
    // -----------------------------------------------------------------------------------------------------

    /**
     *  Private _dlgOpen
     */
    _dlgOpen(): void {
        console.log('Directiva Funcion');
        this.dialog
            .open(AgregarPaisDialogComponent, {
                panelClass: this.panelClass || 'agregar-pais-dialog',
                disableClose: this.disableClose,
                width: this.width,
                data: this.data || {}
            })
            .afterClosed().subscribe(result => this.afterClosed.emit(result));
    }

}

// -----------------------------------------------------------------------------------------------------
// @ AsociarOperadorDialogComponent
// -----------------------------------------------------------------------------------------------------

@Directive({
    selector: '[asociar-operador]',
    exportAs: 'AsociarOperadorDialogComponentDirective'
})
export class AsociarOperadorDialogComponentDirective {

    // -----------------------------------------------------------------------------------------------------
    // @ Decorators
    // -----------------------------------------------------------------------------------------------------

    // @ Input ---------------------------------------------------------------------------------------------
    @Input() data;
    @Input() disableClose;
    @Input() panelClass: string;
    @Input() width;

    // @ Output --------------------------------------------------------------------------------------------
    @Output() afterClosed = new EventEmitter<any>();

    // @ HostListener --------------------------------------------------------------------------------------
    @HostListener('click', ['$event']) onClick($event): void {
        console.log('Directiva corriendo');
        this._dlgOpen();
    }

    /**
     * Constructor
     *
     * @param {MatDialog} dialog
     *
     */
    constructor(
        public dialog: MatDialog
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private Methods
    // -----------------------------------------------------------------------------------------------------

    /**
     *  Private _dlgOpen
     */
    _dlgOpen(): void {
        console.log('Directiva Funcion');
        this.dialog
            .open(AsociarOperadorDialogComponent, {
                panelClass: this.panelClass || 'asociar-operador-dialog',
                disableClose: this.disableClose,
                width: this.width,
                data: this.data || {}
            })
            .afterClosed().subscribe(result => this.afterClosed.emit(result));
    }

}



// -----------------------------------------------------------------------------------------------------
// @ AsociarOperadorDialogComponent
// -----------------------------------------------------------------------------------------------------

@Directive({
    selector: '[agregar-fondos]',
    exportAs: 'AgregarFondosDialogComponentDirective'
})
export class AgregarFondosDialogComponentDirective {

    // -----------------------------------------------------------------------------------------------------
    // @ Decorators
    // -----------------------------------------------------------------------------------------------------

    // @ Input ---------------------------------------------------------------------------------------------
    @Input() data;
    @Input() disableClose;
    @Input() panelClass: string;
    @Input() width;

    // @ Output --------------------------------------------------------------------------------------------
    @Output() afterClosed = new EventEmitter<any>();

    // @ HostListener --------------------------------------------------------------------------------------
    @HostListener('click', ['$event']) onClick($event): void {
        console.log('Directiva corriendo');
        this._dlgOpen();
    }

    /**
     * Constructor
     *
     * @param {MatDialog} dialog
     *
     */
    constructor(
        public dialog: MatDialog
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private Methods
    // -----------------------------------------------------------------------------------------------------

    /**
     *  Private _dlgOpen
     */
    _dlgOpen(): void {
        console.log('Directiva Funcion');
        this.dialog
            .open(AgregarFondosDialogComponent, {
                panelClass: this.panelClass || 'agregar-fondos-dialog',
                disableClose: this.disableClose,
                width: this.width,
                data: this.data || {}
            })
            .afterClosed().subscribe(result => this.afterClosed.emit(result));
    }

}




// -----------------------------------------------------------------------------------------------------
// @ FiniquitoNuevoDialogComponentDirective
// -----------------------------------------------------------------------------------------------------

@Directive({
    selector: '[finiquito-new-dialog]',
    exportAs: 'FiniquitoNuevoDialogComponentDirective'
})
export class FiniquitoNuevoDialogComponentDirective {

    // -----------------------------------------------------------------------------------------------------
    // @ Decorators
    // -----------------------------------------------------------------------------------------------------

    // @ Input ---------------------------------------------------------------------------------------------
    @Input() data;
    @Input() disableClose;
    @Input() panelClass: string;
    @Input() width;

    // @ Output --------------------------------------------------------------------------------------------
    @Output() afterClosed = new EventEmitter<any>();

    // @ HostListener --------------------------------------------------------------------------------------
    @HostListener('click', ['$event']) onClick($event): void {
        console.log('Directiva corriendo');
        this._dlgOpen();
    }

    /**
     * Constructor
     *
     * @param {MatDialog} dialog
     *
     */
    constructor(
        public dialog: MatDialog
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private Methods
    // -----------------------------------------------------------------------------------------------------

    /**
     *  Private _dlgOpen
     */
    _dlgOpen(): void {
        console.log('Directiva Funcion');
        this.dialog
            .open(FiniquitoNuevoDialogComponent, {
                panelClass: this.panelClass || 'finiquito-nuevo-dialog',
                disableClose: this.disableClose,
                width: this.width,
                data: this.data || {}
            })
            .afterClosed().subscribe(result => this.afterClosed.emit(result));
    }

}




// -----------------------------------------------------------------------------------------------------
// @ DialogContratoParrafoComponentDirective
// -----------------------------------------------------------------------------------------------------

@Directive({
    selector: '[contrato-parrafo-dialog]',
    exportAs: 'DialogContratoParrafoComponentDirective'
})
export class DialogContratoParrafoComponentDirective {

    // -----------------------------------------------------------------------------------------------------
    // @ Decorators
    // -----------------------------------------------------------------------------------------------------

    // @ Input ---------------------------------------------------------------------------------------------
    @Input() data;
    @Input() disableClose;
    @Input() panelClass: string;
    @Input() width;

    // @ Output --------------------------------------------------------------------------------------------
    @Output() afterClosed = new EventEmitter<any>();

    // @ HostListener --------------------------------------------------------------------------------------
    @HostListener('click', ['$event']) onClick($event): void {
        console.log('Directiva corriendo');
        this._dlgOpen();
    }

    /**
     * Constructor
     *
     * @param {MatDialog} dialog
     *
     */
    constructor(
        public dialog: MatDialog
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private Methods
    // -----------------------------------------------------------------------------------------------------

    /**
     *  Private _dlgOpen
     */
    _dlgOpen(): void {
        console.log('Directiva Funcion');
        this.dialog
            .open(DialogContratoParrafoComponent, {
                panelClass: this.panelClass || 'dialog-contrato-parrafo',
                disableClose: this.disableClose,
                width: this.width,
                data: this.data || {}
            })
            .afterClosed().subscribe(result => this.afterClosed.emit(result));
    }

}



// -----------------------------------------------------------------------------------------------------
// @ DialogContratoParrafoComponentDirective
// -----------------------------------------------------------------------------------------------------

@Directive({
    selector: '[contrato-turno-dialog]',
    exportAs: 'DialogContratoTurnoComponentDirective'
})
export class DialogContratoTurnoComponentDirective {

    // -----------------------------------------------------------------------------------------------------
    // @ Decorators
    // -----------------------------------------------------------------------------------------------------

    // @ Input ---------------------------------------------------------------------------------------------
    @Input() data;
    @Input() disableClose;
    @Input() panelClass: string;
    @Input() width;

    // @ Output --------------------------------------------------------------------------------------------
    @Output() afterClosed = new EventEmitter<any>();

    // @ HostListener --------------------------------------------------------------------------------------
    @HostListener('click', ['$event']) onClick($event): void {
        console.log('Directiva corriendo');
        this._dlgOpen();
    }

    /**
     * Constructor
     *
     * @param {MatDialog} dialog
     *
     */
    constructor(
        public dialog: MatDialog
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private Methods
    // -----------------------------------------------------------------------------------------------------

    /**
     *  Private _dlgOpen
     */
    _dlgOpen(): void {
        console.log('Directiva Funcion');
        this.dialog
            .open(ContratoTurnoDialogComponent, {
                panelClass: this.panelClass || 'contrato-turno-dialog',
                disableClose: this.disableClose,
                width: this.width,
                data: this.data || {}
            })
            .afterClosed().subscribe(result => this.afterClosed.emit(result));
    }

}


// -----------------------------------------------------------------------------------------------------
// @ DialogContratoParrafoComponentDirective
// -----------------------------------------------------------------------------------------------------

@Directive({
    selector: '[contrato-turno-list-dialog]',
    exportAs: 'ContratoTurnoListDialogComponentDirective'
})
export class ContratoTurnoListDialogComponentDirective {

    // -----------------------------------------------------------------------------------------------------
    // @ Decorators
    // -----------------------------------------------------------------------------------------------------

    // @ Input ---------------------------------------------------------------------------------------------
    @Input() data;
    @Input() disableClose;
    @Input() panelClass: string;
    @Input() width;

    // @ Output --------------------------------------------------------------------------------------------
    @Output() afterClosed = new EventEmitter<any>();

    // @ HostListener --------------------------------------------------------------------------------------
    @HostListener('click', ['$event']) onClick($event): void {
        console.log('Directiva corriendo');
        this._dlgOpen();
    }

    /**
     * Constructor
     *
     * @param {MatDialog} dialog
     *
     */
    constructor(
        public dialog: MatDialog
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private Methods
    // -----------------------------------------------------------------------------------------------------

    /**
     *  Private _dlgOpen
     */
    _dlgOpen(): void {
        console.log('Directiva Funcion');
        this.dialog
            .open(ContratoTurnoListDialogComponent, {
                panelClass: this.panelClass || 'contrato-turno-list-dialog',
                disableClose: this.disableClose,
                width: this.width,
                data: this.data || {}
            })
            .afterClosed().subscribe(result => this.afterClosed.emit(result));
    }

}


// -----------------------------------------------------------------------------------------------------
// @ DialogContratoGrupoComponentDirective
// -----------------------------------------------------------------------------------------------------

@Directive({
    selector: '[contrato-grupo]',
    exportAs: 'ContratoGrupoDialogComponentDirective'
})
export class ContratoGrupoDialogComponentDirective {

    // -----------------------------------------------------------------------------------------------------
    // @ Decorators
    // -----------------------------------------------------------------------------------------------------

    // @ Input ---------------------------------------------------------------------------------------------
    @Input() data;
    @Input() disableClose;
    @Input() panelClass: string;
    @Input() width;

    // @ Output --------------------------------------------------------------------------------------------
    @Output() afterClosed = new EventEmitter<any>();

    // @ HostListener --------------------------------------------------------------------------------------
    @HostListener('click', ['$event']) onClick($event): void {
        console.log('Directiva corriendo');
        this._dlgOpen();
    }

    /**
     * Constructor
     *
     * @param {MatDialog} dialog
     *
     */
    constructor(
        public dialog: MatDialog
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private Methods
    // -----------------------------------------------------------------------------------------------------

    /**
     *  Private _dlgOpen
     */
    _dlgOpen(): void {
        console.log('Directiva Funcion');
        this.dialog
            .open(ContratoGrupoDialogComponent, {
                panelClass: this.panelClass || 'contrato-grupo-dialog',
                disableClose: this.disableClose,
                width: this.width,
                data: this.data || {}
            })
            .afterClosed().subscribe(result => this.afterClosed.emit(result));
    }

}


// -----------------------------------------------------------------------------------------------------
// @ DialogContratoParrafoComponentDirective
// -----------------------------------------------------------------------------------------------------

@Directive({
    selector: '[contrato-registro-nuevo-dialog]',
    exportAs: 'ContratoTurnoListDialogComponentDirective'
})
export class ContratoRegistroNuevoDialogComponentDirective {

    // -----------------------------------------------------------------------------------------------------
    // @ Decorators
    // -----------------------------------------------------------------------------------------------------

    // @ Input ---------------------------------------------------------------------------------------------
    @Input() data;
    @Input() disableClose;
    @Input() panelClass: string;
    @Input() width;

    // @ Output --------------------------------------------------------------------------------------------
    @Output() afterClosed = new EventEmitter<any>();

    // @ HostListener --------------------------------------------------------------------------------------
    @HostListener('click', ['$event']) onClick($event): void {
        console.log('Directiva corriendo');
        this._dlgOpen();
    }

    /**
     * Constructor
     *
     * @param {MatDialog} dialog
     *
     */
    constructor(
        public dialog: MatDialog
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private Methods
    // -----------------------------------------------------------------------------------------------------

    /**
     *  Private _dlgOpen
     */
    _dlgOpen(): void {
        console.log('Directiva Funcion');
        this.dialog
            .open(ContratoRegistroNuevoDialogComponent, {
                panelClass: this.panelClass || 'contrato-registro-nuevo-dialog',
                disableClose: this.disableClose,
                width: this.width,
                data: this.data || {}
            })
            .afterClosed().subscribe(result => this.afterClosed.emit(result));
    }

}


// -----------------------------------------------------------------------------------------------------
// @ DialogContratoParrafoComponentDirective
// -----------------------------------------------------------------------------------------------------

@Directive({
    selector: '[asignar-dialog]',
    exportAs: 'ContratoTurnoListDialogComponentDirective'
})
export class AsignarDialogComponentDirective {

    // -----------------------------------------------------------------------------------------------------
    // @ Decorators
    // -----------------------------------------------------------------------------------------------------

    // @ Input ---------------------------------------------------------------------------------------------
    @Input() data;
    @Input() disableClose;
    @Input() panelClass: string;
    @Input() width;

    // @ Output --------------------------------------------------------------------------------------------
    @Output() afterClosed = new EventEmitter<any>();

    // @ HostListener --------------------------------------------------------------------------------------
    @HostListener('click', ['$event']) onClick($event): void {
        console.log('Directiva corriendo');
        this._dlgOpen();
    }

    /**
     * Constructor
     *
     * @param {MatDialog} dialog
     *
     */
    constructor(
        public dialog: MatDialog
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private Methods
    // -----------------------------------------------------------------------------------------------------

    /**
     *  Private _dlgOpen
     */
    _dlgOpen(): void {
        console.log('Directiva Funcion');
        this.dialog
            .open(AsignarDialogComponent, {
                panelClass: this.panelClass || 'asignar-dialog',
                disableClose: this.disableClose,
                width: this.width,
                data: this.data || {}
            })
            .afterClosed().subscribe(result => this.afterClosed.emit(result));
    }

}





// -----------------------------------------------------------------------------------------------------
// @ DialogContratoParrafoComponentDirective
// -----------------------------------------------------------------------------------------------------

@Directive({
    selector: '[clientes-nuevo]',
    exportAs: 'ContratoTurnoListDialogComponentDirective'
})
export class ContactsClientesComponentDirective {

    // -----------------------------------------------------------------------------------------------------
    // @ Decorators
    // -----------------------------------------------------------------------------------------------------

    // @ Input ---------------------------------------------------------------------------------------------
    @Input() data;
    @Input() disableClose;
    @Input() panelClass: string;
    @Input() width;

    // @ Output --------------------------------------------------------------------------------------------
    @Output() afterClosed = new EventEmitter<any>();

    // @ HostListener --------------------------------------------------------------------------------------
    @HostListener('click', ['$event']) onClick($event): void {
        console.log('Directiva corriendo');
        this._dlgOpen();
    }

    /**
     * Constructor
     *
     * @param {MatDialog} dialog
     *
     */
    constructor(
        public dialog: MatDialog
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private Methods
    // -----------------------------------------------------------------------------------------------------

    /**
     *  Private _dlgOpen
     */
    _dlgOpen(): void {
        console.log('Directiva Funcion');
        this.dialog
            .open(ContactsClientesDialogComponent, {
                panelClass: this.panelClass || 'contacts-clientes-dialog',
                disableClose: this.disableClose,
                width: this.width,
                data: this.data || {}
            })
            .afterClosed().subscribe(result => this.afterClosed.emit(result));
    }

}

// -----------------------------------------------------------------------------------------------------
// @ DialogContratoParrafoComponentDirective
// -----------------------------------------------------------------------------------------------------

@Directive({
    selector: '[finalizar-dialog]',
    exportAs: 'FinalizarDialogComponentDirective'
})
export class FinalizarDialogComponentDirective {

    // -----------------------------------------------------------------------------------------------------
    // @ Decorators
    // -----------------------------------------------------------------------------------------------------

    // @ Input ---------------------------------------------------------------------------------------------
    @Input() data;
    @Input() disableClose;
    @Input() panelClass: string;
    @Input() width;

    // @ Output --------------------------------------------------------------------------------------------
    @Output() afterClosed = new EventEmitter<any>();

    // @ HostListener --------------------------------------------------------------------------------------
    @HostListener('click', ['$event']) onClick($event): void {
        console.log('Directiva corriendo');
        this._dlgOpen();
    }

    /**
     * Constructor
     *
     * @param {MatDialog} dialog
     *
     */
    constructor(
        public dialog: MatDialog
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private Methods
    // -----------------------------------------------------------------------------------------------------

    /**
     *  Private _dlgOpen
     */
    _dlgOpen(): void {
        console.log('Directiva Funcion');
        this.dialog
            .open(FinalizarDialogComponent, {
                panelClass: this.panelClass || 'finalizar-dialog',
                disableClose: this.disableClose,
                width: this.width,
                data: this.data || {}
            })
            .afterClosed().subscribe(result => this.afterClosed.emit(result));
    }

}



