import {Component, OnInit, Inject, ViewEncapsulation} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../../api.service';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';

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
  selector: 'finalizar-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class FinalizarDialogComponent implements OnInit {

  // Variables
  public dialogForm: FormGroup;
  public dialogData;
  public filter;
  public clase;
  public dataMoneda;
  public dataOperador;
  public user: Contrato;
  public dataBancoN;
  public tipo: Food[];
  public motivo;
  public isLoad = false;




  
  constructor(
    private _fuseSidebarService: FuseSidebarService,
    private _fuseProgressBarService: FuseProgressBarService,
      @Inject(MAT_DIALOG_DATA) private data: any,
      public dialog: MatDialog,
      public matDialogRef: MatDialogRef<FinalizarDialogComponent>,
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
      rech_tipo: new FormControl('', [Validators.required]),
      rech_info: new FormControl('', []),
    });

  }

  _setDialog(): void{

    this._fuseProgressBarService.show();
    this.isLoad = true;
    const form = this.dialogForm.value;
    console.log('FROMCONSOLE::', form);



    this.api.put('transacciones', {id: this.dialogData.id, 
        rech_tipo: form.rech_tipo,
        rech_info: this.motivo  + ', ' + form.rech_info,
        estado:'RECH'})
        .subscribe( data => {

          console.log('PAIS::', data);
          this.matDialogRef.close(data);
          this._fuseProgressBarService.hide();
          this.isLoad = false;

        });
}
_setMotivo(arg){
  console.log('setMotivo::', arg);
  this.motivo = arg;
}

  _dataBanco(arg){
    console.log('CHANGELOG::00');
    console.log('CHANGELOG::',arg);
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
   _dataOperador(): void{

    this.api.show();

    this.api.get('transacciones/getOperator/' + this.dialogData.id)
        .subscribe( result => {
          this.dataOperador = result.success;
          console.log('Operador::', this.dataOperador );
          this.api.hide();
        });
  }
  
  ngOnInit(): any {

    this._dataOperador();


    this.api.onUserChanged.subscribe( user => {
      console.log('USERSTORAGE::', user);
      this.user = user;
    });

    if(this.dialogData.tipo == 'todos'){
      this.tipo = [
        {value: 'destinatario', viewValue: 'numero de cedula erroneo'},
        {value: 'cuenta', viewValue: 'Numero de cuenta erroneo'},
        {value: 'cuenta', viewValue: 'Pago movil erroneo'},
        {value: 'monto', viewValue: 'Monto no coincide'},
        {value: 'monto', viewValue: 'Cuenta no recibe monto'},
        {value: 'comprobante', viewValue: 'Cuenta bloqueada'},
        {value: 'comprobante', viewValue: 'Comprobante ya utilizado'},
        {value: 'comprobante', viewValue: 'No se encuentra el comprobante en el banco'},
        {value: 'rechazo', viewValue: 'Otro'},
      ];
    }

    if(this.dialogData.tipo == 'operaEx'){
      this.tipo = [
        {value: 'monto', viewValue: 'Monto depositado no coincide con monto solicitado'},
        {value: 'comprobante', viewValue: 'Deposito no encontrado en nuestra cuenta bancaria, favor revisar'},
        {value: 'comprobante', viewValue: 'Comprobante ya utilizado'},
        {value: 'comprobante', viewValue: 'No se encuentra el comprobante en el banco'},
        {value: 'rechazo', viewValue: 'otro'},
      ];
    }

    if(this.dialogData.tipo == 'operaVzl'){
      this.tipo = [
        {value: 'cuenta', viewValue: 'numero de cuenta erroneo'},
        {value: 'destinatario', viewValue: 'Cedula erronea'},
        {value: 'cuenta', viewValue: 'cuenta ahorro supera el limite'},
        {value: 'rechazo', viewValue: 'Rechazo'},
      ];
    }


  }

}
