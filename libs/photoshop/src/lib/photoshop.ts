import * as path from 'path';
import { exec } from 'child_process';

export class Photoshop {
  private readonly outputDir: string;
  private readonly scriptDir: string;

  constructor(outputDir: string) {
    this.outputDir = path.resolve(outputDir);
    this.scriptDir = path.resolve('libs/photoshop/src/script');
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
      const scriptPath = path.join(this.scriptDir, 'run-app.osascript');
      const phsScriptPath = path.join(this.scriptDir, 'photoshop.script.jsx');
      const inputFilePath = path.join(
        'lib/photoshop/src/assets/FILE.psd',
        'input.txt'
      );

      await exec(
        `osascript ${scriptPath} ${phsScriptPath} ${inputFilePath} ${this.outputDir}`
      );
    } catch (error) {
      throw new Error(error as string);
    }
  }

  private async runWin32Script(): Promise<void> {
    return;
  }
}
