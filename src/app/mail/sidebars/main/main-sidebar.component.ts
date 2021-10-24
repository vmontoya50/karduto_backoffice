import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';

import { MailService } from '../../mail.service';
import { MailComposeDialogComponent } from '../../dialogs/compose/compose.component';
import {Router} from '@angular/router';
import {ApiService} from '../../../api.service';

@Component({
    selector     : 'mail-main-sidebar',
    templateUrl  : './main-sidebar.component.html',
    styleUrls    : ['./main-sidebar.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class MailMainSidebarComponent implements OnInit, OnDestroy
{
    folders: any[];
    filters: any[];
    labels: any[];
    accounts: object;
    selectedAccount: string;
    dialogRef: any;
    estado;
    estadoView;
    user;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {MailService} _mailService
     * @param {MatDialog} _matDialog
     */
    constructor(
        public api: ApiService,
        private _mailService: MailService,
        public _matDialog: MatDialog,
        private router: Router
    )
    {
        // Set the defaults
        this.accounts = {
            creapond    : 'johndoe@creapond.com',
            withinpixels: 'johndoe@withinpixels.com'
        };
        this.selectedAccount = 'creapond';

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    traductor(estado): any{

        if (estado === 'OFF'){
            return 'Conectarme';
        }
        if (estado === 'ON'){
            return 'Desconectarme';
        }

    }
    estadoColor(name): any{
        let icon: any = '';

        if (name === 'OFF'){
            icon = '#8BD649';
        }

        if (name === 'APRO'){
            icon = '#FFC107';
        }

        if (name === 'PAUSA'){
            icon = '#FFC107';
        }

        if (name === 'ON'){
            icon = '#CB4B16' ;
        }
        return icon;
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this._mailService.onFoldersChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(folders => {
                this.folders = folders;
            });

        this._mailService.onFiltersChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(filters => {
                this.filters = filters;
            });

        this._mailService.onLabelsChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(labels => {
                this.labels = labels;
            });



        this.api.onEstadoChanged.subscribe(estado => {
            console.log('Estado', estado.length);
            if (estado.length > 1){
                this.estado = estado;
                if (estado === 'OFF'){
                    this.estadoView = 'Conectarme';
                }
                if (estado === 'ON'){
                    this.estadoView = 'Desconectarme';
                }
            }else{
                this.estado = 'OFF';
                this.estadoView = 'Conectarme';

            }
        });

        this.api.onUserChanged.subscribe( user => {
            console.log('USERSTORAGE::', user);
            this.user = user;

        });

        this.api.get('estados?id=' +  this.user.id)
            .subscribe( result => {
                this.estado = result.estado;
                this.estadoView = this.traductor(result.estado);

                console.log('ESTADO::', this.estado );
                this.api.hide();
            });


    }



    estadoPro(est): void{

        let estadoLocal = '';

        if (est === 'OFF'){
            estadoLocal = 'ON';
        }

        if (est === 'ON'){
            estadoLocal = 'OFF';
        }

        this.api.post('estados', {usuario_id: this.user.id, estado: estadoLocal})
            .subscribe( data => {

                console.log('CONSULTA::', data);

                this.estado = data.estado;
                this.estadoView = this.traductor(data.estado);

                this.api.onEstadoChanged.next(data.estado);
                this.api.onEstadoChanged.complete();
                this.api.hide();

            });
    }

    go(): any{
        this.router.navigate(['nueva']);
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
     * Compose dialog
     */
    composeDialog(): void
    {
        this.dialogRef = this._matDialog.open(MailComposeDialogComponent, {
            panelClass: 'mail-compose-dialog'
        });
        this.dialogRef.afterClosed()
            .subscribe(response => {
                if ( !response )
                {
                    return;
                }
                const actionType: string = response[0];
                const formData: FormGroup = response[1];
                switch ( actionType )
                {
                    /**
                     * Send
                     */
                    case 'send':
                        console.log('new Mail', formData.getRawValue());
                        break;
                    /**
                     * Delete
                     */
                    case 'delete':
                        console.log('delete Mail');
                        break;
                }
            });
    }
}
