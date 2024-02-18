import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { OTP_CONFIG_TOKEN } from './otp.constants';
import { IOtpModuleOptions, IOtpPairOpts } from './interfaces';
import * as OTPAuth from 'otpauth';
import * as QRCode from 'qrcode';

@Injectable()
export class OtpService {
  constructor(
    @Inject(OTP_CONFIG_TOKEN) private readonly _config: IOtpModuleOptions,
  ) {}

  get config(): IOtpModuleOptions {
    return this._config;
  }

  /**
   * Return a link for pairing with authenticator application.
   * @param opts - Options for generating the subscription.
   * @returns {string} Link for pairing with authenticator application.
   */
  async pair(opts: IOtpPairOpts): Promise<string> {
    const otp = new OTPAuth.TOTP({
      ...this.config,
      secret: OTPAuth.Secret.fromUTF8(opts.secret),
    });
    return otp.toString();
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
    const otp = new OTPAuth.TOTP({
      ...this.config,
      secret: OTPAuth.Secret.fromUTF8(secret),
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

  getOTPHeaderName(): string {
    return this.config.header ?? 'x-one-time-password';
  }
}
