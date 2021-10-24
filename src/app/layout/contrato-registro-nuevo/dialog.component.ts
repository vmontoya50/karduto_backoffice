import {Component, OnInit, Inject, ViewEncapsulation} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../../api.service';
import {catchError, debounceTime, finalize, switchMap, tap} from 'rxjs/operators';
import {fuseAnimations} from '../../../@fuse/animations';
import {of} from 'rxjs';
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

interface Food {
  value: string;
  viewValue: string;
}
export interface Empleado {
  id: string;
  nombre: string;
}

interface Contrato {
  id: string;
  name: string;
  create_by: string;
}


@Component({
  selector: 'contrato-registro-nuevo-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations   : fuseAnimations,
  providers: [
    // The locale would typically be provided on the root module of your application. We do it at
    // the component level here, due to limitations of our example generation script.
    {provide: MAT_DATE_LOCALE, useValue: 'es-Es'},

    // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
    // `MatMomentDateModule` in your applications root module. We provide it at the component level
    // here, due to limitations of our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ],
})

export class ContratoRegistroNuevoDialogComponent implements OnInit {

  // Variables
  public dialogForm: FormGroup;
  public dialogData;
  public dataContrato;
  public dataTurnos;
  public listCliente;
  public clientes = new Array();
  public filteredOptions;
  public filterdate = new Array();
  public filter;
  public clase;
  public user: Contrato;
  public displayFn;
  public loading = false;
  public copy;
  public selectOp;
  public jlock = false;
  public jlocks = false;
  public plock = true;
  myControl = new FormControl();
  options: string[] = [];
  public cliente_id;

  
  constructor(
      @Inject(MAT_DIALOG_DATA) private data: any,
      public dialog: MatDialog,
      public matDialogRef: MatDialogRef<ContratoRegistroNuevoDialogComponent>,
      private api: ApiService,
      private _adapter: DateAdapter<any>
  ) {
    console.log('DATA::', data);
    // Guardo datos en variable local
    this.dialogData = data;
    // Guardo la busqueda

    this.filter = data.filter;
    this.clase = data.CLA;

  }

  french(): void {
    this._adapter.setLocale('fr');
  }

  public formGroup(): FormGroup {

    return new FormGroup({
      id: new FormControl('', []),
      empleado_id: new FormControl('', [Validators.required]),
      fecha_fin: new FormControl('', [Validators.required]),
      fecha_inicio: new FormControl('', [Validators.required]),
      turno: new FormControl('', [Validators.required]),
      cargo: new FormControl('', [Validators.required]),
      cliente: new FormControl('', [Validators.required]),
      jornada: new FormControl('7.5', [Validators.required]),
      primera_vez: new FormControl(false, [Validators.required]),
      jornada_semana: new FormControl('45', [Validators.required]),
      faja_lumbar: new FormControl(false, [Validators.required]),
      guantes: new FormControl(false, [Validators.required]),
      gafas: new FormControl(false, [Validators.required]),
      gorro_explorador: new FormControl(false, [Validators.required]),
      chaleco_reflectante: new FormControl(false, [Validators.required]),
      cuerda_carros: new FormControl(false, [Validators.required]),
      bloqueador_solar: new FormControl(false, [Validators.required]),
      cliente_id: new FormControl(false, [Validators.required])
    });

  }

  convertDateFormat(str): any{
    console.log('DateFormat::', str);
    console.log(str._i);

    return str._i.year + '/' + (str._i.month + 1) + '/' + str._i.date;

  }

  _setDialog(): void{

    const form = this.dialogForm.value;
    console.log('FORM::', form);
    this.api.show();
    form.create_by = this.user.id;
    // form.fecha_inicio_des = this.pipe.transform('EEEE', 'fullDate');
    form.fecha_inicio = this.convertDateFormat(form.fecha_inicio);
    form.fecha_fin = this.convertDateFormat(form.fecha_fin);
    form.cliente_id = this.cliente_id;
    this.loading = true;
    this.api.post('regcontrato', form)
        .pipe( catchError(val => of( this.api.toast('open', val.error.message, 3000, 'warning'))))
        .subscribe( data => {

          console.log('CONSULTA::', data);
          this.matDialogRef.close(data);
          this.api.hide();
          this.loading = false;

        });



  }

  // Buscar contratos
  dataTable(): void{

    this.api.show();
    this.api.get('archivolist')
        .subscribe( data => {

          this.dataContrato = data;
          console.log('CONTRATOS::', this.dataContrato );
          this.api.hide();

        });


    /*this.api.get('contrato')
        .subscribe( data => {

          this.dataContrato = data;
          console.log('CONTRATOS::', this.dataContrato );
          this.api.hide();

        });*/
  }

  // Buscar contratos
  dataTurno(option): void{

    this.selectOp = option.id;
    this.copyText(option.id);

    console.log('TURNOS_OPTS::', option );
    this.api.show();
    // this.api.get('turno/search/afp/' + option.afp)
    this.api.get('cargos')
        .subscribe( data => {

          this.dataTurnos = data;
          console.log('TURNOS::', this.dataTurnos );
          this.api.hide();

        });
  }

  // Buscar contratos
  insertClienteId(option): void{
    console.log("CLIENTE_ID::", option);
    this.cliente_id = option;
  }

  // Buscar Clientes
  dataCliente(): void{
    this.api.get('cliente')
        .subscribe( data => {

          this.listCliente = data;
          console.log('CLIENTES::', this.listCliente );
          this.api.hide();

        });
  }

  _displayFn(user: Empleado): string {
    if (user) {
      return user.nombre;
    }
  }

  copyText(val: string): any{

    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this.copy = true;
    setTimeout(()=> {
      this.copy = false;
    }, 2000);

    this.api.toast('open', 'Empleado copiado en el porta papeles.', 2000, 'success');

  }

  ngOnInit(): any {

    // Creo Formulario Angular
    this.dialogForm = this.formGroup();
    this.dataCliente();
    this.clientes = this.listCliente;
    this.dialogForm
        .get('empleado_id')
        .valueChanges.pipe(
            debounceTime(300),
            tap(() => this.api.show()),
            switchMap(value =>
                (typeof value === 'string' || value instanceof String) ?  this.api.get('empleado/search/nombres/' + value)
                    .pipe(finalize(() => this.api.hide())) : []
            )
        ).subscribe(data => {

          this.filteredOptions  = data;
          console.log('AUTOFILTER::', this.filteredOptions);
          this.options = this.filteredOptions;

        });

    this.dialogForm
        .get('cliente')
        .valueChanges.subscribe(data => {

          console.log('CLIENTELETRA:', data);
          this.clientes = [];
          let base = data.toString();
          base = base.toUpperCase();

          for (const comu of this.listCliente) {
            let cc = ' ' + comu.codigo + ' ' + comu.descripcion + ' ';

            // console.log('SEH', cc + ' ' + cc.search(base));
            if ( cc.toUpperCase().search(base) >= 0) {
              this.clientes.push(comu);
              this.cliente_id = comu.id;
            }
          }

          if (base === ''){
            this.clientes = this.listCliente;
          }

          console.log('CLIENTEPUSH:', this.clientes);
         

    });


    this.api.onUserChanged.subscribe( user => {
      console.log('USERSTORAGE::', user);
      this.user = user;

    });

    this.dataTable();


  }

}
