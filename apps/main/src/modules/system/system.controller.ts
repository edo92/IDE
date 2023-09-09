import { Controller, IpcInvoke, Body } from '@ide/nest';
import { ChannelIPC } from '@ide/shared/constants';
import { SelectDirectory } from '@ide/shared/types';

import { GenerateBodyDto } from './system.dto';
import { SystemService } from './system.service';

@Controller()
export class SystemController {
  constructor(private readonly system: SystemService) {}

  @IpcInvoke(ChannelIPC.getdirectory)
  public async getDirectory(): Promise<SelectDirectory> {
    return await this.system.getDirectory();
  }

  @IpcInvoke(ChannelIPC.generate)
  public async hasRegisteredSecret(
    @Body() { data }: { data: GenerateBodyDto }
  ) {
    return await this.system.generate(data.form, data.directory);
  }
}
