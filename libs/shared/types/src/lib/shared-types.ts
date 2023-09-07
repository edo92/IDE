import { IpcRendererEvent } from 'electron';

export interface API {
  invoke: <R = unknown, T = unknown>(event: string, data?: T) => Promise<R>;
  on: <T = unknown>(event: string, callback: (data: T) => void) => void;
}

export type IpcEvent = IpcRendererEvent;

export type IpcResponse<T = unknown> = {
  errors?: string[];
  data?: T;
};

export type SelectDirectory = {
  canceled: boolean;
  filePaths: string[];
};
