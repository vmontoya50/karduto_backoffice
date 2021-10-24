import { Component, OnInit, ViewChild, OnChanges, ChangeDetectorRef, AfterViewChecked } from '@angular/core';
import { CanvasWhiteboardOptions, CanvasWhiteboardComponent } from 'ng2-canvas-whiteboard';
import { EventEmitter } from 'protractor';
import { FirmasLibService } from '../../firmas-lib.service';
import { HexBase64BinaryEncoding } from 'crypto';
import { validate, clean, format } from 'rut.js';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl, ValidatorFn } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'lib-modal-draw-firmas',
  templateUrl: './modal-draw-firmas.component.html',
  styleUrls: ['./modal-draw-firmas.component.css'],
  viewProviders: [CanvasWhiteboardComponent],
})
export class ModalDrawFirmasComponent implements OnInit, OnChanges, AfterViewChecked {
  regexRut = '^(\d{1,3}(?:\.\d{1,3}){2}-[\dkK])$';
  employForm: FormGroup;
  hasDraw: boolean;
  canvasOptions: CanvasWhiteboardOptions = {
    drawButtonEnabled: true,
    drawButtonClass: 'drawButtonClass',
    drawButtonText: 'Firmar',
    clearButtonEnabled: true,
    clearButtonClass: 'clearButtonClass',
    clearButtonText: 'Limpiar',
    undoButtonText: 'Volver',
    undoButtonEnabled: true,
    redoButtonText: 'Reiniciar',
    redoButtonEnabled: true,
    colorPickerEnabled: true,
    // fillColorPickerText: 'Fill',
    // strokeColorPickerText: 'Stroke',
    saveDataButtonEnabled: false,
    saveDataButtonText: 'Guardar',
    lineWidth: 5,
    strokeColor: 'rgb(0,0,0)',
    shouldDownloadDrawing: false
  };
  @ViewChild('canvasWhiteboard', {static: true}) canvasWhiteboard: CanvasWhiteboardComponent;

  constructor(
    private firmasService: FirmasLibService,
    private fb: FormBuilder,
    private cdRef: ChangeDetectorRef,
    private dialogRef: MatDialogRef<ModalDrawFirmasComponent>,
  ) { }

  ngOnInit() {
    this.canvasWhiteboard.setDrawingEnabled(true);
    const employData = this.firmasService.employData;
    this.employForm = this.fb.group(
      {
        tipo: [employData.tipo ? employData.tipo : '', Validators.required],
        rut: [employData.rut ? employData.rut : ''],
        pasaporte: [employData.pasaporte ? employData.pasaporte : ''],
        numero_de_documento: [employData.numero_de_documento ? employData.numero_de_documento : ''],
      }
    );

    this.employForm.valueChanges.subscribe(res => {
      console.log(res);
      const isRut =  res.tipo === 'RUT';
      if (isRut) {
        this.employForm.get('pasaporte').setErrors(null);
        this.employForm.get('rut').setValidators([Validators.required, Validators.pattern(/^(\d{1,3}(\.?\d{3}){2})\-?([\dkK])$/), this.validateRUT]);
        this.employForm.get('numero_de_documento').setValidators([Validators.required, Validators.pattern(/^[0-9][0-9][0-9]\.[0-9][0-9][0-9]\.[0-9][0-9][0-9]$/)]);
      } else {
        this.employForm.get('pasaporte').setValidators([Validators.required, Validators.pattern(/^(?!^0+$)[a-zA-Z0-9]{3,20}$/)]);
        this.employForm.get('rut').setErrors(null);
        this.employForm.get('numero_de_documento').setErrors(null);
      }
    });
  }

  validateRUT = (control: AbstractControl): { [key: string]: any } | null => {
    if(validate(control.value)) {
      return null;
    }
    return {invalidRut: true};
  }
  
    
  validateDoc

  ngOnChanges() {

  }



  public get isImageDraw() {
    return this.firmasService.getBaseImage;
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  checkFile(event: EventEmitter): void {
    this.firmasService.setBaseImage = event as unknown as string;
  }

  sendBatchUpdate(event) {
    // console.log(this.canvasWhiteboard.)
    this.hasDraw = true;
  }

  submitEmployForm(form: FormGroup): void {
    console.log(form)
    if (form.valid) {
      this.canvasWhiteboard.saveLocal();
      this.firmasService.employData = this.employForm.value;
      this.dialogRef.close();
    }
  }

}
