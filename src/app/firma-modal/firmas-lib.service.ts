import { Injectable } from '@angular/core';
import { HexBase64BinaryEncoding } from 'crypto';

@Injectable({
  providedIn: 'root'
})
export class FirmasLibService {
  private base64Image: string = null;
  public employData: {
    tipo: 'Pasaporte' | 'RUT';
    rut: number;
    pasaporte: number;
    numero_de_documento: number;
  } = {
    tipo: null,
    rut: null,
    pasaporte: null,
    numero_de_documento: null,
  };
  constructor() { }

  set setBaseImage(img: string) {
    this.base64Image = img;
  }

  get getBaseImage(): string {
    return this.base64Image;
  }
}
