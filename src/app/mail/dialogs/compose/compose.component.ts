import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {ApiService} from '../../../api.service';
import {HttpClient} from '@angular/common/http';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector     : 'mail-compose',
    templateUrl  : './compose.component.html',
    styleUrls    : ['./compose.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class MailComposeDialogComponent implements OnInit
{
    showExtraToFields: boolean;
    composeForm: FormGroup;
    public dataMoneda;
    public user;
    public cuentas;
    public monto;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {MatDialogRef<MailComposeDialogComponent>} matDialogRef
     * @param _data
     */
    constructor(
        public matDialogRef: MatDialogRef<MailComposeDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        public api: ApiService,
        private http: HttpClient,
    )
    {
        // Set the defaults
        this.composeForm = this.createComposeForm();
        this.showExtraToFields = false;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Create compose form
     *
     * @returns {FormGroup}
     */
    createComposeForm(): FormGroup
    {
        return new FormGroup({
            from   : new FormControl({
                value   : 'johndoe@creapond.com',
                disabled: true
            }),
            to     : new FormControl(''),
            cc     : new FormControl(''),
            bcc    : new FormControl(''),
            subject: new FormControl(''),
            tipo_identificacion: new FormControl(''),
            moneda: new FormControl(''),
            archivo: new FormControl(''),
            message: new FormControl('')
        });
    }

    _dataMoneda(): void{

        this.api.show();

        this.api.get('monedas')
            .subscribe( result => {
                this.dataMoneda = result.data;
                console.log('MONEDAS::', this.dataMoneda );
                this.api.hide();
            });
    }

    _dataCuentas(moneda): void{

        this.api.show();

        this.api.get('cuentas/cuentaPorMoneda?moneda=' + moneda + '&accion=1')
            .subscribe( result => {
                this.cuentas = result;
                console.log('CUENTAS::', this.cuentas );
                this.api.hide();
            });
    }

    _setFile(event): any{
        console.log('FILE::', event);

        const files = event.srcElement.files
        if (!files) {
            return;
        }

        const path = this.api.url + 'feriado/import';
        const formData: FormData = new FormData();

        for (let i = 0; i < files.length; i++) {

            formData.append('archivo', files[i], files[i].name);

        }
        // formData.append('data', JSON.stringify(data));
        this.http.post(path, formData).subscribe(
            (r) => {

                console.log('got r', r);
                const mensaje = r;
                this.api.toast('open', 'Cargo con exito.');

            }
        );

    }

    _setDialog(): void{

        const form = this.composeForm.value;
        console.log('FORM::', form);
        this.api.show();
        form.create_by = this.user.id;
        this.api.post('bancos', form)
            .subscribe( data => {

                console.log('CONSULTA::', data);
                this.matDialogRef.close(data);
                this.api.hide();

            });

    }



    /**
     * Toggle extra to fields
     */
    toggleExtraToFields(): void
    {
        this.showExtraToFields = !this.showExtraToFields;
    }



    ngOnInit(): any {

        this._dataMoneda();

        this.api.onUserChanged.subscribe( user => {
            console.log('USERSTORAGE::', user);
            this.user = user;
        });

    }
}
