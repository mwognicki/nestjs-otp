import { Inject, Injectable, Logger } from '@nestjs/common';
import { OTP_CONFIG_TOKEN, OTP_DEFAULT_SECRET_LENGTH } from '../otp.constants';
import { IOtpModuleOptions, IOtpPairOpts } from '../interfaces';
import * as OTPAuth from 'otpauth';
import * as QRCode from 'qrcode';

@Injectable()
export class OtpService {
  private readonly logger = new Logger(OtpService.name);

  constructor(
    @Inject(OTP_CONFIG_TOKEN) private config: Required<IOtpModuleOptions>,
  ) {}

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
}
