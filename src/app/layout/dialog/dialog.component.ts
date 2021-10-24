import {Component, OnInit, Inject, ViewEncapsulation} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../../api.service';

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class DialogComponent implements OnInit {

  // Variables
  public dialogForm: FormGroup;
  public dialogData;
  public filter;
  public clase;

  displayFilter: Food[] = [
    {value: 'id', viewValue: 'id'},
    {value: 'codigo', viewValue: 'referencia'},
    {value: 'nombre', viewValue: 'nombre'},
    {value: 'apellidos', viewValue: 'apellidos'},
    {value: 'rut', viewValue: 'rut'},
    {value: 'pasaporte', viewValue: 'pasaporte'},
    {value: 'email', viewValue: 'email'},
    {value: 'nacionalidad', viewValue: 'nacionalidad'},
    {value: 'celular', viewValue: 'celular'},
    {value: 'fecha_nacimiento', viewValue: 'fecha nacimiento'},
    {value: 'estado_civil', viewValue: 'estado civil'},
    {value: 'n_cuenta', viewValue: 'numero de cuenta'},
    {value: 'banco', viewValue: 'banco'},
    {value: 'calle', viewValue: 'calle'},
    {value: 'numero_direccion', viewValue: 'numero direccion'},
    {value: 'comuna', viewValue: 'comuna'},
    {value: 'ciudad', viewValue: 'ciudad'},
    {value: 'region', viewValue: 'region'},
    {value: 'salud', viewValue: 'salud'},
    {value: 'afp', viewValue: 'afp'},
    {value: 'codigo_banco', viewValue: 'codigo de banco'},
    {value: 'observaciones', viewValue: 'observaciones'},
    {value: 'disponibilidad', viewValue: 'disponibilidad'},
    {value: 'disponibilidad_turno', viewValue: 'turno'},
    {value: 'experiencia', viewValue: 'experiencia'},
    {value: 'talla_polera', viewValue: 'talla polera'},
    {value: 'talla_pantalon', viewValue: 'talla pantalon'},
    {value: 'talla_zapato', viewValue: 'talla zapato'},
    {value: 'talla_polar', viewValue: 'talla polar'},
    {value: 'fecha_poatulacion', viewValue: 'fecha postulacion'},
    {value: 'telefono', viewValue: 'telefono'},
    {value: 'identidad', viewValue: 'identidad'},
    {value: 'tienda', viewValue: 'tienda'},
    {value: 'turno', viewValue: 'turno'},
    {value: 'whatsapp', viewValue: 'whatsapp'},
    {value: 'activo', viewValue: 'activo'}
  ];



  constructor(
      @Inject(MAT_DIALOG_DATA) private data: any,
      public dialog: MatDialog,
      public matDialogRef: MatDialogRef<DialogComponent>,
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
      filtro: new FormControl('', [Validators.required]),
      buscar: new FormControl('', [Validators.required])
    });
  }

  _setDialog(): void{

    const form = this.dialogForm.value;
    console.log('FORM::', form);
    this.api.show();

    this.api.get(this.clase + '/search/' + form.filtro + '/' + form.buscar)
        .subscribe( data => {

          console.log('CONSULTA::', data);
          this.matDialogRef.close(data);
          this.api.hide();

        });

  }



  ngOnInit(): any {
    console.log('Componente::', this.dialogData.filter);
  }

}
