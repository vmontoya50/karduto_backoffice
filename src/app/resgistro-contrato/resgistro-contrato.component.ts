import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FuseSidebarService} from '../../@fuse/components/sidebar/sidebar.service';
import {FuseProgressBarService} from '../../@fuse/components/progress-bar/progress-bar.service';
import {FuseConfigService} from '../../@fuse/services/config.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material';
import {ApiService} from '../api.service';
import {Router} from '@angular/router';
import {fuseAnimations} from '../../@fuse/animations';
import Swal from 'sweetalert2'

interface Food {
    value: string;
    viewValue: string;
}

@Component({
  selector: 'app-resgistro-contrato',
  templateUrl: './resgistro-contrato.component.html',
  styleUrls: ['./resgistro-contrato.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class ResgistroContratoComponent implements OnInit {

  constructor(
      private _fuseSidebarService: FuseSidebarService,
      private _fuseProgressBarService: FuseProgressBarService,
      private _fuseConfigService: FuseConfigService,
      private _formBuilder: FormBuilder,
      private _matDialog: MatDialog,
      private api: ApiService,
      private router: Router
  ) {
      this.dialogForm = this.formGroup();
  }

  displayedColumns: string[] =
      [
        'id',
        'name',
        'created_at',
        'accion'
      ];

  public dialogForm: FormGroup;
  public listCliente;
  public cliente;
  dataSource;
  dataEmpleado = new Array();
  dataCont;
  fechaInicio;
  fechaFin;

    displayFilter: Food[] = [
        {value: 'id', viewValue: 'id'},
        {value: 'name', viewValue: 'nombre'},
        {value: 'created_at', viewValue: 'Fecha creación'}
    ];

  // Metodos publicos
    public formGroup(): FormGroup {

        return new FormGroup({
            fecha_fin: new FormControl('', [Validators.required]),
            fecha_inicio: new FormControl('', [Validators.required]),
            cliente: new FormControl('', [Validators.required]),
        });

    }

  dataTable(): void{

    this._fuseProgressBarService.show();
    this.api.get('regcontrato')
        .subscribe( data => {

          // console.log('CONSULTA::', data);
          this.dataSource = data;

          this.dataEmpleado = this.dataSource.data;
          // console.log('REGCONTRATO::', this.dataEmpleado );
          this._fuseProgressBarService.hide();

        });
  }

  next($event): void{

        this._fuseProgressBarService.show();
        const page  = $event.pageIndex + 1;
        this.api.get('regcontrato?page=' + page)
            .subscribe( data => {

                // console.log('CONSULTA::', data);
                this.dataSource = data;

                this.dataEmpleado = this.dataSource.data;
                // console.log('REGCONTRATO::', this.dataEmpleado );
                this._fuseProgressBarService.hide();

            });

        console.log('NEXT', $event);
   }

  goToLink(url): void{

        window.open( this.api.base + url.archive, '_blank');
  }


  sinCeros(vari): any{
        let num;

        if (vari < 10) {
            num = '0' + vari;
        } else{
            num = vari;
        }
        return num;
  }

  gatUrlZip(){

    const form = this.dialogForm.value;
    console.log('form', form);
    console.log('form Moment', form.fecha_fin.Moment);
    console.log('form Moment inicio', form.fecha_inicio.Moment);
    console.log('form i', form.fecha_fin._i);

    const fechaI = form.fecha_inicio._i.year + '-' + this.sinCeros((form.fecha_inicio._i.month + 1 )) + '-' + this.sinCeros(form.fecha_inicio._i.date);
    const fechaF = form.fecha_fin._i.year + '-' + this.sinCeros((form.fecha_fin._i.month + 1 )) + '-' + this.sinCeros(form.fecha_fin._i.date);

    this.fechaInicio = fechaI;
    this.fechaFin = fechaF;
    this.cliente = form.cliente;

    console.log('CONSOLEZIPP');
    //{{url_api}}/api/firma/getContratosZip?cliente_id=411&fecha_inicio=2021-08-29&fecha_fin=2021-09-30
    //https://api.gruponewen.cl/api/firma/getContratosZip?cliente_id=411&fecha_inicio=2021-08-29&fecha_fin=2021-09-30
    //https://api.gruponewen.cl/api/firma/getContratosZip?cliente_id=457&fecha_inicio=2021-09-14&fecha_fin=2021-09-16
    console.log('firma/getContratosZip?cliente_id='+this.cliente+'&fecha_inicio='+this.fechaInicio+'&fecha_fin='+this.fechaFin);
    //return 'firma/getContratosZip?cliente_id=411&fecha_inicio=2021-08-29&fecha_fin=2021-09-30';
    return 'firma/getContratosZip?cliente_id='+this.cliente+'&fecha_inicio='+this.fechaInicio+'&fecha_fin='+this.fechaFin;
  }

  goFileContrato(): void{
        console.log('XXX');
        const form = this.dialogForm.value;
        console.log('form', form);
        console.log('form Moment', form.fecha_fin.Moment);
        console.log('form Moment inicio', form.fecha_inicio.Moment);
        console.log('form i', form.fecha_fin._i);

        const fechaI = form.fecha_inicio._i.year + '-' + this.sinCeros((form.fecha_inicio._i.month + 1 )) + '-' + this.sinCeros(form.fecha_inicio._i.date);
        const fechaF = form.fecha_fin._i.year + '-' + this.sinCeros((form.fecha_fin._i.month + 1 )) + '-' + this.sinCeros(form.fecha_fin._i.date);

        this.fechaInicio = fechaI;
        this.fechaFin = fechaF;
        this.cliente = form.cliente;
        this.gatUrlZip();
        // console.log('form', fechaF);
        console.log(this.api.url + 'nomina/export?desde=' + fechaI + '&hasta=' + fechaF);
        // window.open( this.api.url + 'nomina/export?desde=2019-01-01&hasta=' + fechaF, '_blank');
        window.open( this.api.url + 'nomina/export?desde=' + fechaI + '&hasta=' + fechaF, '_blank');
  }

  // Nuevo empleado
  go(row): any{
    this.router.navigate(['contrato/nuevo/' + row.id]);
  }

  goFile(id): any{

      this.api.get('regfiniquito/bycontrato/' + id)
          .subscribe( data => {

              // console.log('CONSULTA::', data);
              this.dataCont = data;
              console.log('CONT', this.dataCont);
              window.open( this.api.base + this.dataCont.archive, '_blank');

          });

  }

  comparar(a, b) {
    return a - b;
  }  
  // Buscar Clientes
  dataCliente(): void{

    this.api.get('cliente')
        .subscribe( data => {

          this.listCliente = data.sort(this.comparar);
          console.log('CLIENTES::', this.listCliente );
          this.api.hide();

        });
  }


   _firmar(_id): void{
    this._fuseProgressBarService.show();
   
        this.api.post('firma' , { id: _id })
            .subscribe( 
              data => {
                this._fuseProgressBarService.hide();
                console.log('FIRMAR::', data);
                Swal.fire('Firma generada');
                // this.dataTable();
            },
            error => {
              this._fuseProgressBarService.hide();
              console.log(error);
              Swal.fire('Error', error.message, 'error');
            }
            );
   }

  _setSearch($event): any{
    // console.log('EVENT_FILTRO::', $event);
    if ($event){

      this.dataEmpleado = $event;

    }
  }

  ngOnInit() {
    // Consulto los datos de la tabla
    this.dataTable();
    this.dataCliente();

  }
}
