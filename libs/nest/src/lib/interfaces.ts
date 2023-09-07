/* eslint-disable @typescript-eslint/no-explicit-any */

export type Token<T = any> = T;
export type Class<T = any> = {
  new (...args: Token<T>[]): T;
};

export type EventIpc = Electron.IpcMainEvent;

export interface NestModule {
  onInIt?: () => void;
}

export interface ModuleMetadata {
  providers?: (Class | ProviderObject)[];
  imports?: Class[];
  controllers?: Class[];
}

export interface ProviderObject {
  key: string;
  useValue: Token;
}
