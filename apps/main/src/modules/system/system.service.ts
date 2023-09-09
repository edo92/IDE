import { dialog } from 'electron';
import { Injectable } from '@ide/nest';

import { Photoshop } from '@ide/photoshop';
import { BarcodeGenerator } from '@ide/barcode';
import { FormDto, SelectDirectory } from '@ide/shared/types';

import { Response } from './system.dto';

@Injectable()
export class SystemService {
  public async generate(form: FormDto, directory: string): Promise<Response> {
    try {
      const photoshop = new Photoshop(directory);
      const barcode = new BarcodeGenerator(form, directory);

      await barcode.generate();
      await photoshop.start();

      return { status: 'OK' };
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
