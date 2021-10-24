import {Component, OnInit, Inject, ViewEncapsulation} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../../api.service';
import * as moment from 'moment';

interface Food {
  value: string;
  viewValue: string;
}

interface Contrato {
  id: string;
  name: string;
  create_by: string;
}


@Component({
  selector: 'editar-tasa-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class EditarTasaDialogComponent implements OnInit {

  // Variables
  public dialogForm: FormGroup;
  public dialogData;
  public filter;
  public clase;
  public user: Contrato;
  public dataMoneda;
  public dates: moment.Moment;
  public disabled;
  public showSpinners;
  public showSeconds;
  public stepHour;
  public stepMinute;
  public stepSecond;


  
  constructor(
      @Inject(MAT_DIALOG_DATA) private data: any,
      public dialog: MatDialog,
      public matDialogRef: MatDialogRef<EditarTasaDialogComponent>,
      public api: ApiService,
  ) {
    console.log('DATA::', data);
    // Guardo datos en variable local
    this.dialogData = data;

    this.dates = data.fecha;

    console.log('FECHA::', this.dates);
    // Guardo la busqueda

    this.filter = data.filter;
    this.clase = data.CLA;
    // Creo Formulario Angular
    this.dialogForm = this.formGroup();

  }

  public formGroup(): FormGroup {

    return new FormGroup({
      monto: new FormControl(this.dialogData.monto, [Validators.required]),
    });

  }

  _setDialog(): void{

    const form = this.dialogForm.value;
    console.log('FORM::', form);
    this.api.show();
    form.moneda_id = this.data.moneda_id;
    form.moneda_cambio_id = this.data.moneda_cambio_id;
    form.id = this.data.id;

    const datatime =  moment(this.dates);
    form.FECH_AGENDA = datatime.format('YYYY-MM-DD');
    form.HORA_AGENDA = datatime.format('HH:mm');

    form.fecha = form.FECH_AGENDA + ' '  +  form.HORA_AGENDA

    this.api.put('tasa', form)
        .subscribe( data => {

          console.log('CONSULTA::', data);
          this.matDialogRef.close(data);
          this.api.hide();

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

  ngOnInit(): any {

    this._dataMoneda();
    this.api.onUserChanged.subscribe( user => {
      console.log('USERSTORAGE::', user);
      this.user = user;
    });


  }

}
