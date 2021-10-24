import {Component, OnInit, Inject, ViewEncapsulation} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../../api.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

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
  selector: 'asignar-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class AsignarDialogComponent implements OnInit {

  // Variables
  public dialogForm: FormGroup;
  public dialogData;
  public filter;
  public clase;
  public dataMoneda;
  public dataOperador;
  public user: Contrato;
  public dataBancoN;
  public valiRef;
  public archivo;
  public loading = false;

  
  constructor(
      @Inject(MAT_DIALOG_DATA) private data: any,
      public dialog: MatDialog,
      public matDialogRef: MatDialogRef<AsignarDialogComponent>,
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
      referencia: new FormControl('', [Validators.required]),
      asignado: new FormControl('', [Validators.required]),
    });

  }

  _setDialog(): void{


    const form = this.dialogForm.value;
    console.log('FROMCONSOLE::', form);
// /api/transacciones/asignar
    this.loading = true;
    this.api.show();
    this.api.post('transacciones/asignar', {id: this.dialogData.id,
        id_asignado: form.asignado.id,  
        id_cuenta_saliente: form.asignado.cuenta_id,
        referencia_entrante: form.referencia,
        cuenta_saliente: form.asignado.nombre,
        id_asignador: this.user.id})
        .pipe( catchError(val => of(this.api.toast('open', '' + val.error.error, 5, 'warning'))))
        .subscribe( data => {

          console.log('PAIS::', data);
          this.matDialogRef.close(data);
          this.api.hide();
          this.loading = false;

        });
}



        _validaReferencia(referencia): void{
            console.log('EVENT::', referencia);
            this.api.get('transacciones/mash?monto=' + this.dialogData.monto + '&referencia=' + referencia).subscribe(
                (r) => {
                    console.log('got r', r);
                    this.valiRef = r;
                    if (this.valiRef.lenght > 0){
                        this.api.toast('open', 'Esta referencia ya fue usada.', 5000, 'warning');

                    }
                    this.archivo = r;
                }
            );
        }


    goToLink(url): void{
        window.open( url, '_blank');
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


  }

}
