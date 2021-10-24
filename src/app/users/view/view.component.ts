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

interface Food {
    value: string;
    viewValue: string;
}
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
    public daMovimiento;

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

    displayedColumns: string[] =
        [
            'banco',
            'numero',
            'tipo',
            'monto',
            'usuario_nombre',
            'created_at'
        ];

    displayFilter: Food[] = [
        {value: 'id', viewValue: 'id'},
        {value: 'name', viewValue: 'nombre'},
        {value: 'created_at', viewValue: 'Fecha creación'}
    ];

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    dataComponent(id): any{

        this._fuseProgressBarService.show();
        this.api.get('cuentas/ver/' + id)
            .subscribe( result => {

                console.log('CONSULTA::', result);
                this.dataCuenta = result;

                this._fuseProgressBarService.hide();

            });
    }


    dataMovimiento(id): any{

        this._fuseProgressBarService.show();
        this.api.get('movimiento/seach?seach=cuenta&data=' + id)
            .subscribe( result => {

                console.log('CONSULTA::', result);
                this.daMovimiento = result;

                this._fuseProgressBarService.hide();

            });
    }

    delete(): any{

        this._fuseProgressBarService.show();
        this.api.post('cuentas/eliminar', {usuario: this.dataCuenta.user_id, cuenta: this.idCuenta})
            .subscribe( result => {
                console.log('ELIMINAR::', result);
                this.dataComponent(this.idCuenta);
                this._fuseProgressBarService.hide();

            });
    }

    estadoIcon(name): any{
        let icon = '';
        console.log('NAME', name);
        if (name === 'ajuste-egreso'){
            icon = 'arrow_circle_up';
        }

        if (name === 'ajuste-ingreso'){
            icon = 'arrow_circle_down';
        }

        if (name === 'ingreso'){
            icon = 'arrow_circle_down';
        }

        if (name === 'RECH'){
            icon = 'cancel';
        }
        console.log('ICON', icon);
        return icon;
    }
    estadoColor(name): any{
        let icon: any = '';

        if (name === 'FINA'){
            icon = '#8BD649';
        }

        if (name === 'APRO'){
            icon = '#FFC107';
        }

        if (name === 'PEND'){
            icon = '#FFC107';
        }

        if (name === 'RECH'){
            icon = '#CB4B16' ;
        }
        return icon;
    }
    _setSearch($event): any{
    console.log('EVENT_FILTRO::', $event);
    if ($event){

        this.daMovimiento = $event;

    }
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


    ngOnInit(): any {

        this._route.paramMap.pipe(
            switchMap((params: ParamMap) =>
                of(params.get('id'))
            )
        ).subscribe((url) => {

            console.log('CUENTA::', url);

            this.idCuenta = url;
            this.dataComponent(url);
            this.dataMovimiento(url);

        });

    }
}
