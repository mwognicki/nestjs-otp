import { DynamicModule, Module } from '@nestjs/common';
import { OtpService } from './services';
import { IOtpModuleAsyncOptions, IOtpModuleOptions } from './interfaces';
import { OTP_CONFIG_TOKEN } from './otp.constants';
import { OtpConfigResolver } from './otp.config-resolver';

@Module({})
export class OtpModule {
  /**
   * Registers the OTP module.
   * @param opts - The options to use when registering the module.
   */
  static register(opts: IOtpModuleOptions): DynamicModule {
    return {
      module: OtpModule,
      providers: [
        {
          provide: OTP_CONFIG_TOKEN,
          useValue: OtpConfigResolver.resolveConfig(opts),
        },
        OtpService,
      ],
      exports: [OTP_CONFIG_TOKEN, OtpService],
    };
  }

  /**
   * Registers the OTP module asynchronously.
   * @param options - The options to use when registering the module.
   */
  static registerAsync(options: IOtpModuleAsyncOptions): DynamicModule {
    return {
      module: OtpModule,
      imports: options.imports,
      providers: [
        {
          provide: `${OTP_CONFIG_TOKEN}_TEMP`,
          useFactory: options.useFactory,
          inject: options.inject,
        },
        {
          provide: OTP_CONFIG_TOKEN,
          useFactory: (configTemp: IOtpModuleOptions) =>
            OtpConfigResolver.resolveConfig(configTemp),
          inject: [`${OTP_CONFIG_TOKEN}_TEMP`],
        },
        OtpService,
      ],
      exports: [OTP_CONFIG_TOKEN, OtpService],
    };
  }
}
