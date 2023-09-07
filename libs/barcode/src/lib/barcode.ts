import { execSync, spawn } from 'child_process';

type Form = {
  firstName: string;
  lastName: string;
  middleName: string;
  directory: string;
};

export class BarcodeGenerator {
  list: string[] = [];
  constructor(private readonly form: Form) {}

  public generate(): void {
    const dirpath = '/Users/eduardjacobs/Desktop/IDE';
    const pyProg = execSync(
      `python3 libs/barcode/src/lib/barcode.py ${dirpath} '${JSON.stringify(
        this.form
      )}'`
    );
    console.log('---', pyProg.toString());
  }
}
