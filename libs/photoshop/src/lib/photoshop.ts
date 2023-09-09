import * as path from 'path';
import { exec } from 'child_process';

type PhotoshopOptions = {
  file?: string;
};

export class Photoshop {
  private readonly outputDir: string;
  private readonly scriptDir: string;

  constructor(outputDir: string, private readonly options?: PhotoshopOptions) {
    this.outputDir = path.resolve(outputDir);
    this.scriptDir = 'libs/photoshop/src/script';
  }

  public async start(): Promise<void> {
    switch (process.platform) {
      case 'win32': {
        await this.runWin32Script();
        break;
      }
      case 'darwin': {
        await this.runMacOsScript();
        break;
      }
    }
  }

  private async runMacOsScript(): Promise<void> {
    try {
      /**
       * osascript runScript.osascript  ./${SCRIPT_PATH} ./${INPUT_FILE_PATH} ./${OUTPUT_DIR}
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
          `osascript ${scriptPath} ${phsScriptPath} ${inputFilePath} ${this.outputDir}`
        );

        command.on('error', (err) => reject(err));
        command.on('data', (data) => console.log(data));
        command.on('close', (code) => resolve(code));
      });
    } catch (error) {
      throw new Error(error as string);
    }
  }

  private async runWin32Script(): Promise<void> {
    return;
  }
}
