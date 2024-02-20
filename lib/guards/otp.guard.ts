import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { OtpService } from '../services';
import { NoSecretException } from '../exceptions/no-secret.exception';
import { OtpInvalidException } from '../exceptions/otp-invalid.exception';
import { NoOtpException } from '../exceptions/no-otp.exception';
import { IOtpModuleOptions, IOtpSecretResolver } from '../interfaces';
import { OTP_CONFIG_TOKEN } from '../otp.constants';

/**
 * A guard that verifies a one-time password (OTP) sent with a request.
 */
@Injectable()
export class OtpGuard implements CanActivate {
  constructor(
    private readonly otpService: OtpService,
    @Inject(OTP_CONFIG_TOKEN)
    private readonly config: Required<IOtpModuleOptions>,
  ) {}

  private static resolveSecretResolver(
    options: Pick<IOtpModuleOptions, 'secretResolver'>,
  ): (request?: Request) => string | Promise<string> {
    if (!options.secretResolver) {
      return () => undefined;
    }

    if (
      typeof options.secretResolver === 'function' &&
      !Object.getOwnPropertyNames(options.secretResolver).includes('resolve')
    ) {
      return options.secretResolver;
    }

    return (options.secretResolver as IOtpSecretResolver).resolve.bind(
      options.secretResolver,
    );
  }

  /**
   * Verifies the OTP and returns a boolean indicating whether it is valid.
   * @param context The execution context.
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = this.getRequest(context);

    const otp = await this.extractOtpToken(request);
    this.validateOTP(otp);

    const secret = await this.getSecret(request);
    this.validateSecret(secret);

    return this.verify(otp, secret);
  }

  /**
   * Gets the secret used for OTP verification.
   * @returns The secret.
   */
  async getSecret(request: Request): Promise<string | undefined> {
    return OtpGuard.resolveSecretResolver(this.config)(request);
  }

  /**
   * Gets the request from the execution context or request resolver if configured.
   * @param context The execution context.
   * @returns The request.
   */
  getRequest(context: ExecutionContext) {
    if (this.config.requestResolver) {
      return this.config.requestResolver(context);
    }
    return context.switchToHttp().getRequest();
  }

  /**
   * Gets the OTP from the request or OTP token resolver if configured.
   * @param request The request.
   * @returns The OTP.
   */
  async extractOtpToken(request: Request): Promise<string> {
    if (this.config.otpResolver) {
      return this.config.otpResolver(request);
    }
    const otp = request.headers[this.config.header.toLowerCase()];
    if (!otp) {
      throw new NoOtpException();
    }

    if (Array.isArray(otp) && otp.length > 1) {
      throw new OtpInvalidException();
    }

    return Promise.resolve(Array.isArray(otp) ? otp[0] : otp);
  }

  /**
   * Verify an OTP token against a secret.
   * @param token - The OTP token to verify.
   * @param secret - The secret used to verify the token.
   * @param shouldThrow - Whether to throw an exception if the token is invalid.
   * @returns Whether the token is valid.
   * @throws {UnauthorizedException} If the token is invalid and `shouldThrow` is true.
   * @protected
   */
  protected async verify(
    token: string,
    secret: string,
    shouldThrow = true,
  ): Promise<boolean> {
    const otp = this.otpService.getTOTP({
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

  private validateSecret(secret?: string): void {
    if (!secret) {
      throw new NoSecretException();
    }
  }

  private validateOTP(otp?: string): void {
    if (!otp) {
      throw new NoOtpException();
    }

    if (otp.length !== this.config.digits) {
      throw new OtpInvalidException();
    }
  }
}
