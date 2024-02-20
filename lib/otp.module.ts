import { DynamicModule, Logger, Module } from '@nestjs/common';
import { OtpService } from './services';
import { IOtpModuleAsyncOptions, IOtpModuleOptions } from './interfaces';
import {
  OTP_CONFIG_TOKEN,
  OTP_DEFAULT_HEADER,
  OTP_MAX_SECURE_PERIOD,
  OTP_MIN_DIGITS,
  OTP_MIN_PERIOD,
  OTP_MIN_SECURE_DIGITS,
  OTP_MIN_SECURE_PERIOD,
} from './otp.constants';

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
          useValue: OtpModule.resolveConfig(opts),
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
          provide: `${OTP_CONFIG_TOKEN}_TEMP`,
          useFactory: options.useFactory,
          inject: options.inject,
        },
        {
          provide: OTP_CONFIG_TOKEN,
          useFactory: (configTemp: IOtpModuleOptions) =>
            OtpModule.resolveConfig(configTemp),
          inject: [`${OTP_CONFIG_TOKEN}_TEMP`],
        },
        OtpService,
      ],
      exports: [OtpService],
    };
  }

  private static resolveConfig(
    config: IOtpModuleOptions,
  ): Required<IOtpModuleOptions> {
    return OtpModule.resolveConfig(OtpModule.validateOpts(config));
  }

  private static validateOpts(config: IOtpModuleOptions) {
    const logger = new Logger(OtpModule.name);

    if (!config.secretResolver) {
      logger.warn(
        'No secret resolver provided. Module will not work properly!',
      );
    }

    if (!config.label) {
      logger.warn('No label provided for OTP, defaulting to "OTP"');
      config.label = 'OTP';
    }

    if (!config.issuer) {
      logger.warn('No issuer provided for OTP, defaulting to "OTP"');
      config.issuer = 'OTP';
    }

    if (config.digits !== undefined && config.digits <= OTP_MIN_DIGITS) {
      logger.warn(
        `Invalid digits provided for OTP ${config.digits}, defaulting to ${OTP_MIN_SECURE_DIGITS}`,
      );
      config.digits = OTP_MIN_SECURE_DIGITS;
    } else if (config.digits < OTP_MIN_SECURE_DIGITS) {
      logger.warn(
        `Insecure number of digits provided for OTP (${config.digits})`,
      );
    }

    if (config.period !== undefined && config.period <= OTP_MIN_PERIOD) {
      logger.warn(
        `Invalid period provided for OTP ${config.period}, defaulting to ${OTP_MIN_SECURE_PERIOD}`,
      );
      config.period = OTP_MIN_SECURE_PERIOD;
    } else if (
      config.period < OTP_MIN_SECURE_PERIOD ||
      config.period > OTP_MAX_SECURE_PERIOD
    ) {
      logger.warn(
        `Consider using a different period for OTP instead of ${config.period}`,
      );
    }

    return config;
  }

  private static setDefaultOpts(
    config: IOtpModuleOptions,
  ): Required<IOtpModuleOptions> {
    const defaults: Omit<IOtpModuleOptions, 'label' | 'issuer'> = {
      issuerInLabel: false,
      algorithm: 'SHA1',
      digits: OTP_MIN_SECURE_DIGITS,
      period: OTP_MIN_SECURE_PERIOD,
      header: OTP_DEFAULT_HEADER,
      window: 1,
      secretMethod: 'fromUTF8',
    };
    return { ...defaults, ...config } as Required<IOtpModuleOptions>;
  }
}
