import { Module } from '@ide/nest';
import { BrowserKey } from './browser.constants';
import { BrowserService } from './browser.service';
import { BrowserConfig, NativeIcon } from './browser.config';

@Module({
  providers: [
    BrowserService,
    { key: BrowserKey.BROWSER_CONFIG, useValue: BrowserConfig },
    { key: BrowserKey.BROWSER_NATIVE_ICON, useValue: NativeIcon },
  ],
})
export class BrowserModule {}
