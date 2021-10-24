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
import {ClienteNuevoDialogComponent} from './cliente-nuevo/dialog.component';
import {ClienteEditarDialogComponent} from './cliente-editar/dialog.component';
import { VacanteDialogComponent } from './vacantes/dialog.component';


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
// @ ClienteNuevoDialogComponent
// -----------------------------------------------------------------------------------------------------

@Directive({
    selector: '[cliente-nuevo-dialog]',
    exportAs: 'ContratoTurnoListDialogComponentDirective'
})
export class ClienteNuevoDialogComponentDirective {

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
            .open(ClienteNuevoDialogComponent, {
                panelClass: this.panelClass || 'cliente-nuevo-dialog',
                disableClose: this.disableClose,
                width: this.width,
                data: this.data || {}
            })
            .afterClosed().subscribe(result => this.afterClosed.emit(result));
    }

}


// -----------------------------------------------------------------------------------------------------
// @ ClienteNuevoDialogComponent
// -----------------------------------------------------------------------------------------------------

@Directive({
    selector: '[clienteNuevoDialog]',
    exportAs: 'ClienteEditarDialogComponentDirective'
})
export class ClienteEditarDialogComponentDirective {

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
        console.log('cliente-editar-dialog');
        this.dialog
            .open(ClienteEditarDialogComponent, {
                panelClass: this.panelClass || 'cliente-editar-dialog',
                disableClose: this.disableClose,
                width: this.width,
                data: this.data || {}
            })
            .afterClosed().subscribe(result => this.afterClosed.emit(result));
    }
}



// -----------------------------------------------------------------------------------------------------
// @ VacanteDialogComponent
// -----------------------------------------------------------------------------------------------------

@Directive({
    selector: '[VacanteDialog]',
    exportAs: 'VacanteDialogComponentDirective'
})
export class VacanteDialogComponentDirective {

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
        console.log('vacante-dialog');
        this.dialog
            .open(VacanteDialogComponent, {
                panelClass: this.panelClass || 'vacante-dialog',
                disableClose: this.disableClose,
                width: this.width || 400,
                data: this.data || {}
            })
            .afterClosed().subscribe(result => this.afterClosed.emit(result));
    }
}


