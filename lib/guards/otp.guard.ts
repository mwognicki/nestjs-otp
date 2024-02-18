import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { OtpService } from '../otp.service';

/**
 * A guard that verifies an one-time password (OTP) sent with a request.
 */
@Injectable()
export class OtpGuard implements CanActivate {
  constructor(private readonly otpService: OtpService) {}

  /**
   * Verifies the OTP and returns a boolean indicating whether it is valid.
   * @param context The execution context.
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = this.getRequest(context);
    const otp = await this.getOTP(request);
    const secret = await this.getSecret();

    return this.otpService.verify(otp, secret);
  }

  /**
   * Gets the secret used for OTP verification.
   * @returns The secret.
   */
  async getSecret(): Promise<string> {
    if (this.otpService.config.secretResolver) {
      return this.otpService.config.secretResolver();
    }
    return 'secret';
  }

  /**
   * Gets the request from the execution context.
   * @param context The execution context.
   * @returns The request.
   */
  getRequest(context: ExecutionContext) {
    if (this.otpService.config.requestResolver) {
      return this.otpService.config.requestResolver(context);
    }
    return context.switchToHttp().getRequest();
  }

  /**
   * Gets the OTP from the request.
   * @param request The request.
   * @returns The OTP.
   */
  async getOTP(request: Request): Promise<string> {
    if (this.otpService.config.otpResolver) {
      return this.otpService.config.otpResolver(request);
    }
    const otp =
      request.headers[this.otpService.getOTPHeaderName().toLowerCase()];
    if (!otp || (Array.isArray(otp) && otp.length > 1)) {
      throw new UnauthorizedException();
    }

    return Promise.resolve(Array.isArray(otp) ? otp[0] : otp);
  }
}
