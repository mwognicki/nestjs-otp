import { DynamicModule, Module } from '@nestjs/common';
import { OtpService } from './services/otp.service';
import { IOtpModuleAsyncOptions, IOtpModuleOptions } from './interfaces';
import { OTP_CONFIG_TOKEN } from './otp.constants';

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
          useValue: opts,
        },
        OtpService,
      ],
      exports: [OtpService],
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
          provide: OTP_CONFIG_TOKEN,
          useFactory: options.useFactory,
          inject: options.inject,
        },
        OtpService,
      ],
      exports: [OtpService],
    };
  }
}
