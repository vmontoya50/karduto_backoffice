import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FuseSidebarService} from '../../@fuse/components/sidebar/sidebar.service';
import {FuseProgressBarService} from '../../@fuse/components/progress-bar/progress-bar.service';
import {FuseConfigService} from '../../@fuse/services/config.service';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {MatDialog} from '@angular/material';
import {ApiService} from '../api.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {switchMap, takeUntil} from 'rxjs/operators';
import {of} from 'rxjs';
import {fuseAnimations} from '../../@fuse/animations';
import {HttpClient} from '@angular/common/http';
import {ContactsContactFormDialogComponent} from '../usuarios/contact-form/contact-form.component';
import {UsuariosService} from '../usuarios/usuarios.service';
import Swal from 'sweetalert2'

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
    showExtraToFields: boolean;
    composeForm: FormGroup;
    public dataMoneda;
    public user;
    public cuentas;
    public monto;
    public tasa;
    public iden;
    public cliente;
    public receptor;
    public cuentareceptor;
    public operadoresActvos;
    public dialogRef: any;
    public _id_receptor;
    public id_cuenta_re;
    public ReceptorSelected;
    public archivo;
    public files;
    public filesEvenb;
    public asignado;
    public cEntrante;
    public cuentaRece;
    public tasaLock = false;
    public tasaGuard;
    public valiRef;
    public loading = false;

    name = 'Angular';

    file;
    imageChangedEvent: any = '';
    croppedImage: any = '';





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
        private router: Router,
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

    dataComponent(id): any{

        this._fuseProgressBarService.show();
        this.api.get('cuentas/ver/' + id)
            .subscribe( result => {

                console.log('CONSULTA::', result);
                this.dataCuenta = result;

                this._fuseProgressBarService.hide();

            });
    }

    createComposeForm(): FormGroup
    {
        return new FormGroup({
            tipo_identificacion_emisor: new FormControl(''),
            identificacion_emisor: new FormControl(''),
            moneda_entrate: new FormControl(''),
            id_cuenta_entrante: new FormControl(''),
            id_asignado: new FormControl(''),
            id_receptor: new FormControl(''),
            id_cuenta_receptor: new FormControl(''),
            tasa: new FormControl(''),
            monto_entrante: new FormControl(''),
            moneda_saliente: new FormControl(''),
            referencia_entrante: new FormControl(''),
        });
    }

    _dataMoneda(): void{

        this.api.show();
        this.dataMoneda = null;

        this.api.get('monedas')
            .subscribe( result => {
                this.dataMoneda = result.data;
                console.log('MONEDAS::', this.dataMoneda );
                this.api.hide();
            });
    }

    _dataCuentas(moneda): void{
        console.log('MONEDA', moneda);
        this.api.show();
        const form = this.composeForm.value;
        console.log('MONEDAFORM', form);
        this._dataOperdaor(moneda);

        this.api.get('cuentas/cuentaPorMoneda?moneda=' + form.moneda_entrate + '&accion=1')
            .subscribe( result => {
                this.cuentas = result;
                console.log('CUENTAS::', this.cuentas );

                this._dataTasa(form.moneda_entrate);
                this.api.hide();
            });
    }

    _dataCliente(): void{

        this.api.show();
        const form = this.composeForm.value;
        this.receptor = null;

        this.api.get('usrxiden?tipo_identificacion=' + form.tipo_identificacion_emisor
                        + '&identificacion=' + form.identificacion_emisor)
            .subscribe( result => {
                this.api.hide();
                this.cliente = result;
                console.log('CLIENTE::', this.cliente );
                if (!this.cliente ){
                    this.api.toast('open', 'No existe cliente con esos datos!', 5000, 'warning');
                }

                this._dataReceptor();


            },
                err => console.error('Observer got an error: ' + err));
    }

    _deleteReceptor(receptor): void{

        this.api.show();
        console.log('RECEPTORDELETE::', receptor );
        this.api.delete('receptor/' + receptor.id)
            .subscribe( result => {
                this.api.hide();
                console.log('RECEPTORDELETE::', result );
                this._dataReceptor();

            },
                err => console.error('Observer got an error: ' + err));
    }

    _deleteCuentaReceptor(receptor): void{

        this.api.show();
        console.log('RECEPTORDELETE::', receptor );
        this.api.delete('cuentareceptor/' + receptor.id)
            .subscribe( result => {
                this.api.hide();
                console.log('RECEPTORDELETE::', result );
                this._dataCuentaReceptor(this._id_receptor);

            },
                err => console.error('Observer got an error: ' + err));
    }

    _dataReceptor(): void{

        this.api.show();
        this.api.get('ver_receptor?id=' +  this.cliente.id)
            .subscribe( result => {
                this.receptor = result.data;
                console.log('RECEPTOR::', this.receptor );

                this.api.hide();
            });
    }

    _dataCuentaReceptor(id): void{

        this.api.show();

        const form = this.composeForm.value;
        console.log('MONEDAFORM', form);

        this.api.get('creceptorxmoneda?id=' +  id + '&moneda=' + form.moneda_saliente)
            .subscribe( result => {
                this.cuentareceptor = result;
                console.log('RECEPTORCUENTA::', this.cuentareceptor );
                this.api.hide();
            });
    }

    _dataTasa(moneda): void{

        this.api.show();

        const form = this.composeForm.value;
        console.log('FORTASA::', form);
        this.api.get('tasa/ver?de=' + form.moneda_entrate + '&para=' +  form.moneda_saliente)
            .subscribe( result => {
                this.tasa = result;
                console.log('Tasa::', this.cuentas );
                this.tasa = parseFloat(result.monto);
                this.tasaGuard = parseFloat(result.monto);
                this.api.hide();
            });
    }

    goToLink(url): void{
        window.open( url, '_blank');
    }

    _dataOperdaor(monedaId): void{

        this.api.show();
        // cuentasactivas/pais/venezuela
        this.api.get('cuentasactivas/pais/' + monedaId)
            .subscribe( result => {
                this.operadoresActvos = result;
                console.log('Tasa::', this.operadoresActvos );
                this.api.hide();
            });
    }

    _asignarCuentaReceptor(id): void{

        this.id_cuenta_re = id;

    }

    go(): any{
        this.router.navigate(['mail/inbox']);
    }

    saveFile(event): any{
        console.log('FILE::', event);
        this.files = event;
        this.filesEvenb = event.srcElement.value;

    }

    reloadComponent(): void{
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['/nueva']);
    }
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
                console.log('got r', r);
                this.api.toast('open', 'Cargo con exito.');
                const mensaje = r;
                this.archivo = r;

            }
        );

    }

    delay(ms: number): any{
        return new Promise( resolve => setTimeout(resolve, ms) );
    }

    _setReceptorVar(arg): any{
        this.ReceptorSelected = arg;
        console.log('ReceptorSelected::', this.ReceptorSelected);
    }
    _setAsignadoVar(arg): any{
        this.asignado = arg;
        console.log('AsignadoSelected::', this.asignado);
    }
    _setCuentaRecepVar(arg): any{
        this.cuentaRece = arg;
        console.log('CuentaRecepSelected::', this.cuentaRece);
    }
    _setCentranteVar(arg): any{
        this.cEntrante = arg;
        console.log('CEntranteSelected::', this.cEntrante);
    }
    _validaReferencia(referencia): void{

        console.log('EVENT::', referencia);
        const montot = parseFloat(this.monto) * parseFloat(this.tasa);
        this.api.get('transacciones/mash?monto=' + this.monto + '&referencia=' + referencia).subscribe(
            (r) => {

                console.log('got r', r);
                this.valiRef = r;
                if (this.valiRef.lenght > 0){
                    this.api.toast('open', 'Esta referencia ya fue usada.', 5000, 'warning');

                }

                this.archivo = r;

            }
        );

    }

    _setDialog(): void{
        const form = this.composeForm.value;
        this.loading = true;
        console.log('FORM::', form);
        form.tasa = this.tasa;
        form.id_asignador = this.user.id;
        form.owner = this.user.id;
        if (this.tasaGuard !== this.tasa){
            form.estado = 'APRO';
        }else{
            form.estado = 'PEND';
        }
        form.identificacion_receptor =  this.ReceptorSelected.identificacion;
        form.tipo_identificacion_receptor =  this.ReceptorSelected.tipo_identificacion;
        form.id_cuenta_saliente =  this.asignado.id;
        form.cuenta_saliente =  this.asignado.nom_banco;
        form.cuenta_entrante =  this.cEntrante.banco + ' - ' + this.cEntrante.numero;
        form.id_emisor =  this.cliente.id;
        form.monto_saliente =  (this.monto * this.tasa);
        form.numero_cuenta_receptor =  this.cuentaRece.numero;
        form.id_cuenta_receptor =  this.cuentaRece.id;
        form.email_receptor =  this.ReceptorSelected.email;
        form.nombre_receptor =  this.ReceptorSelected.nombre + ' ' + this.ReceptorSelected.apellido;
        form.banco_receptor = this.cuentaRece.nombre;
        // form.moneda_saliente =  1;
        form.dispositivo =  'webmanual';

        if (this.files) {
            console.log('Si tiene archivo');
            this._setFile(this.files);

            setTimeout( () => {

                form.archivo_entrante =  this.archivo.data;
                this.api.post('transacciones', form)
                    .subscribe( data => {
                        console.log('CONSULTA::', data);
                        this.api.hide();
                        this.loading = false;
                        this.reloadComponent();
                    });
            }, 4000 );



        }else{
            this.api.post('transacciones', form)
                .subscribe( data => {
                    console.log('CONSULTA::', data);
                    this.api.hide();
                    this.loading = false;
                    this.reloadComponent();
                    if ( data.error ){
                        this.api.toast('close');
                        this.api.toast('open', 'Usuario o clave incorrecto!', 5000, 'warning');
                    }
                    
                }, 
                err => {
                    /// here the function that you want you can check the status of the 
                    ///error
                    if(err.status == 401) {
                        
                        this.api.hide();
                        this.loading = false;
                        Swal.fire('La cuenta del operador de destino no tiene saldo!');
                        console.log("_AA__", err);
                      /// you can check for any status like 404 not found 
                    } 
                });
                
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


    ngOnInit(): any {
       // Swal.fire('Hello world!');
        this._dataMoneda();
        // this._dataOperdaor();
        this.composeForm.get('id_receptor').valueChanges
            .subscribe((value) => {

                console.log('ReceptorChange', value);
                this._id_receptor = value;
                this._dataCuentaReceptor(value);
        });

        this.api.onUserChanged.subscribe( user => {
            console.log('USERSTORAGE::', user);
            this.user = user;
        });
    }


}
