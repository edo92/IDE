import { Controller, IpcInvoke, Param } from '@ide/nest';
import { ChannelIPC } from '@ide/shared/constants';
import { IpcResponse, SelectDirectory } from '@ide/shared/types';
import { SystemService } from './system.service';
import { Form } from './system.dto';

@Controller()
export class SystemController {
  constructor(private readonly system: SystemService) {}

  @IpcInvoke(ChannelIPC.generate)
  public hasRegisteredSecret(@Param() form: { data: Form }): IpcResponse {
    return this.system.generateBarcode(form.data);
  }

  @IpcInvoke(ChannelIPC.getdirectory)
  public async getDirectory(): Promise<SelectDirectory> {
    return await this.system.getDirectory();
  }
}
