import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {catchError} from 'rxjs/operators';
import {of} from 'rxjs';
import {ApiService} from '../../api.service';
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

@Component({
  selector: 'dialog-postulante',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
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

export class DialogPostulanteEditComponent implements OnInit {

  // Variables
  public dialogForm: FormGroup;
  public dialogData;
  public dialogTitulo;
  public rest;
  public user;
  public selected = 'CHILENA';
  public selectedReg: string;
  public localComuna = new Array();
  public codigoBanco;


  constructor(
      @Inject(MAT_DIALOG_DATA) private data: any,
      public dialog: MatDialog,
      public matDialogRef: MatDialogRef<DialogPostulanteEditComponent>,
      public api: ApiService,
  ) {
    console.log('DATABSE::', data);

    // Guardo datos en variable local
    this.dialogData = data.data;
    console.log('DIALOGDATA::', this.dialogData );
    this.dialogTitulo = data.titulo;
    // Creo Formulario Angular
    this.dialogForm = this.formGroup();
  }

  public formGroup(): FormGroup {
    return new FormGroup({
      id: new FormControl(this.dialogData.id, [Validators.required]),
      codigo: new FormControl(this.dialogData.codigo),
      nombres: new FormControl(this.dialogData.nombres, [Validators.required]),
      apellido_paterno: new FormControl(this.dialogData.apellido_paterno, [Validators.required]),
      apellido_materno: new FormControl(this.dialogData.apellido_materno, [Validators.required]),
      rut: new FormControl(this.dialogData.rut),
      email: new FormControl(this.dialogData.email),
      pasaporte: new FormControl(this.dialogData.pasaporte),
      nacionalidad: new FormControl(this.dialogData.nacionalidad),
      celular:  new FormControl(this.dialogData.celular),
      fecha_nacimiento:  new FormControl(this.dialogData.fecha_nacimiento),
      estado_civil:  new FormControl(this.dialogData.estado_civil),
      n_cuenta:  new FormControl(this.dialogData.n_cuenta),
      banco: new FormControl(this.dialogData.banco),
      calle: new FormControl(this.dialogData.calle),
      numero_direccion:  new FormControl(this.dialogData.numero_direccion),
      comuna:  new FormControl(this.dialogData.comuna),
      ciudad:  new FormControl(this.dialogData.ciudad),
      region:  new FormControl(this.dialogData.region),
      salud:  new FormControl(this.dialogData.salud),
      afp:  new FormControl(this.dialogData.afp),
      codigo_banco:  new FormControl(this.dialogData.codigo_banco),
      observaciones:  new FormControl(this.dialogData.observaciones),
      disponibilidad:  new FormControl(this.dialogData.disponibilidad),
      disponibilidad_turno:  new FormControl(this.dialogData.disponibilidad_turno),
      experiencia:  new FormControl(this.dialogData.experiencia),
      talla_polera:  new FormControl(this.dialogData.talla_polera),
      talla_pantalon:  new FormControl(this.dialogData.talla_pantalon),
      talla_zapato:  new FormControl(this.dialogData.talla_zapato),
      talla_polar:  new FormControl(this.dialogData.talla_polar),
      fecha_poatulacion:  new FormControl(this.dialogData.fecha_poatulacion),
      telefono:  new FormControl(this.dialogData.telefono),
      identidad:  new FormControl(this.dialogData.identidad),
      tienda:  new FormControl(this.dialogData.tienda),
      turno:  new FormControl(this.dialogData.turno),
      whatsapp:  new FormControl(this.dialogData.whatsapp),
      activo:  new FormControl(this.dialogData.activo)
    });
  }


  _setDialog(): any {

    // Datos del formulario
    const form = this.dialogForm.value;

    this.api.onPostulanteChanged.next( true );
    this.api.onPostulanteChanged.complete();
    console.log('FORM::', form);
    this.api.show();

    let quien = 'postulante/';
    let msj = 'Postulante actualizado con exito.';


    if (this.dialogTitulo === 'Empleado'){
       quien = 'empleado/';
       msj = 'Empleado actualizado con exito.';
    }

    if (this.dialogTitulo === 'Postulante'){
       quien = 'postulante/';
    }

    this.api.put(quien + form.id, form)
        .pipe( catchError(_ => of(this.api.toast('open', 'No se guardo el cambio!' ))))
        .subscribe( data => {

          this.rest = data;
          console.log('CONSULTA::', this.rest);

          const date: Date = new Date();
          this.api.onPostulanteChanged.next( date );
          this.api.onPostulanteChanged.complete();

          // si es correcto
          if ( this.rest.success ){
            this.api.toast('close');
            this.api.toast('open', msj, 5000, 'success');

          }
          // Si no es correcto el login
          if ( this.rest.error ){
            this.api.toast('close');
            this.api.toast('open', 'No se guardo el cambio!', 5000, 'warning');
          }

          this.api.hide();
        });
  }

  _generateFicha(): any{
    // Activo barra de cargando
    this.api.show();

    // Agrego el id del postulante | Agrego el id del usuario que genera la ficha
    this.api.post('postulante/ficha', { id: this.dialogData.id, create_by: this.user.id })
        .pipe( catchError(_ => of(this.api.toast('open', 'Error al generar la ficha!', 5000, 'warning' ))))
        .subscribe( data => {

          this.rest = data;
          console.log('GENERATE_FICHA::', this.rest);

          // si es correcto el login
          if ( this.rest.success ){
            this.api.toast('close');
            this.api.toast('open', 'Ficha creado con exito, ahora puede imprimirla.', 5000, 'success');
            this.dialogData = this.rest.success.data;

          }
          // desactivo barra de cargando
          this.api.hide();
        });

  }

  goToLink(url): void{

    window.open( this.api.base + url.ficha, '_blank');

  }

  setComuna(Reg): void{
    this.localComuna = [];
    for (let comu of this.api.displayComuna){
      if ( comu.region === Reg){
        this.localComuna.push(comu);
      }
    }
    console.log('COMUNASRESGITRADAS::', this.localComuna);

  }

  ngOnInit(): any {
    console.log('Componente corriendi');
    this.selectedReg = this.dialogData.region;
    this.setComuna(this.dialogData.region);

    this.api.onUserChanged.subscribe( user => {
      console.log('USERSTORAGE::', user);
      this.user = user;
    });

  }

}
