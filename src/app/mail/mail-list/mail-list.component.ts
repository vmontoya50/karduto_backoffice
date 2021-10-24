import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';

import { Mail } from '../mail.model';
import { MailService } from '../mail.service';
import {ApiService} from '../../api.service';
import {FuseSidebarService} from '../../../@fuse/components/sidebar/sidebar.service';
import {FuseProgressBarService} from '../../../@fuse/components/progress-bar/progress-bar.service';
import {FuseConfigService} from '../../../@fuse/services/config.service';

@Component({
    selector     : 'mail-list',
    templateUrl  : './mail-list.component.html',
    styleUrls    : ['./mail-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class MailListComponent implements OnInit, OnDestroy
{
    mails: Mail[];
    currentMail: Mail;
    public dataT;
    public user;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {ActivatedRoute} _activatedRoute
     * @param {MailService} _mailService
     * @param {Location} _location
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _mailService: MailService,
        private _location: Location,
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

    dataTrans(): any{
       //  this.api.get('transacciones?opera=' + this.user.id)
        this.api.get('transacciones/pull/' + this.user.id )
            .subscribe( data => {

                console.log('CONSULTA::', data);
                this.dataT = data;
                console.log('Transaccuiones::', this.dataT  );
                this._fuseProgressBarService.hide();

            });
    }

    /**
     * On init
     */
    ngOnInit(): void
    {

        this.api.onUserChanged.subscribe( user => {
            console.log('USERSTORAGE::', user);
            this.user = user;
        });

        this.dataTrans();
        // Subscribe to update mails on changes
        this._mailService.onMailsChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(mails => {
                this.mails = mails;
            });


        // Subscribe to update mails on changes
        this._mailService.onTransaccionChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(mails => {
                this.dataTrans();
                console.log('CRONOTRANS::', mails);
            });

        // Subscribe to update current mail on changes
        this._mailService.onCurrentMailChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(currentMail => {
                if ( !currentMail )
                {
                    // Set the current mail id to null to deselect the current mail
                    this.currentMail = null;

                    // Handle the location changes
                    const labelHandle  = this._activatedRoute.snapshot.params.labelHandle,
                          filterHandle = this._activatedRoute.snapshot.params.filterHandle,
                          folderHandle = this._activatedRoute.snapshot.params.folderHandle;

                    if ( labelHandle )
                    {
                        this._location.go('mail/label/' + labelHandle);
                    }
                    else if ( filterHandle )
                    {
                        this._location.go('mail/filter/' + filterHandle);
                    }
                    else
                    {
                        this._location.go('mail/' + folderHandle);
                    }
                }
                else
                {
                    this.currentMail = currentMail;
                }
            });
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
     * Read mail
     *
     * @param mailId
     */
    readMail(mailId): void
    {
        const labelHandle  = this._activatedRoute.snapshot.params.labelHandle,
              filterHandle = this._activatedRoute.snapshot.params.filterHandle,
              folderHandle = this._activatedRoute.snapshot.params.folderHandle;

        if ( labelHandle )
        {
            this._location.go('mail/label/' + labelHandle + '/' + mailId);
        }
        else if ( filterHandle )
        {
            this._location.go('mail/filter/' + filterHandle + '/' + mailId);
        }
        else
        {
            this._location.go('mail/' + folderHandle + '/' + mailId);
        }

        // Set current mail
        this._mailService.setCurrentMail(mailId);
    }
}
