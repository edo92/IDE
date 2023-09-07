import { spawn } from 'child_process';

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
    const code = this.createANSI();
    this.executePyScript(code, '/Users/eduardjacobs/Desktop/IDE/');
    console.log('----code', code);
  }

  private createANSI(): string {


    this.list.push(`DCS${this.form.firstName}`);
    this.list.push(`DAC${this.form.lastName}`);
    this.list.push(`DAD${this.form.middleName}`);

    return this.list.join('\n');
  }

  private executePyScript(code: string, dirpath: string): void {
    const pyProg = spawn('python3', ['./barcode.py', code, dirpath]);
    pyProg.stdout.on('data', function (data) {
      console.log(data.toString());
    });
    pyProg.stdout.on('error', function (data) {
      console.error(data.toString());
    });
  }
}
