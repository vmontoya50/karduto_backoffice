import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../../api.service';
import {catchError} from 'rxjs/operators';
import {of} from 'rxjs';
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

export class DialogPostulanteComponent implements OnInit {

  // Variables
  public dialogData;
  public dialogTitulo;
  public rest;
  public user;

  constructor(
      @Inject(MAT_DIALOG_DATA) private data: any,
      public dialog: MatDialog,
      public matDialogRef: MatDialogRef<DialogPostulanteComponent>,
      public api: ApiService,
      private _adapter: DateAdapter<any>
  ) {
    // Guardo datos en variable local
    this.dialogData = data.data;
    this.dialogTitulo = data.titulo;
    console.log('DIALOGDATA::', this.dialogData );
  }

  _setCopy(): void{
    this.api.put('postulante/copy/' + this.dialogData.id, '' )
        .pipe( catchError(_ => of(this.api.toast('open', 'No se guardo el cambio!' ))))
        .subscribe( data => {

          this.rest = data;
          console.log('CONSULTA::', this.rest);

          // si es correcto
          if ( this.rest.success ){
            this.api.toast('close');
            this.api.toast('open', 'El Postulante ' + this.dialogData.nombres + ' ahora es un empelado.', 5000, 'success');
            this.matDialogRef.close();
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
                this.api.hide();
            });

    }

    goToLink(url): void{

        window.open( this.api.base + url.ficha, '_blank');

    }


  ngOnInit() {
    console.log('Componente corriendi');

    this.api.onUserChanged.subscribe( user => {
          console.log('USERSTORAGE::', user);
          this.user = user;
    });
  }

}
