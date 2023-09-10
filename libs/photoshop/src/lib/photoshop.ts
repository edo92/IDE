import * as path from 'path';
import { exec } from 'child_process';
import { FormDto } from '@ide/shared/types';

type PhotoshopOptions = {
  file?: string;
};

export class Photoshop {
  private readonly outputDir: string;
  private readonly scriptDir: string;

  constructor(outputDir: string, private readonly options?: PhotoshopOptions) {
    this.outputDir = path.resolve(outputDir);
    this.scriptDir = 'libs/photoshop/src/lib/script';
  }

  public async start(form: FormDto): Promise<void> {
    switch (process.platform) {
      case 'win32': {
        await this.runWin32Script(form);
        break;
      }
      case 'darwin': {
        await this.runMacOsScript(form);
        break;
      }
    }
  }

  private async runMacOsScript(form: FormDto): Promise<void> {
    try {
      /**
       * osascript runScript.osascript  ./${SCRIPT_PATH} ./${INPUT_FILE_PATH} ./${OUTPUT_DIR} ${JSON_FORM}
       */
      const scriptPath = path.resolve(
        path.join(this.scriptDir, 'run-app.osascript')
      );

      const phsScriptPath = path.resolve(
        path.join(this.scriptDir, 'photoshop.script.jsx')
      );

      const inputFilePath = path.resolve(
        path.join(
          'libs/photoshop/src/assets',
          this.options?.file || 'template_front_back.psd'
        )
      );

      await new Promise((resolve, reject) => {
        const command = exec(
          `osascript ${scriptPath} ${phsScriptPath} ${inputFilePath} ${
            this.outputDir
          } '${JSON.stringify(form)}'`
        );

        command.on('error', (err) => reject(err));
        command.on('data', (data) => console.log(data));
        command.on('close', (code) => resolve(code));
      });
    } catch (error) {
      throw new Error(error as string);
    }
  }

  private async runWin32Script(form: FormDto): Promise<void> {
    return;
  }
}
