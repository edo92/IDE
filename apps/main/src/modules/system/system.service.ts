import { dialog } from 'electron';
import { Injectable } from '@ide/nest';
import { BarcodeGenerator } from '@ide/barcode';
import { FormDto, SelectDirectory } from '@ide/shared/types';

@Injectable()
export class SystemService {
  public async generateBarcode(form: FormDto) {
    try {
      console.log('-------', form);

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
