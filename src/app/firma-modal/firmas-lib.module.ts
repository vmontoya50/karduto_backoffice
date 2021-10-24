import { NgModule } from '@angular/core';
import { MatButtonModule, MatDialogModule, MatInputModule, MatOptionModule, MatSelectModule } from '@angular/material';
import { HeaderFirmasComponent } from './components/header-firmas/header-firmas.component';
import { ModalDrawFirmasComponent } from './components/modal-draw-firmas/modal-draw-firmas.component';
import {CanvasWhiteboardModule} from 'ng2-canvas-whiteboard';
import { ViewFirmaComponent } from './components/view-firma/view-firma.component';
import { OpenFirmaDirective } from './directives/open-firma.directive';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule, IConfig } from 'ngx-mask';

@NgModule({
  declarations: [
    HeaderFirmasComponent,
    ModalDrawFirmasComponent,
    ViewFirmaComponent,
    OpenFirmaDirective
  ],
  imports: [
    MatButtonModule,
    MatDialogModule,
    CanvasWhiteboardModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    NgxMaskModule.forRoot()
  ],
  entryComponents: [
    ModalDrawFirmasComponent,
  ],
  exports: [
    HeaderFirmasComponent,
    ViewFirmaComponent,
    OpenFirmaDirective
  ]
})
export class FirmasLibModule { }
