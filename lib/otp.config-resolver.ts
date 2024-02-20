import { IOtpModuleOptions } from './interfaces';
import { Logger } from '@nestjs/common';
import {
  OTP_DEFAULT_HEADER,
  OTP_MAX_SECURE_PERIOD,
  OTP_MIN_DIGITS,
  OTP_MIN_PERIOD,
  OTP_MIN_SECURE_DIGITS,
  OTP_MIN_SECURE_PERIOD,
} from './otp.constants';

class OtpLogger extends Logger {
  constructor(private readonly silent: boolean) {
    super(OtpConfigResolver.name);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  warn(message: any, _context?: string) {
    if (!this.silent) {
      super.warn(message);
    }
  }
}

export class OtpConfigResolver {
  public static resolveConfig(
    config: IOtpModuleOptions,
  ): Required<IOtpModuleOptions> {
    return OtpConfigResolver.setDefaultOpts(
      OtpConfigResolver.validateOpts(config),
    );
  }

  private static validateOpts(config: IOtpModuleOptions) {
    const logger = new OtpLogger(!!config.silent);

    if (!config.secretResolver) {
      logger.warn(
        'No secret resolver provided. Module might not work properly!',
      );
    }

    if (!config.label) {
      logger.warn('No label provided for OTP, defaulting to "OTP"');
      if (!config.skipValidation) {
        config.label = 'OTP';
      }
    }

    if (!config.issuer) {
      logger.warn('No issuer provided for OTP, defaulting to "OTP"');

      if (!config.skipValidation) {
        config.issuer = 'OTP';
      }
    }

    if (
      !config.skipValidation &&
      config.digits !== undefined &&
      config.digits <= OTP_MIN_DIGITS
    ) {
      logger.warn(
        `Invalid digits provided for OTP ${config.digits}, defaulting to ${OTP_MIN_SECURE_DIGITS}`,
      );
      config.digits = OTP_MIN_SECURE_DIGITS;
    } else if (config.digits < OTP_MIN_SECURE_DIGITS) {
      logger.warn(
        `Insecure number of digits provided for OTP (${config.digits})`,
      );
    }

    if (
      !config.skipValidation &&
      config.period !== undefined &&
      config.period <= OTP_MIN_PERIOD
    ) {
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
      issuerInLabel: config.skipValidation ? config.issuerInLabel : false,
      algorithm: config.skipValidation ? config.algorithm : 'SHA1',
      digits: config.skipValidation ? config.digits : OTP_MIN_SECURE_DIGITS,
      period: config.skipValidation ? config.period : OTP_MIN_SECURE_PERIOD,
      header: config.skipValidation ? config.header : OTP_DEFAULT_HEADER,
      window: config.skipValidation ? config.window : 1,
      secretMethod: config.skipValidation ? config.secretMethod : 'fromUTF8',
    };
    return { ...defaults, ...config } as Required<IOtpModuleOptions>;
  }
}
