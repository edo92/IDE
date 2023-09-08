import { execSync } from 'child_process';

type Form = {
  firstName: string;
  lastName: string;
  middleName: string;
  directory: string;
};

export class BarcodeGenerator {
  constructor(private readonly form: Form) {}

  public async generate(): Promise<void> {
    const dirpath = '/Users/eduardjacobs/Desktop/IDE';

    const pyProg = await execSync(
      `python3 libs/barcode/src/lib/barcode.py ${dirpath} '${JSON.stringify(
        this.form
      )}'`
    );
    console.log('---', pyProg.toString());
  }
}
