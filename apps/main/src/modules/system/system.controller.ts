import { Controller, IpcInvoke, Param } from '@ide/nest';
import { ChannelIPC } from '@ide/shared/constants';
import { SelectDirectory } from '@ide/shared/types';

import { Form } from './system.dto';
import { SystemService } from './system.service';

@Controller()
export class SystemController {
  constructor(private readonly system: SystemService) {}

  @IpcInvoke(ChannelIPC.getdirectory)
  public async getDirectory(): Promise<SelectDirectory> {
    return await this.system.getDirectory();
  }

  @IpcInvoke(ChannelIPC.generate)
  public async hasRegisteredSecret(@Param() form: { data: Form }) {
    return await this.system.generateBarcode(form.data);
  }
}
