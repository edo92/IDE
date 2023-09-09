import { ipcMain } from 'electron';
import { validateOrReject } from 'class-validator';
import { container, inject, injectable, singleton } from 'tsyringe';

import {
  Token,
  Class,
  EventIpc,
  NestModule,
  ModuleMetadata,
} from './interfaces';
import { MetadataKey, Scope } from './constants';

/**
 *
 * @param scope
 * @returns {Class<T>}
 * @description Injectable decorator
 */
export const Injectable = (scope?: Scope) => {
  if (scope === Scope.Transient) {
    return injectable();
  }
  return singleton();
};

/**
 *
 * @param metadata {ModuleMetadata}
 * @returns {Class<T>}
 * @description Module decorator, it will register application providers
 */
export const Module = (metadata: ModuleMetadata) => {
  return <T>(target: { new (...args: T[]): NestModule }) => {
    Reflect.defineMetadata(MetadataKey.Module, metadata, target);
    return singleton()(target);
  };
};

/**
 *
 * @param token {String}
 * @returns {Class<T>}
 * @description Inject value provider
 */
export const Inject = (token: string) => {
  return inject(token);
};

/**
 *
 * @param namespace {String}
 * @description Controller class decorator
 */
export const Controller = (namespace?: string) => {
  return <T>(target: { new (...args: T[]): Token }) => {
    Reflect.defineMetadata(MetadataKey.Controller, { namespace }, target);
    singleton()(target);
  };
};

/**
 *
 * @param param {String}
 * @description Controller method parameter decorator
 */
export const Body = (param?: string) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return <T>(target: T, key: string, _idx: number) => {
    const metadataKey = `__${key}_parameters`;
    Reflect.defineMetadata(metadataKey, param, target);
  };
};

/**
 *
 * @param channel
 * @description Controller method decorator
 */
export const IpcInvoke = (channel: string) => {
  return <T>(
    target: Class<T>['prototype'],
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) => {
    const originalMethod = descriptor.value;

    descriptor.value = async function <T>(...args: T[]) {
      const metadataKey = `__${propertyKey}_parameters`;
      const metadata = Reflect.getOwnMetadata(metadataKey, target);
      const body = constructObject(metadata, args);

      try {
        await validateInput(body);
        const result = Array.isArray(body) ? body : [body];
        return originalMethod.apply(this, result);
      } catch (err) {
        const errors = err as { constraints: Record<string, string> }[];
        const result = errors.map((error) => error.constraints);
        return { errors: result, data: null, statusCode: 400 };
      }
    };

    ipcMain.handle(channel, <T>(event: EventIpc, data: T) => {
      const targetMethod = container.resolve(target.constructor);
      return targetMethod[propertyKey]({ event, data });
    });

    function constructObject<T>(metadata: string, args: T[]) {
      const _args = Object.assign({}, ...args);
      if (!metadata) return _args;
      return _args[metadata];
    }

    async function validateInput<T>(data: T) {
      const [DtoClass] = Reflect.getMetadata(
        'design:paramtypes',
        target,
        propertyKey
      ) as Class[];

      if (!DtoClass || !DtoClass?.prototype) {
        return;
      }
      return await validateOrReject(new DtoClass(data));
    }
  };
};
