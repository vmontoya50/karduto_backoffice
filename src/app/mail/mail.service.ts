import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

import { FuseUtils } from '@fuse/utils';

import { Mail } from './mail.model';
import {ApiService} from '../api.service';

@Injectable()
export class MailService implements Resolve<any>
{
    mails: Mail[];
    selectedMails: Mail[];
    currentMail: Mail;
    searchText = '';

    folders: any[];
    filters: any[];
    labels: any[];
    routeParams: any;

    url = 'https://api.superenviostoday.com/api/';

    onTransaccionChanged: BehaviorSubject<any>;
    onMailsChanged: BehaviorSubject<any>;
    onSelectedMailsChanged: BehaviorSubject<any>;
    onCurrentMailChanged: BehaviorSubject<any>;
    onFoldersChanged: BehaviorSubject<any>;
    onFiltersChanged: BehaviorSubject<any>;
    onLabelsChanged: BehaviorSubject<any>;
    onSearchTextChanged: BehaviorSubject<any>;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(
        public api: ApiService,
        private _httpClient: HttpClient
    )
    {
        // Set the defaults
        this.selectedMails = [];
        this.onTransaccionChanged = new BehaviorSubject([]);
        this.onMailsChanged = new BehaviorSubject([]);
        this.onSelectedMailsChanged = new BehaviorSubject([]);
        this.onCurrentMailChanged = new BehaviorSubject([]);
        this.onFoldersChanged = new BehaviorSubject([]);
        this.onFiltersChanged = new BehaviorSubject([]);
        this.onLabelsChanged = new BehaviorSubject([]);
        this.onSearchTextChanged = new BehaviorSubject('');
    }

    /**
     * Resolver
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
    {
        this.routeParams = route.params;

        return new Promise((resolve, reject) => {
            Promise.all([
                this.getFolders(),
                this.getFilters(),
                this.getLabels(),
                this.getMails()
            ]).then(
                () => {
                    if ( this.routeParams.mailId )
                    {
                        this.setCurrentMail(this.routeParams.mailId);
                    }
                    else
                    {
                        this.setCurrentMail(null);
                    }

                    this.onSearchTextChanged.subscribe(searchText => {
                        if ( searchText !== '' )
                        {
                            this.searchText = searchText;
                            this.getMails();
                        }
                        else
                        {
                            this.searchText = searchText;
                            this.getMails();
                        }
                    });

                    resolve();
                },
                reject
            );
        });
    }

    /**
     * Get all folders
     *
     * @returns {Promise<any>}
     */
    getFolders(): Promise<any>
    {
        return new Promise((resolve, reject) => {

            this._httpClient.get(this.url + 'mail-folders', {headers: this.api.headers()})
                .subscribe((response: any) => {
                    this.folders = response;
                    this.onFoldersChanged.next(this.folders);
                    resolve(this.folders);
                }, reject);
        });
    }

    /**
     * Get all filters
     *
     * @returns {Promise<any>}
     */
    getFilters(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.get(this.url + 'mail-filters', {headers: this.api.headers()})
                .subscribe((response: any) => {
                    this.filters = response;
                    this.onFiltersChanged.next(this.filters);
                    resolve(this.filters);
                }, reject);
        });
    }

    /**
     * Get all labels
     *
     * @returns {Promise<any>}
     */
    getLabels(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.get(this.url + 'mail-labels', {headers: this.api.headers()})
                .subscribe((response: any) => {
                    this.labels = response;
                    this.onLabelsChanged.next(this.labels);
                    resolve(this.labels);
                }, reject);
        });
    }

    /**
     * Get all mails
     *
     * @returns {Promise<Mail[]>}
     */
    getMails(): Promise<Mail[]>
    {
        if ( this.routeParams.labelHandle )
        {
            return this.getMailsByLabel(this.routeParams.labelHandle);
        }

        if ( this.routeParams.filterHandle )
        {
            return this.getMailsByFilter(this.routeParams.filterHandle);
        }

        return this.getMailsByFolder(this.routeParams.folderHandle);
    }

    /**
     * Get mails by folder
     *
     * @param handle
     * @returns {Promise<Mail[]>}
     */
    getMailsByFolder(handle): Promise<Mail[]>
    {
        return new Promise((resolve, reject) => {

            this._httpClient.get(this.url +  'mail-folders?handle=' + handle, {headers: this.api.headers()})
                .subscribe((folders: any) => {
                    if ( folders.length > 0 ){
                        const folderId = (folders[0].id) ? folders[0].id : null;

                        this._httpClient.get(this.url +  'transacciones?estado=PEND', {headers: this.api.headers()})
                            .subscribe((mails: any) => {

                                this.mails = mails.map(mail => {
                                    return new Mail(mail);
                                });

                                this.mails = FuseUtils.filterArrayByString(this.mails, this.searchText);

                                this.onMailsChanged.next(this.mails);

                                resolve(this.mails);

                            }, reject);
                    }
                });
        });
    }

    /**
     * Get mails by filter
     *
     * @param handle
     * @returns {Promise<Mail[]>}
     */
    getMailsByFilter(handle): Promise<Mail[]>
    {
        return new Promise((resolve, reject) => {
            console.log('LLEGO 123');
            this._httpClient.get(this.url +  'mail-mails?' + handle + '=true', {headers: this.api.headers()})
                .subscribe((mails: any) => {

                    this.mails = mails.map(mail => {
                        return new Mail(mail);
                    });

                    this.mails = FuseUtils.filterArrayByString(this.mails, this.searchText);

                    this.onMailsChanged.next(this.mails);

                    resolve(this.mails);

                }, reject);
        });
    }

    /**
     * Get mails by label
     *
     * @param handle
     * @returns {Promise<Mail[]>}
     */
    getMailsByLabel(handle): Promise<Mail[]>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.get(this.url + 'mail-labels?handle=' + handle, {headers: this.api.headers()})
                .subscribe((labels: any) => {

                    const labelId = labels[0].id;

                    this._httpClient.get('api/mail-mails?labels=' + labelId, {headers: this.api.headers()})
                        .subscribe((mails: any) => {

                            this.mails = mails.map(mail => {
                                return new Mail(mail);
                            });

                            this.mails = FuseUtils.filterArrayByString(this.mails, this.searchText);

                            this.onMailsChanged.next(this.mails);

                            resolve(this.mails);

                        }, reject);
                });
        });
    }

    /**
     * Toggle selected mail by id
     *
     * @param id
     */
    toggleSelectedMail(id): void
    {
        // First, check if we already have that mail as selected...
        if ( this.selectedMails.length > 0 )
        {
            for ( const mail of this.selectedMails )
            {
                // ...delete the selected mail
                if ( mail.id === id )
                {
                    const index = this.selectedMails.indexOf(mail);

                    if ( index !== -1 )
                    {
                        this.selectedMails.splice(index, 1);

                        // Trigger the next event
                        this.onSelectedMailsChanged.next(this.selectedMails);

                        // Return
                        return;
                    }
                }
            }
        }

        // If we don't have it, push as selected
        this.selectedMails.push(
            this.mails.find(mail => {
                return mail.id === id;
            })
        );

        // Trigger the next event
        this.onSelectedMailsChanged.next(this.selectedMails);
    }

    /**
     * Toggle select all
     */
    toggleSelectAll(): void
    {
        if ( this.selectedMails.length > 0 )
        {
            this.deselectMails();
        }
        else
        {
            this.selectMails();
        }

    }

    /**
     * Select mails
     *
     * @param filterParameter
     * @param filterValue
     */
    selectMails(filterParameter?, filterValue?): void
    {
        this.selectedMails = [];
        console.log('selectMails');

        // If there is no filter, select all mails
        if ( filterParameter === undefined || filterValue === undefined )
        {
            this.selectedMails = this.mails;
        }
        else
        {
            this.selectedMails.push(...
                this.mails.filter(mail => {
                    return mail[filterParameter] === filterValue;
                })
            );
        }

        // Trigger the next event
        this.onSelectedMailsChanged.next(this.selectedMails);
    }

    /**
     * Deselect mails
     */
    deselectMails(): void
    {
        this.selectedMails = [];

        // Trigger the next event
        this.onSelectedMailsChanged.next(this.selectedMails);
    }

    /**
     * Set current mail by id
     *
     * @param id
     */
    setCurrentMail(id): void
    {


        this._httpClient.get(this.url + 'transacciones/ver/' + id, {headers: this.api.headers()})
            .subscribe((mail: any) => {
                this.mails = mail;
                this.onMailsChanged.next(this.mails);
                console.log('setCurrentMail::', new Mail(mail));
                this.onCurrentMailChanged.next( new Mail(mail));

            });


/*
        this.currentMail = this.mails.find(mail => {
            return mail.id === id;
        });
*/
        console.log('setCurrentMail');
    }

    /**
     * Toggle label on selected mails
     *
     * @param labelId
     */
    toggleLabelOnSelectedMails(labelId): void
    {
        this.selectedMails.map(mail => {

            const index = mail.labels.indexOf(labelId);

            if ( index !== -1 )
            {
                mail.labels.splice(index, 1);
            }
            else
            {
                mail.labels.push(labelId);
            }

            this.updateMail(mail);
        });
    }

    /**
     * Set folder on selected mails
     *
     * @param folderId
     */
    setFolderOnSelectedMails(folderId): void
    {
        this.selectedMails.map(mail => {
            mail.folder = folderId;

            this.updateMail(mail);
        });

        this.deselectMails();
    }

    /**
     * Update the mail
     *
     * @param mail
     * @returns {Promise<any>}
     */
    updateMail(mail): Promise<any>
    {
        return new Promise((resolve, reject) => {
        console.log('PRIMERA');
            this._httpClient.get('api/mail-mails/' + mail.id, {...mail})
                .subscribe(response => {
                    console.log('SUSCRIBE');
                    this.getMails().then(mails => {
                        console.log('GETMAIL');
                        if ( mails && this.currentMail )
                        {
                            this.setCurrentMail(this.currentMail.id);
                        }

                        resolve(mails);

                    }, reject);
                });
        });
    }
}
