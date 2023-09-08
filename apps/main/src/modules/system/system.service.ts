import { dialog } from 'electron';
import { Injectable } from '@ide/nest';
import { BarcodeGenerator } from '@ide/barcode';
import { SelectDirectory } from '@ide/shared/types';
import { Form } from './system.dto';

@Injectable()
export class SystemService {
  public async generateBarcode(form: Form) {
    try {
      const barcode = new BarcodeGenerator(form);
      await barcode.generate();
    } catch (error) {
      throw new Error(error);
    }
  }

  public async getDirectory(): Promise<SelectDirectory> {
    try {
      return await dialog.showOpenDialog({
        properties: ['openDirectory'],
      });
    } catch (error) {
      throw new Error('Failed to get directory');
    }
  }
}
