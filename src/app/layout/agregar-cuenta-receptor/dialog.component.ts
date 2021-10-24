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
  selector: 'agregar-cuenta-receptor-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class AgregarCuentaReceptorDialogComponent implements OnInit {

  // Variables
  public dialogForm: FormGroup;
  public dialogData;
  public filter;
  public clase;
  public dataMoneda;
  public dataBancos;
  public user: Contrato;

  
  constructor(
      @Inject(MAT_DIALOG_DATA) private data: any,
      public dialog: MatDialog,
      public matDialogRef: MatDialogRef<AgregarCuentaReceptorDialogComponent>,
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
      banco_id: new FormControl('', [Validators.required]),
      tipo_cuenta: new FormControl('', [Validators.required]),
      numero: new FormControl('', [Validators.required])
    });

  }

  _setDialog(): void{

    const form = this.dialogForm.value;
    const ing = this.data;
    console.log('FORM::', form);
    this.api.show();
    form.receptor_id = ing.id_receptor;
    this.api.post('cuentareceptor', form)
        .subscribe( data => {

          console.log('RECEPTOR::', data);
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

  _dataBanco(option): void{

    this.api.show();

    this.api.get('bancos/moneda/' + option)
        .subscribe( result => {
          this.dataBancos = result.data;
          console.log('MONEDAS::', this.dataBancos );
          this.api.hide();
        });
  }

  ngOnInit(): any {
    this._dataBanco(this.dialogData.moneda_saliente);
    this._dataMoneda();


    this.api.onUserChanged.subscribe( user => {
      console.log('USERSTORAGE::', user);
      this.user = user;
    });


  }

}
