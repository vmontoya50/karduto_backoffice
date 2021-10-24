import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {catchError, debounceTime, finalize, switchMap, tap} from 'rxjs/operators';
import {of} from 'rxjs';
import {ApiService} from '../../api.service';
import {RutValidator} from 'ng2-rut';
import { DatePipe } from '@angular/common';
import {
    MAT_MOMENT_DATE_FORMATS,
    MomentDateAdapter,
    MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

import clRut from '@validatecl/rut';

@Component({
  selector: 'dialog-postulante-nuevo',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
    providers: [
        // The locale would typically be provided on the root module of your application. We do it at
        // the component level here, due to limitations of our example generation script.
        {provide: MAT_DATE_LOCALE, useValue: 'en-US'},

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

export class DialogPostulanteNuevoComponent implements OnInit {

  // Variables
  public dialogForm: FormGroup;
  public dialogData;
  public fcumple;
  public rest;
  public user;
  public selected = 'CHILENA';
  public selectedReg: string;
  public localComuna = new Array();
  public codigoBanco;


  constructor(
      @Inject(MAT_DIALOG_DATA) private data: any,
      public dialog: MatDialog,
      public matDialogRef: MatDialogRef<DialogPostulanteNuevoComponent>,
      public api: ApiService,
      private _adapter: DateAdapter<any>
  ) {
    // Guardo datos en variable local
    this.dialogData = data;
    console.log('DIALOGDATA::', this.dialogData );
    // Creo Formulario Angular
    this.dialogForm = this.formGroup();
  }

  french() {
        this._adapter.setLocale('en-US');
  }

  public formGroup(): FormGroup {
    return new FormGroup({
      id: new FormControl(this.dialogData.id),
      codigo: new FormControl(this.dialogData.codigo),
      nombres: new FormControl(this.dialogData.nombres),
      apellido_paterno: new FormControl( this.dialogData.apellido_paterno),
      apellido_materno: new FormControl(this.dialogData.apellido_materno),
      rut: new FormControl(this.dialogData.rut),
      email: new FormControl(this.dialogData.email),
      pasaporte: new FormControl(this.dialogData.pasaporte),
      nacionalidad: new FormControl(this.dialogData.nacionalidad),
      celular:  new FormControl(this.dialogData.celular),
      fecha_nacimiento:  new FormControl(this.dialogData.fecha_nacimiento),
      estado_civil:  new FormControl(this.dialogData.estado_civil),
      n_cuenta:  new FormControl(this.dialogData.n_cuenta),
      banco: new FormControl(this.dialogData.banco),
      codigo_banco:  new FormControl(this.dialogData.codigo_banco),
      calle: new FormControl(this.dialogData.calle),
      numero_direccion:  new FormControl(this.dialogData.numero_direccion),
      comuna:  new FormControl(this.dialogData.comuna),
      ciudad:  new FormControl(this.dialogData.ciudad),
      region:  new FormControl(this.dialogData.region),
      contacto:  new FormControl(this.dialogData.contacto),
      salud:  new FormControl(this.dialogData.salud),
      afp:  new FormControl(this.dialogData.afp),
      disponibilidad:  new FormControl(this.dialogData.disponibilidad),
      disponibilidad_turno:  new FormControl(this.dialogData.disponibilidad_turno),
      talla_polera:  new FormControl(this.dialogData.talla_polera),
      talla_pantalon:  new FormControl(this.dialogData.talla_pantalon),
      talla_zapato:  new FormControl(this.dialogData.talla_zapato),
      talla_polar:  new FormControl(this.dialogData.talla_polar),
      telefono:  new FormControl(this.dialogData.telefono),
      whatsapp:  new FormControl(this.dialogData.whatsapp),
      experiencia:  new FormControl(this.dialogData.experiencia),
      observaciones:  new FormControl(this.dialogData.observaciones)
    });
  }


  _setDialog(): any {

    // Datos del formulario
    const form = this.dialogForm.value;
    console.log('FORM::', form);
    this.api.show();

    const validRut = this.checkFormatFilter(form.rut);
    console.log('RUT::', validRut);

    if (!form.rut && !form.pasaporte){

      this.api.toast('open', 'Debe ingresar un rut o pasaporte!', 5000, 'warning');
      return;
    }

    if (form.rut){
          let val = form.rut.replace('.', '');
          // Despejar Guión
          val = val.replace('-', '');

          const isValid =  clRut.validate(val);
          console.log('El valor es ', isValid);
          console.log('Tiene rut. :: ', isValid);
          if (!isValid) {
              console.log('El rut es incorrecto.', validRut);
              this.api.toast('open', 'El rut no es correcto!', 5000, 'warning');
              return;
          }

    }

    // Asigno codifo del banco
    form.codigo_banco = this.codigoBanco;
    // Convierto la fecha de nacimiento
    // form.fecha_nacimiento = this.api.convertDateFormat(form.fecha_nacimiento);
    const cadena = '^(((0[1-9]|[12]\\d|3[01])-(0[13578]|1[02])-((19|[2-9]\\d)\\d{2}))|((0[1-9]|[12]\\d|30)-(0[13456789]|1[012])-((19|[2-9]\\d)\\d{2}))|((0[1-9]|1\\d|2[0-8])-02-((19|[2-9]\\d)\\d{2}))|(29-02-((1[6-9]|[2-9]\\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$';

    if ( !form.fecha_nacimiento.match(cadena) ){
          this.api.toast('open', 'La fecha debe ir en un formato DD-MM-AAAA.', 5000, 'warning');
          return;
    }

    form.fecha_nacimiento  = form.fecha_nacimiento.replace(/\//g, '-');

    this.api.post('postulante', form)
          .pipe( catchError(_ => of(this.api.toast('open', 'No se guardo el cambio!', 5000, 'warning' ))))
          .subscribe( data => {

            this.rest = data;
            console.log('CONSULTA::', this.rest);

            const date: Date = new Date();
            this.api.onPostulanteChanged.next( date );
            this.api.onPostulanteChanged.complete();

            // si es correcto el login
            if ( this.rest.success ){
              this.api.toast('close');
              this.api.toast('open', 'Postulante creado con exito.', 5000, 'success');
              this.dialogData = this.rest.success.data;
              // this.matDialogRef.close();
              this._generateFicha(this.rest.success.data);
            }
            // Si no es correcto el login
            if ( this.rest.error ){
              this.api.toast('close');
              this.api.toast('open', 'No se guardo el cambio!', 5000, 'warning');
            }
            this.api.hide();
    });



  }

  goToLink(url): void{

        window.open( this.api.base + url.ficha, '_blank');

  }

  checkDate(arg): any{
        const dateSendingToServer = new DatePipe('en-US').transform(arg, 'dd/MM/yyyy')
        console.log('DTATRANSF::', dateSendingToServer);
        return dateSendingToServer;
  }

  _generateFicha(rest): any{
    console.log('GENERANDOFICHA', rest);
    this.api.post('postulante/ficha', { id: rest.id, create_by: this.user.id })
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
          this.api.hide();
        });

  }

  checkFormatFilter(rut): any{

      const regexFormatosValidos = (/^[0-9]+-[0-9kK]{1}/);
      return (typeof rut === 'string') && regexFormatosValidos.test(rut);

  }

  rutFormatter(rut): any{


      if (!rut) return '';
      rut = rut.match(/[0-9Kk]+/g).join('');
      console.log('CAMBIO::', rut);
      return rut.slice(0, -1).replace((/[0-9](?=(?:[0-9]{3})+(?![0-9]))/g), '$&.') + '-' + rut.slice(-1).toLowerCase();

  }

  close(): void{
      this.matDialogRef.close();
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

  setBanco(banco): void{
        console.log('BANCO::', banco);
        this.codigoBanco = banco.codigo;
  }



  ngOnInit(): any {
    console.log('Componente corriendi');

    this.api.onUserChanged.subscribe( user => {
          console.log('USERSTORAGE::', user);
          this.user = user;
    });


   /* this.dialogForm
        .get('rut')
        .valueChanges.subscribe(data => {

      let rut = this.rutFormatter(data);

    });*/
  }

}
