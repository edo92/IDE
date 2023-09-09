import * as path from 'path';
import { exec } from 'child_process';

export class Photoshop {
  private readonly outputDir: string;
  private readonly scriptDir: string;
  private readonly phsScriptPath: string;

  constructor(outputDir: string) {
    this.outputDir = path.resolve(outputDir);
    this.scriptDir = path.resolve('libs/photoshop/src/script');
    this.phsScriptPath = path.join(this.scriptDir, 'photoshop.script.jsx');
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
       * osascript ./${SCRIPT_PATH} ./${INPUT_FILE_PATH} ./${OUTPUT_DIR}
       */
      const scriptPath = path.join(this.scriptDir, 'run-app.osascript');
      await exec(
        `osascript ${scriptPath} ${this.phsScriptPath} ${this.outputDir}}`
      );
    } catch (error) {
      throw new Error(error as string);
    }
  }

  private async runWin32Script(): Promise<void> {
    return;
  }
}
