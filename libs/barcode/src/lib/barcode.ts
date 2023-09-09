import * as path from 'path';
import { execSync } from 'child_process';
import { FormDto } from '@ide/shared/types';

export class BarcodeGenerator {
  constructor(
    private readonly form: FormDto,
    private readonly directory: string
  ) {}

  public async generate(): Promise<void> {
    try {
      await execSync(
        `python3 libs/barcode/src/lib/barcode.py ${path.resolve(
          this.directory
        )} '${JSON.stringify(this.form)}'`
      );
    } catch (error) {
      throw new Error('Unable to generate barcode');
    }
  }
}
