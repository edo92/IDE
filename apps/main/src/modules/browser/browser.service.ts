import { Inject, Injectable } from '@ide/nest';
import { BrowserKey } from './browser.constants';
import { BrowserConfig } from './browser.config';
import { BrowserWindow } from 'electron';

declare const APP_WINDOW_WEBPACK_ENTRY: string;

@Injectable()
export class BrowserService {
  private browserWindow: BrowserWindow;

  constructor(
    @Inject(BrowserKey.BROWSER_CONFIG)
    private readonly config: typeof BrowserConfig
  ) {}

  public createWindow(): BrowserWindow {
    if (this.browserWindow) return;
    const browserWindow = new BrowserWindow(this.config);
    browserWindow.loadURL(APP_WINDOW_WEBPACK_ENTRY);
    browserWindow.on('ready-to-show', () => browserWindow.show());
    this.browserWindow = browserWindow;
    return browserWindow;
  }
}
