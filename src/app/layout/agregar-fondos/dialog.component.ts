import {Component, OnInit, Inject, ViewEncapsulation} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../../api.service';

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
  selector: 'agregar-fondos-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class AgregarFondosDialogComponent implements OnInit {

  // Variables
  public dialogForm: FormGroup;
  public dialogData;
  public filter;
  public clase;
  public dataMoneda;
  public user: Contrato;

  
  constructor(
      @Inject(MAT_DIALOG_DATA) private data: any,
      public dialog: MatDialog,
      public matDialogRef: MatDialogRef<AgregarFondosDialogComponent>,
      public api: ApiService,
  ) {
    console.log('DATA::', data);
    // Guardo datos en variable local
    this.dialogData = data;
    // Guardo la busqueda

    this.filter = data.filter;
    this.clase = data.CLA;
    // Creo Formulario Angular
    this.dialogForm = this.formGroup();

  }

  public formGroup(): FormGroup {

    return new FormGroup({
      monto: new FormControl('', [Validators.required]),
      tipo: new FormControl('', [Validators.required]),
    });

  }

  _setDialog(): void{

    const form = this.dialogForm.value;
    console.log('FORM::', form);
    this.api.show();
    form.usuario = this.user.id;
    form.moneda = this.dialogData.banco_id;
    form.cuenta = this.dialogData.id;
    this.api.post('transacciones/ajuste', form)
        .subscribe( data => {

          console.log('CONSULTA::', data);
          this.matDialogRef.close(data);
          this.api.hide();
        });

  }

  // Buscar contratos
  _dataMoneda(): void{

    this.api.show();

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
