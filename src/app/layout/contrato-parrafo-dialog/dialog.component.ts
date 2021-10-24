import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {catchError} from 'rxjs/operators';
import {of} from 'rxjs';
import {ApiService} from '../../api.service';
import {FuseSidebarService} from '../../../@fuse/components/sidebar/sidebar.service';
import {FuseProgressBarService} from '../../../@fuse/components/progress-bar/progress-bar.service';
import {FuseConfigService} from '../../../@fuse/services/config.service';

@Component({
  selector: 'dialog-contrato-parrafo',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})

export class DialogContratoParrafoComponent implements OnInit {

  // Variables
  public dialogForm: FormGroup;
  public dialogPos: FormGroup;
  public dialogData;
  public rest;
  public contenido;
  public dataSource;
  public posicion;


    constructor(
      @Inject(MAT_DIALOG_DATA) private data: any,
      public dialog: MatDialog,
      public matDialogRef: MatDialogRef<DialogContratoParrafoComponent>,
      private api: ApiService,
      private _fuseSidebarService: FuseSidebarService,
      private _fuseProgressBarService: FuseProgressBarService,
      private _fuseConfigService: FuseConfigService,
  ) {
    // Guardo datos en variable local
    this.dialogData = data;
    console.log('DIALOGDATA::', this.dialogData );
    // Creo Formulario Angular
    this.dialogForm = this.formGroup();
    this.dialogPos = this.formPosicion();

  }



  public formGroup(): FormGroup {
    return new FormGroup({
      id: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      contenido: new FormControl('', [Validators.required]),
      position: new FormControl('', [Validators.required])
    });
  }

    public formPosicion(): FormGroup {
        return new FormGroup({
            position: new FormControl('', [Validators.required])
        });
    }


    _guardarContenido(con): void{
    this.contenido = con;
  }

    _guardarPosicion(con): void{
        this.posicion = con;
    }

  _setPxContrato(arg): void{

      // Datos del post
      const form = arg;
      const pos = this.dialogPos.value;

      form.contrato_id = this.dialogData.id;
      form.parrafo_id = arg.id;
      form.create_by = 1;
      // form.position = parseFloat(pos.position);
      form.position = 1;
      form.id = '';

      console.log('SetParrafo::', form);

      this.api.post('parrafo_contrato', arg)
          .pipe( catchError(_ => of(this.api.toast('open', 'No se guardo el cambio!' ))))
          .subscribe( data => {

              this.rest = data;
              console.log('RRESPUERTA::', this.rest);

              // si es correcto el login
              if ( this.rest.success ){
                  this.api.toast('close');
                  this.api.toast('open', 'Parrafo creado con exito.', 5000, 'success');
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
  _setDialog(): any {

    console.log('CONTENIDONG::', this.contenido);

    // Datos del formulario
    const form = this.dialogForm.value;
    form.contrato_id = this.dialogData.id;
    form.create_by = 2;
    console.log('FORM::', form);
    this.api.show();

    this.api.post('parrafo', form)
        .pipe( catchError(_ => of(this.api.toast('open', 'No se guardo el cambio!' ))))
        .subscribe( data => {

          this.rest = data;
          console.log('RRESPUERTA::', this.rest);

          // si es correcto el login
          /*if ( this.rest.message ){
            this.api.toast('close');
            console.log('ERROR::',this.rest.message);
            this.api.toast('open', this.rest.message, 5000, 'warning');
          }*/

          // si es correcto el login
          if ( this.rest.success ){
            this.api.toast('close');
            this.api.toast('open', 'Parrafo creado con exito.', 5000, 'success');
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


  dataTable(): void{

    this._fuseProgressBarService.show();
    this.api.get('parrafo')
        .subscribe( data => {

          console.log('CPARRAFOG::', data);
          this.dataSource = data;
          this._fuseProgressBarService.hide();

        });
  }

  ngOnInit(): any {
    console.log('Componente corriendi');
    this.dataTable();
  }

}
