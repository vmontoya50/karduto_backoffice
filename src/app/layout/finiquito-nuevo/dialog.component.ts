import {Component, OnInit, Inject, ViewEncapsulation} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../../api.service';
import {debounceTime, finalize, switchMap, tap} from 'rxjs/operators';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {ThemePalette} from '@angular/material/core';
import {fuseAnimations} from '../../../@fuse/animations';

interface Food {
  value: string;
  viewValue: string;
}

interface Finiquito {
  id: string;
  name: string;
  create_by: string;
}



@Component({
  selector: 'finiquito-nuevo-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations   : fuseAnimations
})

export class FiniquitoNuevoDialogComponent implements OnInit {

  // Variables
  public dialogForm: FormGroup;
  public dialogData;
  public dataFiniquito;
  public filter;
  public clase;
  public user: Finiquito;
  public dataContratos;
  public copy;
  public selectOp;
  public filteredOptions;
  public filas = [];
  public linea;
  public dataTurnos;
  options: string[] = [];


  constructor(
      @Inject(MAT_DIALOG_DATA) private data: any,
      public dialog: MatDialog,
      public matDialogRef: MatDialogRef<FiniquitoNuevoDialogComponent>,
      private api: ApiService,
  ) {
    console.log('DATA::', data);
    // Guardo datos en variable local
    this.dialogData = data;
    // Guardo la busqueda

    this.filter = data.filter;
    this.clase = data.CLA;
    // Creo Formulario Angular
    this.dialogForm = this.formGroup();

    this.linea = new FormArray([]);

  }

  public formGroup(): FormGroup {

    return new FormGroup({
      id: new FormControl('', []),
      empleado_id: new FormControl('', [Validators.required]),
      pago_feriados: new FormControl('', [Validators.required]),
      causal: new FormControl('', [Validators.required]),
      total_finiquito: new FormControl('0', [Validators.required]),
      sueldo_diario: new FormControl('', [Validators.required]),
      fecha_finalizacion: new FormControl('', [Validators.required]),
      fecha_inicio: new FormControl('', [Validators.required]),
      cargo: new FormControl('', [Validators.required]),
    });

  }



  addLinea() {

    const group = new FormGroup({
      descripcion: new FormControl('', [Validators.required]),
      monto: new FormControl('', [Validators.required]),
      tipo: new FormControl('', [Validators.required]),
    });

    this.linea.push(group);
  }

  _setDialog(): void{

    const form = this.dialogForm.value;
    console.log('FORM::', form);
    this.api.show();
    form.create_by = this.user.id;

    const lineas = this.linea.value;
    form.lineas = lineas;
    console.log('LINEAS::', lineas);

    this.api.post('regfiniquito', form)
        .subscribe( data => {

          console.log('CONSULTA::', data);
          this.matDialogRef.close(data);
          this.api.hide();

        });

  }


  // Buscar contratos
  dataContrato(option): void{

    this.selectOp = option.id;
    this.copyText(option.id);

    console.log('CONTRATO_OPTS::', option );
    this.api.show();

    this.api.get('regcontrato/byuser?id=' + option.id)
        .subscribe( data => {

          this.dataContratos = data;
          console.log('TURNOS::', this.dataContratos );
          this.api.hide();

        });
  }

  // Buscar contratos
  dataTurno(): void{

    this.api.show();
    // this.api.get('turno/search/afp/' + option.afp)
    this.api.get('cargos')
        .subscribe( data => {

          this.dataTurnos = data;
          console.log('TURNOS::', this.dataTurnos );
          this.api.hide();

        });
  }

  copyText(val: string): any{

    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this.copy = true;
    setTimeout(() => {
      this.copy = false;
    }, 2000);

    this.api.toast('open', 'Empleado copiado en el porta papeles.', 2000, 'success');

  }

  addf(): any{

    const fila =
       '<mat-form-field appearance="outline" class="w-65-p mat-caption m-2">' +
       ' <mat-label>Descripción</mat-label>' +
       ' <input matInput class="mat-caption" name="total_finiquito" formControlName="total_finiquito">' +
       ' </mat-form-field>' +
       ' <mat-form-field appearance="outline" class="w-25-p mat-caption m-2">' +
       ' <mat-label>Monto</mat-label>' +
       ' <input matInput class="mat-caption" name="total_finiquito" formControlName="total_finiquito">' +
       '</mat-form-field>';


    this.filas.push('fila');

  }

  ngOnInit(): any {

    this.dataTurno();

    this.api.onUserChanged.subscribe( user => {
      console.log('USERSTORAGE::', user);
      this.user = user;
    });

    this.dialogForm
        .get('empleado_id')
        .valueChanges.pipe(
        debounceTime(300),
        tap(() => this.api.show()),
        switchMap(value =>
            (typeof value === 'string' || value instanceof String) ?  this.api.get('empleado/search/nombres/' + value)
                .pipe(finalize(() => this.api.hide())) : []
        )
    ).subscribe(data => {

      this.filteredOptions  = data;
      console.log('AUTOFILTER::', this.filteredOptions);
      this.options = this.filteredOptions;

    });


  }

}
