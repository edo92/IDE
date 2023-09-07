import { dialog } from 'electron';
import { Injectable } from '@ide/nest';
import { SelectDirectory } from '@ide/shared/types';
import { Form } from './system.dto';
import { BarcodeGenerator } from '@ide/barcode';

@Injectable()
export class SystemService {
  public generateBarcode(form: Form) {
    const barcode = new BarcodeGenerator(form);
    barcode.generate();
  }

  public async getDirectory(): Promise<SelectDirectory> {
    return await dialog.showOpenDialog({
      properties: ['openDirectory'],
    });
  }
}
