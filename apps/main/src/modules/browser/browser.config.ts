import * as path from 'path';
import { nativeImage } from 'electron';

declare const APP_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

/**
 *
 * Native Icon
 */
const iconIco = path.resolve('libs/shared/assets/src/logo.png');
export const NativeIcon = nativeImage.createFromPath(iconIco);

/**
 *
 * Browser Config
 */
export const BrowserConfig: Electron.BrowserWindowConstructorOptions = {
  width: 800,
  height: 600,
  show: false,
  frame: false,
  autoHideMenuBar: true,
  titleBarStyle: 'hidden',
  backgroundColor: '#202020',
  icon: NativeIcon,

  webPreferences: {
    nodeIntegration: false,
    contextIsolation: true,
    nodeIntegrationInWorker: false,
    nodeIntegrationInSubFrames: false,
    preload: APP_WINDOW_PRELOAD_WEBPACK_ENTRY,
    sandbox: false,
  },
};
