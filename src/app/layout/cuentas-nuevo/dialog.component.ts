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
  selector: 'cuentas-nuevo-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class CuentasNuevoDialogComponent implements OnInit {

  // Variables
  public dialogForm: FormGroup;
  public dialogData;
  public filter;
  public clase;
  public user: Contrato;
  public dataMoneda;
  public dataBancos;


  
  constructor(
      @Inject(MAT_DIALOG_DATA) private data: any,
      public dialog: MatDialog,
      public matDialogRef: MatDialogRef<CuentasNuevoDialogComponent>,
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
      id: new FormControl('', []),
      banco: new FormControl('', [Validators.required]),
      tipo: new FormControl('', [Validators.required]),
      moneda: new FormControl('', [Validators.required]),
      numero: new FormControl('', [Validators.required]),
      pais: new FormControl('', [Validators.required]),
      saldo: new FormControl(0, [Validators.required]),
    });

  }

  _setDialog(): void{

    const form = this.dialogForm.value;
    console.log('FORM::', form);
    this.api.show();
    form.create_by = this.user.id;
    form.accion = 1;
    this.api.post('cuentas', form)
        .subscribe( data => {

          console.log('CUENTAS::', data);
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

  // Buscar contratos
  _dataBanco(option): void{

    this.api.show();

    this.api.get('bancos/moneda/' + option)
        .subscribe( result => {
          this.dataBancos = result.data;
          console.log('MONEDAS::', this.dataBancos );
          this.api.hide();
        });
  }

  // Buscar contratos
  _dataMonedaPais(option): void{

    this.api.show();

    this.api.get('monedas/pais/' + option)
        .subscribe( result => {
          this.dataMoneda = result.data;
          console.log('BANCOS::', this.dataMoneda );
          this.api.hide();
        });
  }

  ngOnInit(): any {


    this.api.dataPais();
    this.api.onUserChanged.subscribe( user => {
      console.log('USERSTORAGE::', user);
      this.user = user;
    });


  }

}
