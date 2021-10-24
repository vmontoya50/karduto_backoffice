import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FuseSidebarService} from '../../@fuse/components/sidebar/sidebar.service';
import {FuseProgressBarService} from '../../@fuse/components/progress-bar/progress-bar.service';
import {FuseConfigService} from '../../@fuse/services/config.service';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {MatDialog} from '@angular/material';
import {ApiService} from '../api.service';
import {Router} from '@angular/router';
import {debounceTime, finalize, switchMap, tap} from 'rxjs/operators';
import {fuseAnimations} from '../../@fuse/animations';

interface Food {
    value: string;
    viewValue: string;
}

@Component({
  selector: 'app-agregar-moneda-component',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class TasaComponent implements OnInit {


    dataSource;
    dataMonedas = new Array();
    public dataMoneda;
    public dataTasas;
    public lineas;
    public monedaEntranteVar;
    public monedaSalienteVar;
    public composeForm: FormGroup;
    public showExtraToFields: boolean;
    public showsTasa: boolean;


  constructor(
      private _fuseSidebarService: FuseSidebarService,
      private _fuseProgressBarService: FuseProgressBarService,
      private _fuseConfigService: FuseConfigService,
      private _formBuilder: FormBuilder,
      private _matDialog: MatDialog,
      public api: ApiService,
      private router: Router
  ) {
      // Set the defaults
      this.composeForm = this.createComposeForm();
      this.showExtraToFields = false;
  }

  displayedColumns: string[] =
      [
        'create_at',
        'monto',
        'accion'
      ];



    displayFilter: Food[] = [
        {value: 'id', viewValue: 'id'},
        {value: 'nombre', viewValue: 'nombre'},
        {value: 'created_at', viewValue: 'Fecha creación'}
    ];

  // Metodos publicos

  dataTable(): void{

    this._fuseProgressBarService.show();
    this.api.get('monedas')
        .subscribe( data => {

          console.log('CONSULTA::', data);
          this.dataSource = data;

          this.dataMonedas = this.dataSource.data;
          console.log('REGCONTRATO::', this.dataMonedas );
          this._fuseProgressBarService.hide();

        });
  }

  // Eliminar
  delete(dato): void{
    console.log('DELETEDATO::', dato);

    this._fuseProgressBarService.show();
    this.api.delete('tasa/' + dato.id)
        .subscribe( data => {

          console.log('DELETE::', data);

          this._dataTasa();

        });
  }

  createComposeForm(): FormGroup{
        return new FormGroup({
            moneda_entrate: new FormControl(''),
            moneda_salida: new FormControl(''),
        });
  }

  next($event): void{

    this._fuseProgressBarService.show();
    this.api.get('monedas?page=' + $event.pageIndex)
        .subscribe( data => {

          console.log('CONSULTA::', data);
          this.dataSource = data;

          this.dataMonedas = this.dataSource.data;
          console.log('REGCONTRATO::', this.dataMonedas );
          this._fuseProgressBarService.hide();

        });

    console.log('NEXT', $event);
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

  _dataTasa(): void{

        this.api.show();
        this.dataTasas = null;
        console.log('Tasas::', this.monedaEntranteVar + ' ' + this.monedaSalienteVar);
        this.api.get('tasa/lista/' + this.monedaEntranteVar + '/' + this.monedaSalienteVar)
            .subscribe( result => {
                this.dataSource = result;
                this.dataTasas = result.data;
                this._registrarEstado();
                console.log('Tasas::', this.dataTasas );
                this.api.hide();
        });
  }

  _registrarEstado(): void{

          this.api.get('tasa/ver?de=' + this.monedaEntranteVar + '&para='  + this.monedaSalienteVar)
              .subscribe( result => {
                  this.showsTasa = result.estado;
                  console.log('TasasEstadoVer::', this.showsTasa );
                  this.api.hide();
           });
  }

    estadoColor(name): any{
        let icon: any = '';

        if (name === 0){
            icon = '#3FA644';
        }

        if (name === 1){
            icon = '#CB4B16' ;
        }
        return icon;
    }

  goToLink(url): void{
        window.open( this.api.base + url.archive, '_blank');
  }

  _setMonedaEntrante(arg): any{
        this.monedaEntranteVar = arg;
        console.log('monedaEntranteVar::', this.monedaEntranteVar);
  }

  _setMonedaSaliente(arg): any{
        this.monedaSalienteVar = arg;
        console.log('monedaSalienteVar::', this.monedaSalienteVar);
  }

  // Nuevo empleado
  go(row): any{
    this.router.navigate(['contrato/nuevo/' + row.id]);
  }

  _setSearch($event): any{
    console.log('EVENT_FILTRO::', $event);
    if ($event){

      this.dataMonedas = $event;

    }
  }

  _tasaEstado(): void{
      this.api.show();
      let est = null;
      if ( this.showsTasa ) {
          est = 0;
      }else{
          est = 1;
      }
      this.api.post('tasa/estado', {de: this.monedaEntranteVar, para: this.monedaSalienteVar, estado: est})
          .subscribe( result => {
              console.log('TasasEstado::', result );
              this.showsTasa = result.estado;
              this.api.hide();
          });
  }

  ngOnInit() {
    // Consulto los datos de la tabla
    this.dataTable();
    this._dataMoneda();

  }
}
