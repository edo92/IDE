import { Controller, IpcInvoke, Param } from '@ide/nest';
import { FormDto, SelectDirectory } from '@ide/shared/types';
import { ChannelIPC } from '@ide/shared/constants';
import { SystemService } from './system.service';

@Controller()
export class SystemController {
  constructor(private readonly system: SystemService) {}

  @IpcInvoke(ChannelIPC.getdirectory)
  public async getDirectory(): Promise<SelectDirectory> {
    return await this.system.getDirectory();
  }

  @IpcInvoke(ChannelIPC.generate)
  public async hasRegisteredSecret(@Param() form: { data: FormDto }) {
    return await this.system.generateBarcode(form.data);
  }
}
