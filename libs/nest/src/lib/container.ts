import { container } from 'tsyringe';
import { MetadataKey } from './constants';
import { NestModule, Class, ProviderObject } from './interfaces';

export class Container {
  /**
   *
   * @param construct {Class<NestModule | T>}
   * @description Register application module
   */
  public static register<T>(construct: Class<NestModule | T>): void {
    const injectContainer = new Container();
    injectContainer.resolveValuesRecursive(construct);
    injectContainer.resolveRecursive(construct);

    const topModule = container.resolve<NestModule>(construct);
    topModule?.onInIt?.();
  }

  /**
   *
   * @param key {string}
   * @param value {string}
   * @description Register injectable value
   */
  public static registerValue<T>(key: string, value: T): void {
    container.register<T>(key, { useValue: value });
  }

  /**
   *
   * @param construct {Class<NestModule>}
   * @description Resolve application module recursively
   */
  protected resolveRecursive<T>(construct: Class<T>): void {
    const metadata = Reflect.getOwnMetadata(MetadataKey.Module, construct);

    // Providers
    metadata?.providers?.forEach((provider: Class & ProviderObject) => {
      if (!provider.useValue) {
        container.resolve(provider);
      }
    });

    // Imports
    metadata?.imports?.forEach((imported: Class<NestModule>) => {
      const target = container.resolve<NestModule>(imported);
      target?.onInIt?.();
      this.resolveRecursive(imported);
    });

    // Controllers
    metadata?.controllers?.forEach((controller: Class) => {
      container.resolve(controller);
    });
  }

  /**
   *
   * @param construct {Class<NestModule>}
   * @description Resolve injectable values recursively
   */
  protected resolveValuesRecursive<T>(construct: Class<T>): void {
    const metadata = Reflect.getOwnMetadata(MetadataKey.Module, construct);

    metadata?.providers?.forEach((provider: Class & ProviderObject) => {
      if (provider.key && provider.useValue) {
        container.register(provider.key, { useValue: provider.useValue });
      }
    });
    metadata?.imports?.forEach((imported: Class<NestModule>) => {
      this.resolveValuesRecursive(imported);
    });
  }
}
