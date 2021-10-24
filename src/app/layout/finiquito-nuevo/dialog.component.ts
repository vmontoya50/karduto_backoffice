import {Component, OnInit, Inject, ViewEncapsulation} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../../api.service';

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
  encapsulation: ViewEncapsulation.None
})

export class FiniquitoNuevoDialogComponent implements OnInit {

  // Variables
  public dialogForm: FormGroup;
  public dialogData;
  public dataFiniquito;
  public filter;
  public clase;
  public user: Finiquito;

  
  constructor(
      @Inject(MAT_DIALOG_DATA) private data: any,
      public dialog: MatDialog,
      public matDialogRef: MatDialogRef<FiniquitoNuevoDialogComponent>,
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
      name: new FormControl('', [Validators.required])
    });

  }

  _setDialog(): void{

    const form = this.dialogForm.value;
    console.log('FORM::', form);
    this.api.show();
    form.create_by = this.user.id;
    this.api.post('finiquito', form)
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
