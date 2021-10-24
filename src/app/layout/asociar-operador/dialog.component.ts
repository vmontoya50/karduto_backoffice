import {Component, OnInit, Inject, ViewEncapsulation} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../../api.service';
import {debounceTime, finalize, switchMap, tap} from 'rxjs/operators';

interface Food {
  value: string;
  viewValue: string;
}

interface Contrato {
  id: string;
  name: string;
  create_by: string;
}


export interface Usuario {
  id: string;
  name: string;
  lastName: string;
}

@Component({
  selector: 'asociar-operador-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class AsociarOperadorDialogComponent implements OnInit {

  // Variables
  public dialogForm: FormGroup;
  public dialogData;
  public filter;
  public clase;
  public dataMoneda;
  public user: Contrato;
  public dataUser;
  public carga = false;
  public filteredOptions;
  public options;



  constructor(
      @Inject(MAT_DIALOG_DATA) private data: any,
      public dialog: MatDialog,
      public matDialogRef: MatDialogRef<AsociarOperadorDialogComponent>,
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
      usuario: new FormControl('', [Validators.required])
    });

  }

  /**
   *  public _displayFn
   */
  _displayFn(user: Usuario): string {
    if (user) {
      return user.name + ' ' + user.lastName;
    }
  }


  _setDialog(): void{

    const form = this.dialogForm.value;
    const arg = {};
    console.log('FORM::', form);
    this.api.show();
    this.api.post('cuentas/agregar', {cuenta: this.data.id, usuario:  form.usuario.id})
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

    this.dialogForm
        .get('usuario')
        .valueChanges.pipe(
        debounceTime(300),
        tap(() => this.api.show()),
        switchMap(value =>
            (typeof value === 'string' || value instanceof String) ?  this.api.get('usuarios/search/' + value)
                .pipe(finalize(() => this.api.hide())) : []
        )
    ).subscribe(data => {

      this.filteredOptions  = data;
      console.log('AUTOFILTER::', this.filteredOptions);
      this.options = this.filteredOptions;

    });


    this.api.onUserChanged.subscribe( user => {
      console.log('USERSTORAGE::', user);
      this.user = user;
    });


  }

}
