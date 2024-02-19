import {
  Inject,
  Injectable,
  Logger,
  OnModuleInit,
  UnauthorizedException,
} from '@nestjs/common';
import {
  OTP_CONFIG_TOKEN,
  OTP_DEFAULT_HEADER,
  OTP_DEFAULT_SECRET_LENGTH,
  OTP_MAX_SECURE_PERIOD,
  OTP_MIN_DIGITS,
  OTP_MIN_PERIOD,
  OTP_MIN_SECURE_DIGITS,
  OTP_MIN_SECURE_PERIOD,
} from './otp.constants';
import { IOtpModuleOptions, IOtpPairOpts } from './interfaces';
import * as OTPAuth from 'otpauth';
import * as QRCode from 'qrcode';

@Injectable()
export class OtpService implements OnModuleInit {
  private readonly logger = new Logger(OtpService.name);

  constructor(@Inject(OTP_CONFIG_TOKEN) private _config: IOtpModuleOptions) {}

  get config(): Required<IOtpModuleOptions> {
    return this._config as Required<IOtpModuleOptions>;
  }

  onModuleInit() {
    this.validateOpts();
    this.setDefaultOpts();
  }

  /**
   * Generate a random secret for the OTP.
   *
   * @param length - The length of the secret, in characters.
   * @returns The generated secret.
   */
  secret(length: number = OTP_DEFAULT_SECRET_LENGTH): string {
    const secret = new OTPAuth.Secret({
      size: length * 4, // 4 bytes per character in ASCII
    });

    const representations: Record<
      Required<IOtpModuleOptions>['secretMethod'],
      string
    > = {
      fromUTF8: 'utf8',
      fromLatin1: 'latin1',
      fromBase32: 'base32',
      fromHex: 'hex',
    };

    return secret[representations[this.config.secretMethod]];
  }

  /**
   * Return a link for pairing with authenticator application.
   * @param opts - Options for generating the subscription.
   * @returns {string} Link for pairing with authenticator application.
   */
  async pair(opts: IOtpPairOpts): Promise<string> {
    const otp = this.getTOTP(opts);
    return otp.toString();
  }

  /**
   * Generate a TOTP object with the given options.
   *
   * @param opts - Options for generating the TOTP object.
   * @returns The generated TOTP object.
   */
  getTOTP(opts: IOtpPairOpts): OTPAuth.TOTP {
    return new OTPAuth.TOTP({
      ...this.config,
      secret: OTPAuth.Secret[this.config.secretMethod](opts.secret),
    });
  }

  /**
   * Verify an OTP token against a secret.
   * @param token - The OTP token to verify.
   * @param secret - The secret used to verify the token.
   * @param shouldThrow - Whether to throw an exception if the token is invalid.
   * @returns Whether the token is valid.
   * @throws {UnauthorizedException} If the token is invalid and `shouldThrow` is true.
   */
  async verify(
    token: string,
    secret: string,
    shouldThrow = true,
  ): Promise<boolean> {
    const otp = this.getTOTP({
      secret,
    });
    const res = otp.validate({
      token,
    });
    if (res === null && shouldThrow) {
      throw new UnauthorizedException();
    }
    return res !== null;
  }

  /**
   * Generate a QR code as a data URL.
   *
   * @param link - The link to encode in the QR code.
   * @returns A promise that resolves to the data URL of the QR code.
   */
  async qrDataURL(link: string): Promise<string> {
    return new Promise((resolve, reject) => {
      QRCode.toDataURL(link, (err, url) => {
        if (err) {
          reject(err);
        }
        resolve(url);
      });
    });
  }

  /**
   * Generate a QR code as a string.
   *
   * @param link - The link to encode in the QR code.
   * @returns A promise that resolves to the string representation of the QR code.
   */
  async qrString(link: string): Promise<string> {
    return new Promise((resolve, reject) => {
      QRCode.toString(link, (err, url) => {
        if (err) {
          reject(err);
        }
        resolve(url);
      });
    });
  }

  private validateOpts() {
    if (!this.config.secretResolver) {
      this.logger.warn(
        'No secret resolver provided. Module will not work properly!',
      );
    }

    if (!this.config.label) {
      this.logger.warn('No label provided for OTP, defaulting to "OTP"');
      this.config.label = 'OTP';
    }

    if (!this.config.issuer) {
      this.logger.warn('No issuer provided for OTP, defaulting to "OTP"');
      this.config.issuer = 'OTP';
    }

    if (
      this.config.digits !== undefined &&
      this.config.digits <= OTP_MIN_DIGITS
    ) {
      this.logger.warn(
        `Invalid digits provided for OTP ${this.config.digits}, defaulting to ${OTP_MIN_SECURE_DIGITS}`,
      );
      this.config.digits = OTP_MIN_SECURE_DIGITS;
    } else if (this.config.digits < OTP_MIN_SECURE_DIGITS) {
      this.logger.warn(
        `Insecure number of digits provided for OTP (${this.config.digits})`,
      );
    }

    if (
      this.config.period !== undefined &&
      this.config.period <= OTP_MIN_PERIOD
    ) {
      this.logger.warn(
        `Invalid period provided for OTP ${this.config.period}, defaulting to ${OTP_MIN_SECURE_PERIOD}`,
      );
      this.config.period = OTP_MIN_SECURE_PERIOD;
    } else if (
      this.config.period < OTP_MIN_SECURE_PERIOD ||
      this.config.period > OTP_MAX_SECURE_PERIOD
    ) {
      this.logger.warn(
        `Consider using a different period for OTP instead of ${this.config.period}`,
      );
    }
  }

  private setDefaultOpts() {
    const defaults: Omit<IOtpModuleOptions, 'label' | 'issuer'> = {
      issuerInLabel: false,
      algorithm: 'SHA1',
      digits: OTP_MIN_SECURE_DIGITS,
      period: OTP_MIN_SECURE_PERIOD,
      header: OTP_DEFAULT_HEADER,
      window: 1,
      secretMethod: 'fromUTF8',
    };
    this._config = { ...defaults, ...this.config };
  }
}
