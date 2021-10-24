import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';

import { Mail } from '../mail.model';
import { MailService } from '../mail.service';
import {ApiService} from '../../api.service';
import {HttpClient} from '@angular/common/http';

interface Transaccion {
    id: string;
    archivo_saliente?: string;
    estado?: string;
    referencia_saliente?: string;
}

@Component({
    selector     : 'mail-details',
    templateUrl  : './mail-details.component.html',
    styleUrls    : ['./mail-details.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class MailDetailsComponent implements OnInit, OnDestroy
{
    mail: Mail;
    labels: any[];
    showDetails: boolean;
    archivo;
    foto;
    user;
    public referenciaSalida;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {MailService} _mailService
     */
    constructor(
        private _mailService: MailService,
        public api: ApiService,
        private http: HttpClient,
    )
    {
        // Set the defaults
        this.showDetails = false;

        // Set the private defaults
        this._unsubscribeAll = new Subject();

        setInterval(() => {
            this._mailService.onTransaccionChanged.next('a');
            //console.log('actualizo');
        }, 10000);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------
    _setFile(event): any{
        console.log('FILE::', event);

        const files = event.srcElement.files
        if (!files) {
            return;
        }

        const path = this.api.url + 'transacciones/uploadImage';
        const formData: FormData = new FormData();

        for (let i = 0; i < files.length; i++) {

            formData.append('image', files[i], files[i].name);

        }
        // formData.append('data', JSON.stringify(data));
        this.http.post(path, formData, {headers: this.api.headers()}).subscribe(
            (r) => {
                //console.log('got r', r);
                this.api.toast('open', 'Cargo con exito.');
                const mensaje = r;
                this.archivo = r;
                this.update();
            }
        );

    }

    update(): any{

        const path = this.api.url + 'transacciones';
        const data: Transaccion = {
            id: this.mail.id,
            archivo_saliente: this.archivo.data,
        };

        this.mail.archivo_saliente = this.archivo.data;

        this.http.put(path, data, {headers: this.api.headers()}).subscribe(
            (r) => {
                //console.log('got r', r);
                this.api.toast('open', 'Cargo con exito.');
                const mensaje = r;
            }
        );
    }

    confirmar(): any{

        const path = this.api.url + 'transacciones';
        const data: Transaccion = {
            id: this.mail.id,
            estado: 'FINA',
            referencia_saliente: this.referenciaSalida,
        };

        this.http.put(path, data, {headers: this.api.headers()}).subscribe(
            (r) => {
                //console.log('confirmar r', r);
                this.api.toast('open', 'Cargo con exito.');
                this.mail = null;
                //console.log('mailELIMINADO::', this.mail);
                this._mailService.onTransaccionChanged.next(r);
            }
        );
    }

    finalizar(estado): any{

        const path = this.api.url + 'transacciones';
        const data: Transaccion = {
            id: this.mail.id,
            estado: estado,
        };

        this.http.put(path, data, {headers: this.api.headers()}).subscribe(
            (r) => {
                //console.log('confirmar r', r);
                this.api.toast('open', 'Cargo con exito.');
                this.mail = null;
                this._mailService.onTransaccionChanged.next(r);
            }
        );
    }

    deleteArchivo(): any{

        const path = this.api.url + 'transacciones';
        const data: Transaccion = {
            id: this.mail.id,
            archivo_saliente: '',
        };

        this.mail.archivo_saliente = null;

        this.http.put(path, data, {headers: this.api.headers()}).subscribe(
            (r) => {
                //console.log('got r', r);
                this.api.toast('open', 'Cargo con exito.');
                const mensaje = r;
            }
        );
    }

    dataTrans(): any{
        //  this.api.get('transacciones?opera=' + this.user.id)
        this.api.get('transacciones/pull/' + this.user.id )
            .subscribe( data => {

                //console.log('CONSULTA::', data);
                this.mail = data;

            });
    }

    time(): void{
        setTimeout(() => {
            this._mailService.onTransaccionChanged.next('a');
            //console.log('actualizo');
        }, 60000);
    }
    /**
     * On init
     */
    ngOnInit(): void
    {
        this.api.onUserChanged.subscribe( user => {
            //console.log('USERSTORAGE::', user);
            this.user = user;
        });

        this.dataTrans();

        // Subscribe to update the current mail
        this._mailService.onCurrentMailChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(currentMail => {

                this.mail = currentMail;
                //console.log('DETALLE', this.mail);
            });

        // Subscribe to update on label change
        this._mailService.onLabelsChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(labels => {
                this.labels = labels;
            });

        this.time();



    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle star
     *
     * @param event
     */
    toggleStar(event): void
    {
        event.stopPropagation();

        this.mail.toggleStar();

        this._mailService.updateMail(this.mail);
    }

    /**
     * Toggle important
     *
     * @param event
     */
    toggleImportant(event): void
    {
        event.stopPropagation();

        this.mail.toggleImportant();

        this._mailService.updateMail(this.mail);
    }
}
