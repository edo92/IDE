import { app } from 'electron';
import { Container, Module } from '@ide/nest';

import { SystemModule } from './modules/system/system.module';
import { BrowserModule } from './modules/browser/browser.module';
import { BrowserService } from './modules/browser/browser.service';

@Module({
  imports: [BrowserModule, SystemModule],
})
class AppModule {
  constructor(private readonly browser: BrowserService) {}

  public onInIt(): void {
    app.on('ready', () => {
      this.browser.createWindow();
    });
  }
}

Container.register(AppModule);
