import { Component, HostBinding, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Mail } from '../../mail.model';
import { MailService } from '../../mail.service';
import {ApiService} from '../../../api.service';
import {FuseSidebarService} from '../../../../@fuse/components/sidebar/sidebar.service';
import {FuseProgressBarService} from '../../../../@fuse/components/progress-bar/progress-bar.service';
import {FuseConfigService} from '../../../../@fuse/services/config.service';

@Component({
    selector     : 'mail-list-item',
    templateUrl  : './mail-list-item.component.html',
    styleUrls    : ['./mail-list-item.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class MailListItemComponent implements OnInit, OnDestroy
{
    @Input() mail: Mail;
    labels: any[];

    @HostBinding('class.selected')
    selected: boolean;

    // Private
    private _unsubscribeAll: Subject<any>;
    public dataT;

    /**
     * Constructor
     *
     * @param {MailService} _mailService
     */
    constructor(
        private _mailService: MailService,
        public api: ApiService,
        private _fuseSidebarService: FuseSidebarService,
        private _fuseProgressBarService: FuseProgressBarService,
        private _fuseConfigService: FuseConfigService,
    )
    {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------
/*
    dataTrans(): any{
        this.api.get('transacciones')
            .subscribe( data => {

                console.log('CONSULTA::', data);
                this.dataT = data;
                console.log('REGCONTRATO::', this.dataT  );
                this._fuseProgressBarService.hide();

        });
    }
*/
    /**
     * On init
     */
    ngOnInit(): void
    {
        // Set the initial values
        // console.log('TRANSACCIONES::', this.mail);
        // Set the initial values
         this.mail = new Mail(this.mail);

         console.log('TRANSACCIONES::', this.mail);
        // Subscribe to update on selected mail change


        this._mailService.onSelectedMailsChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(selectedMails => {
                this.selected = false;

                if ( selectedMails.length > 0 )
                {
                    for ( const mail of selectedMails )
                    {
                        if ( mail.id === this.mail.id )
                        {
                            this.selected = true;
                            break;
                        }
                    }
                }
            });



        // Subscribe to update on label change
        this._mailService.onLabelsChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(labels => {
                this.labels = labels;
            });
    }

    estadoColor(name): any{
        let icon: any = '';

        if (name === 'android'){
            icon = '#3FA644';
        }

        if (name === 'web'){
            icon = '#20ABEC';
        }

        if (name === 'ios'){
            icon = '#ADB2B1';
        }

        if (name === 'webmanual'){
            icon = '#010101';
        }

        if (name === 'RECH'){
            icon = '#CB4B16' ;
        }
        return icon;
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
     * On selected change
     */
    onSelectedChange(): void
    {
        this._mailService.toggleSelectedMail(this.mail.id);
    }

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
     * Toggle Important
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
