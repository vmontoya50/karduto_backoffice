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
  selector: 'contrato-turno-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class ContratoTurnoDialogComponent implements OnInit {

  // Variables
  public dialogForm: FormGroup;
  public dialogData;
  public filter;
  public clase;
  public user: Contrato;

  displaySalud: Food[] = [
    {value: 'FONASA', viewValue: 'FONASA'},
    {value: 'BANMÉDICA, S.A.', viewValue: 'BANMÉDICA, S.A.'},
    {value: 'CHUQUICAMATA, LTDA.', viewValue: 'CHUQUICAMATA, LTDA.'},
    {value: 'COLMENA GOLDEN CROSS, S.A.', viewValue: 'COLMENA GOLDEN CROSS, S.A.'},
    {value: 'CRUZ BLANCA, S.A.', viewValue: 'CRUZ BLANCA, S.A.'},
    {value: 'CRUZ DEL NORTE, LTDA.', viewValue: 'CRUZ DEL NORTE, LTDA.'},
    {value: 'NUEVA MASVIDA, S.A.', viewValue: 'NUEVA MASVIDA, S.A.'},
    {value: 'FUNDACIÓN, LTDA.', viewValue: 'FUNDACIÓN, LTDA.'},
    {value: 'FUSAT, LTDA.', viewValue: 'FUSAT, LTDA.'},
    {value: 'NUEVA MASVIDA, S.A.', viewValue: 'NUEVA MASVIDA, S.A.'},
    {value: 'RÍO BLANCO, LTDA.', viewValue: 'RÍO BLANCO, LTDA.'},
    {value: 'SAN LORENZO, LTDA.', viewValue: 'SAN LORENZO, LTDA.'},
    {value: 'VIDA TRES, S.A.', viewValue: 'VIDA TRES, S.A.'},
  ];

  displayAfp: Food[] = [
    {value: 'PLANVITAL, S.A.', viewValue: 'PLANVITAL, S.A.'},
    {value: 'MODELO, S.A.', viewValue: 'MODELO, S.A.'},
    {value: 'HABITAT, S.A.', viewValue: 'HABITAT, S.A.'},
    {value: 'CUPRUM, S.A.', viewValue: 'CUPRUM, S.A.'},
    {value: 'CAPITAL, S.A.', viewValue: 'CAPITAL, S.A.'},
    {value: 'UNO, S.A.', viewValue: 'UNO, S.A.'},
    {value: 'PROVIDA, S.A.', viewValue: 'PROVIDA, S.A.'}
  ];

  
  constructor(
      @Inject(MAT_DIALOG_DATA) private data: any,
      public dialog: MatDialog,
      public matDialogRef: MatDialogRef<ContratoTurnoDialogComponent>,
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
      cargo: new FormControl('', [Validators.required]),
      turno: new FormControl('', [Validators.required]),
      afp: new FormControl('', [Validators.required]),
      colacion: new FormControl('', [Validators.required]),
      base: new FormControl('', [Validators.required]),
      movilizacion: new FormControl('', [Validators.required])
    });

  }

  _setDialog(): void{

    const form = this.dialogForm.value;
    console.log('FORM::', form);
    this.api.show();
    form.create_by = this.user.id;
    this.api.post('turno', form)
        .subscribe( data => {

          console.log('CONSULTA::', data);
          this.matDialogRef.close(data);
          this.api.hide();

        });

  }

  ngOnInit(): any {


    this.api.onUserChanged.subscribe( user => {
      console.log('USERSTORAGE::', user);
      this.user = user;
    });


  }

}
