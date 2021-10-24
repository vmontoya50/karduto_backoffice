import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FuseSidebarService} from '../../../@fuse/components/sidebar/sidebar.service';
import {FuseProgressBarService} from '../../../@fuse/components/progress-bar/progress-bar.service';
import {FuseConfigService} from '../../../@fuse/services/config.service';
import {FormBuilder} from '@angular/forms';
import {MatDialog} from '@angular/material';
import {ApiService} from '../../api.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {fuseAnimations} from '../../../@fuse/animations';

@Component({
    selector   : 'view-component',
    templateUrl: './view.component.html',
    styleUrls  : ['./view.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class ViewComponent implements OnInit
{
    // Variables
    public dataCuenta;
    public idCuenta;
    public montoTrans;
    public extension;
    public extension_;

    /**
     * Constructor
     *
     * @param {FuseSidebarService} _fuseSidebarService
     * @param _fuseProgressBarService
     * @param _fuseConfigService
     * @param _formBuilder
     * @param _matDialog
     * @param api
     * @param _route
     * @param router
     */
    constructor(
        private _fuseSidebarService: FuseSidebarService,
        private _fuseProgressBarService: FuseProgressBarService,
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private _matDialog: MatDialog,
        public api: ApiService,
        public _route: ActivatedRoute,
        private router: Router
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    dataComponent(id): any{

        this._fuseProgressBarService.show();
        this.api.get('transacciones/ver/' + id)
            .subscribe( result => {

                console.log('CONSULTA::', result);
                this.dataCuenta = result;
                if(this.dataCuenta.archivo_entrante){

                    const arr = this.dataCuenta.archivo_entrante.split('.');
                    this.extension = arr[(arr.length - 1)];

                }

                if(this.dataCuenta.archivo_saliente){

                    const arr_ = this.dataCuenta.archivo_saliente.split('.');
                    this.extension_ = arr_[(arr_.length - 1)];
                    console.log('arr_', arr_);
                    console.log('this.extension', this.extension_);

                }


                this._fuseProgressBarService.hide();

            });
    }

    /**
     * Toggle sidebar
     *
     * @param name
     */
    toggleSidebar(name): void
    {
        this._fuseSidebarService.getSidebar(name).toggleOpen();
    }

    setDialog$(){

    }

    goToLink(url): void{
        window.open( url, '_blank');
    }


    ngOnInit(): any {

        this._route.paramMap.pipe(
            switchMap((params: ParamMap) =>
                of(params.get('id'))
            )
        ).subscribe((url) => {

            console.log('CUENTA::', url);

            this.idCuenta = url;
            this.dataComponent(url);

        });

    }
}
