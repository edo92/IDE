import { ipcRenderer, contextBridge } from 'electron';
import type { API as IAPI, IpcEvent } from '@ide/shared/types';

const API: IAPI = {
  invoke: <R = unknown, T = unknown>(channel: string, data: T) =>
    ipcRenderer.invoke(channel, data as T) as Promise<R>,

  on: <T = unknown>(
    channel: string,
    callback: (data: T, event: IpcEvent) => void
  ) => {
    ipcRenderer.on(channel, (event, arg) => {
      callback(arg, event);
    });
  },
};

contextBridge.exposeInMainWorld('api', API);
